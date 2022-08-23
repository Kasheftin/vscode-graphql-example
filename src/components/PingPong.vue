<template>
  <div>
    here
    {{ hello }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hello = ref('here')

onMounted(() => {
  hello.value = 'here after mount'
})
</script>
