import React from 'react';
import { FormInput } from './FormInput';

interface FormFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    zipCode: string;
    phoneNumber: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading
}) => (
  <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <FormInput
        label="First name"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
        required
        disabled={isLoading}
      />
      <FormInput
        label="Last name"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
        required
        disabled={isLoading}
      />
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <FormInput
        label="ZIP code"
        name="zipCode"
        value={formData.zipCode}
        onChange={onChange}
        required
        disabled={isLoading}
      />
      <FormInput
        label="Phone number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={onChange}
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      SAVE YOUR DESIGN
    </button>
  </form>
);