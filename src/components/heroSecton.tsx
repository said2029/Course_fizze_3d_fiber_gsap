"use client";
import React from "react";
import { TextSplitter } from "./TextSplite";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero_scane from "./Hero_scane";
import { View } from "@react-three/drei";
import Header from "./Header";
import { Bubbles } from "./Bubbles";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSecton({}: Props) {
  const isDesktop = useMediaQuery("(min-width:768px)", true);
  useGSAP(() => {
    const introTi = gsap.timeline();
    introTi
      .from(".hero-header-word .split-word", {
        scale: 3,
        opacity: 0,
        delay: 0.3,
        stagger: 1,
        ease: "power4.in",
      })
      .from(
        ".hero-subHeader",
        {
          opacity: 0,
          y: 30,
        },
        "+=.8",
      )
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 20,
        rotateX: "90deg",
      });

    // scroll trigger
    const scrollTi = gsap.timeline({
      scrollTrigger: {
        trigger:".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
      },
    });

    scrollTi
      .fromTo(
        "body",
        { backgroundColor: "#FACC15" },
        { backgroundColor: "#D9F99D", overwrite: "auto" },
        1,
      )
      .from(".text-side-hero .split-char", {
        y: 40,
        opacity: 0,
        stagger: 1,
        scale: 1.2,
        duration: 3,
        rotateZ: 30,
        ease: "back.out(3)",
      },"+=3")
      .from(".text-side-hero p", {
        y: 20,
        opacity: 0,
      });
  });
  return (
    <div className="hero relative">
      <Header />
      {isDesktop && (
        <View className="pointer-events-none sticky top-0 -mt-[100vh] h-screen w-screen">
          <Hero_scane />
          <Bubbles count={300} repeat={true} speed={2} />
        </View>
      )}

      <div className="flex w-full flex-col items-center justify-center gap-11">
        <h1 className="hero-header-word text-center font-sans text-8xl font-extrabold uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[10rem]">
          <TextSplitter wordDisplayStyle="block" text="Live Gutsy" />
        </h1>
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="hero-subHeader text-4xl font-semibold text-sky-950 lg:text-5xl">
            Soda Perfected
          </h2>
          <p className="hero-body font-medium text-sky-950">
            3-5g sugar. 9g fiber. 5 delicious flavors.
          </p>
          <button className="hero-button mt-6 rounded-lg bg-orange-600 p-3 px-3 font-sans text-xl font-thin uppercase tracking-wider text-white transition-colors duration-300 hover:bg-orange-700">
            Shop Now
          </button>
        </div>
      </div>

      <div className="text-side-hero px-14 my-96 grid grid-cols-1 text-center md:grid-cols-2 md:text-start">
        <div className="z-[40] order-2 space-y-3 md:order-1">
          <h2 className="font-sans text-7xl font-semibold uppercase text-sky-950 md:text-[3rem]">
            <TextSplitter text="Try all five flavors" />
          </h2>
          <p className="text-sky-900">
            Our soda is made with real fruit juice and a touch of cane sugar. We
            never use artificial sweeteners or high fructose corn syrup. Try all
            five flavors and find your favorite!
          </p>
        </div>
        <div className="md:hidden">Image</div>
      </div>
      <div className="h-[100px]"> </div>
    </div>
  );
}
