import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [opacity, setOpacity] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Fade out as we scroll down. 
            // 0 - 150px: Opacity 1 -> 0
            const scrollPos = window.scrollY;
            const newOpacity = Math.max(0, 1 - scrollPos / 150);
            setOpacity(newOpacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Experience', 'Menu', 'Reservations', 'Contact'];

    return (
        <>
            <motion.nav
                style={{ opacity }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-none ${opacity <= 0 ? 'pointer-events-none' : 'pointer-events-auto'}`}
            >
                <div
                    className="text-taj-gold font-serif text-2xl font-bold tracking-widest cursor-pointer"
                >
                    TAJ MAHAL
                    <span className="block text-[10px] font-sans text-taj-sandalwood tracking-[0.3em] uppercase opacity-80">
                        Vandanam
                    </span>
                </div>

                <div className="hidden md:flex gap-12 items-center">
                    {navItems.map((item, i) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-white/80 hover:text-taj-gold font-sans text-xs tracking-[0.2em] uppercase transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-taj-gold transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <button
                        className="px-6 py-2 border border-taj-gold text-taj-gold font-sans text-xs tracking-[0.2em] uppercase hover:bg-taj-gold hover:text-taj-black transition-all duration-500"
                    >
                        Book Table
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                {/* Always visible if menu is open, otherwise fades with nav */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-taj-gold z-50 p-2"
                    style={{ pointerEvents: 'auto' }} // Always clickable
                >
                    <div className={`w-8 h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : 'mb-2'}`} />
                    <div className={`w-8 h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45' : ''}`} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-taj-black/95 z-40 flex flex-col justify-center items-center"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 * i }}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-taj-sandalwood font-serif text-3xl mb-8 tracking-widest hover:text-taj-gold transition-colors"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
