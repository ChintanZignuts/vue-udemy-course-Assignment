import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import NewPost from '../views/NewPost.vue'
import { useUsers } from '@/stores/users'
import ShowPost from '@/views/ShowPost.vue'
import EditPost from '@/views/EditPost.vue'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/posts/new',
      component: NewPost,
      beforeEnter: () => {
        const usersStore = useUsers()
        if (!usersStore.currentUserId) {
          return {
            path: '/'
          }
        }
      }
    },
    {
      path: '/post/:id',
      component: ShowPost
    },
    {
      path: '/post/:id/edit',
      component: EditPost
    }
  ]
})
