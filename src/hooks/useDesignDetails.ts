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

export function useDesignDetails(userId: string) {
  const [designDetails, setDesignDetails] = useState<DesignDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDesignDetails() {
      try {
        console.log('Fetching design for user:', userId);
        
        // Get the saved design from user_configs table using user_id
        const { data: configData, error: configError } = await supabase
          .from('user_configs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (configError) {
          console.error('Error fetching from user_configs:', configError);
          throw configError;
        }

        if (configData) {
          console.log('Found config data:', configData);
          
          // Extract the options from the saved configuration
          const options = configData.options || {};
          
          const details: DesignDetails = {
            modelName: 'Summit 308 Model B',
            modelSize: '14x22',
            squareFootage: 308,
            modelVariant: 'Model B',
            modelDescription: 'Side Entry / More Privacy',
            entryType: options.entry || 'Side Entry',
            entryPrice: 0,
            windowStyle: options.windows || 'More Privacy',
            windowStylePrice: 0,
            isFloorPlanMirrored: false,
            interiorType: options.interior || 'Shell Only',
            interiorPrice: 0,
            siding: options.siding || 'Lap / Iron Gray',
            sidingType: 'Lap Siding',
            sidingPrice: 0,
            door: options.doorColor || 'Factory Primed White',
            doorPrice: 0,
            trim: options.trimColor || 'Clear Anodized Aluminum',
            trimPrice: 0,
            fascia: options.fascia || 'Iron Gray',
            fasciaPrice: 0,
            soffit: options.soffit || 'Unfinished',
            soffitPrice: 0,
            exteriorOptions: [],
            roofOptions: [],
            windowOptions: [],
            basePrice: 41090,
            totalPrice: 41090,
          };
          setDesignDetails(details);
        }
      } catch (err) {
        console.error('Error fetching design details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching design details');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchDesignDetails();
    }
  }, [userId]);

  return { designDetails, loading, error };
} 