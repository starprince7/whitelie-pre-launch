"use client";

import React from "react";
import Link from "next/link";
import YouTubeEmbed from "./YouTubeEmbed";

const HeroSection = () => {
  return (
    <section className="relative bg-white dark:bg-black text-neutral-800 dark:text-white py-32 sm:py-40">
      <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]"></div>
      <div className="container mx-auto px-8 lg:px-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300">
          Hire a <span className="text-amber-400">boo ✨</span> today for <br />{" "}
          Business and Social Occasions
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
          Rent a boyfriend or girlfriend for corporate functions, networking
          events, and social engagements. Our platform facilitates strictly
          platonic, professional companionship on a contractual basis.
        </p>

        <div className="mt-20 max-w-xs mx-auto">
          <h3 className="text-center text-2xl font-bold mb-8">
          WATCH VIDEO <br />See How It Works
          </h3>
          <YouTubeEmbed
            embedId="y9TaEiCsO90"
            title="WhiteLie Concept Explainer"
          />
        </div>
        <div className="mt-12">
          <Link
            href="/survey"
            className="inline-block bg-amber-400 text-black font-bold py-4 px-10 rounded-lg text-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
