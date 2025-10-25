// FIX: Invalid import statement. Replaced with a standard import for React hooks.
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

// Optimized Image Component with WebP support and fallback
interface OptimizedImageProps {
    src: string; // Path without extension, e.g., "/assets/images/hero"
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    fetchpriority?: 'high' | 'low' | 'auto';
    width?: number;
    height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    fetchpriority = 'auto',
    width,
    height
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Get file extension from original src
    const getExtension = (path: string) => {
        const ext = path.match(/\.(jpeg|jpg|png|webp)$/i);
        return ext ? ext[1].toLowerCase() : 'jpeg';
    };
    
    const originalExt = getExtension(src);
    const basePath = src.replace(/\.(jpeg|jpg|png|webp)$/i, '');
    
    // Generate WebP and fallback paths
    const webpSrc = `${basePath}.webp`;
    const fallbackSrc = originalExt === 'webp' ? `${basePath}.jpeg` : src;

    return (
        <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
                src={fallbackSrc}
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                loading={loading}
                fetchpriority={fetchpriority}
                onLoad={() => setIsLoaded(true)}
                decoding="async"
                width={width}
                height={height}
            />
        </picture>
    );
};

// Simple image component for backwards compatibility (no WebP optimization)
interface SimpleImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    width?: number;
    height?: number;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    width,
    height
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={loading}
            decoding="async"
            width={width}
            height={height}
        />
    );
};

// Preload critical images
const ImagePreloader: React.FC<{ images: string[] }> = ({ images }) => {
    useEffect(() => {
        images.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }, [images]);
    
    return null;
};

const Preloader = React.memo(() => {
    const [showFirstWord, setShowFirstWord] = useState(true);
    const [showSecondWord, setShowSecondWord] = useState(false);

    useEffect(() => {
        // Use requestAnimationFrame for smoother timing
        let fadeOutTimerId: number;
        let fadeInTimerId: number;
        
        // Pop out first word - reduced delay so second word gets more time
        const fadeOutTimer = setTimeout(() => {
            fadeOutTimerId = requestAnimationFrame(() => {
                setShowFirstWord(false);
            });
        }, 800);
        
        // Pop in second word - appears slightly earlier
        const fadeInTimer = setTimeout(() => {
            fadeInTimerId = requestAnimationFrame(() => {
                setShowSecondWord(true);
            });
        }, 1000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(fadeInTimer);
            if (fadeOutTimerId) cancelAnimationFrame(fadeOutTimerId);
            if (fadeInTimerId) cancelAnimationFrame(fadeInTimerId);
        };
    }, []);
    
    return (
        <div className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter sm:tracking-widest uppercase relative h-32 w-full flex items-center justify-center text-center">
            {/* First word with pop animation - always rendered to avoid layout shift */}
            <span 
                className={`absolute text-orange-500 ${
                    showFirstWord 
                        ? 'animate-preloader-pop-in' 
                        : 'animate-preloader-pop-out'
                }`}
                style={{ pointerEvents: 'none' }}
            >
                    Phyrux
                </span>
            {/* Second word with pop animation - conditionally rendered */}
            {showSecondWord && (
                <span 
                    className="absolute text-white animate-preloader-pop-in"
                    style={{ pointerEvents: 'none' }}
                >
                    Commissions
                </span>
            )}
        </div>
    );
});


const Logo = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 3L3 9.353V22.059L16 28.412L29 22.059V9.353L16 3Z"
        stroke="#808080"
        strokeWidth="2"
      />
      <path d="M3 9.353L16 15.706L29 9.353" stroke="#808080" strokeWidth="2" />
      <path d="M16 28.412V15.706" stroke="#808080" strokeWidth="2" />
      <path d="M16 3L3 9.353V22.059" stroke="#F97316" strokeWidth="2.5" />
    </svg>
  );

const SparkleIcon = () => (
    <div className="relative inline-block ml-2 -top-1 md:-top-3 animate-subtle-bounce animation-delay-600">
        <div className="absolute inset-0 bg-orange-500 blur-sm rounded-lg"></div>
        <div className="relative w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6 text-white">
                <path d="M12 2V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.8284 7.17157L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.17157 16.8284L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.8284 16.8284L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.17157 7.17157L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    </div>
);

const BackButton = ({ navigateTo, page, text }: { navigateTo: (page: string) => void; page: string; text: string; }) => (
    <button
        onClick={() => navigateTo(page)}
        className="group inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-black/20 px-4 py-2 text-sm font-semibold text-orange-400 transition-all duration-300 ease-in-out hover:bg-orange-500/10 hover:border-orange-500/50 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0D0D0D]"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
        <span>{text}</span>
    </button>
);

type NavigationProps = {
    navigateTo: (page: string) => void;
    currentPage: string;
};

const iconPaths: { [key: string]: React.ReactNode } = {
    'video-editing': (
      <>
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </>
    ),
    'graphics-designing': (
      <>
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </>
    ),
    'web-development': (
      <>
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </>
    ),
    'digital-art': (
      <>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ),
    'pixel-art': (
        <>
            {/* Simple pixel heart/8-bit style icon */}
            <rect x="5" y="6" width="3" height="3"/>
            <rect x="11" y="6" width="3" height="3"/>
            <rect x="8" y="9" width="3" height="3"/>
            <rect x="5" y="9" width="3" height="3"/>
            <rect x="11" y="9" width="3" height="3"/>
            <rect x="14" y="9" width="3" height="3"/>
            <rect x="5" y="12" width="3" height="3"/>
            <rect x="8" y="12" width="3" height="3"/>
            <rect x="11" y="12" width="3" height="3"/>
            <rect x="14" y="12" width="3" height="3"/>
            <rect x="8" y="15" width="3" height="3"/>
            <rect x="11" y="15" width="3" height="3"/>
            <rect x="11" y="18" width="3" height="3"/>
        </>
    ),
    'clipping-service': (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88" />
        <path d="M14.47 14.48L20 20" />
        <path d="M8.12 8.12L12 12" />
      </>
    ),
  };
  
  type ServiceIconProps = {
    name: string;
    className?: string;
  };
  
  const ServiceIcon = ({ name, className }: ServiceIconProps) => {
    const iconContent = iconPaths[name] || <></>;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className || 'h-12 w-12'}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {iconContent}
      </svg>
    );
  };

type Service = {
    id: string;
    name: string;
    iconName: string;
    description: string;
    features: string[];
};

const services: Service[] = [
    { 
        id: 'video-editing', 
        name: 'Video Editing', 
        iconName: 'video-editing',
        description: 'We craft compelling narratives from your raw footage. Our expert editors use industry-leading software to create everything from cinematic brand stories and dynamic social media ads to engaging YouTube content and polished corporate videos.',
        features: ['Color Grading & Correction', 'Motion Graphics & Titling', 'Sound Design & Mixing', 'Multi-camera Editing', '4K & HD Delivery']
    },
    { 
        id: 'graphics-designing', 
        name: 'Graphics Designing', 
        iconName: 'graphics-designing',
        description: 'Visual identity is key. Our design team creates stunning graphics that capture your brand\'s essence, including logos, marketing materials, social media assets, and complete brand kits that ensure consistency and impact.',
        features: ['Logo Design & Branding', 'Marketing Collateral', 'Social Media Graphics', 'UI/UX Design Mockups', 'Print & Digital Layouts']
    },
    { 
        id: 'web-development', 
        name: 'Web Development', 
        iconName: 'web-development',
        description: 'Your website is your digital storefront. We build responsive, high-performance websites that are not only visually appealing but also optimized for user experience and search engines, from simple landing pages to complex e-commerce platforms.',
        features: ['Responsive Design', 'CMS Integration (WordPress, etc.)', 'E-commerce Solutions', 'SEO Optimization', 'Performance Tuning']
    },
    { 
        id: 'digital-art', 
        name: 'Digital Art', 
        iconName: 'digital-art',
        description: 'Our artists create bespoke digital illustrations and concept art that bring your ideas to life. Whether for character design, environmental concepts, or promotional artwork, we deliver unique visuals with a distinct style.',
        features: ['Character & Concept Design', 'Illustrations for Web & Print', 'Game Asset Creation', 'Promotional Artwork', 'Digital Painting']
    },
    { 
        id: 'pixel-art', 
        name: 'Pixel Art', 
        iconName: 'pixel-art',
        description: 'Embrace the retro aesthetic with custom pixel art. Perfect for indie games, animated sprites, and nostalgic branding, our pixel artists meticulously craft every detail to create charming and memorable visuals.',
        features: ['Game Sprites & Tilesets', 'Animated Avatars & Icons', 'Retro-style Illustrations', 'UI Elements', 'Custom Character Sprites']
    },
    { 
        id: 'clipping-service', 
        name: 'Clipping Service', 
        iconName: 'clipping-service',
        description: 'Precision is paramount. Our clipping path service provides clean, professional cutouts for your product photos, ensuring they look perfect for e-commerce sites, catalogs, and marketing materials. We handle complex images with care.',
        features: ['Background Removal', 'Product Photo Editing', 'Image Masking', 'Ghost Mannequin Effect', 'Bulk Image Processing']
    }
];

