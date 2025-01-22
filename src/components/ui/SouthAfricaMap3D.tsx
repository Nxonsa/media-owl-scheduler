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
    renderer.setSize(40, 40);
    mountRef.current.appendChild(renderer.domElement);

    // Create a simplified South Africa shape (cube for now, can be replaced with actual geometry)
    const geometry = new THREE.BoxGeometry(2, 1.5, 0.5);
    const material = new THREE.MeshPhongMaterial({ 
      color: '#6B46C1',
      shininess: 100,
    });
    const southAfrica = new THREE.Mesh(geometry, material);
    scene.add(southAfrica);

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
      southAfrica.rotation.y += 0.01;
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
      className="inline-block w-10 h-10 align-middle"
      style={{ marginRight: '8px' }}
    />
  );
};

export default SouthAfricaMap3D;