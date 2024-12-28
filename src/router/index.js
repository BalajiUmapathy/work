import { createRouter, createWebHistory } from 'vue-router';
import PortalSettings from '@/components/PortalSettings.vue';
import InstanceSection from '@/components/InstanceSection.vue';
import Footer from '@/components/Footer.vue';
import SearchBar from '@/components/SearchBar.vue';
import TopBar from '@/components/TopBar.vue';
import TopSection from '@/components/TopSection.vue';
import Storageform from '@/components/Storageform.vue';
import InventoryGrid from '../components/InventoryGrid.vue'; 
import InstanceGrid from '@/components/InstanceGrid.vue';  // Add this import

const routes = [
  {
    path: '/',
    name: 'App',
    component: TopSection // Assuming TopSection is the main view
  },
  {
    path: '/settings',
    name: 'PortalSettings',
    component: PortalSettings
  },
  {
    path: '/instance',
    name: 'InstanceSection',
    component: InstanceSection
  },
  {
    path: '/footer',
    name: 'Footer',
    component: Footer
  },
  {
    path: '/search',
    name: 'SearchBar',
    component: SearchBar
  },
  {
    path: '/topbar',
    name: 'TopBar',
    component: TopBar
  },
  {
    path: '/topsection',
    name: 'TopSection',
    component: TopSection
  },
  {
    path: '/storage',
    name: 'Storageform',
    component: Storageform
  },
  {
    path: '/instance-grid',  // Define the path for InstanceGrid
    name: 'InstanceGrid',    // Name for the route, used in navigation
    component: InstanceGrid // Specify the component to load
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
