import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UserConfig {
  id: string;
  config_name: string;
  options: Record<string, string>;
}

export function useUserConfig(user: User | null) {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Load the most recent config
    loadConfig();
  }, [user]);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('user_configs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (options: Record<string, string>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_configs')
        .insert({
          user_id: user.id,
          config_name: 'Default Configuration',
          options
        })
        .select()
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  return { config, loading, saveConfig };
}