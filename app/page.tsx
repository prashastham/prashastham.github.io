"use client";

import Link from "next/link";
import React from "react";
import { RandomReveal } from "react-random-reveal";
import { TypeAnimation } from 'react-type-animation';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import me from '../public/me.png';
import Springs from "./components/springs";

const navigation = [
  { name: "Blog 📄", href: "https://highbrow-ai.vercel.app/" },
  { name: "Contact 💬", href: "/contact" },
];

const springCount: number = 50;

function generateRandom(min = -750, max = 750) {

  // find diff
  let difference = max - min;

  // generate random number 
  let rand = Math.random();

  // multiply with difference 
  rand = Math.floor( rand * difference);

  // add with min value 
  rand = rand + min;

  return rand;
} 

export default function Home() {

  useGSAP(() => {
    // gsap code here...
    for (let i = 0; i < springCount; i++) {
        const springClass = ".spring" + i;
        gsap.to(springClass, { opacity: 1, x: generateRandom(), y: generateRandom(), rotation: generateRandom(-180, 180), duration: 2, ease: "power1.inOut", yoyo: true}); // <-- automatically reverted
    }

  }) // <-- scope for selector text (optional)

  return (
    <div className="fixed flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <nav className="z-40 my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item, index) => (
            <Link
                key={item.href}
                href={item.href}
                className={`link${index} text-2xl font-extrabold duration-500 text-slate-800`}
              >
              <button className="z-40 text-l font-extrabold h-14 w-48 backdrop-blur-lg flex items-center justify-center gap-3 px-8 rounded-full shadow-2xl border-solid border-slate-500  hover:bg-zinc-600  hover:text-zinc-300">
              {item.name}
              </button>
              
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="flex items-start justify-evenly gap-5">
        <h1 className="z-40 text-8xl text-transparent duration-1000 bg-slate-200 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        {"prashastha"}
        </h1>
        <span className="z-40 text-8xl text-transparent bg-transparent duration-1000 bg-slate-200 cursor-default text-edge-outline-2 animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        <RandomReveal
            isPlaying={true}
            duration={Infinity}
            revealDuration={0}
            updateInterval={1.5}
            characterSet={[
              "+ML",
              "+WebDev",
              "+Robotics",
              "+DataScience",
              "+Research"
            ]}
            characters=" "
          />
        </span>
      </div>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="z-40 my-16 text-center animate-fade-in">
        <div className="z-40 text-l font-extrabold text-zinc-100 h-14 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center gap-3 px-8 rounded-full shadow-2xl">
          {">_ "}<div className="font-mono"><TypeAnimation sequence={["Hey There! I'm Prashastha Mudannayake 🤠😜", 1000, "I like to build stuff and put it up on the internet ⚡🚀", 1000, 'Have a carzy idea? 💡 Get in touch with me 🤙🏽',
        1000,
        'Want to learn something new? Check out my blog! 🔎',
        1000]} wrapper="span" speed={25} repeat={Infinity} /> </div>
        </div>
      </div>
      <div className="z-50 absolute bottom-0 right-0 mix-blend-multiply..."><img src={me.src} height={550} width={550} alt="me"/></div>
      <Springs quantity={springCount} />
    </div>
  );
}
