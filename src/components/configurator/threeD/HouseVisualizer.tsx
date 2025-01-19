import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useConfigurator } from '../../../context/ConfiguratorContext';
import { TEXTURES, GLB_URL } from '../../../config/textureMappings';

function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    }}>
      <div style={{
        width: '200px',
        height: '6px',
        background: '#ddd',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: '#2563eb',
          transition: 'width 0.3s ease-in-out',
        }} />
      </div>
      <p style={{ marginTop: '8px', color: '#666' }}>
        Loading Model: {progress.toFixed(0)}%
      </p>
    </div>
  );
}

interface LoadingProgress {
  loaded: number;
  total: number;
}

interface HouseModelProps {
  showTable: boolean;
  floorColor: string;
}

// This is a custom component that loads the .glb
function HouseModel({ showTable, floorColor }: HouseModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const { state } = useConfigurator();

  useEffect(() => {
    if (!scene) return;

    // Find and update table visibility
    scene.traverse((object) => {
      if (object.name.includes('DINING_TABLE') || object.name.includes('CHAIR_STACKING')) {
        object.visible = showTable;
      }
    });
  }, [scene, showTable]);

  // New effect for floor color
  useEffect(() => {
    if (!scene) return;

    console.log('Attempting to change floor color to:', floorColor);
    scene.traverse((object) => {
      // Only target floor meshes
      if (object instanceof THREE.Mesh && 
          (object.name === 'mesh_0' || // Main floor mesh
           object.name === 'mesh_1' || // Secondary floor mesh
           object.name.toLowerCase().includes('floor') || 
           object.name.toLowerCase().includes('flooring'))) {
        console.log('Found floor mesh:', object.name);
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial || 
                mat instanceof THREE.MeshPhongMaterial || 
                mat instanceof THREE.MeshBasicMaterial) {
              mat.color.set(floorColor);
              mat.needsUpdate = true;
            }
          });
        } else if (object.material instanceof THREE.MeshStandardMaterial || 
                   object.material instanceof THREE.MeshPhongMaterial || 
                   object.material instanceof THREE.MeshBasicMaterial) {
          object.material.color.set(floorColor);
          object.material.needsUpdate = true;
        }
        console.log('Updated floor material color');
      }
    });
  }, [scene, floorColor]);

  useEffect(() => {
    console.log('Attempting to load model from:', GLB_URL);

    const loader = new GLTFLoader();
    loader.setCrossOrigin('use-credentials');
    
    loader.load(
      GLB_URL,
      (gltf: GLTF) => {
        console.log('Model loaded successfully:', gltf);
        
        // Add debug logging to see model structure
        console.log('Scene structure:');
        gltf.scene.traverse((object) => {
          console.log(`Object: ${object.name}, Type: ${object.type}, Position:`, object.position);
        });
        
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center); // Center the model at origin
        
        // Adjust the model's Y position to sit on the ground
        const size = box.getSize(new THREE.Vector3());
        gltf.scene.position.y = size.y / 2;
        
        setScene(gltf.scene);
      },
      (progress: LoadingProgress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (err: unknown) => {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('Error loading model:', error);
        setLoadError(`Failed to load 3D model. Please check console for details.`);
      }
    );
  }, []);

  useEffect(() => {
    if (!scene) return;

    // Handle material updates
    const updateMaterials = () => {
      if (!scene) return;

      const updateDoorVisibility = () => {
        const doorsNode = scene.getObjectByName('Doors');
        if (doorsNode) {
          const selectedDoorStyle = state.options.doorStyle || 'door-5';
          const doorNumber = selectedDoorStyle.split('-')[1];
          
          // Hide all doors first
          ['Door#5', 'Door#6', 'Door#7', 'Door#8'].forEach(doorName => {
            const door = doorsNode.getObjectByName(doorName);
            if (door) {
              door.visible = doorName === `Door#${doorNumber}`;
            }
          });
        }
      };

      // Update materials based on options
      scene.traverse((child) => {
        // Handle siding material
        const chosenSiding = state.options.sidingColor;
        if (chosenSiding && TEXTURES.siding[chosenSiding]) {
          const wallsNode = scene.getObjectByName("Walls");
          if (wallsNode) {
            const textureUrl = TEXTURES.siding[chosenSiding];
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(textureUrl, (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              // Apply to both wall types
              ["Wall_4.5", "Wall_6"].forEach(wallName => {
                const wall = wallsNode.getObjectByName(wallName);
                if (wall && 'material' in wall) {
                  const material = (wall as THREE.Mesh).material;
                  if (material instanceof THREE.MeshStandardMaterial) {
                    material.map = texture;
                    material.needsUpdate = true;
                  }
                }
              });
            });
          }
        }

        // Handle flooring material if available
        const chosenFlooring = state.options.flooring;
        if (chosenFlooring && TEXTURES.flooring?.[chosenFlooring]) {
          const flooringNode = scene.getObjectByName("Flooring");
          if (flooringNode) {
            const textureUrl = TEXTURES.flooring[chosenFlooring];
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(textureUrl, (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              ["Hardwood", "Laminate", "Tile"].forEach(floorType => {
                const floor = flooringNode.getObjectByName(floorType);
                if (floor && 'material' in floor) {
                  const material = (floor as THREE.Mesh).material;
                  if (material instanceof THREE.MeshStandardMaterial) {
                    material.map = texture;
                    material.needsUpdate = true;
                  }
                }
              });
            });
          }
        }

        // Handle roofing material
        const chosenRoofing = state.options.roofing;
        if (chosenRoofing && TEXTURES.roofing?.[chosenRoofing]) {
          const roofNode = scene.getObjectByName("Roof");
          if (roofNode) {
            const textureUrl = TEXTURES.roofing[chosenRoofing];
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(textureUrl, (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              ["Roof_Type1", "Roof_Type2", "Roof_Type3"].forEach(roofType => {
                const roof = roofNode.getObjectByName(roofType);
                if (roof && 'material' in roof) {
                  const material = (roof as THREE.Mesh).material;
                  if (material instanceof THREE.MeshStandardMaterial) {
                    material.map = texture;
                    material.needsUpdate = true;
                  }
                }
              });
            });
          }
        }

        // Add door visibility update
        updateDoorVisibility();
      });
    };

    updateMaterials();
  }, [scene, state.options]);

  // If there's an error, show an error message
  if (loadError) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#ef4444',
        backgroundColor: '#fee2e2',
        padding: '1rem',
        borderRadius: '0.5rem',
        maxWidth: '80%'
      }}>
        {loadError}
      </div>
    );
  }

  // If no scene yet, return null (loading state will be handled by Suspense)
  if (!scene) return null;

  return <primitive object={scene} ref={groupRef} />;
}

