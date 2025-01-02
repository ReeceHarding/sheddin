import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '../shared/Button';

export const SavedDesigns = () => (
  <div className="bg-gray-50 rounded-lg py-16">
    <div className="max-w-md mx-auto px-8 text-center">
      <FileText className="w-12 h-12 mx-auto mb-6 text-gray-400" />
      <h3 className="text-2xl font-medium mb-3">Access Your Saved Designs</h3>
      <p className="text-base text-gray-600 mb-8">Enter your email to see past designs</p>
      
      <form className="flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 h-[50px] px-4 border border-gray-300 rounded-md 
                   focus:ring-2 focus:ring-[#B87503] focus:border-transparent"
        />
        <Button>Submit</Button>
      </form>
    </div>
  </div>
);