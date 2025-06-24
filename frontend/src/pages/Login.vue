<template>
  <v-container
    fluid
    class="d-flex align-center justify-center bg-gradient fill-height"
  >
    <v-card
      class="pa-8"
      max-width="420"
      width="100%"
      elevation="12"
      rounded="xl"
    >
      <div class="text-center mb-6">
        <v-avatar color="primary" size="64">
          <v-icon size="36">mdi-account-circle</v-icon>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold mt-3">Bem-vindo de volta!</h2>
        <p class="text-body-2 text-medium-emphasis">
          Acesse sua conta para continuar
        </p>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          density="comfortable"
          :rules="emailRules"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="comfortable"
          :rules="passwordRules"
          class="mb-6"
        />

        <v-btn
          type="submit"
          block
          color="primary"
          size="large"
          rounded="lg"
          :loading="loading"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
];

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Mínimo 6 caracteres',
];

async function handleLogin() {
  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    router.push('/dashboard');
  } catch {
    alert('Falha no login, verifique suas credenciais');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
}
</style>
