<script>
	import { onMount } from 'svelte';
	import Scene from '$lib/components/Scene.svelte';
	//여기에는 자바스크립트를 작성합니다.

	onMount(() => {
		// 여기에는 페이지가 로드될 때 실행할 자바스크립트 코드를 작성합니다.
	});
</script>

<main>
	<!-- 여기에는 HTML을 작성합니다. -->
	<div>
		<h1>배포테스트, <br />OOMG의 방에 오신 것을 <br />환영합니다.</h1>
	</div>
</main>
<Scene />

<style>
	/* 여기에는 CSS를 작성합니다. */
	main {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		border: 1px solid red;
	}
</style>
