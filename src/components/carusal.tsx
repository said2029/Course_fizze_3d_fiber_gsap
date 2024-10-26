"use client";

import { Environment, View } from "@react-three/drei";
import FlotingCan from "./flotingCan";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import SodaCanProps from "./soda_con";
import { useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "watermelon", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemon", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberry",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

export default function Carusal() {
  const FloadingCan = useRef<Group>(null);
  const [indexFlavor, setIndexFlavor] = useState(0);
  const timeline = gsap.timeline();
  const SelectFlaver = (index: number) => {
    const IndexNumber = (index + FLAVORS.length) % FLAVORS.length;
    if (!FloadingCan?.current) return;
    gsap.set(FloadingCan?.current?.rotation, { y: 9.3 });
    timeline
      .to(FloadingCan?.current?.rotation, {
        y: `+=${Math.PI * 2 * 6}`,
      })
      .to(".word-name", {
        transform: "translateY(10px)",
        opacity: 0,
      },0)
      .to(
        {},
        {
          onStart: () => {
            setIndexFlavor(IndexNumber);
          },
        },0
      ).to(".word-name", {
        y: -12,
        opacity: 1,
      });
  };
  return (
    <div className="relative flex bg-red-500 h-[100vh] w-screen flex-col items-center pt-4">
      <div
        style={{
          backgroundColor: FLAVORS[indexFlavor].color,
        }}
        className="absolute inset-0 left-0 top-0 -z-20"
      />
      <h1 className="font-sans text-4xl text-white">Choass</h1>
      <div className="h-full w-full">
        <div className="grid h-full w-full grid-cols-[auto,auto,auto]">
          <div className="grid place-content-center">
            <button
              onClick={() => {
                SelectFlaver(indexFlavor - 1);
              }}
              className="grid h-16 w-16 place-content-center rounded-full bg-white/50 outline outline-2 outline-offset-2 outline-white"
            >
              <MdOutlineArrowForwardIos
                className="rotate-180"
                size={38}
                color="white"
              />
            </button>
          </div>
          <View className="h-full w-full">
            <group position={[0, 0, 1.3]}>
              <FlotingCan
                ref={FloadingCan}
                flavor={FLAVORS[indexFlavor].flavor}
                rotationIntensity={0}
                speed={2}
                floatIntensity={.6}
              />
            </group>
            <Environment files={"/hdr/lobby.hdr"} />
          </View>
          <div className="grid place-content-center">
            <button
              onClick={() => {
                SelectFlaver(indexFlavor + 1);
              }}
              className="grid h-16 w-16 place-content-center rounded-full bg-white/50 outline outline-2 outline-offset-2 outline-white"
            >
              <MdOutlineArrowForwardIos size={38} color="white" />
            </button>
          </div>
          <div className="absolute bottom-0 z-40 flex min-h-14 w-full flex-col items-center justify-center text-white">
            <h1 className="word-name font-sans text-xl uppercase">
              {FLAVORS[indexFlavor].name}
            </h1>
            <p className="text-lg">12$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
