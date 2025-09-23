import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Wrench, Paintbrush2, Leaf, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const container = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.12 }
    }
};

const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const float = {
    initial: { y: 0 },
    animate: { y: [-4, 4, -4], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
};

export default function BrandFeature({

    title = 'Luxury & Comfort',
    subtitle = 'Crafted for modern living',
    description = 'Explore hand-finished pieces in solid wood, premium upholstery, and timeless forms,designed to elevate every room.',
    ctaText = 'Our Services',
    onCtaClick,
    heroImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop',
    logoUrl = 'https://placehold.co/200x200/2a211a/ffffff?text=Your+Brand',
    badges = [
        { icon: <Hammer size={20} className="text-amber-300" />, label: 'Custom Builds' },
        { icon: <Wrench size={20} className="text-amber-300" />, label: 'Expert Repairs' },
        { icon: <Paintbrush2 size={20} className="text-amber-300" />, label: 'Finishing Studio' },
        { icon: <Leaf size={20} className="text-amber-300" />, label: 'Sustainable Woods' },
        { icon: <ShieldCheck size={20} className="text-amber-300" />, label: '5‑Year Warranty' },
        { icon: <Truck size={20} className="text-amber-300" />, label: 'White‑Glove Delivery' }
    ],
    backgroundTexture = 'https://www.transparenttextures.com/patterns/wood-pattern.png'
}) {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-[60vh] md:min-h-[88vh] overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 md:py-16">
            {/* Wood grain base */}
            <div
                className="absolute inset-0"
                style={{ backgroundImage: `url(${backgroundTexture})` }}
                aria-hidden="true"
            />
            {/* Vignette + spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_70%_35%,rgba(255,255,255,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b08] via-[#15100c] to-[#0f0b08] opacity-95" />

            {/* Ambient glows for showroom lighting */}
            <div className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full blur-3xl bg-amber-300/10" />
            <div className="pointer-events-none absolute bottom-0 -left-10 h-72 w-72 rounded-full blur-3xl bg-rose-300/5" />

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="relative z-10 w-full max-w-6xl rounded-2xl border border-white/10 bg-[rgba(24,18,14,0.75)] backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
                {/* Top trim reminiscent of wood edge */}
                <div className="h-2 w-full rounded-t-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Left: Text block */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Logo medallion */}
                        <motion.div variants={item} className="mb-6 flex items-center gap-3">
                            <motion.div
                                variants={float}
                                initial="initial"
                                animate="animate"
                                className="h-12 w-12 rounded-full border border-white/15 bg-[#2a211a] p-1 overflow-hidden"
                            >
                                <img src={logoUrl} alt="Brand logo" className="h-full w-full object-cover rounded-full" />
                            </motion.div>


                            <button

                                className="text-sm text-stone-300">Showroom Collection</button>


                        </motion.div>

                        <motion.h1
                            variants={item}
                            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-50"
                        >
                            {title} <span className="text-amber-300">{subtitle}</span>
                        </motion.h1>

                        <motion.p variants={item} className="mt-4 text-stone-300/90 leading-relaxed max-w-lg">
                            {description}
                        </motion.p>

                        {/* Feature badges */}
                        <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
                            {badges.slice(0, 6).map((b, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        y: -2,
                                        boxShadow: '0px 6px 22px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.06)'
                                    }}
                                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[rgba(28,22,18,0.85)]/90 border border-white/10"
                                >
                                    {b.icon}
                                    <span className="text-sm font-medium text-stone-200">{b.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}


                        <motion.button
                            variants={item}
                            whileHover={{
                                scale: 1.04,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/services")}
                            className="group mt-8 inline-flex items-center gap-2.5 rounded-lg bg-amber-300 text-stone-900 font-semibold px-5 py-3 transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                            aria-label={ctaText}
                        >
                            {ctaText}
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                        </motion.button>



                        {/* Trust micro-copy */}
                        <motion.div variants={item} className="mt-6 text-sm text-stone-400 flex flex-wrap items-center gap-4">
                            <span>Solid hardwood frames</span>
                            <span className="opacity-40">•</span>
                            <span>Premium upholstery</span>
                            <span className="opacity-40">•</span>
                            <span>In‑showroom trials</span>
                        </motion.div>
                    </div>

                    {/* Right: Product hero with subtle parallax */}
                    <motion.div className="relative min-h-[360px] md:min-h-[560px] overflow-hidden rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
                        {/* Background image as showroom scene */}
                        <motion.img
                            key={heroImage}
                            src={heroImage}
                            alt="Showroom hero"
                            initial={{ scale: 1.06, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Dark vignette to ensure legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b08]/70 via-[#0f0b08]/20 to-transparent" />
                        {/* Floating accent card */}
                        <motion.div
                            variants={item}
                            className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[320px] rounded-xl border border-white/10 bg-[rgba(24,18,14,0.75)] backdrop-blur-sm p-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-stone-200 font-semibold">Walnut Lounge Chair</p>
                                    <p className="text-stone-400 text-sm">Hand‑finished • Italian leather</p>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom trim */}
                <div className="h-1.5 w-full rounded-b-2xl bg-gradient-to-r from-stone-700/40 via-stone-600/40 to-stone-700/40" />
            </motion.div>
        </section>
    );
}
