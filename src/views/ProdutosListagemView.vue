<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="p-6">
      <router-link to="/inicio" class="flex items-center text-[#48A6A7] hover:underline">
        <span class="text-2xl mr-2">←</span> Voltar para o início
      </router-link>
    </div>

    <section class="bg-[#d8e5d3] p-8 rounded-2xl shadow-md overflow-x-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-black px-6">Listagem de Produtos</h1>
        <router-link to="/produtos/cadastro"
          class="flex items-center gap-2 bg-[#48A6A7] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3c9091]">
          <span class="text-xl">+</span> Novo Produto
        </router-link>
      </div>

      <div class="relative mb-6">
        <input v-model="termoBusca" type="text" placeholder="Buscar por nome ou código de barras"
          class="w-full px-4 py-2 pl-5 pr-10 rounded-xl bg-[#e4e4e4] text-gray-700 focus:outline-none" />
        <img src="@/assets/icons/search.png" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
      </div>

      <table class="w-full text-left table-auto">
        <thead class="text-black font-semibold border-b border-gray-400">
          <tr>
            <th class="pb-2 px-4 w-1/4">Nome</th>
            <th class="pb-2 px-4 w-1/4">Código de barras</th>
            <th class="pb-2 px-4 w-1/6">Preço</th>
            <th class="pb-2 px-4 w-1/6">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtosFiltrados" :key="produto.id"
            class="text-gray-800 border-b border-gray-300">
            <td class="py-4 px-6 break-words max-w-xs truncate" :title="produto.nome">
              {{ produto.nome }}
            </td>
            <td class="py-4 px-6 break-words max-w-xs truncate" :title="produto.codigoDeBarra">
              {{ produto.codigoDeBarra }}
            </td>
            <td class="py-4 px-6">
              {{ formatarPreco(produto.preco) }}
            </td>
            <td class="py-4 px-6 flex gap-4">
              <router-link :to="`/produtos/${produto.codigoDeBarra}`" class="inline-block">
                <img src="@/assets/icons/eye.png" class="w-6 h-4 cursor-pointer" />
              </router-link>
              <button @click="deletarProduto(produto.id)" title="Excluir produto">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600 hover:opacity-80" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v11a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm1 4a.5.5 0 011 0v8a.5.5 0 01-1 0V6zm3 .5a.5.5 0 00-1 0v8a.5.5 0 001 0V6zm2.5-.5a.5.5 0 10-1 0v8a.5.5 0 001 0V6z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      produtos: [],
      termoBusca: ''
    }
  },
  computed: {
    produtosFiltrados() {
      if (!this.termoBusca) return this.produtos

      const termo = this.termoBusca.toLowerCase()
      return this.produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.codigoDeBarra.toLowerCase().includes(termo)
      )
    }
  },
  mounted() {
    this.buscarProdutos()
  },
  methods: {
    async buscarProdutos() {
      try {
        const resposta = await axios.get('https://localhost:7136/api/Produto')
        this.produtos = resposta.data
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro)
      }
    },
    formatarPreco(valor) {
      const numero = Number(valor)
      return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    async deletarProduto(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
          await axios.delete(`https://localhost:7136/api/Produto/${id}`)
          this.produtos = this.produtos.filter(produto => produto.id !== id)
        } catch (erro) {
          console.error('Erro ao excluir produto:', erro)
          alert('Erro ao excluir produto.')
        }
      }
    }
  }
}
</script>

