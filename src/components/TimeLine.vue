<script setup lang="ts">
import { computed, ref } from 'vue'
import { today, thisWeek, thisMonth } from '../posts'
import type { TimelinePost } from '../posts'
import { DateTime } from 'luxon'
import TimelineItem from './TimelineItem.vue'
import { usePosts } from '../stores/posts'
const periods = ['Today', 'This Week', 'This Month'] as const
const postsStore = usePosts()
type Period = (typeof periods)[number]
const selectedPeriod = ref<Period>('Today')

const selectPeriod = (arg: Period) => {
  selectedPeriod.value = arg
}
const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created)
      }
    })
    .filter((post) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ day: 1 })
      }
      if (selectedPeriod.value === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 })
      }
      return post
    })
})
</script>
<template>
  {{ postsStore.foo }}
  <button @click="postsStore.updateFoo('bar')">Update</button>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        href="#"
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
        >{{ period }}</a
      >
    </span>
    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
