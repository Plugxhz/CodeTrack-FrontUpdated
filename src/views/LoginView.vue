<template>
  <div class="min-h-screen bg-background flex flex-col bg-[#f5f5f0]">
    <div class="w-80 mx-auto mt-20">
      <div class="text-[#5eccc1] mb-8">
        <router-link to="/" class="btn-back inline-flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="ml-2">Voltar para o início</span>
        </router-link>
      </div>

      <div class="card p-8 border-2 rounded-lg bg-white">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="input-primary w-full border rounded-md p-1"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div>
            <label for="senha" class="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div class="relative">
              <input
                :type="mostrarSenha ? 'text' : 'password'"
                id="senha"
                v-model="senha"
                class="input-primary pr-10 w-full border rounded-md p-1"
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                @click="mostrarSenha = !mostrarSenha"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {{ mostrarSenha ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="bg-[#5eccc1] text-white font-bold text-center w-full mt-6 rounded-md p-2"
          >
            Entrar
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Não tem uma conta?
            <router-link to="/cadastro" class="text-[#5eccc1] hover:underline">
              Cadastre-se
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de sucesso -->
  <div v-if="modalVisivel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Login realizado com sucesso!</h3>
        <button
          @click="irParaInicio"
          class="bg-[#5eccc1] text-white rounded-md px-4 py-2 font-semibold hover:bg-[#4cbdb4]"
        >
          Concluído
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      senha: '',
      mostrarSenha: false,
      modalVisivel: false,  // Adicionado para controlar modal
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('https://localhost:7136/api/Cliente/login', {
          email: this.email,
          senha: this.senha
        });

        console.log('Login bem-sucedido:', response.data);

        // Mostrar modal de sucesso
        this.modalVisivel = true;

      } catch (error) {
        console.error('Erro ao fazer login:', error);
        if (error.response && error.response.status === 401) {
          alert('Email ou senha inválidos.');
        } else {
          alert('Erro ao conectar-se com o servidor.');
        }
      }
    },
    irParaInicio() {
      this.modalVisivel = false;
      this.$router.push('/inicio');
    }
  }
};
</script>
