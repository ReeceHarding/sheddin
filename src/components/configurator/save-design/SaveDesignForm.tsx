import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useConfigurator } from '../../../context/ConfiguratorContext';

interface SaveDesignFormProps {
  options: Record<string, string>;
}

export const SaveDesignForm: React.FC<SaveDesignFormProps> = () => {
  const { state } = useConfigurator();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        // Update existing configuration
        const { error } = await supabase
          .from('user_configs')
          .upsert({
            user_id: user.id,
            config_name: 'Default Configuration',
            options: state.options
          });

        if (error) throw error;
        window.location.href = `/designs/${user.id}`;
      } else {
        // Handle new user registration
        // ... existing registration logic ...
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('There was an error saving your design. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {user ? (
        <div className="sticky bottom-0 bg-white border-t py-6 mt-12">
          <div className="max-w-4xl mx-auto flex justify-center">
            <button
              onClick={() => window.location.href = `/designs/${user.id}`}
              className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              VIEW YOUR DESIGN
            </button>
          </div>
        </div>
      ) : (
        // Registration form for new users
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... existing form fields ... */}
        </form>
      )}
    </div>
  );
};