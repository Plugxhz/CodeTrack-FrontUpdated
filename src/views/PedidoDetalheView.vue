<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-6">
      <router-link to="/pedidos" class="flex items-center text-[#48A6A7] hover:underline">
        <span class="text-2xl mr-2">←</span> Voltar para pedidos
      </router-link>
    </div>

    <section class="bg-[#d8e5d3] p-8 rounded-2xl shadow-lg">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-black">Detalhamento do Pedido</h1>
        <!-- Botão editar -->
        <router-link
          :to="`/pedidos/editar/${pedido?.id}`"
          class="bg-[#48A6A7] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3e9798] transition"
          v-if="pedido"
        >
          Editar
        </router-link>
      </div>

      <div v-if="pedido" class="text-gray-800 space-y-6">
        <!-- Informações do pedido -->
        <div class="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
          <h2 class="text-xl font-semibold text-black mb-2">Informações do Pedido</h2>
          <p><strong class="text-black">Número:</strong> #{{ pedido.id }}</p>
          <p><strong class="text-black">Cliente:</strong> {{ pedido.cliente?.nome || 'Não informado' }}</p>
          <p><strong class="text-black">Data:</strong> {{ formatarData(pedido.dataPedido) }}</p>
          <p><strong class="text-black">Total:</strong> R$ {{ pedido.valorTotal.toFixed(2) }}</p>
        </div>

        <!-- Itens -->
        <div>
          <h2 class="text-2xl font-semibold text-black mb-4">Itens do Pedido</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="pedidoProduto in pedido.pedidoProdutos"
              :key="pedidoProduto.produto.id"
              class="bg-white p-5 rounded-xl shadow flex gap-6"
            >
              <!-- Imagem maior -->
              <div class="flex-shrink-0 w-32 h-32 bg-white flex items-center justify-center">
                <img
                  :src="getImagemUrl(pedidoProduto.produto.imagemURL)"
                  alt="Produto"
                  class="w-full h-full object-contain rounded-lg"
                  @error="onImagemErro"
                />
              </div>
              <!-- Informações -->
              <div class="flex flex-col justify-between">
                <h3 class="text-xl font-semibold text-black">{{ pedidoProduto.produto.nome }}</h3>
                <p class="text-gray-600">R$ {{ pedidoProduto.produto.preco.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="text-gray-700">Carregando pedido...</p>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pedido: null,
    };
  },
  mounted() {
    this.carregarPedido();
  },
  methods: {
    async carregarPedido() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`https://localhost:7136/api/pedido/${id}`);
        this.pedido = response.data;
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar pedido.");
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleDateString();
    },
    getImagemUrl(url) {
      if (!url) return "/placeholder.svg?height=250&width=250";

      if (url.startsWith("https:localhost")) {
        url = url.replace("https:localhost", "https://localhost");
      }

      if (!url.startsWith("http")) {
        return `https://localhost:7136/${url.replace(/^\/+/, "")}`;
      }

      return url;
    },
    onImagemErro(event) {
      event.target.src = "/placeholder.svg?height=250&width=250";
    },
  },
};
</script>
