<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="white"
      elevation="2"
    >
      <v-list nav dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
          router
          class="nav-item"
        >
        <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.value"></v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark elevation="2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>IPDV Sistema</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout" title="Sair">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const drawer = ref(true);
const router = useRouter();
const auth = useAuthStore();

const menuItems = [
  { title: 'Dashboard', to: '/dashboard', icon: 'mdi-view-dashboard', value: 'dashboard' },
  { title: 'Usuários', to: '/users', icon: 'mdi-account-multiple', value: 'usuarios' },
  { title: 'Cargos', to: '/roles', icon: 'mdi-account-cog', value: 'cargos' },
];

const logout = () => {
  auth.logout();
  router.push('/');
}
</script>
<style scoped>
.nav-item {
  display: flex;
}
</style>