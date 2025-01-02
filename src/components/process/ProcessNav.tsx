import React from 'react';

export const ProcessNav = () => {
  const [activeSection, setActiveSection] = React.useState('siteVisit');

  const sections = [
    { id: 'siteVisit', label: 'Site Visit' },
    { id: 'designCoordination', label: 'Design Coordination' },
    { id: 'projectDesign', label: 'Project Design' },
    { id: 'permitting', label: 'Permitting' },
    { id: 'production', label: 'Production' },
    { id: 'installation', label: 'Installation' }
  ];

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="hidden sm:block">
        <nav className="relative z-0 shadow flex divide-x divide-gray-200" aria-label="Tabs">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#toc-${section.id}`}
              className={`
                group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center 
                hover:opacity-80 focus:z-10 
                ${activeSection === section.id ? 'text-gray-900' : 'text-gray-500'}
              `}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.label}</span>
              <span 
                aria-hidden="true" 
                className={`absolute inset-x-0 bottom-0 h-1 ${
                  activeSection === section.id ? 'bg-yellow-500' : 'bg-gray-400'
                }`}
              ></span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};