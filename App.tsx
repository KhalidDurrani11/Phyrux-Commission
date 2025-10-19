
import React, { useState, useRef, useEffect } from 'react';

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
    <div className="relative inline-block ml-2 -top-1 md:-top-3">
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

type NavigationProps = {
    navigateTo: (page: string) => void;
};

const iconPaths: { [key: string]: string[] } = {
    'video-editing': [
      'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    ],
    'graphics-designing': [
      'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    ],
    'web-development': [
      'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    ],
    'digital-art': [
      'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    ],
    'pixel-art': [
      'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-6 0h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-3 .5-.5 1 1 .5.5 3.5-3z',
    ],
    'clipping-service': [
      'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a1 1 0 01-1.414 0L9 14m-4 0h2m11 0h2m-9-4v2m0 11v2m-4-13h.01M3 3h.01',
    ],
  };
  
  type ServiceIconProps = {
    name: string;
    className?: string;
  };
  
  const ServiceIcon = ({ name, className }: ServiceIconProps) => {
    const paths = iconPaths[name] || [];
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className || 'h-12 w-12'}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {paths.map((d, index) => (
          <path key={index} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
        ))}
      </svg>
    );
  };

const services = [
    { id: 'video-editing', name: 'Video Editing', iconName: 'video-editing' },
    { id: 'graphics-designing', name: 'Graphics Designing', iconName: 'graphics-designing' },
    { id: 'web-development', name: 'Web Development', iconName: 'web-development' },
    { id: 'digital-art', name: 'Digital Art', iconName: 'digital-art' },
    { id: 'pixel-art', name: 'Pixel Art', iconName: 'pixel-art' },
    { id: 'clipping-service', name: 'Clipping Service', iconName: 'clipping-service' }
];

const Header = ({ navigateTo }: NavigationProps) => {
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const menuTimeoutRef = useRef<number | null>(null);

    const handleMenuEnter = () => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
        }
        setIsServicesMenuOpen(true);
    };

    const handleMenuLeave = () => {
        menuTimeoutRef.current = window.setTimeout(() => {
            setIsServicesMenuOpen(false);
        }, 300);
    };

    return (
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 pr-3 shadow-lg ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <button onClick={() => navigateTo('home')} className="flex items-center focus:outline-none group">
                <Logo />
                <span className="font-bold text-xl text-white tracking-wider ml-3 transition-all duration-300" style={{minWidth: '215px'}}>
                  <span className="group-hover:opacity-0 group-hover:hidden">Phyrux Comms</span>
                  <span className="hidden group-hover:inline group-hover:opacity-100">Phyrux Commissions</span>
                </span>
              </button>
              <nav className="hidden md:flex items-center space-x-1">
                <button onClick={() => navigateTo('home')} className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors duration-300 text-sm font-medium text-gray-300 hover:text-white">Home</button>
                <div 
                    className="relative"
                    onMouseEnter={handleMenuEnter}
                    onMouseLeave={handleMenuLeave}
                >
                    <button 
                        onClick={() => navigateTo('services-page')}
                        className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors duration-300 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1"
                    >
                        Services
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isServicesMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isServicesMenuOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-2 z-10">
                            {services.map(service => (
                                <button 
                                    key={service.id} 
                                    onClick={() => {
                                        navigateTo(service.id);
                                        setIsServicesMenuOpen(false);
                                    }} 
                                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-200"
                                >
                                    {service.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={() => navigateTo('about-us')} className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors duration-300 text-sm font-medium text-gray-300 hover:text-white">About Us</button>
                <button onClick={() => navigateTo('faqs')} className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors duration-300 text-sm font-medium text-gray-300 hover:text-white">FAQs</button>
              </nav>
              <button onClick={() => navigateTo('contact')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-300">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };

const Hero = ({ navigateTo }: NavigationProps) => (
    <section className="text-center pt-32 pb-16 px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight opacity-0 animate-fade-in-up">
            Every Great Story
            <SparkleIcon />
            <br />
            Deserves a Great Editor.
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-400">
            <button onClick={() => navigateTo('contact')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(238,155,123,0.5)] hover:opacity-90 transition-opacity">
                Get a Quote
            </button>
            <button onClick={() => navigateTo('services-page')} className="bg-transparent border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                View Our Work
            </button>
        </div>
        <div className="mt-8 flex items-center justify-center opacity-0 animate-fade-in-up animation-delay-600">
            <div className="flex -space-x-4">
                <img className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1005/100/100" alt="customer 1" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] object-cover" src="https://picsum.photos/id/1011/100/100" alt="customer 2" />
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
                    className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer"
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
                    <div className="absolute bottom-6 left-6">
                        <button 
                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                            className="bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 border border-white/20"
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

const ServicesSection = ({ navigateTo }: NavigationProps) => (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                Our Creative Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                We turn ideas into digital reality. Explore our range of services designed to make your content stand out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <button key={service.id} onClick={() => navigateTo(service.id)} className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <div className="text-orange-400 mb-4 transition-all duration-300 group-hover:text-orange-300 group-hover:scale-110 group-hover:-rotate-6">
                            <ServiceIcon name={service.iconName} className="h-12 w-12" />
                        </div>
                        <h3 className="font-bold text-xl text-white">{service.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

const teamMembers = [
    { name: 'Tayyab', role: 'Founder (VFX/GFX)', imageUrl: 'https://picsum.photos/seed/tayyab/200/200' },
    { name: 'Ali', role: 'Co-Founder (Video Editor)', imageUrl: 'https://picsum.photos/seed/ali/200/200' },
    { name: 'Ahmed', role: 'Manager', imageUrl: 'https://picsum.photos/seed/ahmed_manager/200/200' },
    { name: 'Gulsher', role: 'Video Editor', imageUrl: 'https://picsum.photos/seed/gulsher/200/200' },
    { name: 'Khalid', role: 'Web Developer', imageUrl: 'https://picsum.photos/seed/khalid/200/200' },
    { name: 'Maaz', role: 'Pixel Artist', imageUrl: 'https://picsum.photos/seed/maaz/200/200' },
    { name: 'Taimoor', role: 'Clipping Head', imageUrl: 'https://picsum.photos/seed/taimoor/200/200' },
    { name: 'Akemi', role: 'Digital Artist', imageUrl: 'https://picsum.photos/seed/akemi/200/200' },
];

const TeamSection = () => (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                Meet Our Creative Minds
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                We are a team of passionate creators, dedicated to bringing your vision to life with style and precision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/10"
                        />
                        <h3 className="font-bold text-lg text-white">{member.name}</h3>
                        <p className="text-sm text-orange-400">{member.role}</p>
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

const AboutUsPage = ({ navigateTo }: NavigationProps) => (
    <div className="pt-24">
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

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-[#1a1a1a] p-6 rounded-2xl">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-start text-left gap-4"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white text-lg flex-1">{question}</span>
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white transition-transform duration-300 transform hover:scale-110">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
                        </svg>
                    )}
                </div>
            </button>
            <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="text-gray-400 pt-4 pr-12">{answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQPage = ({ navigateTo }: NavigationProps) => {
    const faqs = [
        { q: "What is the edit process?", a: "Our design process includes 4 phases: Discovery and Reserach, Story boarding, Editing, and Finalisation and Delivery." },
        { q: "How will I send you the footage?", a: "You can send us your footage via cloud services like Google Drive, Dropbox, or WeTransfer. We'll provide a secure link for you to upload your files directly to our project workspace." },
        { q: "What if I'm not satisfied?", a: "Your satisfaction is our top priority. We include two rounds of revisions in our standard pricing to ensure the final product is exactly what you envisioned. We'll work closely with you on your feedback." },
        { q: "I need this video ASAP! Can you deliver in 24 hours?", a: "We understand that some projects are time-sensitive. We offer rush services for an additional fee. Please contact us with your deadline, and we'll do our best to accommodate your request." },
        { q: "How do I get started?", a: "Getting started is simple! Click the 'Book an appointment' button below or use the contact form on our contact page. Let us know about your project, and we'll schedule a free consultation to discuss your needs." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers. Payment is securely processed through our online invoicing system." },
    ];

    return (
        <div className="pt-32 pb-24 px-4 min-h-screen">
            <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                <div className="lg:sticky lg:top-32">
                     <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                        <p className="font-semibold text-gray-300">FAQ</p>
                    </div>
                    <h1 className="text-5xl font-black text-white leading-tight mt-4">
                        Frequently asked questions about us
                    </h1>
                    <div className="bg-orange-600 rounded-3xl p-8 mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="text-white text-center sm:text-left">
                            <h3 className="font-bold text-xl">Have a question? Let's discuss it now!</h3>
                        </div>
                        <button onClick={() => navigateTo('contact')} className="bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex-shrink-0">
                            Book an appointment
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index} 
                            question={faq.q} 
                            answer={faq.a}
                            defaultOpen={index === 0} 
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};


type SocialIconProps = {
    href: string;
    children?: React.ReactNode;
};

function SocialIcon({ href, children }: SocialIconProps) {
    return (
    <a href={href} className="text-gray-400 hover:text-white transition-colors">
        {children}
    </a>
    );
}

const Footer = ({ navigateTo }: NavigationProps) => (
    <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-center md:text-left">
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-center md:justify-start mb-4 group">
                        <Logo />
                        <span className="font-bold text-xl text-white tracking-wider ml-3 transition-all duration-300" style={{minWidth: '215px'}}>
                           <span className="group-hover:opacity-0 group-hover:hidden">Phyrux Comms</span>
                           <span className="hidden group-hover:inline group-hover:opacity-100">Phyrux Commissions</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm">Phyrux Commissions is a creative powerhouse born from the dynamic worlds of digital art and gaming. We specialize in transforming concepts into compelling visual narratives through expert video editing, graphic design, and web development.</p>
                </div>
                
                <div>
                    <h3 className="font-bold text-white mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white text-sm transition-colors">Home</button></li>
                        <li><button onClick={() => navigateTo('services-page')} className="text-gray-400 hover:text-white text-sm transition-colors">Services</button></li>
                        <li><button onClick={() => navigateTo('about-us')} className="text-gray-400 hover:text-white text-sm transition-colors">About Us</button></li>
                        <li><button onClick={() => navigateTo('faqs')} className="text-gray-400 hover:text-white text-sm transition-colors">FAQs</button></li>
                        <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white text-sm transition-colors">Contact</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-4">Our Services</h3>
                    <ul className="space-y-2">
                        {services.map(item => (
                            <li key={item.id}><button onClick={() => navigateTo(item.id)} className="text-gray-400 hover:text-white text-sm transition-colors">{item.name}</button></li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-bold text-white mb-4">Get in Touch</h3>
                    <a href="mailto:tezurect82@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors block mb-4">tezurect82@gmail.com</a>
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


const HomePage = ({ navigateTo }: NavigationProps) => (
    <>
        <Hero navigateTo={navigateTo} />
        <VideoPlayer />
        <ServicesSection navigateTo={navigateTo} />
        <TeamSection />
    </>
);

const VideoEditingPage = ({ navigateTo }: NavigationProps) => {
    const portfolioItems = [
        { id: 1, title: 'Corporate Branding Video', thumbnail: 'https://picsum.photos/seed/project1/600/400' },
        { id: 2, title: 'Social Media Ad Campaign', thumbnail: 'https://picsum.photos/seed/project2/600/400' },
        { id: 3, title: 'Gaming Montage', thumbnail: 'https://picsum.photos/seed/project3/600/400' },
        { id: 4, title: 'Wedding Highlight Reel', thumbnail: 'https://picsum.photos/seed/project4/600/400' },
        { id: 5, title: 'Music Video Production', thumbnail: 'https://picsum.photos/seed/project5/600/400' },
        { id: 6, title: 'YouTube Content Creation', thumbnail: 'https://picsum.photos/seed/project6/600/400' },
    ];

    return (
        <div className="pt-24 px-4">
            <button onClick={() => navigateTo('services-page')} className="mb-8 text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Services
            </button>

            <section className="text-center pb-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                    Video Editing Services
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    From cinematic cuts to engaging social media clips, we bring your footage to life with professional-grade editing that tells a compelling story.
                </p>
            </section>
            
            <section className="pb-16">
                 <h2 className="text-3xl font-bold text-white text-center mb-10">Our Work</h2>
                 <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {portfolioItems.map(item => (
                         <div key={item.id} className="group relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden aspect-video">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 bg-orange-500/80 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                            </div>
                         </div>
                     ))}
                 </div>
            </section>
        </div>
    );
};

// Generic placeholder page for other services
const ServicePlaceholderPage = ({ serviceName, navigateTo }: { serviceName: string; navigateTo: (page: string) => void; }) => (
    <div className="pt-24 px-4 h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">{serviceName}</h1>
        <p className="text-gray-400 mb-8">Details about our {serviceName} services are coming soon!</p>
        <button onClick={() => navigateTo('services-page')} className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Services
        </button>
    </div>
);


const ContactPage = ({ navigateTo }: NavigationProps) => {
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
        <div className="pt-24 px-4 min-h-screen">
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
                                <button type="submit" disabled={submissionStatus === 'sending'} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-3 rounded-full text-base hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
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
                                    <a href="mailto:contact@phyrux.com" className="hover:text-orange-400 transition-colors">contact@phyrux.com</a>
                                </div>
                            </div>
                        </div>

                         <h3 className="text-2xl font-bold text-white mt-12 mb-6">Follow Us</h3>
                         <div className="flex justify-start space-x-4">
                            <SocialIcon href="#">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424 c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.754,2,12,2,12s0,4.246,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762 C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.246,22,12,22,12S22,7.754,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 5.623c-.452-.225-1.135-.562-1.81-.787-.562-.112-1.125-.112-1.574-.112-.562 0-1.125.112-1.687.337-.45.113-.899.338-1.349.563-1.124.562-2.248 1.237-3.147 2.024-.45.45-.899.899-1.237 1.462-.225.45-.337.899-.45 1.349-.112.45-.112.899-.112 1.462s0 .899.112 1.349c.112.563.225 1.125.45 1.574.337.563.675 1.125 1.125 1.574.45.45.899.899 1.462 1.349.45.337.899.562 1.349.787.562.225 1.125.45 1.687.563.562.112 1.125.225 1.81.225.562 0 1.125-.112 1.687-.225.562-.112 1.125-.337 1.574-.563.563-.225 1.125-.562 1.574-.899.45-.338.899-.675 1.237-1.125.338-.45.675-.899.899-1.462.225-.45.338-.899.45-1.462.113-.45.113-.899.113-1.349s-.113-.899-.113-1.349c-.112-.563-.225-1.125-.45-1.574-.225-.45-.562-.899-.787-1.349-.338-.45-.675-.899-1.125-1.237a8.775 8.775 0 0 0-1.574-1.237zM12.001 15.126c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687s-.788 1.687-1.687 1.687zm3.897-2.698c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687.113.899-.788 1.687-1.687 1.687zm-7.794 0c-.899 0-1.687-.787-1.687-1.687s.788-1.687 1.687-1.687c.899 0 1.687.787 1.687 1.687 0 .899-.788 1.687-1.687 1.687z"/></svg>
                            </SocialIcon>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AllServicesPage = ({ navigateTo }: NavigationProps) => (
    <div className="pt-24 pb-16">
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4">
                    Our Services
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-lg">
                    We offer a comprehensive suite of creative services to bring your vision to life. Each service is tailored to meet your unique needs with precision and flair. Click on a service to learn more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <button key={service.id} onClick={() => navigateTo(service.id)} className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            <div className="text-orange-400 mb-4 transition-all duration-300 group-hover:text-orange-300 group-hover:scale-110 group-hover:-rotate-6">
                                <ServiceIcon name={service.iconName} className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl text-white mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-400">Click to see more</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    </div>
);


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page: string) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'home':
            return <HomePage navigateTo={navigateTo} />;
        case 'services-page':
            return <AllServicesPage navigateTo={navigateTo} />;
        case 'video-editing':
            return <VideoEditingPage navigateTo={navigateTo} />;
        case 'graphics-designing':
            return <ServicePlaceholderPage serviceName="Graphics Designing" navigateTo={navigateTo} />;
        case 'web-development':
            return <ServicePlaceholderPage serviceName="Web Development" navigateTo={navigateTo} />;
        case 'digital-art':
            return <ServicePlaceholderPage serviceName="Digital Art" navigateTo={navigateTo} />;
        case 'pixel-art':
            return <ServicePlaceholderPage serviceName="Pixel Art" navigateTo={navigateTo} />;
        case 'clipping-service':
            return <ServicePlaceholderPage serviceName="Clipping Service" navigateTo={navigateTo} />;
        case 'about-us':
            return <AboutUsPage navigateTo={navigateTo} />;
        case 'faqs':
            return <FAQPage navigateTo={navigateTo} />;
        case 'contact':
            return <ContactPage navigateTo={navigateTo} />;
        default:
            return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white">
      <Header navigateTo={navigateTo} />
      <main>
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
