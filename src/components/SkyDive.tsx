"use client";
import {
  Cloud,
  Clouds,
  Environment,
  Text,
  View,
} from "@react-three/drei";
import React, { useRef } from "react";
import FlotingCan from "./flotingCan";
import { Group } from "three";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type Props = {};

export default function SkyDive({}: Props) {
  return (
    <div className="skyDive">
      <View className="h-screen w-screen">
        <Scane />
        <Environment environmentIntensity={2} files={"/hdr/field.hdr"} />
        <ambientLight color={"#9ddffe"} intensity={1} />
      </View>
    </div>
  );
}

const Scane = () => {
  const CanRef = useRef<Group>(null);
  const GruopRef = useRef<Group>(null);
  const CloudsRef = useRef<Group>(null);
  const Cloud1 = useRef<Group>(null);
  const Cloud2 = useRef<Group>(null);
  const refWords = useRef<Group>(null);

  useGSAP(() => {
    if (
      !CanRef.current ||
      !GruopRef.current ||
      !CloudsRef.current ||
      !Cloud1.current ||
      !refWords.current ||
      !Cloud2.current
    )
      return;

    gsap.set(CloudsRef.current.position, { z: 2, y: 12 });
    gsap.set(CanRef.current.position, { x: -1, y: 5 });
    gsap.set(
      refWords.current.children.map((word) => word.position),
      { z: 7, y: -3, x: 1 },
    );
    gsap.to(CanRef.current.rotation, {
      y: Math.PI * 2,
      repeat: -1,
      ease: "none",
      duration: 1.4,
    });
    gsap.set(Cloud1.current.position, {
      x: 15,
      y: -15,
    });
    gsap.set(Cloud2.current.position, {
      x: 15,
      y: -15,
    });

    const DISTINCE = 15;
    const DURITION = 8;

    gsap.to(Cloud1.current.position, {
      x: -DISTINCE,
      y: DISTINCE,
      duration: DURITION,
      ease: "none",
      repeat: -1,
    });
    gsap.to(Cloud2.current.position, {
      x: -DISTINCE,
      y: DISTINCE,
      duration: DURITION,
      ease: "none",
      delay: DURITION / 2,
      repeat: -1,
    });

    const scrollTi = gsap.timeline({
      scrollTrigger: {
        trigger: ".skyDive",
        scrub: true,
        start: "top top",
        end: "+=2000",
        pin: true,
      },
    });
    scrollTi
      .to("body", { backgroundColor: "#c0f0f5", duration: 0.2 })
      .to(CloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(
        CanRef.current.position,
        {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "back.out",
        },
        "-=1",
      )
      .to(
        refWords.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -2 },
            { x: -3, y: 7, z: -7 },
          ],
          stagger: 0.4,
        },
      )
      .to(CanRef.current.position, {
        x: 1,
        y: -5,
        ease: "back.in(1.2)",
      })
      .to(GruopRef.current.position, {
        z: 7,
        duration: 0.5,
      });
  });
  return (
    <group ref={GruopRef}>
      <group rotation={[0, 0, 13]}>
        <FlotingCan
          ref={CanRef}
          speed={1}
          flavor="lemon"
          rotationIntensity={0}
          floatIntensity={0}
          floatingRange={[0, 0]}
        ><pointLight intensity={1} color={"red"} decay={1}/></FlotingCan>
      </group>
      <group ref={refWords}>
        <ThreeText color="yellow" text="mario gaming said bennana" />
      </group>
      <Clouds ref={CloudsRef}>
        <Cloud ref={Cloud1} bounds={[10, 10, 2]} />
        <Cloud ref={Cloud2} bounds={[10, 10, 2]} />
      </Clouds>
      {/* <OrbitControls /> */}
    </group>
  );
};

const ThreeText = ({
  text,
  color = "white",
}: {
  text: string;
  color?: string;
}) => {
  const words = text?.toUpperCase().split(" ");
  const isDesktop = useMediaQuery("(min-width:950px)", true);
  const matetil = new THREE.MeshLambertMaterial({ color: color });

  return words.map((word: string, index: number) => (
    <Text
      font="/fonts/Alpino-Variable.woff"
      material={matetil}
      color={color}
      fontWeight={900}
      anchorY={"middle"}
      anchorX={"center"}
      scale={isDesktop ? 2 : 0.5}
      key={`${word}-${index}`}
      characters="QWERTYUIOPASDFGHJKLZXCVBNM.,?!"
    >
      {word}
    </Text>
  ));
};
