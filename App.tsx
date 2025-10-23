// FIX: Invalid import statement. Replaced with a standard import for React hooks.
import React, { useState, useEffect, useRef } from'react';

const Preloader=()=> {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [visibleWord, setVisibleWord] = useState('Phyrux');

    // FIX: 'c' is not defined. Replaced with 'useEffect'.
    useEffect(() => {
        // This timer waits for the first word's animation (0.8s) to complete
        // before switching to the second word.
        const wordSwitchTimer = setTimeout(() => {
            setVisibleWord('Commissions');
        }, 800);

        return () => {
            clearTimeout(wordSwitchTimer);
        };
    }, []);
    
    return (
        <div className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter sm:tracking-widest uppercase relative h-32 w-full flex items-center justify-center text-center">
            {/* Using a key prop on the span ensures that React treats each word as a new element,
                forcing the animation to restart correctly when the word changes. */}
            {visibleWord === 'Phyrux' && (
                <span key="phyrux" className="absolute animate-preloader-pop-in-out text-orange-500">
                    Phyrux
                </span>
            )}
            {visibleWord === 'Commissions' && (
                <span key="commissions" className="absolute animate-preloader-pop-in-out text-white">
                    Commissions
                </span>
            )}
        </div>
    );
};


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
        <g fill="currentColor" strokeWidth="0">
            <path d="M12 2 L10.5 5.5 L13.5 5.5 Z" opacity="1"/>
            <path d="M10.5 5.5 L8 7.5 L10.5 9.5 Z" opacity="0.8"/>
            <path d="M13.5 5.5 L16 7.5 L13.5 9.5 Z" opacity="0.8"/>
            <path d="M10.5 9.5 L13.5 9.5 L12 6.5 Z" opacity="0.9"/>
            <path d="M8 7.5 L7 12 L10.5 9.5 Z" opacity="0.7"/>
            <path d="M16 7.5 L17 12 L13.5 9.5 Z" opacity="0.7"/>
            <path d="M10.5 9.5 L7 12 L10.5 15 Z" opacity="0.6"/>
            <path d="M13.5 9.5 L17 12 L13.5 15 Z" opacity="0.6"/>
            <path d="M10.5 15 L13.5 15 L12 9.5 Z" opacity="0.8"/>
            <path d="M7 12 L8 18 L10.5 15 Z" opacity="0.5"/>
            <path d="M17 12 L16 18 L13.5 15 Z" opacity="0.5"/>
            <path d="M10.5 15 L8 18 L12 22 Z" opacity="0.7"/>
            <path d="M13.5 15 L16 18 L12 22 Z" opacity="0.7"/>
        </g>
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
                <img className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1005/100/100" alt="customer 1" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1011/100/100" alt="customer 2" />
                <div className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] bg-purple-600 flex items-center justify-center text-xs font-bold text-white">VIX</div>
            </div>
            <p className="ml-4 text-gray-400 text-sm">500+ Happy customers</p>
        </div>
    </section>
);


const VideoPlayer = ({ videoClassName, objectFitClass }: { videoClassName?: string; objectFitClass?: string; }) => {
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
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                loop
                playsInline
                muted
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
    'https://picsum.photos/seed/testimonial1/400/200',
    'https://picsum.photos/seed/testimonial2/400/350',
    'https://picsum.photos/seed/testimonial3/400/250',
    'https://picsum.photos/seed/testimonial4/400/400',
];

