<template>
    <v-container>
      <v-card>
        <v-card-title>
          Cargos
          <v-spacer />
          <v-btn @click="dialog = true" color="primary">Novo Cargo</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="roles" class="elevation-1">
          <template #no-data>
            <v-alert type="info">Nenhum cargo cadastrado.</v-alert>
          </template>
        </v-data-table>
      </v-card>

      
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>Adicionar Cargo</v-card-title>
          <v-card-text>
            <v-text-field v-model="name" label="Nome do cargo" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="createRole">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const roles = ref([]);
const dialog = ref(false);
const name = ref('');

const headers = [
  { title: 'ID', key: 'uuid' },
  { title: 'Nome', key: 'name' },
  { title: 'Criado em', key: 'created_at' },
];

async function loadRoles() {
  const response = await api.get('/jobs');
  roles.value = response.data;
  console.log(roles.value)
}

async function createRole() {
  await api.post('/jobs', { name: name.value });
  dialog.value = false;
  name.value = '';
  loadRoles();
}

onMounted(() => {
  loadRoles();
});
</script>
