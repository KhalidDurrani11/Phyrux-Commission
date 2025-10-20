
import React, { useState, useRef, useEffect } from 'react';

const Preloader = () => (
    <div className="text-6xl sm:text-7xl lg:text-9xl font-black text-white tracking-widest uppercase flex flex-col sm:flex-row items-center gap-x-6 gap-y-2">
        <span
            className="inline-block opacity-0 animate-preloader-word-pop"
            style={{ animationDelay: '200ms' }}
        >
            Phyruxs
        </span>
        <span
            className="inline-block opacity-0 animate-preloader-word-pop"
            style={{ animationDelay: '1800ms' }} // Increased delay for strict sequential animation
        >
            Comms
        </span>
    </div>
);


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
        <path d="M10 4H4v6h6V4zm6 0h-4v6h4V4zM4 12v6h6v-6H4zm6 0h4v6h-4v-6z" />
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
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <header className="py-4 px-4 relative z-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-4 pr-3 shadow-lg ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('home')} className="group flex items-center focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100">
                  <Logo />
                  <span className="font-bold text-xl text-white tracking-wider ml-3 transition-colors duration-300 ease-in-out group-hover:text-orange-400">
                      <span className="group-hover:hidden">Phyrux Comms</span>
                      <span className="hidden group-hover:inline">Phyrux Commissions</span>
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
                            <button onClick={() => handleMobileNav(link.page)} className={`text-3xl font-bold transition-colors duration-300 hover:scale-105 active:scale-95 ${link.isActive ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}>{link.label}</button>
                        </li>
                    ))}
                </ul>
                <div className="mt-12 opacity-0" style={{ animation: isMobileMenuOpen ? `fadeInUp 0.5s ease forwards 0.5s` : 'none' }}>
                    <button onClick={() => handleMobileNav('contact')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 ease-in-out hover:opacity-90 transform hover:scale-105 active:scale-95">
                        Contact us
                    </button>
                </div>
             </nav>
        </div>
      </>
    );
  };

const Hero = ({ navigateTo }: { navigateTo: (page: string) => void }) => (
    <section className="text-center pt-20 pb-16 px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight opacity-0 animate-fade-in-up">
            Every Great Story
            <SparkleIcon />
            <br />
            Deserves a Great Editor.
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
                <img loading="lazy" className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1005/100/100" alt="customer 1" />
                <img loading="lazy" className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1011/100/100" alt="customer 2" />
                <div className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] bg-purple-600 flex items-center justify-center text-xs font-bold text-white">VIX</div>
            </div>
            <p className="ml-4 text-gray-400 text-sm">100+ Happy customers</p>
        </div>
    </section>
);


const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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
        <section className="px-4 pb-16">
            <div className="max-w-6xl mx-auto">
                <div 
                    className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer group"
                    onClick={togglePlay}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full aspect-video object-cover"
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        loop
                        playsInline
                        muted
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
                </div>
            </div>
        </section>
    );
};

const ServicesSection = ({ navigateTo }: { navigateTo: (page: string) => void }) => (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Our Expertise</p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                Services We Master
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-lg">
                From pixel-perfect designs to cinematic video edits, we offer a comprehensive suite of creative services to elevate your brand's digital presence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <AnimatedWrapper key={service.id} index={index}>
                        <button 
                            onClick={() => navigateTo(service.id)} 
                            className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center w-full h-full transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#3a2a24] hover:shadow-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <div className="text-orange-400 mb-4 transition-all duration-300 ease-in-out group-hover:text-orange-300 group-hover:scale-110 group-hover:-rotate-6">
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
    { name: 'Tayyab', role: 'Founder & VFX Artist', imageUrl: 'https://picsum.photos/seed/tayyab/200/200' },
    { name: 'Ali', role: 'Co-Founder & Lead Editor', imageUrl: 'https://picsum.photos/seed/ali/200/200' },
    { name: 'Ahmed', role: 'Project Manager', imageUrl: 'https://picsum.photos/seed/ahmed_manager/200/200' },
    { name: 'Gulsher', role: 'Senior Video Editor', imageUrl: 'https://picsum.photos/seed/gulsher/200/200' },
    { name: 'Khalid', role: 'Lead Web Developer', imageUrl: 'https://picsum.photos/seed/khalid/200/200' },
    { name: 'Maaz', role: 'Specialist Pixel Artist', imageUrl: 'https://picsum.photos/seed/maaz/200/200' },
    { name: 'Taimoor', role: 'Head of Clipping Services', imageUrl: 'https://picsum.photos/seed/taimoor/200/200' },
    { name: 'Akemi', role: 'Lead Digital Illustrator', imageUrl: 'https://picsum.photos/seed/akemi/200/200' },
];

const TeamSection = () => (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Our Team</p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                Meet Our Creative Minds
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                We are a team of passionate creators, dedicated to bringing your vision to life with style and precision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <AnimatedWrapper key={index} index={index}>
                        <div className="group bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl flex flex-col items-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#2a201c] hover:shadow-2xl hover:shadow-orange-500/10">
                            <img 
                                loading="lazy"
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/10 transition-all duration-300 ease-in-out group-hover:border-orange-400 group-hover:scale-105"
                            />
                            <h3 className="font-bold text-lg text-white">{member.name}</h3>
                            <p className="text-sm text-orange-400">{member.role}</p>
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
    <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Testimonials</p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                What our premium clients
                <br />
                are saying about us
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                Real feedback from real partners. We're proud to share the success stories of those we've worked with.
            </p>
        </div>
        <div className="relative max-w-5xl mx-auto h-[600px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
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


const PremiereProLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#9999ff]"><path d="M22.5 1.5H1.5v21h21V1.5zM8.25 18.75H6V9h2.25c2.063 0 3.375 1.313 3.375 3.375S10.313 18.75 8.25 18.75zm8.25-6.375c0-2.062 1.313-3.375 3.375-3.375H22.5v10.5h-2.25v-3.75h-1.5v3.75h-2.25V12.375z" fill="currentColor"/><path d="M8.25 11.25H6v5.25h2.25c.75 0 1.125-.375 1.125-1.125v-3c0-.75-.375-1.125-1.125-1.125z" fill="currentColor"/></svg>;
const AfterEffectsLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#d291ff]"><path d="M22.5 1.5H1.5v21h21V1.5zM9.13 18.75L6.11 9H8.4l1.65 6.45h.075L11.775 9h2.25l-3.015 9.75h-2.25l.375-1.5zm8.625 0l-3.015-9.75h2.25l1.65 6.45h.075L20.4 9h2.25l-3.015 9.75h-2.25l.375-1.5z" fill="currentColor"/></svg>;
const PhotoshopLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#31c5f4]"><path d="M22.5 1.5H1.5v21h21V1.5zM8.25 18.75H6V9h2.25c2.063 0 3.375 1.313 3.375 3.375S10.313 18.75 8.25 18.75zm9.375 0h-2.25l-1.5-3.75H12v3.75h-2.25V9H15c2.063 0 3.375 1.313 3.375 3.375 0 1.5-.75 2.438-1.875 3L17.625 18.75z" fill="currentColor"/><path d="M8.25 11.25H6v5.25h2.25c.75 0 1.125-.375 1.125-1.125v-3c0-.75-.375-1.125-1.125-1.125zm4.875 0H12v3h1.125c.75 0 1.125-.375 1.125-1.125s-.375-1.875-1.125-1.875z" fill="currentColor"/></svg>;
const IllustratorLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#ff9a00]"><path d="M22.5 1.5H1.5v21h21V1.5zM9.13 18.75L6.11 9H8.4l1.65 6.45h.075L11.775 9h2.25l-3.015 9.75h-2.25l.375-1.5zm9.375 0h-2.25V9h2.25v9.75z" fill="currentColor"/></svg>;
const FigmaLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#2c2c2c" fillRule="evenodd"/><path d="M12 18a6 6 0 01-6-6h6v6z" fill="#0acf83"/><path d="M12 12a6 6 0 016-6v6h-6z" fill="#a259ff"/><path d="M12 6a6 6 0 01-6 6h6V6z" fill="#f24e1e"/><path d="M18 12a6 6 0 01-6 6v-6h6z" fill="#ff7262"/><path d="M6 12a6 6 0 016-6v6H6z" fill="#1abcfe"/></svg>;
const ReactLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#61dafb]"><path d="M12.001 2.002c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.88-5.382l-2.24-1.29 2.24-1.3c.1-.06.15-.17.15-.28V9.89c0-.21-.22-.35-.4-.25l-3.51 2.02c-.18.1-.29.3-.29.51v3.72c0 .21.22.35.4.25l3.51-2.03c.18-.1.29-.3.29-.5v-1.86c0-.11-.05-.22-.15-.28zM14.88 16.5l3.51 2.03c.18.1.4-.04.4-.25V14.6c0-.21-.11-.41-.29-.51l-3.51-2.02c-.18-.1-.4.04-.4.25v1.86c0 .11.05.22.15.28l2.24 1.29-2.24 1.3c-.1.06-.15.17-.15.28v1.86zm-2.02-13.29l3.51 2.02c.18.1.29.3.29.5v3.72c0 .21-.22.35-.4.25l-3.51-2.03c-.18-.1-.29-.3-.29-.51V5.91c0-.21.22-.35.4-.25z" fill="currentColor"/></svg>;
const NextJSLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#000000]"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.188 18.563H17.5v-7.126l-5.625 7.125h-1.313v-13.125h1.75v7.125l5.625-7.125h1.313v13.125z" fill="currentColor"/></svg>;
const DaVinciResolveLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#ff7d4a]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.08 4.14l8.35 8.35c-.4.49-1.54 1.63-2.03 2.03l-8.35-8.35c.4-.49 1.54-1.63 2.03-2.03zm-4.39 1.15l8.35 8.35c-.49.4-1.63 1.54-2.03 2.03l-8.35-8.35c.49-.4 1.63-1.54 2.03-2.03zM4.14 13.08l8.35-8.35c.49-.4 1.63-1.54 2.03-2.03l-8.35 8.35c-.49.4-1.63 1.54-2.03 2.03zm1.15 4.39l8.35-8.35c.4-.49 1.54-1.63 2.03-2.03l-8.35 8.35c-.4.49-1.54 1.63-2.03 2.03z" fill="currentColor"/></svg>;
const TailwindLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#38b2ac]"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="currentColor"/></svg>;
const JavascriptLogo = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#f7df1e]"><path d="M0 0h24v24H0V0zm22.034 18.262c.337-1.743.237-3.513-.288-5.182-1.1-3.463-4.113-5.25-8.15-5.25h-1.625v10.375h1.625c3.275 0 5.95-1.575 7.15-4.125.4-1.125.563-2.313.288-3.813zm-6.134-2.7c.613.825.937 1.838.937 2.938 0 1.212-.35 2.3-.987 3.112-.65.813-1.538 1.288-2.663 1.288h-1.6v-8.825h1.6c1.175 0 2.113.488 2.713 1.488zM9.42 12.05H4.155V9.69h5.265v2.36zm0 2.362H4.155v2.363h5.265V14.41z" fill="currentColor"/></svg>;


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
    <section className="py-16 bg-black/20 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                Powered by Industry-Leading Tools
            </h2>
        </div>
        <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee space-x-20 pr-20 flex-shrink-0 items-center">
                {[...techLogos, ...techLogos].map((tech, index) => (
                    <div key={index} className="group/item flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
                        <div className="h-12 w-12 flex items-center justify-center grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-300 ease-in-out">
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
  { year: '2018', title: 'Genesis Spark', description: 'Phyrux Commissions was founded with a passion for digital art and gaming aesthetics, starting with small commissions.' },
  { year: '2020', title: 'Service Expansion', description: 'Expanded our services to include video editing and graphic design, attracting a wider range of clients.' },
  { year: '2022', title: 'Studio Establishment', description: 'Officially established a small, dedicated team and moved into our first creative studio space.' },
  { year: '2024', title: 'Future Forged', description: 'Launched our new brand identity and futuristic website, marking a new era of high-end creative solutions.' },
];

const AboutUsPage = ({ navigateTo, currentPage }: NavigationProps) => (
    <div className="pt-12">
        <section className="py-12 px-4 relative overflow-hidden">
            <div className="max-w-5xl mx-auto text-center relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
                    Our Story
                </h2>
                <p className="max-w-3xl mx-auto text-gray-400 mb-20 text-lg">
                    Born from a shared passion for gaming culture and cutting-edge design, Phyrux Commissions is more than a studio—it's an arsenal of creativity. We arm brands with the visual power to dominate their digital landscapes.
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
        { q: "What is the edit process?", a: "Our design process includes 4 phases: Discovery and Reserach, Story boarding, Editing, and Finalisation and Delivery." },
        { q: "How will I send you the footage?", a: "You can send us your footage via cloud services like Google Drive, Dropbox, or WeTransfer. We'll provide a secure link for you to upload your files directly to our project workspace." },
        { q: "What if I'm not satisfied?", a: "Your satisfaction is our top priority. We include two rounds of revisions in our standard pricing to ensure the final product is exactly what you envisioned. We'll work closely with you on your feedback." },
        { q: "I need this video ASAP! Can you deliver in 24 hours?", a: "We understand that some projects are time-sensitive. We offer rush services for an additional fee. Please contact us with your deadline, and we'll do our best to accommodate your request." },
        { q: "How do I get started?", a: "Getting started is simple! Click the 'Book an appointment' button below or use the contact form on our contact page. Let us know about your project, and we'll schedule a free consultation to discuss your needs." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers. Payment is securely processed through our online invoicing system." },
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
                    <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mt-4">
                        Frequently asked questions about us
                    </h1>
                    <div className="mt-12 bg-orange-500 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg shadow-orange-500/20">
                         <div>
                            <h2 className="font-bold text-2xl text-white">Have a question?</h2>
                            <p className="text-orange-100 mt-1">Let's discuss it now!</p>
                         </div>
                         <button onClick={() => navigateTo('contact')} className="bg-black text-white font-semibold px-6 py-3 rounded-full transition-all ease-in-out duration-300 transform hover:scale-105 active:scale-95 self-start sm:self-center flex-shrink-0">
                            Book an appointment
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

const Footer = ({ navigateTo, currentPage }: NavigationProps) => (
    <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-center md:text-left">
                <div className="lg:col-span-2">
                    <button onClick={() => navigateTo('home')} className="group flex items-center justify-center md:justify-start mb-4 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100">
                        <Logo />
                        <span className="font-bold text-xl text-white tracking-wider ml-3 transition-colors duration-300 ease-in-out group-hover:text-orange-400">
                           <span className="group-hover:hidden">Phyrux Comms</span>
                           <span className="hidden group-hover:inline">Phyrux Commissions</span>
                        </span>
                    </button>
                    <p className="text-gray-400 text-sm">Phyrux Commissions is a creative powerhouse born from the dynamic worlds of digital art and gaming. We specialize in transforming concepts into compelling visual narratives through expert video editing, graphic design, and web development.</p>
                </div>
                
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
                        {services.map(item => (
                            <li key={item.id}><button onClick={() => navigateTo(item.id)} className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95">{item.name}</button></li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-bold text-white mb-4">Get in Touch</h3>
                    <a href="mailto:tezurect82@gmail.com" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300 ease-in-out block mb-4">tezurect82@gmail.com</a>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <SocialIcon href="#">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424 c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.754,2,12,2,12s0,4.246,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762 C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.246,22,12,22,12S22,7.754,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 5.623c-.452-.225-1.135-.562-1.81-.787-.562-.112-1.125-.112-1.574-.112-.562 0-1.125.112-1.687.337-.45.113-.899.338-1.349.563-1.124.562-2.248 1.237-3.147 2.024-.45.45-.899.899-1.237 1.462-.225.45-.337.899-.45 1.349-.112.45-.112.899-.112 1.462s0 .899.112 1.349c.112.563.225 1.125.45 1.574.337.563.675 1.125 1.125 1.574.45.45.899.899 1.462 1.349.45.337.899.562 1.349.787.562.225 1.125.45 1.687.563.562.112 1.125.225 1.81.225.562 0 1.125-.112 1.687-.225.562-.112 1.125-.337 1.574-.563.563-.225 1.125-.562 1.574-.899.45-.338.899-.675 1.237-1.125.338-.45.675-.899.899-1.462.225-.45.338-.899.45-1.462.113-.45.113-.899.113-1.349s-.113-.899-.113-1.349c-.112-.563-.225-1.125-.45-1.574-.225-.45-.562-.899-.787-1.349-.338-.45-.675-.899-1.125-1.237a8.775 8.775 0 0 0-1.574-1.237zM12.001 15.126c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687s-.788 1.687-1.687 1.687zm3.897-2.698c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687.113.899-.788 1.687-1.687 1.687zm-7.794 0c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687 0 .899-.788 1.687-1.687 1.687z"/></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Phyrux Commissions. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);


const HomePage = ({ navigateTo, currentPage }: NavigationProps) => (
    <>
        <Hero navigateTo={navigateTo} />
        <VideoPlayer />
        <div className="py-16 px-4">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <ServicesSection navigateTo={navigateTo} />
        <TechMarquee />
        <div className="py-16 px-4">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <TeamSection />
        <div className="py-16 px-4">
            <div className="h-px w-2/3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        <TestimonialsSection />
    </>
);

const videoEditingProjects = [
    { title: 'Corporate Branding Video', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep1/600/400' },
    { title: 'Social Media Ad Campaign', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep2/600/400' },
    { title: 'Gaming Montage', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep3/600/400' },
    { title: 'Wedding Highlight Reel', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep4/600/400' },
    { title: 'Music Video Production', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', thumbnailUrl: 'https://picsum.photos/seed/vep5/600/400' },
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
                {project.images.map((src, index) => (
                     <img
                        loading="lazy"
                        key={index}
                        src={src}
                        alt={`${project.title} preview ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        onError={(e) => {
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
    const [currentIndex, setCurrentIndex] = useState(0);

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
                {project.images.map((src, index) => (
                    <img
                        loading="lazy"
                        key={index}
                        src={src}
                        alt={`${project.title} preview ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        onError={(e) => {
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
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-10 active:scale-95"
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


const useInView = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
    const [isInView, setIsInView] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

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
            className={`transition-all duration-800 ease-in-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 200}ms` }}
        >
            {children}
        </div>
    );
};

type VideoProject = { title: string; videoUrl: string; thumbnailUrl: string; };

const VideoProjectCard: React.FC<{ project: VideoProject }> = ({ project }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInteracted, setIsInteracted] = useState(false);

    const handlePlay = () => {
        setIsInteracted(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 0);
    };

    return (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95">
            <div className="relative group aspect-video overflow-hidden rounded-lg cursor-pointer bg-black" onClick={handlePlay}>
                {!isInteracted ? (
                    <>
                        <img loading="lazy" src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-16 h-16 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <video ref={videoRef} src={project.videoUrl} className="w-full h-full object-cover" controls playsInline autoPlay />
                )}
            </div>
            <h3 className="font-bold text-xl text-white mt-4">{project.title}</h3>
        </div>
    );
};


const VideoEditingPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const firstRowProjects = videoEditingProjects.slice(0, 3);
    const secondRowProjects = videoEditingProjects.slice(3);

    return (
        <div className="pt-12 px-4">
            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    Video Editing
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    From cinematic cuts to engaging social media clips, we bring your footage to life with professional-grade editing that tells a compelling story.
                </p>
            </section>
            
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-8">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                 <h2 className="text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {firstRowProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <VideoProjectCard project={project} />
                        </AnimatedWrapper>
                    ))}
                </div>

                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 lg:mx-auto">
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

const WebDevelopmentPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const firstRowProjects = webDevProjects.slice(0, 3);
    const secondRowProjects = webDevProjects.slice(3);

    return (
        <div className="pt-12 px-4">
            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    Web Development
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    We build beautiful, high-performance websites that provide a seamless user experience and drive results for your business.
                </p>
            </section>
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-8">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                <h2 className="text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {firstRowProjects.map((project, index) => (
                         <AnimatedWrapper key={index} index={index}>
                            <ProjectCard project={project} />
                         </AnimatedWrapper>
                    ))}
                </div>
                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 lg:mx-auto">
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

const PixelArtPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const firstRowProjects = pixelArtProjects.slice(0, 3);
    const secondRowProjects = pixelArtProjects.slice(3);
    
    return (
        <div className="pt-12 px-4">
            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    Pixel Art
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    Crafting charming and nostalgic visuals, one pixel at a time. Explore our gallery of custom pixel art for games, animations, and more.
                </p>
            </section>

            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-8">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                <h2 className="text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {firstRowProjects.map((project, index) => (
                         <AnimatedWrapper key={index} index={index}>
                            <PixelArtProjectCard project={project} />
                         </AnimatedWrapper>
                    ))}
                </div>

                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 lg:mx-auto">
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
        <div className="pt-12 px-4">
            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    {service.name}
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    {(service.description.split('.')[0] || '') + '.'} Explore our portfolio of projects for {service.name.toLowerCase()}.
                </p>
            </section>
            <section className="pb-16 max-w-7xl mx-auto">
                <div className="mb-8">
                    <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
                </div>
                <h2 className="text-4xl font-black text-white text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {firstRowProjects.map((project, index) => (
                        <AnimatedWrapper key={index} index={index}>
                            <ProjectCard project={{ ...project, images: project.images.map(img => `${img}?service=${service.id}`) }} />
                        </AnimatedWrapper>
                    ))}
                </div>
                {secondRowProjects.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 lg:mx-auto">
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
    <div className="pt-12 px-4 pb-16">
        <section className="text-center pb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                Clipping Service
            </h1>
            <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-lg">
                Precision is paramount. Our clipping path service provides clean, professional cutouts for your product photos, ensuring they look perfect for e-commerce sites, catalogs, and marketing materials. We meticulously handle complex images with care to deliver flawless results every time.
            </p>
        </section>
        <div className="max-w-6xl mx-auto mb-8">
            <BackButton navigateTo={navigateTo} page="services-page" text="Back to Services" />
        </div>
        <VideoPlayer />
    </div>
);


const ContactPage = ({ navigateTo, currentPage }: NavigationProps) => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
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
        <div className="pt-12 px-4 min-h-screen">
            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    Get in Touch
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    We’d love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                </p>
            </section>

            <section className="pb-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
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
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424 c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.754,2,12,2,12s0,4.246,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762 C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.246,22,12,22,12S22,7.754,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 5.623c-.452-.225-1.135-.562-1.81-.787-.562-.112-1.125-.112-1.574-.112-.562 0-1.125.112-1.687.337-.45.113-.899.338-1.349.563-1.124.562-2.248 1.237-3.147 2.024-.45.45-.899.899-1.237 1.462-.225.45-.337.899-.45 1.349-.112.45-.112.899-.112 1.462s0 .899.112 1.349c.112.563.225 1.125.45 1.574.337.563.675 1.125 1.125 1.574.45.45.899.899 1.462 1.349.45.337.899.562 1.349.787.562.225 1.125.45 1.687.563.562.112 1.125.225 1.81.225.562 0 1.125-.112 1.687-.225.562-.112 1.125-.337 1.574-.563.563-.225 1.125-.562 1.574-.899.45-.338.899-.675 1.237-1.125.338-.45.675-.899.899-1.462.225-.45.338-.899.45-1.462.113-.45.113-.899.113-1.349s-.113-.899-.113-1.349c-.112-.563-.225-1.125-.45-1.574-.225-.45-.562-.899-.787-1.349-.338-.45-.675-.899-1.125-1.237a8.775 8.775 0 0 0-1.574-1.237zM12.001 15.126c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687s-.788 1.687-1.687 1.687zm3.897-2.698c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687.113.899-.788 1.687-1.687 1.687zm-7.794 0c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687 0 .899-.788 1.687-1.687 1.687z"/></svg>
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
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4">
                        Our Services
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-lg">
                        We offer a comprehensive suite of creative services to bring your vision to life. Each service is tailored to meet your unique needs with precision and flair.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <AnimatedWrapper key={service.id} index={index}>
                                <button 
                                    onClick={() => navigateTo(service.id)} 
                                    className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center w-full h-full transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:border-orange-500/60 hover:bg-gradient-to-br from-[#1a1a1a] to-[#2a201c] hover:shadow-2xl hover:shadow-orange-500/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <div className="text-orange-400 mb-4 transition-all duration-300 ease-in-out group-hover:text-orange-300 group-hover:scale-110 group-hover:-rotate-6">
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
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.502 1.908 6.384l-.357 1.291 1.347-.353z" />
      </svg>
    </a>
  );

const ScrollProgressBar = () => {
    const [scroll, setScroll] = useState(0);

    const onScroll = () => {
        const Scrolled = document.documentElement.scrollTop;
        const MaxHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const ScrollPercent = (Scrolled / MaxHeight) * 100;
        setScroll(ScrollPercent);
    };

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
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [preloaderExiting, setPreloaderExiting] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const startTimer = setTimeout(() => {
        setPreloaderExiting(true);
    }, 3600); // Extended to accommodate sequential animation

    const endTimer = setTimeout(() => {
        setPreloaderVisible(false);
        document.body.style.overflow = '';
        setAnimationClass('page-transition-enter');
    }, 4400); // Extended for smoother exit

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

    // This is a workaround to remove props that are not expected by the child components.
    const navigationProps = { navigateTo, currentPage };

    switch(currentPage) {
        case 'home':
            return <HomePage {...navigationProps} />;
        case 'services-page':
            return <AllServicesPage {...navigationProps} />;
        case 'video-editing':
            return <VideoEditingPage {...navigationProps} />;
        case 'web-development':
            return <WebDevelopmentPage {...navigationProps} />;
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
