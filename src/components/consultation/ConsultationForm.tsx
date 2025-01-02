import React, { useState } from 'react';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    zipCode: '',
    intendedUse: '',
    propertyStatus: '',
    installationServices: '',
    startTimeline: '',
    budget: '',
    comments: '',
    acceptEmails: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="First name"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last name"
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="ZIP code"
          name="zipCode"
          required
          value={formData.zipCode}
          onChange={handleChange}
        />
      </div>

      <SelectField
        label="Intended Use"
        name="intendedUse"
        value={formData.intendedUse}
        onChange={handleChange}
        options={[
          { value: 'home-office', label: 'Home Office' },
          { value: 'adu', label: 'Accessory Dwelling Unit (ADU)' },
          { value: 'studio', label: 'Art/Music Studio' },
          { value: 'gym', label: 'Home Gym' }
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Property Status"
          name="propertyStatus"
          value={formData.propertyStatus}
          onChange={handleChange}
          options={[
            { value: 'existing', label: 'Existing property' },
            { value: 'future', label: 'Future property' }
          ]}
        />
        <SelectField
          label="Installation Preference"
          name="installationServices"
          value={formData.installationServices}
          onChange={handleChange}
          options={[
            { value: 'interested', label: 'Need installation' },
            { value: 'have-builder', label: 'Have a builder' }
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Timeline"
          name="startTimeline"
          value={formData.startTimeline}
          onChange={handleChange}
          options={[
            { value: 'asap', label: 'ASAP' },
            { value: '1-3', label: '1-3 Months' },
            { value: '3-6', label: '3-6 Months' },
            { value: '6+', label: '6+ Months' }
          ]}
        />
        <SelectField
          label="Budget Range"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          options={[
            { value: '50-100k', label: '$50k - $100k' },
            { value: '100-150k', label: '$100k - $150k' },
            { value: '150-200k', label: '$150k - $200k' },
            { value: '200k+', label: '$200k+' }
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Comments
        </label>
        <textarea
          name="comments"
          rows={4}
          value={formData.comments}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
        />
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="acceptEmails"
          id="acceptEmails"
          checked={formData.acceptEmails}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="acceptEmails" className="text-sm text-gray-600">
          I would like to receive design inspiration, product updates, and news from Studio Shed.
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        Schedule Consultation
      </button>
    </form>
  );
};