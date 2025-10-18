
import React, { useState, useRef, useEffect } from 'react';

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 text-orange-400">
    <path d="M19.9999 4L17.2899 4.31C16.5899 4.4 15.9599 4.95 15.8499 5.65L15.2099 9.51C15.0999 10.22 15.6099 10.88 16.3299 11.01L19.9999 11.69" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M19.9999 11.69L16.3299 11.01C15.6099 10.88 15.0999 10.22 15.2099 9.51L15.8499 5.65C15.9599 4.95 16.5899 4.4 17.2899 4.31L19.9999 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M19.9999 4L15.8499 5.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M19.9999 11.69L15.21 9.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M4 4V20H20V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
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


const Header = () => {
  const navItems = ["Services", "Work", "Testimonial", "Email"];
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 pr-3 shadow-lg ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LogoIcon />
              <span className="font-bold text-lg text-white">Phyrux Commissions</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
              {navItems.map(item => (
                <a key={item} href="#" className="hover:text-white transition-colors duration-300">{item}</a>
              ))}
            </nav>
            <a href="#" className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-300">
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
    { name: 'Video Editing', href: '#video-editing', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { name: 'Graphics Designing', href: '#graphics-designing', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
    { name: 'Web Development', href: '#web-development', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
    { name: 'Digital Art', href: '#digital-art', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
    { name: 'Pixel Art', href: '#pixel-art', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-6 0h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-3 .5-.5 1 1 .5.5 3.5-3z" /></svg> },
    { name: 'Clipping Service', href: '#clipping-service', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a1 1 0 01-1.414 0L9 14m-4 0h2m11 0h2m-9-4v2m0 11v2m-4-13h.01M3 3h.01" /></svg> }
];

const ServicesSection = () => (
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
                    <a key={service.name} href={service.href} className="group bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-orange-400 mb-4 transition-colors duration-300 group-hover:text-orange-300">
                            {service.icon}
                        </div>
                        <h3 className="font-bold text-xl text-white">{service.name}</h3>
                    </a>
                ))}
            </div>
        </div>
    </section>
);


const teamMembers = [
    { name: 'Alex Johnson', role: 'Lead Video Editor', imageUrl: 'https://picsum.photos/id/237/200/200' },
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

const AboutSection = () => (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur opacity-20"></div>
                <img 
                    src="https://picsum.photos/seed/phyrux/800/600" 
                    alt="Creative process"
                    className="relative rounded-2xl w-full h-full object-cover"
                />
            </div>
            <div className="text-left">
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                    About Phyrux Commissions
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    At Phyrux, we are the architects of digital dreams. Born from a passion for pixels and stories, our commission-based studio is dedicated to bringing your unique visions to life. We believe collaboration is key, and we work closely with you to craft bespoke content that captivates and inspires.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                    From the first sketch to the final render, our mission is to merge artistry with technology, creating digital experiences that are not just seen, but felt. Let's create something extraordinary together.
                </p>
            </div>
        </div>
    </section>
);

export default function App() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <VideoPlayer />
        <ServicesSection />
        <TeamSection />
        <AboutSection />
      </main>
    </div>
  );
}
