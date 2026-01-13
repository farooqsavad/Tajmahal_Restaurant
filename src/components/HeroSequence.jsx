import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const frameCount = 147;
const padding = 3;

const currentFrame = (index) =>
    `/biriyani/ezgif-frame-${index.toString().padStart(padding, '0')}.jpg`;

const HeroSequence = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // DIRECT MAPPING - No Spring to remove "lag" or "float"
    // Lenis handles the smoothing of the scroll position itself.
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // Text Animations - STRICT SEQUENCING & NO OVERLAP

    // Phase 1: Intro (0 - 0.2) - "The Art of Biriyani"
    // VISIBLE AT START. Fades OUT as scroll starts.
    const opacityHead = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const yHead = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    // Subtext follows headline
    const opacitySub = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const ySub = useTransform(scrollYProgress, [0, 0.15], [0, -30]);

    // Phase 2: Right Text (0.3 - 0.5) - "Quality you can afford"
    // Enters from Right (x:100 -> 0), then Exit (opacity 1->0)
    const opacityQuality = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const xQuality = useTransform(scrollYProgress, [0.3, 0.35, 0.5], [100, 0, -50]);

    // Phase 3: Left Text (0.6 - 0.8) - "A Royal Legacy"
    // Enters from Left (x:-100 -> 0), then Exit (opacity 1->0)
    const opacityLegacy = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
    const xLegacy = useTransform(scrollYProgress, [0.6, 0.65, 0.8], [-100, 0, 50]);

    // Phase 4: CTA (0.9 - 1.0)
    const opacityCTA = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);
    const scaleCTA = useTransform(scrollYProgress, [0.9, 0.95], [0.9, 1]);

    useEffect(() => {
        const preloadImages = async () => {
            const promises = [];
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                promises.push(
                    new Promise((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(null); // Continue even if error
                    })
                );
                imagesRef.current[i] = img;
            }
            await Promise.all(promises);
            setImagesLoaded(true);
        };

        preloadImages();
    }, []);

    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Safety check for index boundaries
        let imgIndex = Math.round(index);
        if (imgIndex < 1) imgIndex = 1;
        if (imgIndex > frameCount) imgIndex = frameCount;

        const img = imagesRef.current[imgIndex];
        if (!img) return;

        // High DPI Handling
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Set actual size in memory (scaled to account for extra pixel density)
        // Reset scale if dimension changes
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
            ctx.scale(dpr, dpr);
        } else {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Ensure scale
        }

        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = height * imgRatio;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        }

        // Clear and Draw
        ctx.clearRect(0, 0, width, height);

        // Apply cinematic zoom (dolly-in)
        const scale = 1 + (index / frameCount) * 0.08;

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-width / 2, -height / 2);

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = 0; // Force re-calc
            renderFrame(frameIndex.get());
        };

        window.addEventListener('resize', resizeCanvas);

        // Render loop synced with motion value
        const unsubscribe = frameIndex.on("change", (latest) => {
            if (imagesLoaded) {
                requestAnimationFrame(() => renderFrame(latest));
            }
        });

        // Initial render
        if (imagesLoaded) renderFrame(1);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            unsubscribe();
        };
    }, [imagesLoaded, frameIndex]);

    if (!imagesLoaded) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-taj-black text-taj-gold font-serif tracking-widest z-50 fixed inset-0">
                LOADING EXPERIENCE...
            </div>
        );
    }

    return (
        <div ref={containerRef} className="h-[1000vh] relative bg-taj-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ width: '100%', height: '100%' }} />

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-taj-black/90 via-transparent to-taj-black/40 pointer-events-none" />
                <div className="absolute inset-0 bg-taj-amber/10 mix-blend-overlay pointer-events-none" />

                {/* Text 1: Center (Welcome) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 pointer-events-none">
                    <motion.h1
                        style={{ opacity: opacityHead, y: yHead }}
                        className="font-serif text-5xl md:text-8xl text-white mb-6 tracking-tight drop-shadow-2xl"
                    >
                        The Art of <span className="text-taj-gold italic">Biriyani</span>
                    </motion.h1>

                    <motion.p
                        style={{ opacity: opacitySub, y: ySub }}
                        className="font-sans text-taj-sandalwood text-sm md:text-lg tracking-[0.3em] uppercase max-w-xl leading-loose"
                    >
                        Welcome to Taj Mahal
                    </motion.p>
                </div>

                {/* Text 2: Right (Quality) */}
                <div className="absolute inset-0 flex items-center justify-end z-10 px-10 md:px-20 pointer-events-none">
                    <motion.div
                        style={{ opacity: opacityQuality, x: xQuality }}
                        className="text-right max-w-md"
                    >
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 leading-tight">
                            Quality you <br /> can <span className="text-taj-gold">afford</span>.
                        </h2>
                        <div className="w-full h-[1px] bg-gradient-to-l from-taj-gold to-transparent mb-4"></div>
                        <p className="font-sans text-taj-sandalwood text-sm tracking-widest uppercase opacity-80">
                            Uncompromised taste.
                        </p>
                    </motion.div>
                </div>

                {/* Text 3: Left (Legacy) */}
                <div className="absolute inset-0 flex items-center justify-start z-10 px-10 md:px-20 pointer-events-none">
                    <motion.div
                        style={{ opacity: opacityLegacy, x: xLegacy }}
                        className="text-left max-w-md"
                    >
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 leading-tight">
                            A Royal <br /> <span className="text-taj-gold">Legacy</span>
                        </h2>
                        <div className="w-full h-[1px] bg-gradient-to-r from-taj-gold to-transparent mb-4"></div>
                        <p className="font-sans text-taj-sandalwood text-sm tracking-widest uppercase opacity-80">
                            Slow cooked to perfection.
                        </p>
                    </motion.div>
                </div>

                {/* Second Text Phase / CTA at the end of the scroll */}
                <motion.div
                    style={{ opacity: opacityCTA, scale: scaleCTA }}
                    className="absolute bottom-20 left-0 right-0 flex justify-center z-20"
                >
                    <button className="group relative bg-transparent border border-taj-gold/50 px-10 py-4 overflow-hidden rounded-full transition-all hover:border-taj-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        <div className="absolute inset-0 w-0 bg-taj-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                        <span className="relative font-serif text-taj-gold text-xl tracking-widest">RESERVE A TABLE</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSequence;
