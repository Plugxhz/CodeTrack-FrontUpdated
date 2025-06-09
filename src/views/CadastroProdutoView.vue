<template>
  <div class="min-h-screen bg-[#F4F5F7]">
    <!-- Voltar -->
    <div class="p-6">
      <router-link to="/inicio" class="flex items-center text-[#48A6A7] hover:underline">
        <span class="text-2xl mr-2">←</span> Voltar para o início
      </router-link>
    </div>

    <!-- Conteúdo -->
    <main class="max-w-3xl mx-auto px-6">
      <div class="bg-[#DDE5D9] rounded-xl p-8">
        <h2 class="text-3xl font-bold mb-8">Cadastro de Produto</h2>

        <div class="space-y-6">
          <!-- Nome -->
          <div>
            <label class="block mb-1 text-gray-800">Nome do Produto</label>
            <input
              v-model="produto.nome"
              type="text"
              placeholder="Digite o nome do produto"
              class="w-full px-4 py-3 rounded-lg bg-[#E7E9EB] outline-none"
            />
          </div>

          <!-- Descrição -->
          <div>
            <label class="block mb-1 text-gray-800">Descrição</label>
            <textarea
              v-model="produto.descricao"
              rows="3"
              placeholder="Digite a descrição do produto"
              class="w-full px-4 py-3 rounded-lg bg-[#E7E9EB] outline-none"
            ></textarea>
          </div>

          <!-- Preço, Código e Imagem -->
          <div class="flex flex-col sm:flex-row gap-6">
            <div class="flex-1">
              <label class="block mb-1 text-gray-800">Preço (R$)</label>
              <input
                v-model="produto.preco"
                type="text"
                placeholder="0,00"
                class="w-full px-4 py-3 rounded-lg bg-[#E7E9EB] outline-none"
              />
            </div>
            <div class="flex-1">
              <label class="block mb-1 text-gray-800">Código de barras</label>
              <input
                v-model="produto.codigoDeBarra"
                type="text"
                placeholder="Digite o código"
                class="w-full px-4 py-3 rounded-lg bg-[#E7E9EB] outline-none"
              />
            </div>
            <div class="flex-1">
              <label class="block mb-1 text-gray-800">Imagem do Produto</label>
              <input
                type="file"
                @change="onFileChange"
                accept="image/*"
                class="w-full px-4 py-3 rounded-lg bg-[#E7E9EB] outline-none"
              />
            </div>
          </div>

          <!-- Botão de Enviar -->
          <div class="pt-6">
            <button
              @click="handleSubmit"
              class="bg-[#48A6A7] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3c9091]"
            >
              Cadastrar Produto
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de sucesso -->
    <div v-if="modalVisivel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Cadastro realizado com sucesso!</h3>
          <p class="text-gray-600 mb-6">O produto foi adicionado ao catálogo.</p>
          <router-link to="/listagem" class="bg-[#5eccc1] text-white rounded-md px-4 py-2 font-semibold hover:bg-[#4cbdb4]">
            Concluído
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api';

export default {
  name: 'CadastroProduto',
  data() {
    return {
      modalVisivel: false,
      produto: {
        nome: '',
        descricao: '',
        preco: '',
        codigoDeBarra: '',
        imagem: null
      }
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.produto.imagem = file;
      }
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('nome', this.produto.nome);
        formData.append('descricao', this.produto.descricao);
        formData.append('preco', `${this.produto.preco}`);

        formData.append('codigoDeBarra', this.produto.codigoDeBarra);
        if (this.produto.imagem) {
          formData.append('imagem', this.produto.imagem);
        }

        const response = await axios.post('https://localhost:7136/api/Produto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Produto cadastrado:', response.data);
        this.modalVisivel = true;
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        if (error.response && error.response.data) {
          alert('Erro: ' + error.response.data);
        } else {
          alert('Erro desconhecido ao cadastrar o produto.');
        }
      }
    }
  }
};
</script>