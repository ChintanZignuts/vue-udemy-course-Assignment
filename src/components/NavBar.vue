<script setup lang="ts">
import { router } from '@/router'
import { useModal } from '../composables/modal'
import { useUsers } from '../stores/users'

const modal = useModal()
const usersStore = useUsers()
async function logout() {
  await usersStore.logout()
  router.push({ path: '/' })
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="usersStore.currentUserId">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button" @click="logout()">Log out</button>
      </div>
      <div class="buttons" v-else>
        <button class="button" @click="modal.showModal('signUp')">Sign up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
