import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// HDRI Environment Map Setup
export default async function setupHDRI(scene, renderer) {
	// Initialize PMREM Generator for HDR Environment Mapping
	const pmremGenerator = new THREE.PMREMGenerator(renderer);
	pmremGenerator.compileEquirectangularShader();
	const loader = new RGBELoader();
	const texture = await loader.loadAsync('/studio_small.hdr');
	const envMap = pmremGenerator.fromEquirectangular(texture).texture;
	scene.environment = envMap; // Set as the environment map for the scene
	texture.dispose(); // Dispose of the texture to free memory
	pmremGenerator.dispose(); // Clean up the generator
}
