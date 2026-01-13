import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const dishes = [
    {
        id: 1,
        title: 'Hyderabadi Dum Biriyani',
        desc: 'The crown jewel. Basmati rice and marinated meat, slow-cooked in a sealed handi.',
        image: '/dishes/biriyani.png',
    },
    {
        id: 2,
        title: 'Mutton Rogan Josh',
        desc: 'Aromatic Kashmiri curry with tender lamb, brilliant red chilies, and yogurt.',
        image: '/dishes/roganjosh.png',
    },
    {
        id: 3,
        title: 'Paneer Tikka',
        desc: 'Cottage cheese cubes marinated in spices and grilled to perfection in a tandoor.',
        image: '/dishes/paneer.png',
    },
    {
        id: 4,
        title: 'Shahi Tukda',
        desc: 'Royal dessert of fried bread soaked in saffron milk and garnished with nuts.',
        image: '/dishes/dessert.png',
    },
];

const DishGallery = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-taj-charcoal">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">

                    {/* Intro Card */}
                    <div className="min-w-[400px] flex flex-col justify-center">
                        <h2 className="font-serif text-6xl text-taj-gold mb-6">Signature <br /> Creations</h2>
                        <div className="w-20 h-1 bg-taj-amber mb-6"></div>
                        <p className="font-sans text-taj-sandalwood leading-relaxed">
                            Culinary masterpieces crafted with heritage recipes and modern finesse.
                            Scroll to explore.
                        </p>
                    </div>

                    {dishes.map((dish) => (
                        <div key={dish.id} className="group relative min-w-[500px] h-[600px] overflow-hidden rounded-sm cursor-none">
                            <img
                                src={dish.image}
                                alt={dish.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-taj-black/90 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                            <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                                <h3 className="font-serif text-3xl text-white mb-2">{dish.title}</h3>
                                <div className="w-0 h-[1px] bg-taj-gold mb-4 transition-all duration-500 group-hover:w-full" />
                                <p className="font-sans text-taj-sandalwood text-sm opacity-0 transform translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                                    {dish.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DishGallery;
