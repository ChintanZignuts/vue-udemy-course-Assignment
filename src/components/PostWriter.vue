<script setup lang="ts">
import type { TimelinePost } from '@/posts'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  post: TimelinePost
}>()
const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
  console.log(contentEditable.value?.innerText)
})
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable">This is the post</div>
    </div>
    <div class="column">Preview</div>
  </div>
</template>
<style scoped></style>
