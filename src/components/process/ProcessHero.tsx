import React from 'react';
import { Link } from 'react-router-dom';

interface ProcessHeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
}

export const ProcessHero: React.FC<ProcessHeroProps> = ({
  backgroundImage,
  title,
  subtitle,
  description
}) => {
  const formattedDescription = description.split('Start with our 3D Design Center').map((part, index) => {
    if (index === 0) return part;
    return (
      <React.Fragment key={index}>
        <Link to="/design" className="text-yellow-400 hover:text-yellow-300 transition-colors">
          Start with our 3D Design Center
        </Link>
        {part}
      </React.Fragment>
    );
  });

  return (
    <>
      <div className="relative h-[calc(100vh-80px)] mt-[-80px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src={backgroundImage}
            alt="Troo Solutions Process"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-[80px]">
          <div className="max-w-[800px] mx-auto">
            <span className="inline-block text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-6">
              PROCESS
            </span>
            <h1 className="text-5xl lg:text-[64px] font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
              {subtitle}
            </h2>
            <p className="text-lg text-white/90 mx-auto mb-12 leading-relaxed max-w-[640px]">
              {formattedDescription}
            </p>
            <a
              href="#process-glance"
              className="inline-flex items-center px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-black text-base font-semibold rounded-full transition-colors duration-200"
            >
              SEE OUR PROCESS AT-A-GLANCE
            </a>
          </div>
        </div>
      </div>

      {/* Process Navigation */}
      <div className="sticky top-[80px] z-40 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-between overflow-x-auto">
            {[
              { label: 'Site Visit', id: 'site-visit' },
              { label: 'Design Coordination', id: 'design-coordination' },
              { label: 'Project Design', id: 'project-design' },
              { label: 'Permitting', id: 'permitting' },
              { label: 'Production', id: 'production' },
              { label: 'Installation', id: 'installation' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-6 py-4 text-sm font-medium text-gray-800 hover:text-yellow-600 whitespace-nowrap border-b-2 border-transparent hover:border-yellow-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};