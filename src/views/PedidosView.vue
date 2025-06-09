<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <!-- Voltar -->
    <div class="mb-6">
      <router-link to="/inicio" class="flex items-center text-[#48A6A7] hover:underline">
        <span class="text-2xl mr-2">←</span> Voltar para o início
      </router-link>
    </div>

    <!-- Bloco principal -->
    <section class="bg-[#d8e5d3] p-8 rounded-2xl shadow-lg">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-3xl font-bold text-black">Pedidos</h1>
        <router-link
          to="/pedidos/cadastro"
          class="flex items-center gap-2 bg-[#48A6A7] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3e9798] transition"
        >
          <span class="text-xl">+</span> Novo Pedido
        </router-link>
      </div>

      <!-- Busca -->
      <div class="relative mb-6">
        <input
          v-model="termoBusca"
          type="text"
          placeholder="Buscar Pedido (nome do cliente)"
          class="w-full px-4 py-2 rounded-xl bg-[#e4e4e4] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
        />
        <img
          src="../assets/icons/search.png"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
        />
      </div>

      <!-- Tabela -->
      <div class="overflow-x-auto p-6">
        <table class="min-w-full p-4 text-left text-sm">
          <thead class="text-black font-semibold border-b border-gray-300">
            <tr>
              <th class="py-3 px-6">Nº</th>
              <th class="py-3 px-6">Cliente</th>
              <th class="py-3 px-6">Data</th>
              <th class="py-3 px-6">Itens</th>
              <th class="py-3 px-6">Total</th>
              <th class="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pedido, index) in pedidosFiltrados"
              :key="pedido.id"
              class="text-gray-800 p-6 border-b border-gray-200 hover:bg-[#f1f1f1]"
            >
              <td class="py-4 px-6">#{{ index + 1 }}</td>
              <td class="py-4 px-6">{{ pedido.cliente.nome }}</td>
              <td class="py-4 px-6">{{ formatarData(pedido.dataPedido) }}</td>
              <td class="py-4 px-6">{{ pedido.produtos.length }}</td>
              <td class="py-4 px-6">R$ {{ pedido.valorTotal.toFixed(2) }}</td>
              <td class="py-4 px-6 text-center flex items-center justify-center gap-3">
                <router-link :to="`/pedidos/${pedido.id}`">
                  <img
                    src="../assets/icons/eye.png"
                    class="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                    alt="Ver detalhes"
                  />
                </router-link>
                <button @click="excluirPedido(pedido.id)" title="Excluir produto">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600 hover:opacity-80" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v11a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm1 4a.5.5 0 011 0v8a.5.5 0 01-1 0V6zm3 .5a.5.5 0 00-1 0v8a.5.5 0 001 0v-8zm2.5-.5a.5.5 0 10-1 0v8a.5.5 0 001 0V6z" clip-rule="evenodd" />
  </svg>
</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pedidos: [],
      termoBusca: '',
    };
  },
  computed: {
    pedidosFiltrados() {
      if (!this.termoBusca) return this.pedidos;

      const termo = this.termoBusca.toLowerCase();
      return this.pedidos.filter(p =>
        p.cliente.nome.toLowerCase().includes(termo)
      );
    },
  },
  mounted() {
    this.buscarPedidos();
  },
  methods: {
    async buscarPedidos() {
      try {
        const response = await axios.get('https://localhost:7136/api/pedido');
        this.pedidos = response.data.map(pedido => {
          const produtos = (pedido.pedidoProdutos || [])
            .filter(pp => pp && pp.produto)
            .map(pp => pp.produto);

          return {
            ...pedido,
            produtos,
            cliente: pedido.cliente || { nome: 'Cliente não informado' },
            valorTotal: pedido.valorTotal || 0,
          };
        });
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar pedidos.');
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleDateString();
    },
    async excluirPedido(id) {
      if (confirm('Tem certeza que deseja excluir este pedido?')) {
        try {
          await axios.delete(`https://localhost:7136/api/pedido/${id}`);
          this.pedidos = this.pedidos.filter(p => p.id !== id);
          alert('Pedido excluído com sucesso!');
        } catch (error) {
          console.error(error);
          alert('Erro ao excluir pedido.');
        }
      }
    },
  },
};
</script>
