import React from 'react';

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
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[90vh] min-h-[800px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50 z-10"></div>
          <img
            src={backgroundImage}
            alt="Studio Shed Process"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center">
          <div className="max-w-[800px] mx-auto px-6">
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
              {description}
            </p>
            <a
              href="#toc-glance"
              className="inline-flex items-center px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-black text-base font-semibold rounded-full transition-colors duration-200"
            >
              SEE OUR PROCESS AT-A-GLANCE
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-b border-yellow-400/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex justify-between overflow-x-auto -mb-px">
            {[
              'Site Visit',
              'Design Coordination',
              'Project Design',
              'Permitting',
              'Production',
              'Installation'
            ].map((item, index) => (
              <a
                key={item}
                href={`#toc-${item.toLowerCase().replace(' ', '-')}`}
                className={`px-6 py-5 text-sm font-medium text-gray-800 hover:text-yellow-600 whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  index === 0 ? 'border-yellow-400' : 'border-transparent'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};