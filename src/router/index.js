import { createWebHistory, createRouter } from "vue-router";
import CharacterScreen from "@/components/CharacterScreen";
import StartScreen from '@/components/StartScreen'
import MapScreen from '@/components/MapScreen';

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
  {
    path: '/map',
    name: 'MapScreen',
    component: MapScreen,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router