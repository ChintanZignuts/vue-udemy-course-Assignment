<script setup lang="ts">
import type { Post } from '@/posts'
import PostWriter from '../components/PostWriter.vue'
import { usePosts } from '@/stores/posts'
import { useRoute } from 'vue-router'
import { router } from '@/router'
const route = useRoute()
const postsStore = usePosts()
const id = route.params.id as string
const post = postsStore.all.get(id)
if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post)
  router.push('/')
}
</script>
<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
<style scoped></style>
