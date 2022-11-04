import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";
import { AnimatedModel } from "./AnimatedModel";

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
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
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
      />
    </group>
  );
}

function Items() {
  const { width: w, height: h } = useThree((state: any) => state.viewport);
  return (
    <Scroll>
      <AnimatedModel
        scale={[w / 5, w / 5, w / 5]}
        position={[w / 4, -h * 0.9, 1]}
      />
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
    <Canvas
      orthographic
      camera={{ zoom: 80 }}
      gl={{ alpha: false, antialias: false, stencil: false }}
      dpr={[1, 1.5]}
    >
      <ambientLight />
      <color attach="background" args={["#f0f0f0"]} />
      <ScrollControls damping={6} pages={5}>
        <Items />
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
    </Canvas>
  );
}

export default App;
