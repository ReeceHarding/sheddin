import React from 'react';
import { FooterNewsletter } from './FooterNewsletter';
import { FooterLinks } from './FooterLinks';
import { FooterHero } from './FooterHero';

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <FooterHero />

      {/* Mountain Background Section */}
      <div className="relative h-[400px]">
        <img
          src="/images/footer/2ndFooter.png"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-4">
                Built in Colorado.
                <br />
                Delivered and assembled
                <br />
                nationwide.
              </h2>
              <p className="text-gray-300">
                Shipping available to all 50 U.S. states and select locations in Canada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Links and Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <FooterLinks />
          <FooterNewsletter />
        </div>
      </div>
    </footer>
  );
};