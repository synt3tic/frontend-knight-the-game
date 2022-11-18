import { createWebHistory, createRouter } from "vue-router";
import CharacterScreen from "@/components/CharacterScreen";
import StartScreen from '@/components/StartScreen'

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen,
  },
  {
    path: '/character',
    name: 'CharacterScreen',
    component: CharacterScreen,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router