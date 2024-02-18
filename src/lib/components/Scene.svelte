<script>
	//여기에서 소스를 불러옵니다.
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

	import MyRoom from './myRoom/myRoom';
	import setupHDRI from './myRoom/Environment';

	//여기에서 변수를 선언합니다.
	let canvas, scene, camera, renderer;

	//여기에는 three.js 자바스크립트를 작성합니다.
	async function init() {
		// 기본 씬 설정
		scene = new THREE.Scene();

		// 카메라 설정
		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

		camera.position.x = 0;
		camera.position.y = 1.2;
		camera.position.z = 4;

		// // OrbitControls 설정
		// const controls = new OrbitControls(camera, canvas);
		// controls.update();

		// 렌더러 설정
		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);

		//그림자 옵션 설정
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.enabled = true;

		//HDRI 설정
		await setupHDRI(scene, renderer);

		//씬 3점 조명 설정
		const lightGroup = new THREE.Group();
		lightGroup.position.set(0, 0, 0);

		const light1 = new THREE.DirectionalLight(0xffffff, 1); //key light
		const light2 = new THREE.DirectionalLight(0xffffff, 0.5); //sub light
		const light3 = new THREE.DirectionalLight(0xffffff, 0.4); //back light
		light1.position.set(-3, 3, 3);
		light2.position.set(3, 3, 3);
		light3.position.set(0, 3, -3);
		//  씬 조명 그림자 옵션 활성화
		light1.castShadow = true;
		light2.castShadow = true;
		light3.castShadow = true;
		// 씬에 조명 추가
		lightGroup.add(light1);
		lightGroup.add(light2);
		lightGroup.add(light3);
		scene.add(lightGroup);

		//씬 조명 helper 설정
		const helper1 = new THREE.DirectionalLightHelper(light1, 1, 0x0000ff);
		const helper2 = new THREE.DirectionalLightHelper(light2, 1, 0x0000ff);
		const helper3 = new THREE.DirectionalLightHelper(light3, 1, 0x0000ff);

		scene.add(helper1);
		scene.add(helper2);
		scene.add(helper3);

		// 씬 오브젝트 설정

		//방 설정
		const myRoom = new MyRoom(scene, camera, renderer);

		//렌더 프레임 재생 옵션 설정
		function animate() {
			requestAnimationFrame(animate);

			renderer.render(scene, camera);
		}

		//렌더 프레임 재생
		animate();
	}

	onMount(async () => {
		await init();
	});
</script>

<canvas bind:this={canvas} />

<style>
	/* 여기에는 CSS를 작성합니다. */
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		min-width: 100%;
		width: 100%;
		min-height: 100%;
		height: 100%;
		border: 1px solid green;
		margin: 0;
		padding: 0;
	}
</style>
