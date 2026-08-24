'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
  'Different by design',
  'Unapologetically original',
  'Made to be experienced',
];

export default function BrandStory() {
  return (
    <section id="story" className="section-padding py-24 lg:py-32">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-av3ya-neon/20 via-transparent to-av3ya-purple/20 blur-sm" />
          <div className="relative overflow-hidden rounded-3xl border border-av3ya-neon/25 shadow-neon-sm">
            <Image
              src="/brand/hero-alt.png"
              alt="AV3YA streetwear in neon city light"
              width={900}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-av3ya-pink text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The story behind AV3YA
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
            Don&apos;t just wear the culture.{' '}
            <span className="text-av3ya-neon anime-glow-text">Experience it.</span>
          </h2>
          <div className="space-y-4 text-white/65 leading-relaxed">
            <p>
              AV3YA was created from a simple idea: clothing should be more than something you wear. It should be
              something you experience.
            </p>
            <p>
              Streetwear had become too predictable. The same silhouettes, logos, and ideas on repeat. We built AV3YA to
              challenge the ordinary and turn fashion into self-expression, confidence, creativity, and identity.
            </p>
            <p>
              You should not dress to fit into a crowd. You should dress to stand apart from it. Every piece is designed
              with intention, from graphics and textures to cuts and combinations that make people stop, look twice, and
              feel something.
            </p>
            <p>
              AV3YA is for the people who create their own lane, who are not afraid to be different, and who see fashion
              as a canvas rather than a uniform.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="px-4 py-2 rounded-full border border-av3ya-purple/40 text-sm text-av3ya-mist bg-av3ya-dark/80"
              >
                {item}
              </li>
            ))}
          </ul>

          <Link href="/shop" className="btn-primary mt-10 inline-flex">
            Explore the drop
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
