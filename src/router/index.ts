import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/views/Home.vue';
import Money from '@/views/Money.vue';
import Statistics from '@/views/Statistics.vue';
import EditTag from '@/components/money/tags/EditTag.vue';
import RemoveTag from '@/components/money/tags/RemoveTag.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Money',
    name: 'Money',
    component: Money,
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics,
  }, {
    path: '/Money/EditTag',
    name: 'EditTag',
    component: EditTag,
  },
  {
    path: '/Money/EditTag/RemoveTag/:id',
    name: 'RemoveTag',
    component: RemoveTag,
  },


]

const router = new VueRouter({
  routes
})

export default router
