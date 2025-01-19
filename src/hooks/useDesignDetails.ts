import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DesignDetails {
  totalPrice: number;
  options: Record<string, any>;
  config_name: string;
  id: string;
  user_id: string;
}

export function useDesignDetails(userId: string) {
  const [designDetails, setDesignDetails] = useState<DesignDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDesignDetails() {
      setLoading(true);
      try {
        if (!userId) {
          throw new Error('No user ID provided');
        }
        // Get the most recent design from user_configs
        const { data, error: configError } = await supabase
          .from('user_configs')
          .select('*')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (configError) {
          throw configError;
        }
        if (!data) {
          setDesignDetails(null);
        } else {
          setDesignDetails(data);
        }
      } catch (err) {
        console.error('Error fetching design details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchDesignDetails();
  }, [userId]);

  return { designDetails, loading, error };
}