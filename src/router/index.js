import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Todo from '../components/Todo.vue'

const routes = [
  { path: '/', redirect: '/signup' },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { 
    path: '/todo', 
    component: Todo,
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('access_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  } else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    return '/todo'
  }
  

  return true
})

export default router