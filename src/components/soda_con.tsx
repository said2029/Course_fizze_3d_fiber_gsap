import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from "three";

const Matelmaterial=new THREE.MeshStandardMaterial({
    roughness:0.3,
    metalness:1,
    color:"#bbbbbb",
})
const flavoerTexture={
    cherry:"/labels/cherry.png",
    grape:"/labels/grape.png",
    lemon:"/labels/lemon-lime.png",
    strawberry:"/labels/strawberry.png",
    watermelon:"/labels/watermelon.png",
}

type SodaCanProps={
flavor?:keyof typeof flavoerTexture,
scale?:number
}
export default SodaCanProps;

export function Soda_Con({flavor="cherry",scale=2}:SodaCanProps) {

    const labes=useTexture(flavoerTexture);
    labes.cherry.flipY=false;
    labes.grape.flipY=false;
    labes.lemon.flipY=false;
    labes.strawberry.flipY=false;
    labes.watermelon.flipY=false;
    

  const { nodes } = useGLTF('/models/Soda-can.gltf')
  return (
    <group scale={scale} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylinder?.geometry}
        material={Matelmaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylinder_1?.geometry}
        material={nodes.cylinder_1?.material}
        
      >
        <meshStandardMaterial metalness={1} roughness={0} map={labes[flavor]}/>
      </mesh>
      <mesh  geometry={nodes.Tab?.geometry} material={Matelmaterial} />
    </group>
  )
}

useGLTF.preload('/models/Soda-can.gltf')