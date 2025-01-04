import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DesignDetails {
  // Basic Model Info
  modelName: string;
  modelSize: string;
  squareFootage: number;
  modelVariant: 'Model A' | 'Model B';
  modelDescription: string;

  // Entry and Layout
  entryType: 'Front Entry' | 'Side Entry';
  entryPrice: number;
  windowStyle: 'More Glass' | 'More Privacy';
  windowStylePrice: number;
  isFloorPlanMirrored: boolean;

  // Interior Configuration
  interiorType: 'Fully Equipped' | 'Shell Only';
  interiorPrice: number;

  // Interior Finishes
  interiorFinishes?: {
    cabinets: string;
    countertops: string;
    mainFlooring: string;
    bathFlooring: string;
    fixtures: string[];
  };

  // Exterior Finishes
  siding: string;
  sidingType: 'Lap Siding' | 'Plank Siding' | 'Cedar Plank' | 'Block Siding';
  sidingPrice: number;
  door: string;
  doorPrice: number;
  trim: string;
  trimPrice: number;
  fascia: string;
  fasciaPrice: number;
  soffit: string;
  soffitPrice: number;

  // Additional Options
  exteriorOptions: {
    name: string;
    price: number;
  }[];
  roofOptions: {
    name: string;
    price: number;
  }[];
  windowOptions: {
    name: string;
    price: number;
  }[];

  // Prices
  basePrice: number;
  totalPrice: number;
}

// Helper function to format option names
const formatOptionName = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function useDesignDetails(configId: string) {
  const [designDetails, setDesignDetails] = useState<DesignDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchDesignDetails() {
      if (!configId) {
        setError('No configuration ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching design details for config:', configId);
        
        const { data: configData, error: configError } = await supabase
          .from('user_configs')
          .select('options, created_at, config_name')
          .eq('id', configId)
          .maybeSingle();

        if (configError) {
          console.error('Error fetching from user_configs:', configError);
          throw new Error(`Database error: ${configError.message}`);
        }

        if (!configData) {
          throw new Error(`No configuration found with ID: ${configId}`);
        }

        if (!configData.options) {
          throw new Error(`Configuration ${configId} has no options data`);
        }

        console.log('Found config data:', configData);
        
        const options = configData.options;
        
        // Calculate all prices
        const basePrice = 41090;  // Base price for Summit 308

        // Siding options
        const sidingPrice = options.siding === 'cedar-plank' ? 8624 : 
                         options.siding === 'plank' ? 2156 :
                         options.siding === 'block' ? 3500 : 0;
                          
        // Entry options
        const entryPrice = options.entry === 'side-entry' ? 2500 : 0;

        // Window options
        const windowsPrice = options.windows === 'more-glass' ? 3500 : 0;
        
        // Interior options
        const interiorPrice = options.interior === 'fully-equipped' ? 25000 : 0;
        
        // Add-on options
        const exteriorAddonPrice = options.exteriorAddon === 'metal-wainscot' ? 500 : 0;
        const roofAddonPrice = options.roofAddon === 'back-eaves-6inches' ? 308 : 0;

        // Calculate total (don't use stored price, always calculate fresh)
        const totalPrice = basePrice + sidingPrice + entryPrice + windowsPrice + 
                         interiorPrice + exteriorAddonPrice + roofAddonPrice;

        console.log('Price breakdown in useDesignDetails:', {
          basePrice,
          sidingPrice,
          entryPrice,
          windowsPrice,
          interiorPrice,
          exteriorAddonPrice,
          roofAddonPrice,
          calculatedTotal: totalPrice
        });

        if (isMounted) {
          const details: DesignDetails = {
            modelName: 'Summit 308 Model B',
            modelSize: '14x22',
            squareFootage: 308,
            modelVariant: 'Model B',
            modelDescription: `${formatOptionName(options.entry)} / ${formatOptionName(options.windows)}`,
            
            // Entry and Windows
            entryType: formatOptionName(options.entry) as 'Front Entry' | 'Side Entry',
            entryPrice,
            windowStyle: formatOptionName(options.windows) as 'More Glass' | 'More Privacy',
            windowStylePrice: windowsPrice,
            isFloorPlanMirrored: false,

            // Interior
            interiorType: formatOptionName(options.interior) as 'Fully Equipped' | 'Shell Only',
            interiorPrice,

            // Interior Finishes
            interiorFinishes: {
              cabinets: formatOptionName(options.cabinets),
              countertops: formatOptionName(options.countertops),
              mainFlooring: formatOptionName(options.mainFlooring),
              bathFlooring: formatOptionName(options.bathFlooring),
              fixtures: [formatOptionName(options.fixtures)],
            },

            // Exterior Finishes
            siding: formatOptionName(options.siding),
            sidingType: formatOptionName(options.siding) + ' Siding' as any,
            sidingPrice,
            door: formatOptionName(options.doorColor),
            doorPrice: 0,
            trim: formatOptionName(options.trimColor),
            trimPrice: 0,
            fascia: formatOptionName(options.sidingColor),
            fasciaPrice: 0,
            soffit: 'Unfinished',
            soffitPrice: 0,

            // Additional Options
            exteriorOptions: options.exteriorAddon && options.exteriorAddon !== 'none' ? [{
              name: formatOptionName(options.exteriorAddon),
              price: exteriorAddonPrice
            }] : [],
            roofOptions: options.roofAddon && options.roofAddon !== 'none' ? [{
              name: formatOptionName(options.roofAddon),
              price: roofAddonPrice
            }] : [],
            windowOptions: [],

            // Prices
            basePrice,
            totalPrice,
          };
          setDesignDetails(details);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching design details:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred while fetching design details');
          setDesignDetails(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDesignDetails();

    return () => {
      isMounted = false;
    };
  }, [configId]);

  return { designDetails, loading, error };
} 