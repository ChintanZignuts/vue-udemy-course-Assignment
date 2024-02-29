<!-- component that display all post using TimeLineitem  -->
<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import { usePosts } from '../stores/posts'
import { Periods } from '../constants'

const postsStore = usePosts()
await postsStore.fetchPosts()
</script>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        href="#"
        v-for="period of Periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
        >{{ period }}</a
      >
    </span>
    <TimelineItem v-for="post of postsStore.filteredPost" :key="post.id" :post="post" />
  </nav>
</template>
