import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import "./styles.css";
import App from "./App";

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <a
        href="https://pmnd.rs/"
        style={{ position: "absolute", top: 40, left: 90, fontSize: "13px" }}
      >
        Testing pmndrs examples
      </a>
      <div
        style={{ position: "absolute", top: 40, right: 40, fontSize: "13px" }}
      >
        31/10/2022
      </div>
    </div>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Overlay />
  </>
);
