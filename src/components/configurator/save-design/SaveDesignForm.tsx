import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { FormInput } from './FormInput';
import { FormHeader } from './FormHeader';
import { FormDescription } from './FormDescription';

interface SaveDesignFormProps {
  options: Record<string, string>;
}

export const SaveDesignForm: React.FC<SaveDesignFormProps> = ({ options }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    zipCode: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phoneNumber,
            zip_code: formData.zipCode
          },
          emailRedirectTo: window.location.origin // if we want them to confirm email
        }
      });

      if (authError) {
        console.error('Auth Error:', authError);
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Save the configuration
        // store to user_configs table
        const userId = authData.user.id;

        // get current total price from user_configs table if needed, or pass 0
        // but we can read from "options" after sign up
        // upsert
        const { data: configUpsert, error: configError } = await supabase
          .from('user_configs')
          .upsert({
            user_id: userId,
            config_name: 'Default Configuration',
            options: options
          }, { onConflict: 'user_id' })
          .select()
          .single();

        if (configError) {
          console.error('Config Error:', configError);
          throw new Error(configError.message);
        }

        // Call the edge function to send-saved-design
        // The edge function name is `send-saved-design`
        // We will pass the user_id, user email, and config details
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-saved-design`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            userId: userId,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            config: configUpsert
          })
        });

        // Redirect to their design page
        window.location.href = `/designs/${authData.user.id}`;
      } else {
        throw new Error('No user data returned from signup');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <FormHeader />
      <FormDescription />

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <FormInput
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <FormInput
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FormInput
            label="ZIP code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <FormInput
            label="Phone number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#B87503] hover:bg-[#9A6203] text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'SAVE YOUR DESIGN'}
        </button>
      </form>
    </div>
  );
};