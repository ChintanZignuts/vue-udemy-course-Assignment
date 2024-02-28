import { router } from './router/index'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUsers } from './stores/users'
import { usePosts } from './stores/posts'
import App from './App.vue'
const app = createApp(App)
app.use(createPinia())

const usersStore = useUsers()
const postsStore = usePosts()

Promise.all([usersStore.authenticate(), postsStore.fetchPosts()]).then(() => {
  app.use(router)
  app.mount('#app')
})
