<template>
    <v-container>
      <v-card>
        <v-card-title>
          Usuários
          <v-spacer />
          <v-btn @click="dialog = true" color="primary">Novo Usuário</v-btn>
        <v-select
          v-model="selectedJob"
          :items="roles"
          item-title="name"
          item-value="uuid"
          label="Filtrar por Cargo"
          clearable
          class="mb-4 w-50 float-right"
    />
        </v-card-title>
        
        <v-data-table :headers="headers" :items="filteredUsers" class="elevation-1">
          <template #item.actions="{ item }">
            <v-btn icon color="blue" size="small" @click="editUser(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" size="small" @click="deactivateUser(item.uuid)">
              <v-icon>mdi-lock</v-icon>
            </v-btn>
          </template>
          <template #item.is_active="{ item }">
            <v-badge :content="item.is_active ? 'Ativo' : 'Bloqueado'" :color="item.is_active ? 'success' : 'warning'">

            </v-badge>

          </template>

          <template #no-data>
            <v-alert type="info">Nenhum usuário cadastrado.</v-alert>
          </template>
        </v-data-table>
      </v-card>

      <!-- Dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="form.name" label="Nome" />
            <v-text-field v-model="form.email" label="Email" />
            <v-text-field v-model="form.password" label="Senha" :type="'password'" v-if="!isEditing" />
            <v-select
              v-model="form.job"
              :items="roles"
              item-title="name"
              item-value="uuid"
              label="Cargo"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="primary" @click="saveUser">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const users = ref([]);
const roles = ref([]);
const dialog = ref(false);
const isEditing = ref(false);
const currentUserId = ref('');
const selectedJob = ref<string | null>(null);

const form = ref({
  name: '',
  email: '',
  password: '',
  job: ''
});

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Cargo', key: 'job.name' },
  { title: 'Status', key: 'is_active' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const filteredUsers = computed(() => {
  if (!selectedJob.value) {
    return users.value;
  }
  return users.value.filter((user) => user.job_id === selectedJob.value);
});

function closeDialog() {
  dialog.value = false;
  isEditing.value = false;
  form.value = { name: '', email: '', password: '', job: '' };
}

async function loadUsers() {
  const response = await api.get('/users');
  users.value = response.data;
}

async function loadRoles() {
  const response = await api.get('/jobs');
  roles.value = response.data;
}

function editUser(user: any) {
  const job = roles.value.find(job => job.uuid === user.job_id)
  isEditing.value = true;
  dialog.value = true;
  currentUserId.value = user.uuid;
  form.value = {
    name: user.name,
    email: user.email,
    password: '',
    job: job.uuid
  };
}

async function saveUser() {
  if (isEditing.value) {
    console.log(form.value)
    await api.put(`/users/${currentUserId.value}`, {
      name: form.value.name,
      job_id: form.value.job,
    });
  } else {
    await api.post('/users', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      job_id: form.value.job,
    });
  }

  closeDialog();
  loadUsers();
}

async function deactivateUser(id: string) {
  await api.patch(`/users/${id}`);
  loadUsers();
}

onMounted(() => {
  loadUsers();
  loadRoles();
});
</script>
