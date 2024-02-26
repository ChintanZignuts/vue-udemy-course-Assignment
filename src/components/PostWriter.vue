<script setup lang="ts">
import type { TimelinePost } from '@/posts'
import { ref, onMounted, watch, watchEffect } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

//this alos works instead of using watch
// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult
//   })
// })

//but watch gives more readability
watch(
  content,
  (newContent) => {
    marked.parse(newContent, (err, parseResult) => {
      html.value = parseResult
    })
  },
  {
    immediate: true
  }
)

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})
function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}
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
      <div contenteditable ref="contentEditable" @input="handleInput">{{ content }}</div>
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>
<style scoped></style>
