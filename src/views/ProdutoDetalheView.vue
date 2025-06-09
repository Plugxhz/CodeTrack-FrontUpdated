<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="flex-1">
      <div class="text-[#5eccc1]">
        <router-link to="/listagem" class="btn-back mb-8 inline-flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="ml-2">Voltar para a listagem</span>
        </router-link>
      </div>

      <div class="max-w-7xl mx-auto" v-if="produto">
        <div class="card">
          <div class="p-6 md:p-8 bg-[#DDE5D9] rounded-md border-2">
            <h1 class="text-2xl font-bold mb-6">Detalhes do Produto</h1>

            <div v-if="!editando" class="flex flex-col md:flex-row gap-8">
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
                    <p class="text-2xl font-bold text-[#5eccc1]">{{ formatarPreco(produto.preco) }}</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <router-link to="/pedidos" class="p-1 flex items-center gap-2 bg-[#5eccc1] hover:bg-[#4bb1ad] rounded-md text-white font-bold inline-block cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>Adicionar ao Pedido
                  </router-link>
                  <router-link to="/listagem" class="border border-[#5eccc1] rounded-md font-semibold text-center items-center p-2">
                    Nova Busca
                  </router-link>
                  <button @click="iniciarEdicao" class="bg-[#5eccc1] hover:bg-[#4bb1ad] text-white hover:text-500 text-white font-semibold px-4 py-2 rounded-md">
                    Editar
                  </button>
                </div>
              </div>
            </div>

            <!-- Formulário de edição -->
            <div v-else class="flex flex-col md:flex-row gap-8">
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
                <h2 class="text-xl font-bold mb-4">Editar Produto</h2>

                <form @submit.prevent="salvarEdicao" class="space-y-6">
                  <div>
                    <label class="block font-medium text-gray-700 mb-1" for="nome">Nome</label>
                    <input
                      id="nome"
                      v-model="form.nome"
                      type="text"
                      class="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>

                  <div>
                    <label class="block font-medium text-gray-700 mb-1" for="descricao">Descrição</label>
                    <textarea
                      id="descricao"
                      v-model="form.descricao"
                      rows="4"
                      class="w-full rounded border border-gray-300 p-2"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label class="block font-medium text-gray-700 mb-1" for="codigoDeBarra">Código de Barras</label>
                    <input
                      id="codigoDeBarra"
                      v-model="form.codigoDeBarra"
                      type="text"
                      class="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>

                  <div>
                    <label class="block font-medium text-gray-700 mb-1" for="preco">Preço</label>
                    <input
                      id="preco"
                      v-model.number="form.preco"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>

                  <div class="flex gap-4">
                    <button
                      type="submit"
                      class="bg-[#5eccc1] hover:bg-[#4bb1ad] text-white font-semibold px-4 py-2 rounded-md"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      @click="cancelarEdicao"
                      class="border border-gray-400 rounded-md px-4 py-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
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
      erro: null,
      editando: false,
      form: {
        nome: '',
        descricao: '',
        codigoDeBarra: '',
        preco: 0
      }
    }
  },

  async mounted() {
    const codigo = this.$route.params.codigoDeBarras

    try {
      const resposta = await axios.get(`https://localhost:7136/api/produto/codigodebarra/${codigo}`)
      this.produto = resposta.data
    } catch (erro) {
      this.erro = 'Produto não encontrado'
      console.error('Erro ao buscar produto por código de barras:', erro)
    }
  },

  methods: {
    getImagemUrl(url) {
      if (!url) return '/placeholder.svg?height=250&width=250'

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
    },

    iniciarEdicao() {
      this.editando = true
      this.form.nome = this.produto.nome
      this.form.descricao = this.produto.descricao
      this.form.codigoDeBarra = this.produto.codigoDeBarra
      this.form.preco = this.produto.preco
    },

    cancelarEdicao() {
      this.editando = false
      this.form = {
        nome: '',
        descricao: '',
        codigoDeBarra: '',
        preco: 0
      }
    },

    async salvarEdicao() {
      try {
        const patchData = {}

        if (this.form.nome && this.form.nome !== "string") {
          patchData.nome = this.form.nome
        }
        if (this.form.descricao && this.form.descricao !== "string") {
          patchData.descricao = this.form.descricao
        }
        if (this.form.preco && this.form.preco !== 0) {
          patchData.preco = this.form.preco
        }
        if (this.form.codigoDeBarra && this.form.codigoDeBarra !== "string") {
          patchData.codigoDeBarra = this.form.codigoDeBarra
        }

        await axios.patch(`https://localhost:7136/api/produto/${this.produto.id}`, patchData)
        alert('Alterações salvas com sucesso!')
        this.editando = false
        // Atualiza o produto com os novos dados para exibir na tela
        this.produto = { ...this.produto, ...patchData }
      } catch (erro) {
        if (erro.response) {
          alert(`Erro ao salvar alterações: ${erro.response.data}`)
        } else {
          alert('Erro ao salvar alterações.')
        }
        console.error('Erro ao salvar:', erro)
      }
    }
  }
}
</script>