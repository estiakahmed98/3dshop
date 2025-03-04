// import Link from "next/link";
// import React from "react";
// import Logo from "../Logo";
// import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// import { FiYoutube } from "react-icons/fi";

// const Social = () => {
//   return (
//     <div className="flex flex-col gap-4">
//       <Logo />
//       <div className="flex flex-row gap-4">
//         <Link
//           href="#"
//           className="flex items-center justify-center rounded-full bg-white p-1"
//         >
//           <FaInstagram className="text-stone-950" />
//         </Link>
//         <Link
//           href="#"
//           className="flex items-center justify-center rounded-full bg-white p-1"
//         >
//           <FaFacebookF className="text-stone-950" />
//         </Link>
//         <Link
//           href="#"
//           className="flex items-center justify-center rounded-full bg-white p-1"
//         >
//           <FaTwitter className="text-stone-950" />
//         </Link>
//         <Link
//           href="#"
//           className="flex items-center justify-center rounded-full bg-white p-1"
//         >
//           <FiYoutube className="text-stone-950" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <div className="container max-w-[1024px] mx-auto pt-32 relative z-20">
//       <div className="flex flex-col gap-12 md:flex-row justify-between pb-8 px-8">
//         <Social />
//         <div className="flex flex-col gap-8">
//           <div className="w-32 flex flex-col gap-2">
//             <p className="p-xs font-semibold text-slate-400">Location:</p>
//             <p>Tower 71, ECB Chattar, Dhaka Cantornment, Dhaka</p>
//           </div>
//           <div className="w-32 flex flex-col gap-2">
//             <p className="p-xs font-semibold text-slate-400">Phone:</p>
//             <p>+88-01842781978</p>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 text-sm text-slate-400">
//           <Link href="#">Home</Link>
//           <Link href="#catalog">Catalog</Link>
//           <Link href="#">About</Link>
//           <Link href="#">Contact us</Link>
//           <Link href="#">Privacy policy</Link>
//         </div>
//       </div>

//       <hr className="px-16 border-slate-400" />

//       <div className="w-full flex flex-col-reverse gap-y-2 md:flex-row items-center justify-between py-4 text-xs text-slate-400">
//         <p>&copy; https://birdsofeden.me/</p>
//         <p> Contsct Us | atservice@birdsofeden.me</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;

"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Logo from "../Logo";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import * as THREE from "three";

// ✅ Correct dynamic imports for GLTFLoader & OrbitControls
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ✅ Proper Type Definitions
interface KeyboardModelProps {
  modelSrc: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

const KeyboardModel: React.FC<KeyboardModelProps> = ({
  modelSrc,
  position,
  rotation,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ✅ Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // ✅ Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(150, 150);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // ✅ Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // ✅ Load model
    const loader = new GLTFLoader();
    let keyboard: THREE.Group | null = null;

    loader.load(
      modelSrc,
      (gltf) => {
        keyboard = gltf.scene;
        keyboard.position.set(position.x, position.y, position.z);
        keyboard.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(keyboard);
      },
      undefined,
      (error: Error) => console.error("Error loading model:", error)
    );

    // ✅ Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;

    // ✅ Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (keyboard) {
        keyboard.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // ✅ Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelSrc, position, rotation]);

  return <div ref={mountRef} className="w-[150px] h-[150px]" />;
};

const Social = () => {
  return (
    <div className="flex flex-col gap-4">
      <Logo />
      <div className="flex flex-row gap-4">
        {[
          { Icon: FaInstagram, link: "#" },
          { Icon: FaFacebookF, link: "#" },
          { Icon: FaTwitter, link: "#" },
          { Icon: FiYoutube, link: "#" },
        ].map(({ Icon, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex items-center justify-center rounded-full bg-white p-1"
          >
            <Icon className="text-stone-950" />
          </Link>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="container max-w-[1024px] mx-auto pt-32 relative z-20">
      <div className="flex flex-col gap-12 md:flex-row justify-between pb-8 px-8">
        <Social />
        <div className="flex flex-col gap-8">
          <div className="w-32 flex flex-col gap-2">
            <p className="p-xs font-semibold text-slate-400">Location:</p>
            <p>Tower 71, ECB Chattar, Dhaka Cantornment, Dhaka</p>
          </div>
          <div className="w-32 flex flex-col gap-2">
            <p className="p-xs font-semibold text-slate-400">Phone:</p>
            <p>+88-01842781978</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-400">
          {["Home", "Catalog", "About", "Contact us", "Privacy policy"].map(
            (item, index) => (
              <Link key={index} href={index === 1 ? "#catalog" : "#"}>
                {item}
              </Link>
            )
          )}
        </div>
      </div>

      {/* ✅ 3D Keyboard Models */}
      <div className="w-full flex justify-center gap-8 py-8">
        {[
          {
            modelSrc: "/assets/keyboard1.glb",
            imgSrc: "/assets/keyboard1.png",
          },
          {
            modelSrc: "/assets/keyboard2.glb",
            imgSrc: "/assets/keyboard2.png",
          },
        ].map(({ modelSrc, imgSrc }, index) => (
          <div key={index} className="relative">
            <KeyboardModel
              modelSrc={modelSrc}
              position={{ x: 0, y: 0, z: 0 }}
              rotation={{ x: 0.3, y: 0, z: 0 }}
            />
            <img
              src={imgSrc}
              alt={`Keyboard ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 object-contain"
            />
          </div>
        ))}
      </div>

      <hr className="px-16 border-slate-400" />

      <div className="w-full flex flex-col-reverse gap-y-2 md:flex-row items-center justify-between py-4 text-xs text-slate-400">
        <p>&copy; https://birdsofeden.me/</p>
        <p>Contact Us | atservice@birdsofeden.me</p>
      </div>
    </div>
  );
};

export default Footer;