const HamburgerIcon = ({ open }: { open: boolean }) => (
    <div className="w-6 h-5 flex flex-col justify-between items-center" aria-hidden="true">
        <span className={`block h-0.5 w-full bg-white rounded-full transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-[9px]' : ''}`} />
        <span className={`block h-0.5 w-full bg-white rounded-full transition duration-300 ease-in-out ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-full bg-white rounded-full transform transition duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
    </div>
);

const Header = ({ navigateTo, currentPage }: NavigationProps) => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // FIX: 'u' is not defined. Replaced with 'useRef'.
    const menuTimeoutRef = useRef<number | null>(null);

    const handleMenuEnter = () => {
        if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
        setIsServicesMenuOpen(true);
    };

    const handleMenuLeave = () => {
        menuTimeoutRef.current = window.setTimeout(() => setIsServicesMenuOpen(false), 600);
    };

    const handleMobileNav = (page: string) => {
        navigateTo(page);
        setIsMobileMenuOpen(false);
    };

    // FIX: 'c' is not defined. Replaced with 'useEffect'.
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);
    
    const isServicePageActive = services.some(s => s.id === currentPage) || currentPage === 'services-page';

    const navLinks = [
        { page: 'home', label: 'Home', isActive: currentPage === 'home' },
        { page: 'services-page', label: 'Services', isActive: isServicePageActive },
        { page: 'about-us', label: 'About Us', isActive: currentPage === 'about-us' },
        { page: 'faqs', label: 'FAQs', isActive: currentPage === 'faqs' },
    ];

    return (
      <>
        <header className="sticky top-0 w-full py-4 px-4 sm:px-6 lg:px-8 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-4 pr-3 shadow-lg ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('home')} className="group flex items-center focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100">
                  
                  <span className="font-bold text-lg sm:text-xl text-white tracking-wider ml-3 transition-colors duration-300 ease-in-out group-hover:text-orange-400">
                      <span className="group-hover:hidden">Phyrux Commissions</span>
                      <span className="hidden group-hover:inline">Phyrux Comms</span>
                  </span>
                </button>
                <nav className="hidden md:flex items-center space-x-1">
                  {navLinks.slice(0,1).map(link => (
                    <button key={link.page} onClick={() => navigateTo(link.page)} className={`px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 ease-in-out text-sm font-medium hover:scale-105 active:scale-95 ${link.isActive ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}>{link.label}</button>
                  ))}
                  <div 
                      className="relative"
                      onMouseEnter={handleMenuEnter}
                      onMouseLeave={handleMenuLeave}
                  >
                      <button 
                          onClick={() => navigateTo('services-page')}
                          className={`px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 ease-in-out text-sm font-medium flex items-center gap-1 hover:scale-105 active:scale-95 ${isServicePageActive ? 'text-orange-400 bg-white/5' : 'text-gray-300 hover:text-orange-400'}`}
                      >
                          Services
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isServicesMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                      </button>
                      <div 
                        onMouseEnter={handleMenuEnter}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-2 z-[100] transition-all duration-300 ease-out ${isServicesMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                      >
                          {services.map(service => (
                              <button 
                                  key={service.id} 
                                  onClick={() => {
                                      navigateTo(service.id);
                                      setIsServicesMenuOpen(false);
                                  }} 
                                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${currentPage === service.id ? 'bg-orange-500/20 text-orange-300' : 'text-gray-300 hover:bg-white/10 hover:text-orange-400'}`}
                              >
                                  {service.name}
                              </button>
                          ))}
                      </div>
                  </div>
                  {navLinks.slice(2).map(link => (
                    <button key={link.page} onClick={() => navigateTo(link.page)} className={`px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 ease-in-out text-sm font-medium hover:scale-105 active:scale-95 ${link.isActive ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}>{link.label}</button>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                    <button onClick={() => navigateTo('contact')} className="hidden md:block bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 ease-in-out hover:opacity-90 transform hover:scale-105 active:scale-95">
                      Contact us
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors active:scale-95" aria-label="Toggle menu">
                       <HamburgerIcon open={isMobileMenuOpen} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className="absolute inset-0 bg-black/95 backdrop-blur-xl"></div>
             <nav className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                <ul className="space-y-6">
                    {navLinks.map((link, index) => (
                        <li key={link.page} className="opacity-0" style={{ animation: isMobileMenuOpen ? `fadeInUp 0.5s ease forwards ${0.1 * index}s` : 'none' }}>
                            <button onClick={() => handleMobileNav(link.page)} className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 hover:scale-105 active:scale-95 ${link.isActive ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}>{link.label}</button>
                        </li>
                    ))}
                </ul>
                <div className="mt-12 opacity-0" style={{ animation: isMobileMenuOpen ? `fadeInUp 0.5s ease forwards 0.5s` : 'none' }}>
                    <button onClick={() => handleMobileNav('contact')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 ease-in-out hover:opacity-90 transform hover:scale-105 active:scale-95">
                        Contact us
                    </button>
                </div>
             </nav>
        </div>
      </>
    );
  };

const Hero = ({ navigateTo, currentPage }: NavigationProps) => (
    <section className="text-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight opacity-0 animate-fade-in-up">
            Every Concept Needs 
            <SparkleIcon />
            <br />
            the Right Touch.
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-400">
            <button onClick={() => navigateTo('contact')} className="group flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(238,155,123,0.5)] transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transform hover:scale-105 active:scale-95">
                Get a Quote
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <button onClick={() => navigateTo('services-page')} className="bg-transparent border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all ease-in-out duration-300 transform hover:scale-105 hover:bg-white/10 active:scale-95">
                View Our Work
            </button>
        </div>
        <div className="mt-8 flex items-center justify-center opacity-0 animate-fade-in-up animation-delay-600">
            <div className="flex -space-x-4">
                <OptimizedImage 
                    src="/assets/images/clients/clients_1.jpeg" 
                    alt="client 1" 
                    className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover"
                    width={40}
                    height={40}
                    loading="eager"
                    fetchpriority="high"
                />
                <OptimizedImage 
                    src="/assets/images/clients/clients_2.jpeg" 
                    alt="client 2" 
                    className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover"
                    width={40}
                    height={40}
                    loading="eager"
                    fetchpriority="high"
                />
                <OptimizedImage 
                    src="/assets/images/clients/clients_3.jpeg" 
                    alt="client 3" 
                    className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover"
                    width={40}
                    height={40}
                    loading="eager"
                    fetchpriority="high"
                />
            </div>
            <p className="ml-4 text-gray-300 text-sm">500+ Happy customers</p>
        </div>
    </section>
);


const VideoPlayer = ({ videoClassName, objectFitClass, src, poster }: { videoClassName?: string; objectFitClass?: string; src?: string; poster?: string; }) => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [isPlaying, setIsPlaying] = useState(false);
    // FIX: 'u' is not defined. Replaced with 'useRef'.
    const videoRef = useRef<HTMLVideoElement>(null);
    // FIX: 'u' is not defined. Replaced with 'useRef'.
    const containerRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };
    
    const toggleFullScreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // FIX: 'c' is not defined. Replaced with 'useEffect'.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer group bg-black"
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                className={`w-full h-full ${objectFitClass || 'object-cover'} ${videoClassName || 'aspect-video'}`}
                src={src || "/assets/images/testimonials/testi.mp4"}
                poster={poster}
                loop
                playsInline
                preload="metadata"
            >
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className={`w-20 h-20 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out ${isPlaying ? 'opacity-0 scale-150' : 'opacity-100 scale-100 group-hover:scale-110'}`}>
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                </div>
            </div>
            <div className="absolute bottom-6 left-6">
                <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                >
                    {isPlaying ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                            <span>Pause</span>
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"></path></svg>
                            <span>Play</span>
                        </>
                    )}
                </button>
            </div>
            <div className="absolute bottom-6 right-6">
                <button
                    onClick={toggleFullScreen}
                    className="bg-black/50 backdrop-blur-sm text-white p-2.5 rounded-full flex items-center justify-center border border-white/20 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                    aria-label="Toggle fullscreen"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                </button>
            </div>
        </div>
    );
};

const ServicesSection = ({ navigateTo, currentPage }: NavigationProps) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Our Expertise</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                Services We Master
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-base sm:text-lg">
                From pixel-perfect designs to cinematic video edits, we offer a comprehensive suite of creative services to elevate your brand's digital presence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {services.map((service, index) => (
                    <AnimatedWrapper key={service.id} index={index}>
                        <button 
                            onClick={() => navigateTo(service.id)} 
                            className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center w-full h-full transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#3a2a24] hover:shadow-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <div className="text-orange-400 mb-4 transition-all duration-300 ease-in-out group-hover:text-orange-300 group-hover:scale-105 group-hover:-rotate-3">
                                <ServiceIcon name={service.iconName} className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl text-white">{service.name}</h3>
                        </button>
                    </AnimatedWrapper>
                ))}
            </div>
        </div>
    </section>
);

const teamMembers = [
    { name: 'Tayyab', role: 'Founder & VFX Artist', description: "A creative force behind the scenes, Tayyab's expertise in visual effects brings an extraordinary edge to every project." },
    { name: 'Ali', role: 'Co-Founder & Lead Editor', description: "With a keen eye for detail and a passion for editing, Ali ensures each project flows seamlessly, delivering top-tier results." },
    { name: 'Ahmed', role: 'Project Manager', description: "The glue that holds everything together, Ahmed coordinates timelines, resources, and communication for every project, ensuring smooth execution." },
    { name: 'Gulsher', role: 'Senior Video Editor', description: "A master of editing, Gulsher brings your footage to life, creating stunning visuals and a cohesive narrative." },
    { name: 'Khalid', role: 'Lead Web Developer', description: "With a strong background in development, Khalid ensures that every website we create is responsive, functional, and aesthetically pleasing." },
    { name: 'Maaz', role: 'Specialist Pixel Artist', description: "Maaz's pixel art expertise adds a unique charm to projects, from games to branding, with striking designs that stand out." },
    { name: 'Taimoor', role: 'Head of Clipping Services', description: "Taimoor leads the clipping team, turning raw footage into impactful highlights that tell your story effectively." },
    { name: 'Akemi', role: 'Lead Digital Illustrator', description: "Akemi brings stories to life through her illustrations, adding depth and visual appeal to each project she touches." },
];

