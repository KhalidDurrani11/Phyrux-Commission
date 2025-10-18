
import React, { useState, useRef, useEffect } from 'react';

const Logo = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-3"
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

const Header = ({ navigateTo }: NavigationProps) => {
  const navItems = [
    { name: "Services", page: 'home' }, 
    { name: "Work", page: 'home' }, 
    { name: "Story", page: 'home' }, 
  ];
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 pr-3 shadow-lg ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <button onClick={() => navigateTo('home')} className="flex items-center focus:outline-none">
              <Logo />
              <span className="font-bold text-xl text-white tracking-wider">PHYRUX</span>
            </button>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
              {navItems.map(item => (
                <button key={item.name} onClick={() => navigateTo(item.page)} className="hover:text-white transition-colors duration-300">{item.name}</button>
              ))}
            </nav>
            <a href="mailto:contact@phyrux.com" className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-300">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
    <section className="text-center pt-32 pb-16 px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight">
            Every Great Story
            <SparkleIcon />
            <br />
            Deserves a Great Editor.
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-[#FFC8B3] to-[#EE9B7B] text-black font-semibold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(238,155,123,0.5)]">
                Editing Work
            </button>
            <button className="bg-transparent border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                How it works
            </button>
        </div>
        <div className="mt-8 flex items-center justify-center">
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

const services = [
    { id: 'video-editing', name: 'Video Editing', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { id: 'graphics-designing', name: 'Graphics Designing', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
    { id: 'web-development', name: 'Web Development', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
    { id: 'digital-art', name: 'Digital Art', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
    { id: 'pixel-art', name: 'Pixel Art', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-6 0h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-3 .5-.5 1 1 .5.5 3.5-3z" /></svg> },
    { id: 'clipping-service', name: 'Clipping Service', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a1 1 0 01-1.414 0L9 14m-4 0h2m11 0h2m-9-4v2m0 11v2m-4-13h.01M3 3h.01" /></svg> }
];

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
                        <div className="text-orange-400 mb-4 transition-colors duration-300 group-hover:text-orange-300">
                            {service.icon}
                        </div>
                        <h3 className="font-bold text-xl text-white">{service.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

const teamMembers = [
    { name: 'Rexx', role: 'Lead Chupa Master', imageUrl: 'https://picsum.photos/id/237/200/200' },
    { name: 'Maria Garcia', role: 'Motion Graphics Artist', imageUrl: 'https://picsum.photos/id/239/200/200' },
    { name: 'James Smith', role: 'Sound Designer', imageUrl: 'https://picsum.photos/id/244/200/200' },
    { name: 'Patricia Williams', role: 'Creative Director', imageUrl: 'https://picsum.photos/id/240/200/200' },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

const OurStory = () => (
    <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/5 rotate-45 opacity-50 blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/5 rotate-45 opacity-50 blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
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
);

type SocialIconProps = {
    href: string;
    children: React.ReactNode;
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
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <Logo />
                        <span className="font-bold text-xl text-white tracking-wider">PHYRUX</span>
                    </div>
                    <p className="text-gray-400 text-sm">Crafting digital experiences that captivate and inspire. Your vision, our mission.</p>
                </div>
                
                <div>
                    <h3 className="font-bold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        {services.map(item => (
                            <li key={item.id}><button onClick={() => navigateTo(item.id)} className="text-gray-400 hover:text-white text-sm transition-colors">{item.name}</button></li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-bold text-white mb-4">Get in Touch</h3>
                    <a href="mailto:contact@phyrux.com" className="text-gray-400 hover:text-white text-sm transition-colors block mb-4">contact@phyrux.com</a>
                    {/* Fix: Reformatted the SocialIcon components to resolve a TypeScript error where the 'children' prop was not being recognized, likely due to a parsing issue with whitespace. */}
                    <div className="flex justify-center md:justify-start space-x-4">
                        <SocialIcon href="#">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" /></svg>
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
        <Hero />
        <VideoPlayer />
        <ServicesSection navigateTo={navigateTo} />
        <TeamSection />
        <OurStory />
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
            <button onClick={() => navigateTo('home')} className="mb-8 text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Home
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
        <button onClick={() => navigateTo('home')} className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Home
        </button>
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
