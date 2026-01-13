import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Experience', 'Menu', 'Reservations', 'Contact'];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out px-6 py-6 flex justify-between items-center ${isScrolled ? 'bg-taj-black/90 backdrop-blur-md py-4' : 'bg-transparent'
                    }`}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-taj-gold font-serif text-2xl font-bold tracking-widest cursor-pointer"
                >
                    TAJ MAHAL
                    <span className="block text-[10px] font-sans text-taj-sandalwood tracking-[0.3em] uppercase opacity-80">
                        Vandanam
                    </span>
                </motion.div>

                <div className="hidden md:flex gap-12 items-center">
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white/80 hover:text-taj-gold font-sans text-xs tracking-[0.2em] uppercase transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-taj-gold transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: 0.5 }}
                        className="px-6 py-2 border border-taj-gold text-taj-gold font-sans text-xs tracking-[0.2em] uppercase hover:bg-taj-gold hover:text-taj-black transition-all duration-500"
                    >
                        Book Table
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-taj-gold z-50 p-2"
                >
                    <div className={`w-8 h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : 'mb-2'}`} />
                    <div className={`w-8 h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45' : ''}`} />
                </button>
            </nav>

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
