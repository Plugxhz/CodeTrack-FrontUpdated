<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const codigoDeBarras = ref('');
const modalErro = ref(false);
const produto = ref(null);

const router = useRouter();

function resetSearch() {
  codigoDeBarras.value = '';
  produto.value = null;
  modalErro.value = false;
}

async function handleSearch() {
  try {
    const response = await axios.get(`https://localhost:7136/api/produto/codigoDeBarra/${codigoDeBarras.value}`);
    if (response.data) {
      produto.value = response.data;

      // Redireciona direto para a página de detalhes se o produto for encontrado
      router.push({ name: 'ProdutoBuscadoDetalhe', params: { codigoDeBarras: codigoDeBarras.value } });
    } else {
      modalErro.value = true;
    }
  } catch (error) {
    modalErro.value = true;
  }
}
</script>

<template>
  <!-- Voltar -->
  <router-link to="/inicio" class="text-[#48A6A7] mt-4 text-sm hover:underline">
    ← Voltar para o início
  </router-link>

  <!-- Conteúdo principal -->
  <div class="text-center max-w-md w-full mt-10 px-4">
    <h1 class="text-xl font-bold text-gray-800 mb-2">Buscar Produtos</h1>
    <p class="text-gray-600 mb-6">Digite o código de barras do produto</p>

    <div class="mb-6 flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    </div>

    <!-- Formulário de busca -->
    <div class="flex gap-2 mb-8">
      <input
        v-model="codigoDeBarras"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Digite o código de barras"
        class="flex-1 border border-gray-300 rounded-md px-4 py-2"
      />
      <button
        @click="handleSearch"
        class="bg-[#48A6A7] text-white px-4 py-2 rounded-md hover:scale-105 transition"
      >
        Buscar
      </button>
    </div>

    <!-- Produto não encontrado -->
    <div v-if="modalErro" class="bg-white shadow rounded-md p-6">
      <div class="text-center">
        <svg class="h-12 w-12 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-lg font-semibold mb-2">Produto não encontrado</h2>
        <p class="text-gray-600 mb-4">Verifique o código de barras e tente novamente</p>
        <button @click="resetSearch" class="bg-[#48A6A7] text-white px-4 py-2 rounded hover:bg-[#3e9798]">Nova Busca</button>
      </div>
    </div>
  </div>
</template>