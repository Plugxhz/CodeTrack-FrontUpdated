<template>
    <div class="min-h-screen bg-background flex flex-col">
      <div class="flex-1">
        <div class="text-[#5eccc1]">
          <router-link to="/busca/codigo" class="btn-back mb-8 inline-flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="ml-2">Voltar para busca por código</span>
          </router-link>
        </div>
  
        <div class="max-w-7xl mx-auto" v-if="produto">
          <div class="card">
            <div class="p-6 md:p-8 bg-[#DDE5D9] rounded-md border-2">
              <h1 class="text-2xl font-bold mb-6">Detalhes do Produto</h1>
              <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/3">
                  <div class="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                    <img
                      :src="getImagemUrl(produto.imagemURL)"
                      :alt="produto.nome"
                      class="object-contain"
                      style="width: 250px; height: 250px;"
                    />
                  </div>
                </div>
  
                <div class="md:w-2/3">
                  <div class="mb-6">
                    <h2 class="text-xl font-bold text-gray-800">{{ produto.nome }}</h2>
                    <p class="text-gray-600 mt-2">{{ produto.descricao }}</p>
                  </div>
  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 class="text-sm font-medium text-gray-500 mb-1">Código de Barras</h3>
                      <p class="text-lg font-mono">{{ produto.codigoDeBarra }}</p>
                    </div>
  
                    <div>
                      <h3 class="text-sm font-medium text-gray-500 mb-1">Preço</h3>
                      <p class="text-2xl font-bold">{{ formatarPreco(produto.preco) }}</p>
                    </div>
                  </div>
  
                  <div class="flex gap-4">
                    <router-link to="/pedidos" class="p-1 flex items-center gap-2 bg-[#48A6A7] rounded-md text-white font-bold inline-block cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>Adicionar ao Pedido
                    </router-link>
                    <router-link to="/busca/codigo" class="border border-[#5eccc1] rounded-md font-semibold text-center items-center p-2">
                      Nova Busca
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else class="text-center py-12 text-gray-500">
          Carregando...
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        produto: null,
        erro: null
      }
    },
  
    async mounted() {
      const codigo = this.$route.params.codigoDeBarras
  
      try {
        const resposta = await axios.get(`https://localhost:7136/api/produto/codigoDeBarra/${codigo}`)
        this.produto = resposta.data
      } catch (erro) {
        this.erro = 'Produto não encontrado'
        console.error('Erro ao buscar produto por código de barras:', erro)
      }
    },
  
    methods: {
      getImagemUrl(url) {
        if (!url) return '/placeholder.svg?height=250&width=250'
  
        // For a adicionar o dom nio completo se for relativo
        if (!url.startsWith('http')) {
          return `https://localhost:7136/${url.replace(/^\/+/, '')}`
        }
  
        return url
      },
  
      formatarPreco(valor) {
        const numero = Number(valor)
        return numero.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    }
  }
  </script>
  