const testimonialsCol2 = [
    'https://picsum.photos/seed/testimonial5/400/300',
    'https://picsum.photos/seed/testimonial6/400/220',
    'https://picsum.photos/seed/testimonial7/400/380',
    'https://picsum.photos/seed/testimonial8/400/280',
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
                        <img 
                            loading="lazy"
                            key={`col1-${index}`}
                            src={src} 
                            alt={`Testimonial screenshot ${index + 1}`} 
                            className="w-full rounded-2xl shadow-xl shadow-black/40 object-cover -rotate-2" 
                        />
                    ))}
                </div>
                {/* Column 2 */}
                <div className="hidden md:flex flex-col gap-8 w-[300px] md:w-[400px] animate-scroll-down">
                    {[...testimonialsCol2, ...testimonialsCol2].map((src, index) => (
                        <img 
                            loading="lazy"
                            key={`col2-${index}`}
                            src={src} 
                            alt={`Testimonial screenshot ${index + testimonialsCol1.length + 1}`} 
                            className="w-full rounded-2xl shadow-xl shadow-black/40 object-cover rotate-2" 
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);


const PremiereProLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#9999ff]"><path d="M21 0H3C1.346 0 0 1.346 0 3v18c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM8.834 18H5.5V9.01h3.334c2.308 0 3.667 1.25 3.667 3.495 0 2.246-1.359 3.495-3.667 3.495zm7.333-5.25h-3.5v3.668H10.5V9.01h5.667c2.25 0 3.333 1.083 3.333 3.083 0 1.375-.792 2.417-2.167 2.917l2.5 3.99H16.5l-2.333-3.75zm-7.333-2.25h-1.25v3.75h1.25c.833 0 1.25-.417 1.25-1.25v-1.25c0-.833-.417-1.25-1.25-1.25zm5.583-.5h-3.5v2.25h3.5c.834 0 1.084-.333 1.084-1.083 0-.834-.25-1.167-1.084-1.167z" fill="currentColor"/></svg>;
const AfterEffectsLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#d291ff]"><path d="M21 0H3C1.346 0 0 1.346 0 3v18c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM9.548 18H6.5l3.25-9h2.333L15.5 18h-2.833l-.666-2.167H9.998L9.548 18zm.834-3.667h2.25L11.5 10.498h-.083L10.382 14.333zm8.333 3.667h-3l3.25-9h2.333L24 18h-2.833l-.667-2.167h-2.5l-.45 2.167zm.834-3.667h2.25L19.915 10.5h-.083L18.715 14.333z" fill="currentColor"/></svg>;
const PhotoshopLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#31c5f4]"><path d="M21 0H3C1.346 0 0 1.346 0 3v18c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM8.834 18H5.5V9.01h3.334c2.308 0 3.667 1.25 3.667 3.495 0 2.246-1.359 3.495-3.667 3.495zm7.5-6.5c0-1.958-1.208-3.083-3.292-3.083H10.5V18h2.167v-3.833h1.333l1.833 3.833h2.5L15.917 14c1.166-.458 2.417-1.5 2.417-2.5zm-7.334-2.25h-1.25v3.75h1.25c.833 0 1.25-.417 1.25-1.25v-1.25c0-.833-.417-1.25-1.25-1.25zm5.25 0H12.5v2.333h1.75c.917 0 1.333-.417 1.333-1.167 0-.75-.416-1.166-1.333-1.166z" fill="currentColor"/></svg>;
const IllustratorLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ff9a00]"><path d="M21 0H3C1.346 0 0 1.346 0 3v18c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM9.548 18H6.5l3.25-9h2.333L15.5 18h-2.833l-.666-2.167H9.998L9.548 18zm6.618 0H14V9h2.166v9z" fill="currentColor"/></svg>;
const FigmaLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#2c2c2c" fillRule="evenodd"/><path d="M12 18a6 6 0 01-6-6h6v6z" fill="#0acf83"/><path d="M12 12a6 6 0 016-6v6h-6z" fill="#a259ff"/><path d="M12 6a6 6 0 01-6 6h6V6z" fill="#f24e1e"/><path d="M18 12a6 6 0 01-6 6v-6h6z" fill="#ff7262"/><path d="M6 12a6 6 0 016-6v6H6z" fill="#1abcfe"/></svg>;
const ReactLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#61dafb]"><g fill="currentColor"><circle cx="12" cy="12" r="2.05"/><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/><path d="M16.3 7.7a10.21 10.21 0 00-8.6 0 1 1 0 00-.5 1.6l.8.8a1 1 0 001.3-.1 6.2 6.2 0 015.4 0 1 1 0 001.3.1l.8-.8a1 1 0 00-.5-1.6zM7.7 16.3a10.21 10.21 0 008.6 0 1 1 0 00.5-1.6l-.8-.8a1 1 0 00-1.3.1 6.2 6.2 0 01-5.4 0 1 1 0 00-1.3-.1l-.8.8a1 1 0 00.5 1.6z"/><path transform="rotate(-30 12 12)" d="M12.4 3.1a1 1 0 00-1 .1 10.21 10.21 0 00-3.2 15.6 1 1 0 001.6-.5l.3-.9a1 1 0 00-.1-1.3 6.2 6.2 0 012-9.6 1 1 0 00.1-1.3l-.3-.9a1 1 0 00-.8-1.1z"/><path transform="rotate(30 12 12)" d="M12.6 3.1a1 1 0 00-1.1.8l-.3.9a1 1 0 00.1 1.3 6.2 6.2 0 012 9.6 1 1 0 00-.1 1.3l.3.9a1 1 0 001.6.5 10.21 10.21 0 00-3.2-15.6 1 1 0 00-.3-.1z"/></g></svg>;
const NextJSLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.721 16.5H15.5v-7.857L10.38 18.5h-1.4V5.5h1.4v7.857L15.5 5.5h1.221v13z" fill="currentColor"/></svg>;
const DaVinciResolveLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ff7d4a]"><g fill="currentColor"><circle cx="8.5" cy="15.5" r="5.5"/><circle cx="15.5" cy="15.5" r="5.5"/><circle cx="12" cy="8.5" r="5.5"/></g></svg>;
const TailwindLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#38b2ac]"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="currentColor"/></svg>;
const JavascriptLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#f7df1e]"><path d="M17.368 14.516c0 1.736-1.079 2.78-2.603 2.78-1.468 0-2.548-1.017-2.548-2.493 0-1.626 1.134-2.52 2.718-2.52.863 0 1.467.247 1.98.7L18.1 11.75c-.382-.382-.89-.598-1.625-.598-1.134 0-1.84.727-1.84 1.84 0 1.133.64 1.812 1.727 1.812 1.052 0 1.625-.619 1.625-1.626h-1.57v-1.18h2.718v1.517zM9.421 17.296h1.597v-6.333H9.42v-1.157h3.992v1.157H11.8v6.333h1.625v1.157H9.421v-1.157z" fill="currentColor"/></svg>;


