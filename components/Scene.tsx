"use client";
import { Canvas,useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
function Building({progress}:{progress:number}){const group=useRef<THREE.Group>(null);useFrame((s)=>{if(group.current){group.current.rotation.y=(s.pointer.x*.06)-.28;group.current.position.x=s.pointer.x*.12}});const solid=Math.max(0,(progress-.28)/.45);const warm=Math.max(0,(progress-.7)/.3);return <group ref={group} position={[.7,-.65,0]}>
 <gridHelper args={[18,32,"#75808a","#53606b"]} position={[0,-.01,0]} />
 {[[-2,1.25,0,.25,2.5,5],[1,1.5,-1.4,5,3,.22],[1,.12,0,5,.22,3],[-.2,1.05,-1.4,.18,2.1,3]].map((v,i)=><mesh key={i} position={[v[0],v[1]*Math.min(1,progress*2.8),v[2]]} scale={[v[3],Math.max(.03,v[4]*Math.min(1,progress*2.8)),v[5]]}><boxGeometry/><meshStandardMaterial color={i===2?"#c7c4ba":"#8e9495"} wireframe={solid<.15} transparent opacity={.2+solid*.72} roughness={.8}/></mesh>)}
 <mesh position={[1,.9,.1]} scale={[4.7,1.65,.03]}><boxGeometry/><meshStandardMaterial color="#73838d" transparent opacity={solid*.35} roughness={.1}/></mesh>
 <pointLight position={[1.2,.7,.4]} color="#ffb256" intensity={warm*9}/>
 </group>}
export default function Scene({progress}:{progress:number}){return <Canvas dpr={[1,1.5]} camera={{position:[0,2.2,7],fov:48}} gl={{antialias:true,powerPreference:"high-performance"}}><color attach="background" args={["#4b5964"]}/><fog attach="fog" args={["#66737b",8,18]}/><ambientLight intensity={1.5}/><directionalLight position={[-3,6,4]} intensity={2.2}/><Building progress={progress}/></Canvas>}
