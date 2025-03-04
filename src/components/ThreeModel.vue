<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = ref<HTMLDivElement>()

onMounted(() => {
  if (!container.value) return

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#282828')

  const camera = new THREE.OrthographicCamera(
    (-8 * window.innerWidth) / window.innerHeight,
    (8 * window.innerWidth) / window.innerHeight,
    8,
    -8,
    0.1,
    1000,
  )

  const light = new THREE.DirectionalLight('#FFF', 7)
  light.position.set(2, 2, 3)
  scene.add(light)

  const controls = new OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true

  const loader = new GLTFLoader()
  loader.load(
    '/models/penrose_triangle.glb',
    (gltf) => {
      const model = gltf.scene
      scene.add(model)

      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      controls.update()

      const maxSize = Math.max(size.x, size.y, size.z)
      camera.position.set(maxSize * 1.5, maxSize * 1.5, maxSize * 1.5)
      camera.lookAt(0, 0, 0)
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error)
    },
  )

  function animate() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<template>
  <section>
    <h4>Obstacle is just an illusion!</h4>
    <div ref="container" class="three-container"></div>
  </section>
</template>

<style scoped>
h4 {
  color: #ff6347;
  font-weight: bold;
}
.three-container {
  display: block;
  width: 40rem;
  height: 20rem;
}
</style>