export function HouseVisualizer() {
  const [showTable, setShowTable] = useState(true);
  const [floorColor, setFloorColor] = useState('#ffffff');

  const colorButton = (color: string, label: string) => (
    <button
      onClick={() => setFloorColor(color)}
      style={{
        padding: '0.5rem 1rem',
        marginRight: '1rem',
        backgroundColor: floorColor === color ? '#2563eb' : '#e5e7eb',
        color: floorColor === color ? 'white' : 'black',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setShowTable(true)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '1rem',
              backgroundColor: showTable ? '#2563eb' : '#e5e7eb',
              color: showTable ? 'white' : 'black',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Show Table
          </button>
          <button
            onClick={() => setShowTable(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: !showTable ? '#2563eb' : '#e5e7eb',
              color: !showTable ? 'white' : 'black',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Hide Table
          </button>
        </div>
        
        <div>
          {colorButton('#ffffff', 'White Floor')}
          {colorButton('#4299e1', 'Blue Floor')}
          {colorButton('#48bb78', 'Green Floor')}
        </div>
      </div>

      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Canvas
          camera={{
            position: [0, 20, 0],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.5} />
          <Suspense fallback={<LoadingScreen />}>
            <HouseModel showTable={showTable} floorColor={floorColor} />
            <OrbitControls
              enableZoom={false}
              enablePan={true}
              enableRotate={false}
              target={[0, 0, 0]}
              maxDistance={30}
              minDistance={10}
              maxPolarAngle={0}
              minPolarAngle={0}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
} 