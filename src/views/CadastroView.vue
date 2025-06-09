<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="w-80">
      <div class="text-[#5eccc1]">
        <router-link to="/" class="btn-back mb-8 inline-flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="ml-2">Voltar para o início</span>
        </router-link>
      </div>

      <div class="max-w-md mx-auto">
        <div class="card p-8 rounded-lg bg-white border w-500">
          <h1 class="text-2xl font-bold text-center mb-6">Criar Conta</h1>

          <form action="" @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input type="text" v-model="nome" name="" id="" class="border rounded-md w-full p-1">
              <!-- <input
                type="text"
                id="nome"
                v-model="usuario.nome"
                class="input-primary"
                placeholder="Digite seu nome completo"
                required
              /> -->
            </div>
            <div>
              <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input type="text" v-model="cpf" class="border rounded-md w-full p-1">
              <!-- <input
                type="tel"
                id="telefone"
                v-model="usuario.telefone"
                class="input-primary"
                placeholder="(00) 00000-0000"
              /> -->
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input type="email" v-model="email" name="" id="" class="border rounded-md w-full p-1">
              <!-- <input
                type="email"
                id="email"
                v-model="usuario.email"
                class="input-primary"
                placeholder="Digite seu email"
                required
              /> -->
            </div>



            <div>
              <label for="senha" class="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div class="relative">
                <input type="password" v-model="senha" class="border rounded-md w-full p-1">
                <!-- <input
                  :type="mostrarSenha ? 'text' : 'password'"
                  id="senha"
                  v-model="senha"
                  class="input-primary pr-10"
                  placeholder="Digite sua senha"
                  required
                /> -->
              </div>
            </div>

            <!-- <div class="flex items-center mt-4">
              <input type="checkbox">
               <input
                type="checkbox"
                id="termos"
                v-model="aceitouTermos"
                class="h-4 w-4 text-primary border-gray-300 rounded"
                required
              /> -->
            <!-- <label for="termos" class="ml-2 block text-sm text-gray-700">
                Eu concordo com os <a href="#" class="text-primary hover:underline">Termos de Uso</a> e <a href="#" class="text-primary hover:underline">Política de Privacidade</a>
              </label>
            </div>  -->

            <button type="submit" class="bg-[#5eccc1] rounded-md w-full text-white font-bold mt-6">
              Criar Conta
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Já tem uma conta?
              <router-link to="/login" class="text-[#5eccc1] hover:underline">
                Faça login
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
          <h3 class="text-lg font-semibold mb-2">Cadastro realizado com sucesso!</h3>
          <p class="text-gray-600 mb-6">Sua conta foi criada. Agora você pode fazer login no sistema.</p>
          <router-link to="/login"
            class="bg-[#5eccc1] text-white rounded-md px-4 py-2 font-semibold hover:bg-[#4cbdb4]">
            Fazer Login
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from '@/services/api';

export default {
  name: 'Cadastro',
  data() {
    return {
      modalVisivel: false,
      nome: '',
      cpf: '',
      email: '',
      senha: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("https://localhost:7136/api/Cliente", {
          nome: this.nome,
          cpf: this.cpf,
          email: this.email,
          senha: this.senha
        });

        console.log('Resposta da API:', response.data);
        this.modalVisivel = true;
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    },
    irParaLogin() {
      this.modalVisivel = false;
      this.$router.push('/login');
    }
  }
}
</script>

