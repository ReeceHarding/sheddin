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
    setErrorMessage(null); // Clear error when user types
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
          }
        }
      });

      if (authError) {
        console.error('Auth Error:', authError);
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Save the configuration
        const { error: configError } = await supabase
          .from('user_configs')
          .insert({
            user_id: authData.user.id,
            config_name: 'Default Configuration',
            options: options
          })
          .select()
          .single();

        if (configError) {
          console.error('Config Error:', configError);
          throw new Error(configError.message);
        }

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