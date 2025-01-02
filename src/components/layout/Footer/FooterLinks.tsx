import React from 'react';
import { Link } from 'react-router-dom';

export const FooterLinks = () => {
  const links = {
    MORE: [
      { label: 'Process', path: '/process' },
      { label: 'Design Center', path: '/design' },
      { label: 'Blog', path: '/blog' },
      { label: 'FAQ', path: '/faq' },
      { label: 'About Studio Shed', path: '/about' },
    ],
    ADUS: [
      { label: 'Summit Series', path: '/models/summit' },
      { label: 'Accessory Dwelling Units', path: '/adus' },
      { label: 'ADU Cost & Financing', path: '/financing' },
    ],
    STUDIOS: [
      { label: 'Signature Series', path: '/models/signature' },
      { label: 'Portland Series', path: '/models/portland' },
      { label: 'Studio Cost & Financing', path: '/financing' },
    ],
    INSPIRATION: [
      { label: 'Home Office Spaces', path: '/inspiration/home-office' },
      { label: 'Art & Creative Studios', path: '/inspiration/art-studios' },
      { label: 'She Shed', path: '/inspiration/she-shed' },
    ],
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Object.entries(links).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-bold mb-4">{category}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};