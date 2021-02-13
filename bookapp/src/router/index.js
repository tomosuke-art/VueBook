import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from '@/pages/BookIndex'
import BookSearch from '@/pages/BookSearch'
import BookEdit from '@/pages/BookEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex
  },
  {
    path: '/search',
    name: 'BookSearch',
    component: BookSearch
  },
  {
    path: '/edit/:id', // idに応じた編集ページ
    name: 'BookEdit',
    component: BookEdit
  },
  // それ以外のURLはBookIndexに遷移
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
