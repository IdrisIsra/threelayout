import * as THREE from "three";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useIntersect,
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import { AnimatedModel } from "./AnimatedModel";

function Box() {
  // This reference will give us direct access to the mesh
  const data = useScroll();
  const meshRef = useRef<THREE.Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.x += 0.01;
    if (data.offset < 0.57) {
      meshRef.current.position.y = (1 - data.offset * 1.75) * -100;
    }
    if (data.offset > 0.57) {
      meshRef.current.position.z = (data.offset - 0.57) * 10;
    }
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      position={[3, 1, 0]}
      ref={meshRef}
      scale={active ? 1.5 : 1.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Item({
  url,
  scale,
  ...props
}: {
  url: string;
  scale: any;
  position: any;
}) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible)) as any;
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 0 : 1,
      4,
      delta
    );
  });
  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
        matrixWorldAutoUpdate
        getObjectsByProperty
        getVertexPosition
      />
    </group>
  );
}

function Items() {
  const { width: w, height: h } = useThree((state: any) => state.viewport);
  return (
    <Scroll>
      <Item url="/8.jpg" scale={[w / 3, w / 3, 1]} position={[-w / 6, 0, 0]} />
      <Item url="/7.jpg" scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item
        url="/6.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url="/1.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url="/2.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url="/3.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url="/4.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url="/5.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[w / 3.5, -h * 3.1, 0]}
      />
      <Item
        url="/9.jpg"
        scale={[w / 2.5, w / 2, 1]}
        position={[-w / 4, -h * 4.1, 0]}
      />
    </Scroll>
  );
}

function App() {
  return (
    <Canvas gl={{ alpha: false, antialias: false, stencil: false }}>
      <Preload all />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <color attach="background" args={["#f0f0f0"]} />
      <ScrollControls damping={1} pages={10}>
        <Items />
        <AnimatedModel />
        <Box />
        {/* 
@ts-ignore annoying issue with Scroll not being able to take style prop when it actually can */}
        <Scroll html style={{ width: "100%" }}>
          <h1
            style={{
              position: "absolute",
              top: `100vh`,
              right: "20vw",
              fontSize: "25em",
              transform: `translate3d(0,-100%,0)`,
              color: "white",
            }}
          >
            all
          </h1>
          <h1 style={{ position: "absolute", top: "180vh", left: "10vw" }}>
            hail
          </h1>
          <h1 style={{ position: "absolute", top: "260vh", right: "10vw" }}>
            thee,
          </h1>
          <h1 style={{ position: "absolute", top: "350vh", left: "10vw" }}>
            hermes
          </h1>
          <h1 style={{ position: "absolute", top: "450vh", right: "5vw" }}>
            tris
            <br />
            megistus.
          </h1>
        </Scroll>
      </ScrollControls>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default App;
