import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SouthAfricaMap3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300); // Increased size even more for better visibility
    mountRef.current.appendChild(renderer.domElement);

    // Create a simplified Africa continent shape
    const shape = new THREE.Shape();
    // Approximate Africa's outline
    shape.moveTo(0, 2);
    shape.bezierCurveTo(1, 2, 2, 1, 2, 0);
    shape.bezierCurveTo(2, -1, 1, -2, 0, -2);
    shape.bezierCurveTo(-1, -2, -2, -1, -2, 0);
    shape.bezierCurveTo(-2, 1, -1, 2, 0, 2);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ 
      color: '#6B46C1',
      shininess: 100,
    });
    
    const africa = new THREE.Mesh(geometry, material);
    africa.scale.set(0.5, 0.5, 0.5);
    scene.add(africa);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      africa.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed bottom-8 left-8 z-50 bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-xl hover:scale-105 transition-transform duration-200 animate-float"
      style={{ width: '300px', height: '300px' }}
    />
  );
};

export default SouthAfricaMap3D;