import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import HeroSequence from './components/HeroSequence';
import DishGallery from './components/DishGallery';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slightly faster than 2.0 for better response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true, // Enable for mobile to fix "floppy" feel
      touchMultiplier: 1.5, // Better touch tracking
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-taj-black min-h-screen text-white selection:bg-taj-gold selection:text-taj-black">
      <Navigation />
      <div id="experience">
        <HeroSequence />
      </div>
      <div id="menu">
        <DishGallery />
      </div>

      {/* Placeholder for Reservations/Contact to allow scrolling past */}
      <section id="reservations" className="h-screen bg-taj-amber flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/biriyani/ezgif-frame-140.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="text-center z-10 p-10 border border-taj-gold/30 bg-taj-black/80 backdrop-blur-sm">
          <h2 className="font-serif text-5xl text-taj-gold mb-6">Reservations</h2>
          <p className="font-sans text-taj-sandalwood mb-8 tracking-widest uppercase">Experience the royal heritage</p>
          <button className="px-8 py-3 bg-taj-gold text-taj-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Book a Table
          </button>
        </div>
      </section>

      <footer id="contact" className="bg-taj-black py-20 border-t border-taj-gold/20 text-center">
        <div className="font-serif text-3xl text-taj-gold mb-4">TAJ MAHAL</div>
        <div className="font-sans text-taj-sandalwood text-xs tracking-[0.3em] uppercase opacity-60">Vandanam</div>
      </footer>
    </main>
  );
}

export default App;