const TeamSection = () => (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-base sm:text-lg">
                We are a group of passionate creatives, each bringing unique expertise and vision to every project. Meet the talented individuals behind Phyrux Commissions who help turn your ideas into reality:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {teamMembers.map((member, index) => (
                    <AnimatedWrapper key={index} index={index}>
                        <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl h-full flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#2a201c] hover:shadow-2xl hover:shadow-orange-500/10">
                            <h3 className="font-bold text-xl text-orange-400">{member.name}</h3>
                            <p className="text-sm text-gray-300 font-semibold mt-1">{member.role}</p>
                            <p className="text-gray-400 mt-4 text-sm leading-relaxed">{member.description}</p>
                        </div>
                    </AnimatedWrapper>
                ))}
            </div>
        </div>
    </section>
);

const testimonialsCol1 = [
    '/assets/images/testimonials/1.png',
    '/assets/images/testimonials/2.png',
    '/assets/images/testimonials/3.png',
    '/assets/images/testimonials/4.png',
];

const testimonialsCol2 = [
    '/assets/images/testimonials/5.png',
    '/assets/images/testimonials/6.png',
    '/assets/images/testimonials/7.png',
    '/assets/images/testimonials/8.png',
];

const TestimonialsSection = () => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Testimonials</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                What Our Valued Clients
                <br />
                Are Saying
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                Real feedback from real partners. We're proud to share the success stories of those we've worked with.
            </p>
        </div>
        <div className="relative max-w-5xl mx-auto h-[500px] sm:h-[600px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="absolute inset-0 flex items-start justify-center gap-8">
                {/* Column 1 */}
                <div className="flex flex-col gap-8 w-[300px] md:w-[400px] animate-scroll-up">
                    {[...testimonialsCol1, ...testimonialsCol1].map((src, index) => (
                        <OptimizedImage
                            loading="lazy"
                            key={`col1-${index}`}
                            src={src} 
                            alt={`Testimonial screenshot ${index + 1}`} 
                            className="w-full rounded-2xl shadow-xl shadow-black/40 object-cover -rotate-2"
                            width={400}
                            height={300}
                        />
                    ))}
                </div>
                {/* Column 2 */}
                <div className="hidden md:flex flex-col gap-8 w-[300px] md:w-[400px] animate-scroll-down">
                    {[...testimonialsCol2, ...testimonialsCol2].map((src, index) => (
                        <OptimizedImage
                            loading="lazy"
                            key={`col2-${index}`}
                            src={src} 
                            alt={`Testimonial screenshot ${index + testimonialsCol1.length + 1}`} 
                            className="w-full rounded-2xl shadow-xl shadow-black/40 object-cover rotate-2"
                            width={400}
                            height={300}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);


const techLogos = [
    { name: 'Premiere Pro', logo: '/assets/images/logos/premiere-pro-logo.svg', size: 'w-16 h-16' },
    { name: 'After Effects', logo: '/assets/images/logos/after-effects-logo.svg', size: 'w-16 h-16' },
    { name: 'Photoshop', logo: '/assets/images/logos/photoshop-logo.svg', size: 'w-16 h-16' },
    { name: 'Illustrator', logo: '/assets/images/logos/illustrator-logo.svg', size: 'w-16 h-16' },
    { name: 'Figma', logo: '/assets/images/logos/figma-logo.svg', size: 'w-14 h-14' },
    { name: 'React', logo: '/assets/images/logos/react-logo.svg', size: 'w-14 h-14' },
    { name: 'Next.js', logo: '/assets/images/logos/next-js-logo.svg', size: 'w-14 h-14' },
    { name: 'Tailwind CSS', logo: '/assets/images/logos/tailwind-logo.svg', size: 'w-14 h-14' },
    { name: 'JavaScript', logo: '/assets/images/logos/javascript-logo.svg', size: 'w-12 h-12' },
];

const TechMarquee = () => (
    <section className="py-12 bg-black/20 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Our Toolkit</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Powered by Industry-Leading Tools
            </h2>
        </div>
        <div className="relative w-full overflow-hidden py-4">
            {/* Gradient masks on the sides */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none"></div>
            
            <div className="group flex animate-marquee-fast space-x-8 flex-shrink-0 items-center">
                {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
                    <div key={index} className="group/item flex flex-col items-center justify-center gap-3 text-center cursor-pointer min-w-[120px] flex-shrink-0">
                        <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:border-orange-500/30 p-5">
                            <img 
                                src={tech.logo} 
                                alt={tech.name}
                                className={`${tech.size} object-contain`}
                                loading="lazy"
                            />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap transition-colors duration-300 group-hover/item:text-white">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const storyEvents = [
  { year: '2020', title: 'Genesis Spark', description: 'Phyrux Commissions was founded with a passion for digital art and gaming aesthetics, starting with small commissions.' },
  { year: '2021', title: 'Service Expansion', description: 'Expanded our services to include video editing and graphic design, attracting a wider range of clients.' },
  { year: '2022', title: 'Studio Establishment', description: 'Officially established a small, dedicated team and moved into our first creative studio space.' },
  { year: '2023', title: 'Future Forged', description: 'Launched our new brand identity and futuristic website, marking a new era of high-end creative solutions.' },
];

const AboutUsPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const aboutServices = [
        { title: 'Video Editing & Clipping', description: 'We craft engaging, high-impact video content that captures attention and drives engagement.' },
        { title: 'Graphic Design', description: 'From logos to full brand identities, our designs are tailored to elevate your visual presence.' },
        { title: 'Digital Art', description: 'Our custom digital art brings your ideas to life with a unique and captivating visual style.' },
        { title: 'Website Development', description: 'We build responsive, user-friendly websites designed to perform and impress.' },
        { title: 'Pixel Art', description: 'Whether for games, branding, or projects, our pixel art adds a nostalgic yet modern touch to your designs.' }
    ];

    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            {/* Section 1: About Us Introduction */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
                        About Us
                    </h1>
                    <p className="mx-auto text-gray-400 mb-12 text-base sm:text-lg leading-relaxed">
                        Welcome to Phyrux Commissions, where creativity meets professionalism. We are a dynamic creative services group, driven by a passion for producing high-quality content that helps brands, creators, and businesses stand out in the digital world.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base">
                    <div>
                        <p>At Phyrux Commissions, we offer a diverse range of services to cater to your unique needs, including:</p>
                        <ul className="mt-6 space-y-4">
                            {aboutServices.map(service => (
                                <ServiceFeature key={service.title} title={service.title} description={service.description} />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p>Our team is passionate about collaboration, and we pride ourselves on being more than just service providers — we are partners in your creative journey. We listen to your ideas, understand your goals, and deliver the perfect blend of artistry and technical expertise to make your vision a reality.</p>
                    </div>
                    <div>
                        <p>Whether you’re a growing brand, a seasoned creator, or a business looking to enhance your digital footprint, Phyrux Commissions is here to bring your ideas to life. Let’s create something amazing together.</p>
                    </div>
                </div>
            </section>
    
            {/* Separator */}
            <div className="py-10">
                <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
            </div>
    
            {/* Section 2: Our Story */}
            <section className="py-12 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
                        Our Story
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-400 mb-20 text-base sm:text-lg">
                        Born from a shared passion for gaming culture and cutting-edge design, Phyrux Commissions is more than just a studio — it’s an arsenal of creativity. We empower brands with the visual power to dominate their digital landscapes.
                    </p>
                    <div className="relative">
                        <div className="hidden md:block">
                            <div className="absolute left-1/2 top-2 bottom-2 w-0.5 bg-white/10 -translate-x-1/2" aria-hidden="true"></div>
                            {storyEvents.map((event, index) => (
                                <div key={index} className="mb-12 flex justify-between items-center w-full">
                                    <div className="w-5/12">
                                        {index % 2 === 0 && (
                                            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg shadow-black/30 text-left">
                                                <p className="text-orange-400 font-bold text-sm mb-1">{event.year}</p>
                                                <h3 className="font-bold text-xl text-white mb-2">{event.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="z-10">
                                        <div className="w-5 h-5 bg-[#0D0D0D] rounded-full border-2 border-orange-400 ring-4 ring-[#0D0D0D]"></div>
                                    </div>
                                    <div className="w-5/12">
                                        {index % 2 !== 0 && (
                                             <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg shadow-black/30 text-left">
                                                <p className="text-orange-400 font-bold text-sm mb-1">{event.year}</p>
                                                <h3 className="font-bold text-xl text-white mb-2">{event.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="md:hidden relative">
                            <div className="absolute top-2 left-2 bottom-2 w-0.5 bg-white/10" aria-hidden="true"></div>
                            <div className="space-y-8">
                                {storyEvents.map((event) => (
                                    <div key={event.year} className="pl-10 relative">
                                        <div className="absolute top-1 left-0 w-5 h-5 bg-[#0D0D0D] rounded-full border-2 border-orange-400 ring-4 ring-[#0D0D0D]"></div>
                                        <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg shadow-black/30 text-left flex-grow">
                                            <p className="text-orange-400 font-bold text-sm mb-1">{event.year}</p>
                                            <h3 className="font-bold text-xl text-white mb-2">{event.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

type FAQItemProps = { question: string; answer: string; defaultOpen?: boolean; };

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, defaultOpen = false }) => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentId = `faq-content-${question.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="bg-[#1C1C1C] rounded-2xl">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center text-left p-6 gap-4 transition-transform duration-200 active:scale-95"
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <h3 className="font-semibold text-white text-base md:text-lg flex-1">{question}</h3>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white transition-transform duration-300 ease-in-out" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    {isOpen ? <CloseIcon /> : <PlusIcon />}
                </div>
            </button>
            <div 
                id={contentId}
                className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-400 pb-6 px-6">{answer}</p>
                </div>
            </div>
        </div>
    );
};


const FAQPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const faqs = [
        { q: "What services do you offer?", a: "At Phyrux Commissions, we provide a wide range of services including video editing, clipping, graphic design, digital art, website development, and pixel art. We tailor each service to your specific needs to help bring your vision to life." },
        { q: "Do you offer custom graphic designs for branding?", a: "Yes! Whether you need a logo, a complete brand identity, or marketing collateral, our graphic design team works closely with you to create visuals that perfectly represent your brand." },
        { q: "Can you help with website development?", a: "Absolutely! Our website development services are focused on creating responsive, user-friendly websites that are optimized for performance. We’ll work with you from start to finish to ensure your site meets your needs." },
        { q: "Do you create digital art for video games or apps?", a: "Yes, we specialize in digital art tailored to the gaming and tech industries. Whether it's character designs, environment art, or assets for apps and games, we can bring your project to life with stunning visuals." },
        { q: "Do you do pixel art for games or projects?", a: "Yes, we offer pixel art services, whether for game development, branding, or creative projects. Our pixel art adds both nostalgia and modern flair, making your design stand out." },
        { q: "How do I collaborate with you on my project?", a: "Starting a project with us is simple! You can book a free consultation through our website or contact us directly. We’ll discuss your needs and create a personalized plan for your project." },
        { q: "How do you ensure the quality of your work?", a: "We take pride in delivering top-tier work. For every service, we involve you in the creative process through regular updates and revisions to ensure the final result aligns with your vision. Quality is key in everything we do." },
        
    ];

    return (
        <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                {/* Left Column */}
                <div className="lg:col-span-2 lg:sticky lg:top-8">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        <p className="font-semibold text-gray-300 uppercase tracking-widest text-sm">FAQ</p>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-4">
                        Frequently Asked Questions
                    </h1>
                    <div className="mt-12 bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                         <div>
                            <h2 className="font-bold text-2xl text-white">Still have questions?</h2>
                            <p className="text-gray-400 mt-1">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                         </div>
                         <button onClick={() => navigateTo('contact')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out hover:opacity-90 transform hover:scale-105 active:scale-95 flex-shrink-0">
                            Get in Touch
                         </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-3 space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index} 
                            question={faq.q} 
                            answer={faq.a}
                            defaultOpen={index === 0} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


type SocialIconProps = {
    href: string;
    children?: React.ReactNode;
};

function SocialIcon({ href, children, ariaLabel }: SocialIconProps & { ariaLabel?: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-gray-300 transition-transform duration-300 ease-in-out active:scale-95"
            aria-label={ariaLabel || "Social media link"}
        >
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 ease-in-out transform group-hover:scale-110">
                 {children}
            </div>
        </a>
    );
}

const Footer = ({ navigateTo, currentPage }: NavigationProps) => {
    return (
        <footer className="bg-transparent border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Brand Info */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start mb-4">
                            <span className="font-bold text-xl text-orange-400 tracking-wider">
                                Phyrux Commissions
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto lg:mx-0">
                           Phyrux Commissions is a creative services group dedicated to bringing your ideas to life across multiple platforms. We specialize in a wide range of digital services, including video editing, clipping, graphic design, digital art, website development, and pixel art. Our goal is to help brands, creators, and businesses create compelling and professional content that resonates with their audience. With a focus on quality, creativity, and innovation, we’re here to turn your visions into polished, impactful digital experiences.
                        </p>
                    </div>

                    {/* Middle Columns: Links */}
                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-2 gap-8 text-center sm:text-left">
                        <div>
                            <h3 className="font-bold text-white mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                <li><button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">Home</button></li>
                                <li><button onClick={() => navigateTo('services-page')} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">Services</button></li>
                                <li><button onClick={() => navigateTo('about-us')} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">About Us</button></li>
                                <li><button onClick={() => navigateTo('faqs')} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">FAQs</button></li>
                                <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">Contact</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Our Services</h3>
                            <ul className="space-y-2">
                                {services.slice(0, 5).map(item => (
                                    <li key={item.id}><button onClick={() => navigateTo(item.id)} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">{item.name}</button></li>
                                ))}
                                <li><button onClick={() => navigateTo('services-page')} className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">View All...</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Socials */}
                    <div className="lg:col-span-3 text-center lg:text-left">
                        <h3 className="font-bold text-white mb-4">Connect</h3>
                        <div className="flex justify-center lg:justify-start space-x-4">
                           <SocialIcon href="https://www.instagram.com/phyruxvisuals/">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://discord.gg/sVZeyGQm">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://wa.me/923167741677">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                               </svg>
                           </SocialIcon>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm mb-1">Email Us</p>
                            <a href="mailto:tezurect82@gmail.com" className="font-semibold text-white hover:text-orange-400 text-sm transition-all duration-300 ease-in-out inline-flex items-center gap-2 active:scale-95" aria-label="Email us at tezurect82@gmail.com">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>tezurect82@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Phyrux Commissions. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};


const HomePage = ({ navigateTo, currentPage }: NavigationProps) => (
    <>
        <Hero navigateTo={navigateTo} currentPage={currentPage} />
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
                <VideoPlayer />
            </div>
        </section>
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <ServicesSection navigateTo={navigateTo} currentPage={currentPage} />
        <TechMarquee />
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <TeamSection />
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <TestimonialsSection />
    </>
);

const videoEditingProjects = [
    { 
        title: 'Game Edits', 
        videos: [
            { youtubeUrl: 'https://www.youtube.com/embed/Q5lbZSVtWgg', thumbnailUrl: 'https://img.youtube.com/vi/Q5lbZSVtWgg/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/ZYXAwpFwYZg', thumbnailUrl: 'https://img.youtube.com/vi/ZYXAwpFwYZg/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/uB_FoLAbl_Y', thumbnailUrl: 'https://img.youtube.com/vi/uB_FoLAbl_Y/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/JYxUk0GAYuA', thumbnailUrl: 'https://img.youtube.com/vi/JYxUk0GAYuA/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/BAjHWsoi5QM', thumbnailUrl: 'https://img.youtube.com/vi/BAjHWsoi5QM/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/XnYnoA5K-no', thumbnailUrl: 'https://img.youtube.com/vi/XnYnoA5K-no/maxresdefault.jpg' }
        ]
    },
    { 
        title: 'Intro & Trailer Videos', 
        videos: [
            { youtubeUrl: 'https://www.youtube.com/embed/xGQdrj2H71I', thumbnailUrl: 'https://img.youtube.com/vi/xGQdrj2H71I/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/-4pA9gfESr4', thumbnailUrl: 'https://img.youtube.com/vi/-4pA9gfESr4/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/3VA-lDK-q1g', thumbnailUrl: 'https://img.youtube.com/vi/3VA-lDK-q1g/maxresdefault.jpg' }
        ]
    },
    { 
        title: 'Long Form Videos', 
        videos: [
            { youtubeUrl: 'https://www.youtube.com/embed/qnCM7eN7_K0', thumbnailUrl: 'https://img.youtube.com/vi/qnCM7eN7_K0/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/lJ9VBCLGO5k', thumbnailUrl: 'https://img.youtube.com/vi/lJ9VBCLGO5k/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/s-TMdVtmlEg', thumbnailUrl: 'https://img.youtube.com/vi/s-TMdVtmlEg/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/jBnngqZsgCE', thumbnailUrl: 'https://img.youtube.com/vi/jBnngqZsgCE/maxresdefault.jpg' },
            { youtubeUrl: 'https://www.youtube.com/embed/poSULb6V6xo', thumbnailUrl: 'https://img.youtube.com/vi/poSULb6V6xo/maxresdefault.jpg' }
        ]
    },
    { 
        title: 'Short Form Content', 
        videos: [
            { youtubeUrl: 'https://www.youtube.com/embed/Ov8NAkvqvDs', thumbnailUrl: 'https://img.youtube.com/vi/Ov8NAkvqvDs/maxresdefault.jpg', isShortForm: true },
            { youtubeUrl: 'https://www.youtube.com/embed/ZFF0P7DTtaY', thumbnailUrl: 'https://img.youtube.com/vi/ZFF0P7DTtaY/maxresdefault.jpg', isShortForm: true }
        ]
    },
    { 
        title: 'Short Form Content', 
        videos: [
            { youtubeUrl: 'https://www.youtube.com/embed/wsmtgCcbR98', thumbnailUrl: 'https://img.youtube.com/vi/wsmtgCcbR98/maxresdefault.jpg', isShortForm: true },
            { youtubeUrl: 'https://www.youtube.com/embed/XnhUIs6VYqY', thumbnailUrl: 'https://img.youtube.com/vi/XnhUIs6VYqY/maxresdefault.jpg', isShortForm: true },
            { youtubeUrl: 'https://www.youtube.com/embed/amXiPM_tI2A', thumbnailUrl: 'https://img.youtube.com/vi/amXiPM_tI2A/maxresdefault.jpg', isShortForm: true }
        ]
    },
];

const webDevProjects = [
    { 
        title: 'Business Landing Page', 
        description: 'A modern landing page designed for businesses to showcase their services and solutions.', 
        images: ['/assets/images/web-dev/flexdrop.png'],
        url: 'https://flexdrop.netlify.app/'
    },
    { 
        title: 'POS System for Restaurant', 
        description: 'A comprehensive point-of-sale system built for restaurant management and operations.', 
        images: ['/assets/images/web-dev/pos-system.png'],
        url: 'https://system-pos.netlify.app/'
    },
    { 
        title: 'Professional Landing Page', 
        description: 'A sleek single-page website with professional design and smooth user experience.', 
        images: ['/assets/images/web-dev/cobaalt.png'],
        url: 'https://cobaalt.netlify.app/'
    },
    { 
        title: 'Creative Agency Portfolio', 
        description: 'A stunning portfolio website showcasing creative agency services and projects.', 
        images: ['/assets/images/web-dev/phyrux.png'],
        url: 'https://phyrux.netlify.app/'
    },
];

const pixelArtProjects = [
    {
        title: 'Buildings',
        images: [
            '/assets/images/pixel-art/Buildings/b1.png',
            '/assets/images/pixel-art/Buildings/b2.png',
            '/assets/images/pixel-art/Buildings/b3.png',
        ],
    },
    {
        title: 'Canvas Pixel Art',
        images: [
            '/assets/images/pixel-art/Canvas Pixel Art/p5.png',
        ],
    },
    {
        title: 'Character Pixel Art & Design',
        images: [
            '/assets/images/pixel-art/Character Pixel Art & Design/Ch-an.gif',
            '/assets/images/pixel-art/Character Pixel Art & Design/ch-sp.png',
        ],
    },
    {
        title: 'Layer by layer (Level design)',
        images: [
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 11.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 1.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 2.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 3.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 4.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 5.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 6.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 7.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 8.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 9.png',
            '/assets/images/pixel-art/Layer by layer (Level design)/Layer 10.png',
        ],
    },
    {
        title: 'Overall art and design',
        images: [
            '/assets/images/pixel-art/Overall art and design/Character-concept-design.png',
            '/assets/images/pixel-art/Overall art and design/character-design.png',
            '/assets/images/pixel-art/Overall art and design/Game-cover-arts.png',
            '/assets/images/pixel-art/Overall art and design/Splash-art.png',
        ],
      },
];
  
const graphicsDesignProjects = [
    { 
        title: 'Social Media Banners',
        images: [
            '/assets/images/graphic designing/socialmedia_banner (1).jpeg',
            '/assets/images/graphic designing/socialmedia_banner (1).jpg',
            '/assets/images/graphic designing/socialmedia_banner (1).png',
            '/assets/images/graphic designing/socialmedia_banner (2).jpeg',
        ]
    },
    { 
        title: 'YouTube Thumbnails',
        images: [
            '/assets/images/graphic designing/yt_thumb (1).jpeg',
            '/assets/images/graphic designing/yt_thumb (1).jpg',
            '/assets/images/graphic designing/yt_thumb (2).jpeg',
            '/assets/images/graphic designing/yt_thumb (2).jpg',
            '/assets/images/graphic designing/yt_thumb (3).jpeg',
            '/assets/images/graphic designing/yt_thumb (4).jpeg',
            '/assets/images/graphic designing/yt_thumb (5).jpeg',
            '/assets/images/graphic designing/yt_thumb (6).jpeg',
            '/assets/images/graphic designing/yt_thumb (7).jpeg',
        ]
    },
    { 
        title: 'Cosplay Edits',
        images: [
            '/assets/images/graphic designing/cosplay_edit (1).jpeg',
            '/assets/images/graphic designing/cosplay_edit (2).jpeg',
            '/assets/images/graphic designing/cosplay_edit (3).jpeg',
        ]
    },
    { 
        title: 'Social Media Posts',
        images: [
            '/assets/images/graphic designing/post_1 (2).jpeg',
            '/assets/images/graphic designing/post_1 (6).jpeg',
            '/assets/images/graphic designing/post_1 (3).jpeg',
            '/assets/images/graphic designing/post_1 (4).jpeg',
            '/assets/images/graphic designing/post_1 (1).jpeg',
            '/assets/images/graphic designing/post_1 (5).jpeg',
            '/assets/images/graphic designing/post_1 (7).jpeg',
        ]
    }
];

const digitalArtProjects = [
    { 
        title: 'Anime Art Collection',
        images: [
            '/assets/images/digital art/anime_art.jpeg',
            '/assets/images/digital art/anime_art2.png',
            '/assets/images/digital art/anime_art3.webp',
        ]
    },
    { 
        title: 'Character Design',
        images: [
            '/assets/images/digital art/Character_design (3).png',
            '/assets/images/digital art/Character_design (2).png',
            '/assets/images/digital art/Character_design (1).png',
        ]
    },
    { 
        title: 'Emotes Collection',
        images: [
            '/assets/images/digital art/emotes_1.png',
            '/assets/images/digital art/emotes_2.png',
        ]
    },
    { 
        title: 'Anime Styled Animations',
        images: [
            '/assets/images/digital art/anime_styled_animations (1).mp4',
        ]
    }
];

const useImageLoader = () => {
    const [loadedIndices, setLoadedIndices] = useState<number[]>([]);
    const handleLoad = (index: number) => {
        setLoadedIndices(prev => {
            if (prev.includes(index)) return prev;
            return [...prev, index];
        });
    };
    return { loadedIndices, handleLoad };
};

type ProjectCardProps = {
    project: {
        title: string;
        images: string[];
        description?: string;
        url?: string;
    };
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);

    useEffect(() => {
        const newLoaded: number[] = [];
        project.images.forEach((_, index) => {
            const img = new Image();
            img.src = project.images[index];
            if (img.complete) {
                newLoaded.push(index);
            }
        });
        if (newLoaded.length > 0) handleLoad(newLoaded[0]);
    }, [project]);

    const nextImage = (e: React.MouseEvent) => {
        if (!project.url && project.images.length > 1) {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % project.images.length);
        }
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95 group">
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/3] overflow-hidden rounded-lg bg-[#111] group-hover:cursor-pointer"
                onClick={nextImage}
            >
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {project.images.map((src, index) => {
                    const getExtension = (path: string) => {
                        const ext = path.match(/\.(jpeg|jpg|png|webp)$/i);
                        return ext ? ext[1].toLowerCase() : 'jpeg';
                    };
                    
                    const originalExt = getExtension(src);
                    const basePath = src.replace(/\.(jpeg|jpg|png|webp)$/i, '');
                    const webpSrc = `${basePath}.webp`;
                    const fallbackSrc = originalExt === 'webp' ? `${basePath}.jpeg` : src;
                    
                    return (
                        <picture key={index}>
                            <source srcSet={webpSrc} type="image/webp" />
                            <img
                                loading="lazy"
                                src={fallbackSrc}
                                alt={`${project.title} preview ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
                                onLoad={() => handleLoad(index)}
                                onError={(e) => {
                                    handleLoad(index);
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; 
                                    target.src = 'https://i.imgur.com/8rqwdLX.png';
                                }}
                                decoding="async"
                            />
                        </picture>
                    );
                })}
                {project.url && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <span className="flex items-center gap-2 text-white font-semibold border-2 border-white/50 rounded-full px-5 py-2.5 transform group-hover:scale-105 transition-transform bg-black/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                               <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            <span>Visit Site</span>
                        </span>
                    </div>
                )}
            </a>
            <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>
            {project.description && (
                <p className="text-sm text-gray-400 mt-2">{project.description}</p>
            )}
            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-white/20 hover:border-orange-500 text-gray-300 hover:text-orange-500 font-semibold rounded-lg transition-all duration-300 hover:bg-orange-500/10 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Visit Website
                </a>
            )}
        </div>
    );
};

const PixelArtProjectCard: React.FC<{ project: { title: string; images: string[] } }> = ({ project }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Intersection observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Preload next and previous images
    useEffect(() => {
        if (isVisible) {
            const nextIndex = (currentIndex + 1) % project.images.length;
            const prevIndex = (currentIndex - 1 + project.images.length) % project.images.length;
            
            [nextIndex, prevIndex].forEach(idx => {
                const img = new Image();
                img.src = project.images[idx];
            });
        }
    }, [currentIndex, isVisible, project.images]);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
    };

    return (
        <div ref={cardRef} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95">
            <div className="relative group aspect-video overflow-hidden rounded-lg bg-[#111]">
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {isVisible && project.images.map((src, index) => {
                    const getExtension = (path: string) => {
                        const ext = path.match(/\.(jpeg|jpg|png|webp)$/i);
                        return ext ? ext[1].toLowerCase() : 'jpeg';
                    };
                    
                    const originalExt = getExtension(src);
                    const basePath = src.replace(/\.(jpeg|jpg|png|webp)$/i, '');
                    const webpSrc = `${basePath}.webp`;
                    const fallbackSrc = originalExt === 'webp' ? `${basePath}.jpeg` : src;
                    
                    return (
                        <picture key={index}>
                            <source srcSet={webpSrc} type="image/webp" />
                            <img
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                fetchpriority={index === 0 ? "high" : "low"}
                                src={fallbackSrc}
                                alt={`${project.title} preview ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
                                onLoad={() => handleLoad(index)}
                                onError={(e) => {
                                    handleLoad(index);
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; 
                                    target.src = 'https://i.imgur.com/8rqwdLX.png';
                                }}
                            />
                        </picture>
                    );
                })}
                
                {project.images.length > 1 && (
                    <>
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                            {currentIndex + 1} / {project.images.length}
                        </div>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
            <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>
        </div>
    );
};

const MixedMediaSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);

    // Intersection observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (mediaRef.current) {
            observer.observe(mediaRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Preload next and previous media
    useEffect(() => {
        if (isVisible) {
            const nextIndex = (currentIndex + 1) % images.length;
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            
            [nextIndex, prevIndex].forEach(idx => {
                const src = images[idx];
                if (!isVideo(src)) {
                    const img = new Image();
                    img.src = src;
                }
            });
        }
    }, [currentIndex, isVisible, images]);

    const prevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsPlaying(false);
    };

    const nextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsPlaying(false);
    };

    const isVideo = (src: string) => {
        return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mov');
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const seekTime = parseFloat(e.target.value);
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const seekForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const seekBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        
        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    const handleVideoLoad = () => {
        handleLoad(currentIndex);
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
    };

    const handleVideoError = () => {
        handleLoad(currentIndex);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Add fullscreen change listener
    React.useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const currentSrc = images[currentIndex];
    const isCurrentVideo = isVideo(currentSrc);

    return (
        <div 
            ref={mediaRef}
            className="relative group aspect-video overflow-hidden rounded-lg bg-[#111] cursor-pointer"
        >
            <div 
                ref={containerRef}
                className="relative w-full h-full"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {isVisible && images.map((src, index) => (
                    <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}>
                        {isVideo(src) ? (
                            <video
                                ref={index === currentIndex ? videoRef : null}
                                className="w-full h-full object-contain"
                                muted={isMuted}
                                loop
                                playsInline
                                preload="metadata"
                                onLoadedData={index === currentIndex ? handleVideoLoad : undefined}
                                onPlay={index === currentIndex ? handleVideoPlay : undefined}
                                onPause={index === currentIndex ? handleVideoPause : undefined}
                                onError={index === currentIndex ? handleVideoError : undefined}
                                onTimeUpdate={index === currentIndex ? handleTimeUpdate : undefined}
                                onClick={index === currentIndex ? togglePlay : undefined}
                            >
                                <source src={src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={index === 0 ? "high" : "low"}
                                src={src}
                                alt={`Media sample ${index + 1}`}
                                className="w-full h-full object-contain"
                                onLoad={() => handleLoad(index)}
                                onError={(e) => {
                                    handleLoad(index);
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; 
                                    target.src = 'https://i.imgur.com/8rqwdLX.png';
                                }}
                            />
                        )}
                    </div>
                ))}
            
            {/* Enhanced Video Controls */}
            {isCurrentVideo && (
                <>
                    {/* Video Play/Pause Overlay */}
                    <div 
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onClick={togglePlay}
                    >
                        <div className={`w-20 h-20 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${isPlaying ? 'scale-75 opacity-50' : 'scale-100 opacity-100 group-hover:scale-110 group-hover:bg-orange-500'}`}>
                            {isPlaying ? (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                </svg>
                            ) : (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Video Control Bar */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                                }}
                            />
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {/* Play/Pause */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    {isPlaying ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )}
                                </button>

                                {/* Seek Backward */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); seekBackward(); }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                                    </svg>
                                </button>

                                {/* Seek Forward */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); seekForward(); }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z"/>
                                    </svg>
                                </button>

                                {/* Mute/Unmute */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    {isMuted ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                        </svg>
                                    )}
                                </button>

                                {/* Time Display */}
                                <span className="text-white text-sm font-medium">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                {/* Fullscreen */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    {isFullscreen ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            {/* Navigation Controls */}
            {images.length > 1 && (
                <>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <button
                        onClick={prevMedia}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-black/80 z-10 active:scale-95 ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-50 md:group-hover:opacity-100'}`}
                        aria-label="Previous media"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={nextMedia}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-black/80 z-10 active:scale-95 ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-50 md:group-hover:opacity-100'}`}
                        aria-label="Next media"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </>
            )}

            {/* Video Type Indicator */}
            {isCurrentVideo && (
                <div className="absolute top-2 left-2 bg-orange-500/80 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                    VIDEO
                </div>
            )}
            </div>
        </div>
    );
};

const GraphicProjectSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);
    const [isVisible, setIsVisible] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Intersection observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );

        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Preload next and previous images
    useEffect(() => {
        if (isVisible) {
            const nextIndex = (currentIndex + 1) % images.length;
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            
            [nextIndex, prevIndex].forEach(idx => {
                const img = new Image();
                img.src = images[idx];
            });
        }
    }, [currentIndex, isVisible, images]);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div ref={sliderRef} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
            <div className="relative group aspect-video overflow-hidden rounded-lg bg-[#111]">
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {isVisible && images.map((src, index) => (
                    <img
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "low"}
                        key={index}
                        src={src}
                        alt={`Graphic design sample ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
                        onLoad={() => handleLoad(index)}
                        onError={(e) => {
                            handleLoad(index);
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = 'https://i.imgur.com/8rqwdLX.png';
                        }}
                    />
                ))}
                
                <>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </>
            </div>
        </div>
    );
};

const useInView = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
    // FIX: 'React.a' is not a function. Replaced with 'React.useState'.
    const [isInView, setIsInView] = React.useState(false);
    // FIX: 'React.u' is not a function. Replaced with 'React.useRef'.
    const ref = React.useRef<HTMLDivElement>(null);

    // FIX: 'React.c' is not a function. Replaced with 'React.useEffect'.
    React.useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if(ref.current) {
              observer.unobserve(ref.current);
          }
        }
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [options]);

    return [ref, isInView] as const;
  };

type AnimatedWrapperProps = {
    children: React.ReactNode;
    index: number;
};

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, index }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            {children}
        </div>
    );
};

type SingleVideo = { videoUrl?: string; youtubeUrl?: string; thumbnailUrl: string; isShortForm?: boolean };
type VideoProject = { title?: string; videos: SingleVideo[] };

const VideoProjectCard: React.FC<{ project: VideoProject }> = ({ project }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInteracted, setIsInteracted] = useState(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const currentVideo = project.videos[currentVideoIndex];
    const hasMultipleVideos = project.videos.length > 1;

    const handlePlay = () => {
        if(isInteracted) return;
        setIsInteracted(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 0);
    };

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentVideoIndex((prev) => (prev - 1 + project.videos.length) % project.videos.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentVideoIndex((prev) => (prev + 1) % project.videos.length);
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95">
            <div className={`relative group ${currentVideo.isShortForm ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden rounded-lg ${!currentVideo.youtubeUrl ? 'cursor-pointer' : ''} bg-black`} onClick={!currentVideo.youtubeUrl ? handlePlay : undefined}>
                {currentVideo.youtubeUrl ? (
                    <iframe
                        src={currentVideo.youtubeUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={project.title || 'Video project'}
                    />
                ) : !isInteracted ? (
                    <>
                        {!thumbnailLoaded && <div className="absolute inset-0 animate-pulse-bg"></div>}
                        <img loading="lazy" src={currentVideo.thumbnailUrl} alt={project.title || 'Video project thumbnail'} className={`w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setThumbnailLoaded(true)} />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-16 h-16 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <video ref={videoRef} src={currentVideo.videoUrl} className="w-full h-full object-cover" controls playsInline autoPlay />
                )}
                
                {hasMultipleVideos && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 active:scale-95"
                            aria-label="Previous video"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 active:scale-95"
                            aria-label="Next video"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {project.videos.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentVideoIndex ? 'bg-orange-500 w-6' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            {project.title && (
                <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-bold text-xl text-white">{project.title}</h3>
                    {hasMultipleVideos && (
                        <span className="text-sm text-gray-400">{currentVideoIndex + 1} / {project.videos.length}</span>
                    )}
                </div>
            )}
        </div>
    );
};

// FIX: Corrected the typing for the `ServiceFeature` component to resolve errors where the `key` prop was being incorrectly validated.
const ServiceFeature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <li className="flex items-start gap-3">
        <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <span><strong>{title}:</strong> {description}</span>
    </li>
);

const VideoEditingPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const firstRowProjects = videoEditingProjects.slice(0, 3);
    const secondRowProjects = videoEditingProjects.slice(3);
    const features = [
        { title: 'Short & Long Form Edits', description: 'Tailored for any platform, from quick clips to full-length videos.' },
        { title: 'Fast Turnaround', description: 'Delivered within 1-2 days, depending on the project.' },
        { title: 'Custom Styles', description: 'We can match any editing style and create animations in After Effects.' },
        { title: 'Bulk Discounts', description: 'Get great offers on bundles and large orders.' },
    ];

    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <section className="text-center pb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Video Editing Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
                    Take your content to the next level with our expert video editing services. Whether you need short-form clips for TikTok and Instagram Reels or long-form YouTube videos, we deliver top-notch edits that fit your style. We can mimic any editing style, ensuring your videos align with your brand's vision.
                </p>
            </section>
            
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-12">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                 
                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base mb-20">
                    <div>
                        <h3 className="text-3xl font-bold text-orange-400 mb-6">Our services include:</h3>
                        <ul className="space-y-4">
                           {features.map(f => <ServiceFeature key={f.title} title={f.title} description={f.description} />)}
                        </ul>
                        <p className="mt-8">No matter the project, we’re here to make your vision a reality.</p>
                    </div>
                </div>

                 <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {firstRowProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <VideoProjectCard project={project} />
                        </AnimatedWrapper>
                    ))}
                </div>

                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:w-2/3 lg:mx-auto">
                         {secondRowProjects.map((project, index) => (
                            <AnimatedWrapper key={index + firstRowProjects.length} index={index}>
                                <VideoProjectCard project={project} />
                            </AnimatedWrapper>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const GraphicsDesigningPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const features = [
        { title: 'Social Media Graphics', description: 'Custom designs for Instagram posts, stories, and ads.' },
        { title: 'Event Promotions', description: 'Stunning event flyers, banners, and social media visuals.' },
        { title: 'Logo Design', description: "Tailored logos to reflect your brand's unique identity." },
        { title: 'Thumbnails', description: 'Attention-grabbing thumbnails for YouTube, TikTok, and more.' },
        { title: 'Other Visual Designs', description: 'Posters, digital ads, and any other design you need.' },
    ];
    
    // Preload first images
    const firstImages = graphicsDesignProjects.map(p => p.images[0]).filter(Boolean);
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <ImagePreloader images={firstImages.slice(0, 4)} />
            <section className="text-center pb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Graphic Design Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
                    Stand out with professional graphic designs that captivate and convey your message. Whether it’s social media posts, event promotions, logos, thumbnails, or any other visual content, we provide creative designs that make your brand shine.
                </p>
            </section>
            
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-12">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>

                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base mb-20">
                    <div>
                        <h3 className="text-3xl font-bold text-orange-400 mb-6">Services include:</h3>
                        <ul className="space-y-4">
                           {features.map(f => <ServiceFeature key={f.title} title={f.title} description={f.description} />)}
                        </ul>
                        <p className="mt-8">Get designs that boost your presence, engage your audience, and elevate your brand.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {graphicsDesignProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <GraphicProjectSlider images={project.images} />
                        </AnimatedWrapper>
                    ))}
                </div>
            </section>
        </div>
    );
};

const WebDevelopmentPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const features = [
        { title: 'Custom Website Design', description: 'Unique, responsive websites that adapt seamlessly to all devices.' },
        { title: 'Web Applications', description: 'Fully functional, interactive web apps built to streamline your business processes.' },
        { title: 'E-commerce Solutions', description: 'Build your online store with user-friendly interfaces, secure payments, and smooth customer experiences.' },
        { title: 'SEO & Performance Optimization', description: 'Websites designed to perform fast and rank well on search engines.' },
        { title: 'Content Management Systems (CMS)', description: 'Easy-to-use backends, enabling you to manage content without technical knowledge.' },
    ];

    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <section className="text-center pb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Web Development Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
                    Transform your online presence with custom web development solutions tailored to your needs. From sleek, modern websites to robust web applications, we handle it all, ensuring your site is not only visually appealing but also functional and user-friendly.
                </p>
            </section>
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-12">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                
                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base mb-20">
                    <div>
                        <h3 className="text-3xl font-bold text-orange-400 mb-6">Services include:</h3>
                        <ul className="space-y-4">
                           {features.map(f => <ServiceFeature key={f.title} title={f.title} description={f.description} />)}
                        </ul>
                        <p className="mt-8">Let us help you create a website that not only looks great but works perfectly for your business.</p>
                    </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {webDevProjects.map((project, index) => (
                         <AnimatedWrapper key={index} index={index}>
                            <ProjectCard project={project} />
                         </AnimatedWrapper>
                    ))}
                </div>
            </section>
        </div>
    );
};

const DigitalArtPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const features = [
        { title: 'Character & Environment Concept Art', description: 'Stunning designs for characters and environments in anime, semi-realistic, and other creative styles.' },
        { title: 'Emotes & GIF Animations', description: 'Expressive emotes and animated GIFs that bring personality to your brand or character.' },
        { title: 'Cover Art & Illustrations', description: 'Custom cover art for projects, books, or games, blending digital expertise with traditional artistry.' },
        { title: 'Traditional Mediums', description: 'Expertise in watercolor, color pencils, gouache, and pastels for one-of-a-kind art pieces.' },
        { title: 'Creative & Expressive Styles', description: 'Personalized, characterized drawings with a strong focus on detail and style.' },
    ];
    
    // Preload first images (filter out videos)
    const firstImages = digitalArtProjects
        .map(p => p.images[0])
        .filter(src => src && !src.toLowerCase().endsWith('.mp4'));
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <ImagePreloader images={firstImages.slice(0, 4)} />
            <section className="text-center pb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Digital Art Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
                    Bring your ideas to life with expressive, character-driven artwork, expertly crafted in both digital and traditional mediums. Whether you're looking for emotes, cover art, animations, or concept art, we deliver unique, creative designs that capture the essence of your vision.
                </p>
            </section>
            
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-12">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>

                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base mb-20">
                    <div>
                        <h3 className="text-3xl font-bold text-orange-400 mb-6">Services include:</h3>
                        <ul className="space-y-4">
                           {features.map(f => <ServiceFeature key={f.title} title={f.title} description={f.description} />)}
                        </ul>
                    </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {digitalArtProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
                                <MixedMediaSlider images={project.images} />
                                <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>
                            </div>
                        </AnimatedWrapper>
                    ))}
                </div>
            </section>
        </div>
    );
};

const PixelArtPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const firstRowProjects = pixelArtProjects.slice(0, 3);
    const secondRowProjects = pixelArtProjects.slice(3);
    const features = [
        { title: 'Character & Animation Design', description: 'Complete sprite sheets for dynamic characters.' },
        { title: 'Level & Parallax Design', description: 'Full-level concept art with detailed pixel art and parallax layers.' },
        { title: 'Game Design Documents', description: 'From small concepts to full-fledged game documents, including storylines, character concepts, level designs, and map layouts.' },
        { title: 'Game Covers & Logos (Raster Art)', description: 'Eye-catching cover arts and logos created in Photoshop to make your game stand out.' },
    ];
    
    // Preload first images
    const firstImages = pixelArtProjects.map(p => p.images[0]).filter(Boolean);
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <ImagePreloader images={firstImages.slice(0, 6)} />
            <section className="text-center pb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Pixel Art & Game Design Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
                    Bring your game to life with custom pixel art and game design solutions. From character concepts to full sprite sheet animations, we craft every detail with precision. Our pixel art also extends to level designs, featuring layer-by-layer parallax backgrounds that add depth to your worlds.
                </p>
            </section>

            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-12">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>

                <div className="max-w-4xl mx-auto text-left text-gray-300 space-y-8 text-base mb-20">
                    <div>
                        <h3 className="text-3xl font-bold text-orange-400 mb-6">Services include:</h3>
                        <ul className="space-y-4">
                           {features.map(f => <ServiceFeature key={f.title} title={f.title} description={f.description} />)}
                        </ul>
                        <p className="mt-8">Let us help turn your game ideas into pixel-perfect reality, with every aspect covered, from design to mechanics!</p>
                    </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {firstRowProjects.map((project, index) => (
                         <AnimatedWrapper key={index} index={index}>
                            <PixelArtProjectCard project={project} />
                         </AnimatedWrapper>
                    ))}
                </div>

                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:w-2/3 lg:mx-auto">
                         {secondRowProjects.map((project, index) => (
                            <AnimatedWrapper key={index + firstRowProjects.length} index={index}>
                                <PixelArtProjectCard project={project} />
                            </AnimatedWrapper>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const placeholderProjects = [
    { title: 'Project Showcase One', images: ['https://picsum.photos/seed/placeholder1/600/400'] },
    { title: 'Creative Concept Two', images: ['https://picsum.photos/seed/placeholder2/600/400', 'https://picsum.photos/seed/ph2_2/600/400'] },
    { title: 'Design Mockup Three', images: ['https://picsum.photos/seed/placeholder3/600/400', 'https://picsum.photos/seed/ph3_2/600/400'] },
    { title: 'Digital Asset Four', images: ['https://picsum.photos/seed/placeholder4/600/400'] },
    { title: 'Brand Identity Five', images: ['https://picsum.photos/seed/placeholder5/600/400', 'https://picsum.photos/seed/ph5_2/600/400'] },
];

const ServicePlaceholderPage = ({ service, navigateTo }: { service: Service; navigateTo: (page: string) => void; }) => {
    const firstRowProjects = placeholderProjects.slice(0, 3);
    const secondRowProjects = placeholderProjects.slice(3);

    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
            <section className="text-center pb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    {service.name}
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4 text-base sm:text-lg">
                    {(service.description.split('.')[0] || '') + '.'} Explore our portfolio of projects for {service.name.toLowerCase()}.
                </p>
            </section>
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-8">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {firstRowProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <ProjectCard project={{ ...project, images: project.images.map(img => `${img}?service=${service.id}`) }} />
                        </AnimatedWrapper>
                    ))}
                </div>
                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:w-2/3 lg:mx-auto">
                        {secondRowProjects.map((project, index) => (
                            <AnimatedWrapper key={index + firstRowProjects.length} index={index}>
                                <ProjectCard project={{ ...project, images: project.images.map(img => `${img}?service=${service.id}`) }} />
                            </AnimatedWrapper>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const ClippingServicePage = ({ navigateTo, currentPage }: NavigationProps) => (
    <div className="pt-12 px-4 sm:px-6 lg:px-8 pb-16">
        <section className="text-center pb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight max-w-7xl mx-auto">
                Clipping & Social Media Growth Service
            </h1>
        </section>

        <section className="max-w-7xl mx-auto">
            <div className="mb-12">
                <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
            </div>

            <p className="text-left text-gray-300 text-base mb-16">
                Our Clipping and Social Media Growth Service is designed to help creators and businesses from all industries amplify their presence and reach across multiple platforms. Whether you’re a gaming creator, YouTuber, fitness coach, restaurant owner, or any other business, we transform your content into engaging, bite-sized video clips perfect for social media.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 <div>
                     <VideoPlayer src="/assets/images/Clipping Service Video.mp4" poster="/assets/images/clipping_thumbnail.png" />
                 </div>
                 <div className="text-left text-gray-300 space-y-8 text-base">
                    <div>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">What We Provide:</h3>
                        <ul className="space-y-3 pl-4">
                            <li className="flex items-start gap-3">
                               <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                               <span><strong>High-Quality Clips:</strong> We capture your most exciting and engaging moments, turning them into short, shareable content tailored to your industry.</span>
                            </li>
                             <li className="flex items-start gap-3">
                               <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                               <span><strong>Multi-Platform Exposure:</strong> We distribute these clips across 60+ platforms, from TikTok to Instagram Reels, YouTube Shorts, and more, ensuring maximum visibility.</span>
                            </li>
                             <li className="flex items-start gap-3">
                               <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                               <span><strong>SEO Optimization:</strong> We optimize your clips to reach the right audience and boost engagement.</span>
                            </li>
                             <li className="flex items-start gap-3">
                               <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                               <span><strong>Regular Posting:</strong> We post 15+ clips a day to maintain consistent content flow and visibility.</span>
                            </li>
                            <li className="flex items-start gap-3">
                               <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                               <span><strong>Performance Tracking:</strong> You’ll have access to a shared Google Sheet to track the progress and engagement of each clip.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">What We Need From You:</h3>
                        <p>
                            To get started, we simply need information about what you’re looking to promote—whether it’s a product, service, event, or brand. Tell us your goals: Are you aiming to increase customer engagement, boost sales, grow your social media following, or promote a new program or product? We’ll tailor the content to meet your needs and ensure it helps you achieve your goals.
                        </p>
                    </div>
                 </div>
            </div>
        </section>
    </div>
);


const ContactPage = ({ navigateTo, currentPage }: NavigationProps) => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
            if (formState.name && formState.email && formState.message) {
            // Create clean mailto link
            const subject = formState.subject || 'Contact Form Submission';
            
            // Build clean body with proper line breaks
            const bodyLines = [
                `Name: ${formState.name}`,
                `Email: ${formState.email}`,
                '',
                'Message:',
                formState.message
            ];
            
            // Use encodeURIComponent for clean encoding
            const body = encodeURIComponent(bodyLines.join('\n'));
            const encodedSubject = encodeURIComponent(subject);
            const mailtoLink = `mailto:tezurect82@gmail.com?subject=${encodedSubject}&body=${body}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
                setSubmissionStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmissionStatus('idle'), 5000);
            } else {
                setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus('idle'), 3000);
            }
    };


    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8 min-h-screen">
            <section className="text-center pb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                    Get in Touch
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4 text-base sm:text-lg">
                    We’d love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                </p>
            </section>

            <section className="pb-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" name="name" id="name" value={formState.name} onChange={handleInputChange} required className="w-full bg-[#0D0D0D] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input type="email" name="email" id="email" value={formState.email} onChange={handleInputChange} required className="w-full bg-[#0D0D0D] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject (Optional)</label>
                                <input type="text" name="subject" id="subject" value={formState.subject} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea name="message" id="message" rows={5} value={formState.message} onChange={handleInputChange} required className="w-full bg-[#0D0D0D] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-orange-500 focus:border-orange-500 transition"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-3 rounded-full text-base transition-all duration-300 hover:opacity-90 flex items-center justify-center active:scale-95">
                                    Send Message
                                </button>
                                {submissionStatus === 'success' && <p className="text-green-400 mt-4 text-center">Opening your email client...</p>}
                                {submissionStatus === 'error' && <p className="text-red-400 mt-4 text-center">Please fill all required fields.</p>}
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="text-gray-300">
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <p className="mb-6">
                            Feel free to reach out via email or connect with us on our social media platforms. We're always excited to discuss new projects and collaborations.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Email Us</p>
                                    <a href="mailto:tezurect82@gmail.com" className="hover:text-orange-400 transition-colors ease-in-out duration-300" aria-label="Email us at tezurect82@gmail.com">tezurect82@gmail.com</a>
                                </div>
                            </div>
                        </div>

                         <h3 className="text-2xl font-bold text-white mt-12 mb-6">Follow Us</h3>
                         <div className="flex justify-start space-x-4">
                            <SocialIcon href="https://www.instagram.com/phyruxvisuals/" ariaLabel="Visit our Instagram page">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://discord.gg/sVZeyGQm" ariaLabel="Join our Discord community">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://wa.me/923167741677" ariaLabel="Contact us on WhatsApp">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                               </svg>
                           </SocialIcon>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AllServicesPage = ({ navigateTo, currentPage }: NavigationProps) => {
    return (
        <div className="pt-12 pb-16">
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4">
                        Our Services
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-base sm:text-lg">
                        We offer a comprehensive suite of creative services to bring your vision to life. Each service is tailored to meet your unique needs with precision and flair.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <AnimatedWrapper key={service.id} index={index}>
                                <button 
                                    onClick={() => navigateTo(service.id)} 
                                    className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center w-full h-full transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#2a201c] hover:shadow-2xl hover:shadow-orange-500/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <div className="text-orange-400 mb-4 transition-all duration-300 ease-in-out group-hover:text-orange-300 group-hover:scale-105 group-hover:-rotate-3">
                                        <ServiceIcon name={service.iconName} className="h-12 w-12" />
                                    </div>
                                    <h3 className="font-bold text-xl text-white mb-2">{service.name}</h3>
                                    <p className="text-sm text-gray-400 group-hover:text-orange-400 transition-colors duration-300">View Details</p>
                                </button>
                            </AnimatedWrapper>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const WhatsAppButton = () => (
    <a
      href="https://wa.me/923167741677"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );

const ScrollProgressBar = () => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [scroll, setScroll] = useState(0);

    const onScroll = () => {
        const Scrolled = document.documentElement.scrollTop;
        const MaxHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const ScrollPercent = (Scrolled / MaxHeight) * 100;
        setScroll(ScrollPercent);
    };

    // FIX: 'c' is not defined. Replaced with 'useEffect'.
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[999] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-150 ease-out"
                style={{ width: `${scroll}%` }}
            ></div>
        </div>
    );
};

const isServicePage = (page: string) => services.some(s => s.id === page);

export default function App() {
  // FIX: 'a' is not defined. Replaced with 'useState'.
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  // FIX: 'a' is not defined. Replaced with 'useState'.
  const [preloaderExiting, setPreloaderExiting] = useState(false);
  // FIX: 'a' is not defined. Replaced with 'useState'.
  const [currentPage, setCurrentPage] = useState('home');
  // FIX: 'a' is not defined. Replaced with 'useState'.
  const [animationClass, setAnimationClass] = useState('');
  
  // FIX: 'c' is not defined. Replaced with 'useEffect'.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Preloader timing - quick and snappy
    const totalWordAnimationTime = 1700; // Commissions visible for ~0.7 seconds
    // Smooth exit animation
    const exitAnimationTime = 300;

    // Start the final exit animation after the words are done
    const startTimer = setTimeout(() => {
        setPreloaderExiting(true);
    }, totalWordAnimationTime);

    // Completely remove the preloader from the DOM after its exit animation finishes
    const endTimer = setTimeout(() => {
        setPreloaderVisible(false);
        document.body.style.overflow = '';
        setAnimationClass('page-transition-enter');
        
        // Set initial page to home (no hash in URL)
        setCurrentPage('home');
    }, totalWordAnimationTime + exitAnimationTime);

    return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
        document.body.style.overflow = '';
    };
  }, []);

  // Remove hash from URL on initial load
  useEffect(() => {
    if (window.location.hash) {
      // Clean URL by removing hash
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'home';
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (page: string) => {
    if (page === currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    };

    // Update browser history without showing hash in URL - keep URL completely clean
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.pushState({ page }, '', cleanUrl);

    setAnimationClass('page-transition-exit');
    setTimeout(() => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
      
      const newAnimationClass = isServicePage(page) 
          ? 'service-page-reveal-enter' 
          : 'page-transition-enter';
      setAnimationClass(newAnimationClass);

    }, 400); // exit animation duration
  };

  const renderPage = () => {
    const servicePage = services.find(s => s.id === currentPage);
    const navigationProps = { navigateTo, currentPage };

    // Loading fallback for lazy-loaded components
    const LoadingFallback = () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    switch(currentPage) {
        case 'home':
            return <HomePage {...navigationProps} />;
        case 'services-page':
            return <Suspense fallback={<LoadingFallback />}><AllServicesPage {...navigationProps} /></Suspense>;
        case 'video-editing':
            return <Suspense fallback={<LoadingFallback />}><VideoEditingPage {...navigationProps} /></Suspense>;
        case 'graphics-designing':
            return <Suspense fallback={<LoadingFallback />}><GraphicsDesigningPage {...navigationProps} /></Suspense>;
        case 'web-development':
            return <Suspense fallback={<LoadingFallback />}><WebDevelopmentPage {...navigationProps} /></Suspense>;
        case 'digital-art':
            return <Suspense fallback={<LoadingFallback />}><DigitalArtPage {...navigationProps} /></Suspense>;
        case 'pixel-art':
            return <Suspense fallback={<LoadingFallback />}><PixelArtPage {...navigationProps} /></Suspense>;
        case 'clipping-service':
            return <Suspense fallback={<LoadingFallback />}><ClippingServicePage {...navigationProps} /></Suspense>;
        case 'about-us':
            return <Suspense fallback={<LoadingFallback />}><AboutUsPage {...navigationProps} /></Suspense>;
        case 'faqs':
            return <Suspense fallback={<LoadingFallback />}><FAQPage {...navigationProps} /></Suspense>;
        case 'contact':
            return <Suspense fallback={<LoadingFallback />}><ContactPage {...navigationProps} /></Suspense>;
        default:
            if (servicePage) {
                return <ServicePlaceholderPage service={servicePage} navigateTo={navigateTo} />;
            }
            return <HomePage {...navigationProps} />;
    }
  };

  if (preloaderVisible) {
    return (
        <div className="bg-[#0D0D0D] min-h-screen text-white">
            <div
                className={`fixed inset-0 bg-[#0D0D0D] z-[100] flex items-center justify-center ${preloaderExiting ? 'preloader-exit' : ''}`}
                aria-hidden={!preloaderVisible}
            >
                <Preloader />
            </div>
        </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white" role="document">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <ScrollProgressBar />
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <main id="main-content" className={animationClass} role="main" aria-label="Main content">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} currentPage={currentPage} />
      <WhatsAppButton />
    </div>
  );
}