const techLogos = [
    { name: 'Premiere Pro', component: <PremiereProLogo /> },
    { name: 'After Effects', component: <AfterEffectsLogo /> },
    { name: 'Photoshop', component: <PhotoshopLogo /> },
    { name: 'Illustrator', component: <IllustratorLogo /> },
    { name: 'Figma', component: <FigmaLogo /> },
    { name: 'React', component: <ReactLogo /> },
    { name: 'Next.js', component: <NextJSLogo /> },
    { name: 'DaVinci Resolve', component: <DaVinciResolveLogo /> },
    { name: 'Tailwind CSS', component: <TailwindLogo /> },
    { name: 'JavaScript', component: <JavascriptLogo /> },
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
        <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee space-x-16 pr-16 flex-shrink-0 items-center">
                {[...techLogos, ...techLogos].map((tech, index) => (
                    <div key={index} className="group/item flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center group-hover/item:scale-110 transition-all duration-300 ease-in-out group-hover/item:bg-orange-500/10 group-hover/item:shadow-lg group-hover/item:shadow-orange-500/20 group-hover/item:border-orange-500/30">
                            {tech.component}
                        </div>
                        <span className="text-sm font-semibold text-gray-500 whitespace-nowrap transition-colors duration-300 group-hover/item:text-white">
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

function SocialIcon({ href, children }: SocialIconProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group text-gray-400 transition-transform duration-300 ease-in-out active:scale-95">
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
                           <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0 3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.369a19.782 19.782 0 00-4.982-1.524c-.214.362-.42.718-.612 1.068-1.815-.362-3.674-.362-5.466 0-.193-.349-.398-.706-.612-1.068a19.78 19.78 0 00-4.982 1.524C1.569 9.878.683 15.13.683 15.13s1.815 3.125 5.466 3.825c.193.072.385.145.576.217.48.193.96.385 1.45.555 1.887.644 3.773.972 5.66.972.193 0 .385 0 .576-.018.48-.054.942-.127 1.404-.217a12.186 12.186 0 005.466-3.825s-.904-5.252-4.52-10.761zm-10.64 6.733c-1.187 0-2.155-1.08-2.155-2.422s.968-2.422 2.155-2.422c1.187 0 2.173 1.08 2.155 2.422 0 1.343-.986 2.422-2.155 2.422zm6.368 0c-1.187 0-2.155-1.08-2.155-2.422s.968-2.422 2.155-2.422c1.187 0 2.173 1.08 2.155 2.422 0 1.343-.986 2.422-2.155 2.422z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="https://wa.me/923167741677">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.502 1.908 6.384l-.357 1.291 1.347-.353z"/></svg>
                           </SocialIcon>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm mb-1">Email Us</p>
                            <a href="mailto:tezurect82@gmail.com" className="font-semibold text-white hover:text-orange-400 text-sm transition-all duration-300 ease-in-out inline-flex items-center gap-2 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>tezurect82@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
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
    { title: 'Corporate Branding Video', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep1/600/400' },
    { title: 'Social Media Ad Campaign', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep2/600/400' },
    { title: 'Gaming Montage', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep3/600/400' },
    { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumbnailUrl: 'https://picsum.photos/seed/wedding/400/600', isShortForm: true },
    { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnailUrl: 'https://picsum.photos/seed/music/400/600', isShortForm: true },
];

const webDevProjects = [
    { 
        title: 'Gym Website', 
        description: 'A dynamic website for a fitness center with class schedules and membership info.', 
        images: ['https://image.thum.io/get/width/1200/crop/800/https://goldsgymqta.netlify.app'],
        url: 'https://goldsgymqta.netlify.app'
    },
    { 
        title: 'High-Conversion Landing Page', 
        description: 'A focused landing page designed to maximize lead generation for a tech product.', 
        images: ['https://image.thum.io/get/width/1200/crop/800/https://stripe.com/'],
        url: 'https://stripe.com/'
    },
    { 
        title: 'Personal Portfolio Website', 
        description: 'A creative portfolio to showcase skills and projects with interactive 3D elements.', 
        images: ['https://image.thum.io/get/width/1200/crop/800/https://bruno-simon.com/'],
        url: 'https://bruno-simon.com/'
    },
    { 
        title: 'E-commerce Store', 
        description: 'A feature-rich online store for selling premium electronic products.', 
        images: ['https://image.thum.io/get/width/1200/crop/800/https://www.apple.com/store'],
        url: 'https://www.apple.com/store'
    },
    { 
        title: 'Corporate Business Website', 
        description: 'A professional site to represent a company\'s brand and cloud services.', 
        images: ['https://image.thum.io/get/width/1200/crop/800/https://vercel.com'],
        url: 'https://vercel.com'
    },
];

const pixelArtProjects = [
    {
        title: 'Cyberpunk Cityscape',
        images: [
            'https://picsum.photos/seed/p1-img1/600/400',
            'https://media.giphy.com/media/l41lHDSbE2A26Y35K/giphy.gif',
            'https://picsum.photos/seed/p1-img2/600/400',
        ]
    },
    {
        title: 'Fantasy Characters',
        images: [
            'https://media.giphy.com/media/8v326d2I02h2g/giphy.gif',
        ]
    },
    {
        title: 'Enchanted Forest Tileset',
        images: [
            'https://picsum.photos/seed/p3-img1/600/400',
            'https://picsum.photos/seed/p3-img2/600/400',
        ]
    },
    {
        title: '8-Bit Game Mockups',
        images: Array.from({ length: 13 }, (_, i) => `https://picsum.photos/seed/p4-img${i + 1}/600/400`)
    },
    {
        title: 'Sci-Fi Vehicle Sprites',
        images: [
          'https://media.giphy.com/media/3oKIPtjElAmG42YyA0/giphy.gif',
          'https://picsum.photos/seed/p5-img2/600/400',
          'https://picsum.photos/seed/p5-img3/600/400',
          'https://picsum.photos/seed/p5-img4/600/400',
        ]
      },
];
  
const graphicsDesignProjects = [
    { images: Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/gd-cat1-img${i + 1}/600/400`) },
    { images: Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/gd-cat2-img${i + 1}/600/400`) },
    { images: Array.from({ length: 3 }, (_, i) => `https://picsum.photos/seed/gd-cat3-img${i + 1}/600/400`) },
    { images: Array.from({ length: 4 }, (_, i) => `https://picsum.photos/seed/gd-cat4-img${i + 1}/600/400`) }
];

const digitalArtProjects = [
    { images: Array.from({ length: 3 }, (_, i) => `https://picsum.photos/seed/da-cat1-img${i + 1}/600/400`) },
    { images: Array.from({ length: 2 }, (_, i) => `https://picsum.photos/seed/da-cat2-img${i + 1}/600/400`) },
    { images: Array.from({ length: 3 }, (_, i) => `https://picsum.photos/seed/da-cat3-img${i + 1}/600/400`) },
    { images: Array.from({ length: 2 }, (_, i) => `https://picsum.photos/seed/da-cat4-img${i + 1}/600/400`) }
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
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);

    useEffect(() => {
        // Reset loaded state if project changes
        // This is unlikely in this app structure, but good practice
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

    const CardComponent = project.url ? 'a' : 'div';
    const props = project.url ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <CardComponent
            {...props}
            className="block bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95"
        >
            <div 
                className="relative group aspect-video overflow-hidden rounded-lg cursor-pointer bg-[#111]"
                onClick={nextImage}
            >
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {project.images.map((src, index) => (
                     <img
                        loading="lazy"
                        key={index}
                        src={src}
                        alt={`${project.title} preview ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
                        onLoad={() => handleLoad(index)}
                        onError={(e) => {
                            handleLoad(index);
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = 'https://i.imgur.com/8rqwdLX.png';
                          }}
                    />
                ))}
                 {project.url && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <span className="flex items-center gap-2 text-white font-semibold border-2 border-white/50 rounded-full px-5 py-2.5 transform group-hover:scale-105 transition-transform bg-black/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                               <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            <span>View Site</span>
                        </span>
                    </div>
                )}
            </div>
            <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>
            {project.description && (
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
            )}
        </CardComponent>
    );
};

const PixelArtProjectCard: React.FC<{ project: { title: string; images: string[] } }> = ({ project }) => {
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95">
            <div className="relative group aspect-video overflow-hidden rounded-lg bg-[#111]">
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {project.images.map((src, index) => (
                    <img
                        loading="lazy"
                        key={index}
                        src={src}
                        alt={`${project.title} preview ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
                        onLoad={() => handleLoad(index)}
                        onError={(e) => {
                            handleLoad(index);
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = 'https://i.imgur.com/8rqwdLX.png';
                        }}
                    />
                ))}
                
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

const GraphicProjectSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadedIndices, handleLoad } = useImageLoader();
    const isCurrentLoading = !loadedIndices.includes(currentIndex);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
            <div className="relative group aspect-video overflow-hidden rounded-lg bg-[#111]">
                {isCurrentLoading && <div className="absolute inset-0 animate-pulse-bg"></div>}
                {images.map((src, index) => (
                    <img
                        loading="lazy"
                        key={index}
                        src={src}
                        alt={`Graphic design sample ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${index === currentIndex && isCurrentLoading ? '!opacity-0' : ''}`}
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

type VideoProject = { title?: string; videoUrl: string; thumbnailUrl: string; isShortForm?: boolean };

const VideoProjectCard: React.FC<{ project: VideoProject }> = ({ project }) => {
    // FIX: 'u' is not defined. Replaced with 'useRef'.
    const videoRef = useRef<HTMLVideoElement>(null);
    // FIX: 'a' is not defined. Replaced with 'useState'.
    const [isInteracted, setIsInteracted] = useState(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);


    const handlePlay = () => {
        if(isInteracted) return;
        setIsInteracted(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 0);
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95">
            <div className={`relative group ${project.isShortForm ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden rounded-lg cursor-pointer bg-black`} onClick={handlePlay}>
                {!isInteracted ? (
                    <>
                        {!thumbnailLoaded && <div className="absolute inset-0 animate-pulse-bg"></div>}
                        <img loading="lazy" src={project.thumbnailUrl} alt={project.title || 'Video project thumbnail'} className={`w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setThumbnailLoaded(true)} />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-16 h-16 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <video ref={videoRef} src={project.videoUrl} className="w-full h-full object-cover" controls playsInline autoPlay />
                )}
            </div>
            {project.title && <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>}
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
                    Take your content to the next level with our expert video editing services. Whether you need short-form clips for TikTok and Instagram Reels or long-form YouTube videos, we deliver top-notch edits that fit your style. We can mimic any editing style, ensuring your videos align with your brand’s vision.
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
        { title: 'Logo Design', description: 'Tailored logos to reflect your brand’s unique identity.' },
        { title: 'Thumbnails', description: 'Attention-grabbing thumbnails for YouTube, TikTok, and more.' },
        { title: 'Other Visual Designs', description: 'Posters, digital ads, and any other design you need.' },
    ];
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
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
    const firstRowProjects = webDevProjects.slice(0, 3);
    const secondRowProjects = webDevProjects.slice(3);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {firstRowProjects.map((project, index) => (
                         <AnimatedWrapper key={index} index={index}>
                            <ProjectCard project={project} />
                         </AnimatedWrapper>
                    ))}
                </div>
                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:w-2/3 lg:mx-auto">
                         {secondRowProjects.map((project, index) => (
                            <AnimatedWrapper key={index + firstRowProjects.length} index={index}>
                                <ProjectCard project={project} />
                            </AnimatedWrapper>
                        ))}
                    </div>
                )}
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
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
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
                            <GraphicProjectSlider images={project.images} />
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
    
    return (
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
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
                     <VideoPlayer />
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
        setSubmissionStatus('sending');
        // Simulate API call
        setTimeout(() => {
            if (formState.name && formState.email && formState.message) {
                setSubmissionStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmissionStatus('idle'), 5000); // Reset after 5s
            } else {
                setSubmissionStatus('error');
                setTimeout(() => setSubmissionStatus('idle'), 5000); // Reset after 5s
            }
        }, 1500);
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
                                <button type="submit" disabled={submissionStatus === 'sending'} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-3 rounded-full text-base transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95">
                                    {submissionStatus === 'sending' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                                {submissionStatus === 'success' && <p className="text-green-400 mt-4 text-center">Thank you! Your message has been sent successfully.</p>}
                                {submissionStatus === 'error' && <p className="text-red-400 mt-4 text-center">Something went wrong. Please fill all required fields and try again.</p>}
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
                                    <a href="mailto:tezurect82@gmail.com" className="hover:text-orange-400 transition-colors ease-in-out duration-300">tezurect82@gmail.com</a>
                                </div>
                            </div>
                        </div>

                         <h3 className="text-2xl font-bold text-white mt-12 mb-6">Follow Us</h3>
                         <div className="flex justify-start space-x-4">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0 3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.369a19.782 19.782 0 00-4.982-1.524c-.214.362-.42.718-.612 1.068-1.815-.362-3.674-.362-5.466 0-.193-.349-.398-.706-.612-1.068a19.78 19.78 0 00-4.982 1.524C1.569 9.878.683 15.13.683 15.13s1.815 3.125 5.466 3.825c.193.072.385.145.576.217.48.193.96.385 1.45.555 1.887.644 3.773.972 5.66.972.193 0 .385 0 .576-.018.48-.054.942-.127 1.404-.217a12.186 12.186 0 005.466-3.825s-.904-5.252-4.52-10.761zm-10.64 6.733c-1.187 0-2.155-1.08-2.155-2.422s.968-2.422 2.155-2.422c1.187 0 2.173 1.08 2.155 2.422 0 1.343-.986 2.422-2.155 2.422zm6.368 0c-1.187 0-2.155-1.08-2.155-2.422s.968-2.422 2.155-2.422c1.187 0 2.173 1.08 2.155 2.422 0 1.343-.986 2.422-2.155 2.422z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="https://wa.me/923167741677">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.502 1.908 6.384l-.357 1.291 1.347-.353z"/></svg>
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
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.502 1.908 6.384l-.357 1.291 1.347-.353z" />
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
    
    // Total duration for the two sequential word animations (0.8s each)
    const totalWordAnimationTime = 1600;
    // Duration for the final preloader exit animation
    const exitAnimationTime = 500;

    // Start the final exit animation after the words are done
    const startTimer = setTimeout(() => {
        setPreloaderExiting(true);
    }, totalWordAnimationTime);

    // Completely remove the preloader from the DOM after its exit animation finishes
    const endTimer = setTimeout(() => {
        setPreloaderVisible(false);
        document.body.style.overflow = '';
        setAnimationClass('page-transition-enter');
    }, totalWordAnimationTime + exitAnimationTime);

    return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
        document.body.style.overflow = '';
    };
  }, []);

  const navigateTo = (page: string) => {
    if (page === currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    };

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

    switch(currentPage) {
        case 'home':
            return <HomePage {...navigationProps} />;
        case 'services-page':
            return <AllServicesPage {...navigationProps} />;
        case 'video-editing':
            return <VideoEditingPage {...navigationProps} />;
        case 'graphics-designing':
            return <GraphicsDesigningPage {...navigationProps} />;
        case 'web-development':
            return <WebDevelopmentPage {...navigationProps} />;
        case 'digital-art':
            return <DigitalArtPage {...navigationProps} />;
        case 'pixel-art':
            return <PixelArtPage {...navigationProps} />;
        case 'clipping-service':
            return <ClippingServicePage {...navigationProps} />;
        case 'about-us':
            return <AboutUsPage {...navigationProps} />;
        case 'faqs':
            return <FAQPage {...navigationProps} />;
        case 'contact':
            return <ContactPage {...navigationProps} />;
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
    <div className="bg-[#0D0D0D] min-h-screen text-white">
      <ScrollProgressBar />
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <main className={animationClass}>
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} currentPage={currentPage} />
      <WhatsAppButton />
    </div>
  );
}