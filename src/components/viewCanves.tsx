"use client";
import { Loader, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

export default function ViewCanves() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          zIndex: 30,
          left: 0,
          pointerEvents: "none",
        }}
        camera={{ fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader/>
    </>
  );
}
