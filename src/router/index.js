import { createWebHistory, createRouter } from "vue-router";
import CharacterScreen from "@/components/CharacterScreen";
import StartScreen from '@/components/StartScreen'
import MapScreen from '@/components/MapScreen';
import BattleGround from '@/components/BattleGround'

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
  {
    path: '/battleground',
    name: 'BattleGround',
    component: BattleGround,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router