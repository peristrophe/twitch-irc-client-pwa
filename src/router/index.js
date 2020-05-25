import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/views/Home.vue"
import Chat from "@/views/Chat.vue"
import MyPage from "@/views/MyPage.vue"

import Auth from "@/utils/auth"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chat/:channel",
    name: "Chat",
    props: true,
    component: Chat,
  },
  {
    path: "/auth",
    name: "Auth",
    beforeEnter() {
      window.location = Auth.URL
    }
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
