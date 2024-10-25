import { Environment } from '@react-three/drei'
import React, { useRef } from 'react'
import FlotingCan from "./flotingCan";
import { Group } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type Props = {}

export default function Hero_scane({ }: Props) {
    const can1Ref = useRef<Group>(null);
    const can2Ref = useRef<Group>(null);
    const can3Ref = useRef<Group>(null);
    const can4Ref = useRef<Group>(null);
    const can5Ref = useRef<Group>(null);

    const CanGroup1 = useRef<Group>(null);
    const CanGroup2 = useRef<Group>(null);

    const groupRef=useRef<Group>(null);

    useGSAP(()=>{
        if(
            !can1Ref.current||
            !can2Ref.current||
            !can3Ref.current||
            !can4Ref.current||
            !can5Ref.current||
            !CanGroup1.current||
            !CanGroup2.current||
            !groupRef.current
        )return;

        gsap.set(can1Ref.current?.position,{x:-1.4})
        gsap.set(can1Ref.current?.rotation,{z:-.4})
        gsap.set(can2Ref.current?.position,{x:1.4})
        gsap.set(can2Ref.current?.rotation,{z:.4})


        gsap.set(can3Ref.current?.position,{z:.4,y:10})
        gsap.set(can4Ref.current?.position,{x:1,y:-10})
        gsap.set(can5Ref.current?.position,{y:4})
        const introTi=gsap.timeline({
            defaults:{
                duration:3,
                ease:"back.out(1)"
            }
        })
        if(window.screenY <=20){

            introTi.from(CanGroup1.current.position,{y:-5,x:1},0)
            introTi.from(CanGroup1.current.rotation,{z:3},0)
            introTi.from(CanGroup2.current.position,{y:5,x:-1},0)
            introTi.from(CanGroup2.current.rotation,{z:3},0)
        }


        const scrollTi=gsap.timeline({
            defaults:{
                duration:2
            },
            scrollTrigger:{
                scrub:true,
                trigger:".hero",
                start:"top top",
                end:"bottom bottom"
            }
        })

        scrollTi.to(groupRef.current.rotation,{
            y:Math.PI*2
        })
        .to(can1Ref.current.position,{x:-.3,z:-.3},0)
        .to(can1Ref.current.rotation,{z:0},0)
        .to(can2Ref.current.position,{x:.2,z:.4},0)
        .to(can2Ref.current.rotation,{z:.3},0)
        .to(can3Ref.current.position,{x:.5,z:-.4,y:.2},0)
        .to(can4Ref.current.position,{x:1,z:-.9,y:.3},0)
        .to(can5Ref.current.position,{x:.9,z:.7,y:-.2},0).to(groupRef.current.position,{x:.3})

    })

    return (
        <group ref={groupRef}>
            <group ref={CanGroup1}>
                <FlotingCan ref={can1Ref} flavor={"cherry"} />
            </group>
            <group ref={CanGroup2}>
                <FlotingCan ref={can2Ref} flavor={"grape"} />
            </group>


            <FlotingCan ref={can3Ref} flavor={"lemon"} />
            <FlotingCan ref={can4Ref} flavor={"strawberry"} />
            <FlotingCan ref={can5Ref} flavor={"watermelon"} />




            <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
        </group>

    )
}