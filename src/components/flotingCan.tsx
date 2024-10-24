import { Float } from '@react-three/drei'
import React, { forwardRef, ReactNode } from 'react'
import { Soda_Con } from './soda_con'
import SodaCanProps from './soda_con'
import { Group } from 'three'

type flotingProps = {
    flavor?:SodaCanProps["flavor"],
    speed?: number,
    rotationIntensity?: number,
    floatIntensity?: number, floatingRange?: [number], children?: ReactNode
}

const flotingCan = forwardRef<Group, flotingProps>(({children,flavor,floatingRange=[-0.1,0.1],floatIntensity=2,rotationIntensity=2,speed=1,...props},ref) => {
    return (
        <group ref={ref} {...props}>
            <Float  speed={speed} rotationIntensity={ rotationIntensity} floatIntensity={floatIntensity} floatingRange={floatingRange }>
                <Soda_Con flavor={flavor} scale={1.9} />
                {children}
            </Float>
        </group>
    )
})

flotingCan.displayName = "FlotingCan"

export default flotingCan