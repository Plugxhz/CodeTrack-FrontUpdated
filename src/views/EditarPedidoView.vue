<template>
  <main class="max-w-4xl mx-auto px-6 py-8">
    <div class="mb-6">
      <router-link to="/pedidos" class="text-[#48A6A7] hover:underline flex items-center gap-2">
        ← Voltar para pedidos
      </router-link>
    </div>

    <h1 class="text-3xl font-bold mb-6">Editar Pedido #{{ pedido?.id }}</h1>

    <form @submit.prevent="atualizarPedido" class="bg-[#d8e5d3] p-6 rounded-xl shadow-md space-y-6" v-if="pedido">
      <div>
        <label for="clienteNome" class="block font-semibold mb-1">Nome do Cliente</label>
        <input
          id="clienteNome"
          type="text"
          v-model="pedido.cliente.nome"
          class="w-full p-2 rounded border border-gray-300 bg-gray-200"
          disabled
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Itens do Pedido</label>
        <ul class="list-disc list-inside max-h-40 overflow-auto bg-white p-3 rounded border border-gray-300">
          <li
            v-for="(pp, index) in pedido.pedidoProdutos"
            :key="pp.produto.id"
            class="flex justify-between items-center"
          >
            <span>{{ pp.produto.nome }} - R$ {{ pp.produto.preco.toFixed(2) }}</span>
            <button
              type="button"
              @click="removerProduto(index)"
              class="text-red-500 hover:text-red-700 font-bold"
              title="Remover produto"
            >
              ×
            </button>
          </li>
          <li v-if="pedido.pedidoProdutos.length === 0" class="text-gray-500">
            Nenhum produto no pedido.
          </li>
        </ul>
      </div>

      <div>
        <label for="novoProduto" class="block font-semibold mb-1">Adicionar Produto (Código de Barra)</label>
        <div class="flex gap-2">
          <input
            id="novoProduto"
            v-model="codigoNovoProduto"
            type="text"
            placeholder="Digite o código de barra"
            class="flex-grow p-2 rounded border border-gray-300"
          />
          <button
            type="button"
            @click="adicionarProduto"
            class="bg-[#48A6A7] text-white px-4 py-2 rounded hover:bg-[#3e9798] transition"
          >
            Adicionar
          </button>
        </div>
        <p v-if="erroAdicionar" class="text-red-600 mt-1">{{ erroAdicionar }}</p>
      </div>

      <button
        type="submit"
        class="bg-[#48A6A7] text-white px-5 py-2 rounded hover:bg-[#3e9798] transition"
      >
        Salvar Alterações
      </button>
    </form>

    <p v-else>Carregando pedido...</p>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pedido: null,
      codigoNovoProduto: "",
      erroAdicionar: "",
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
        alert("Erro ao carregar pedido para edição.");
      }
    },

    removerProduto(index) {
      this.pedido.pedidoProdutos.splice(index, 1);
    },

    async adicionarProduto() {
      this.erroAdicionar = "";
      const codigo = this.codigoNovoProduto.trim();
      if (!codigo) {
        this.erroAdicionar = "Por favor, digite um código de barra válido.";
        return;
      }

      if (this.pedido.pedidoProdutos.some(pp => pp.produto.codigoDeBarra === codigo)) {
        this.erroAdicionar = "Este produto já está no pedido.";
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7136/api/produto/codigodebarra/${codigo}`);
        const produto = response.data;

        if (!produto || !produto.codigoDeBarra) {
          this.erroAdicionar = "Produto inválido retornado pela API.";
          return;
        }

        this.pedido.pedidoProdutos.push({ produto });
        this.codigoNovoProduto = "";
      } catch (error) {
        console.error(error);
        this.erroAdicionar = "Produto não encontrado com este código de barra.";
      }
    },

    async atualizarPedido() {
      try {
        const produtosParaAtualizar = this.pedido.pedidoProdutos.map(pp => ({
          CodigoDeBarra: pp.produto.codigoDeBarra,
        }));

        const pedidoDTO = {
          clientecpf: this.pedido.cliente.cpf,
          produtos: produtosParaAtualizar,
        };

        await axios.put(`https://localhost:7136/api/pedido/${this.pedido.id}`, pedidoDTO);
        alert("Pedido atualizado com sucesso!");
        this.$router.push(`/pedidos/${this.pedido.id}`);
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar pedido.");
      }
    },
  },
};
</script>
