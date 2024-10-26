"use client";
import { Environment, View } from "@react-three/drei";
import React, { useRef } from "react";
import FlotingCan from "./flotingCan";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function SodaInfo() {
  return (
    <div className="body-container_23fsd3333 relative">
      <div className="relative bg-yellow-500 text-white">
        <View className="view-3d-can pointer-events-none absolute left-0 top-0 h-screen w-full">
          <Scane />
          <Environment files={"/hdr/lobby.hdr"} />
        </View>
        <div className="sections_div grid h-screen w-full grid-cols-2 place-content-center px-6">
          <div className="space-y-2">
            <h1 className="text-balance text-3xl font-bold uppercase">
              Lorem ipsum dolor sit.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis dolores ullam aut tenetur dolorem optio debitis impedit
              temporibus rerum. Corrupti?
            </p>
          </div>
        </div>
        <div className="sections_div grid h-screen w-full grid-cols-2 place-content-center px-6">
          <div></div>
          <div className="space-y-2">
            <h1 className="font-sans text-3xl uppercase">
              Lorem ipsum dolor sit.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis dolores ullam aut tenetur dolorem optio debitis impedit
              temporibus rerum. Corrupti?
            </p>
          </div>
        </div>
        <div className="sections_div grid h-screen w-full grid-cols-2 place-content-center px-6">
          <div className="space-y-2">
            <h1 className="font-sans text-3xl uppercase">
              Lorem ipsum dolor sit.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis dolores ullam aut tenetur dolorem optio debitis impedit
              temporibus rerum. Corrupti?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Scane = () => {
  const CanRef_2 = useRef<Group>(null);

  useGSAP(() => {
    const sactions = gsap.utils.toArray(".sections_div");
    const scrollTi = gsap.timeline({
      scrollTrigger: {
        trigger: ".view-3d-can",
        endTrigger: ".body-container_23fsd3333",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        pin: true,
        scrub: true,
      },
    });
    sactions.forEach((_, index) => {
      if (!CanRef_2.current?.position) return;
      if (index === 0) return;
      const isOdd = index % 2 == 0;
      console.log("sactions.length  ", CanRef_2.current?.position);
      scrollTi.to(CanRef_2.current?.position, {
        x: isOdd ? "1" : "-1",
        ease:"circ.inOut"
      });
    });
  });

  return (
    <group position-x={1} rotation-y={1.3} ref={CanRef_2}>
      <FlotingCan/>
    </group>
  );
};
