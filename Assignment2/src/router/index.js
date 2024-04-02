import { createRouter, createWebHistory } from 'vue-router'
import Teachers from '../views/Teachers.vue'
import Students from '../views/Students.vue'
import Login from '../views/Login.vue'
import Details from '../views/Details.vue'

import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Teachers',
    component: Teachers,
    meta: {
      requiresAuth: 'admin'
    }
  },
  {
    path: '/:Pid',
    name: 'Update',
    component: Teachers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Students',
    name: 'Students',
    component: Students,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Details',
    name: 'Details',
    component: Details,
    meta: {
      requiresAuth: 'student'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router
