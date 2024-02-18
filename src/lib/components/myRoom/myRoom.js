import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class MyRoom {
	constructor(scene, camera, renderer) {
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.loader = new GLTFLoader();

		//방 만들기 실행
		this.createRoom();
	}

	//방 만들기 실행 함수
	createRoom() {
		// 룸 그룹 생성
		this.roomGroup = new THREE.Group();
		this.scene.add(this.roomGroup);

		// 방 바닥과 방 벽 만들기
		this.createWalls();

		//전화 부스 설치rend
		this.createPhoneBooth();

		//이메일 부스 설치
		this.createEmailBooth();

		//sns 부스 설치
		this.createSNSBooth();

		//기타 오브젝트 추가
		this.addObj();

		//그림자 설정
		this.setShadow();
	}

	// 방 바닥과 벽 만들기 함수
	createWalls() {
		// 바닥 만들기
		const floorGeometry = new THREE.BoxGeometry(1.5, 0.05, 1.5);
		const floorMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 1,
			roughness: 0
		});
		const floor = new THREE.Mesh(floorGeometry, floorMaterial);

		// 바닥 위치 조정
		floor.position.y = -0.025;

		// 바닥을 룸 그룹에 추가
		this.roomGroup.add(floor);

		//벽 만들기
		const wallGeometry = new THREE.BoxGeometry(1.5, 4, 0.05);
		const wallMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 1,
			roughness: 0
		});
		const wall = new THREE.Mesh(wallGeometry, wallMaterial);

		//벽 위치 조정
		wall.position.z = -0.75;
		wall.position.y = 2;
		this.roomGroup.add(wall);
	}

	//전화 부스 설치
	createPhoneBooth() {
		//전화 부스 그룹 생성
		this.phoneGroup = new THREE.Group();
		this.phoneGroup.position.set(-1, 0, -1);
		this.scene.add(this.phoneGroup);

		//전화 부스 가이드 만들기
		const phoneGuideGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
		const phoneGuideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: true });
		const phoneGuide = new THREE.Mesh(phoneGuideGeometry, phoneGuideMaterial);
		this.phoneGroup.add(phoneGuide);
	}

	//이메일 부스 설치
	createEmailBooth() {
		//이메일 부스 그룹 생성
		this.emailGroup = new THREE.Group();
		this.emailGroup.position.set(1, 0, -1);
		this.scene.add(this.emailGroup);

		//이메일 부스 가이드 만들기
		const emailGuideGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
		const emailGuideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: true });
		const emailGuide = new THREE.Mesh(emailGuideGeometry, emailGuideMaterial);
		this.emailGroup.add(emailGuide);
	}

	//sns 부스 설치
	createSNSBooth() {
		//sns 부스 그룹 생성
		this.snsGroup = new THREE.Group();
		this.snsGroup.position.set(1, 0, 1);
		this.scene.add(this.snsGroup);

		//sns 부스 가이드 만들기
		const snsGuideGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
		const snsGuideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: true });
		const snsGuide = new THREE.Mesh(snsGuideGeometry, snsGuideMaterial);
		this.snsGroup.add(snsGuide);
	}

	addObj() {
		//의자 glb 모델 로드
		this.loader.load('model/stool_chair.glb', (gltf) => {
			this.chair = gltf.scene;

			this.chair.position.set(0.3, 0, -0.5);
			this.chair.rotateY(Math.PI + (-45 * Math.PI) / 180);

			//그림자 설정
			this.chair.traverse((child) => {
				//색상 변경
				if (child.material) {
					child.material.color.set(0x006241);
				}
				if (child instanceof THREE.Mesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			this.roomGroup.add(this.chair);
		});

		//테이블 glb 모델 로드
		this.loader.load('model/round_table.glb', (gltf) => {
			this.table = gltf.scene;
			this.table.scale.set(0.0008, 0.0008, 0.0008);
			this.table.position.set(0, 0, 0.2);

			//그림자 설정
			this.table.traverse((child) => {
				//색상 변경
				if (child.material) {
					child.material.color.set(0x006241);
				}

				if (child instanceof THREE.Mesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			this.roomGroup.add(this.table);
		});
	}
	//그림자 설정
	setShadow() {
		this.roomGroup.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}
}
