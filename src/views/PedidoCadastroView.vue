<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="p-6">
      <router-link to="/pedidos" class="flex items-center text-[#48A6A7] hover:underline">
        <span class="text-2xl mr-2">←</span> Voltar para os pedidos
      </router-link>
    </div>

    <section class="bg-[#d8e5d3] p-8 rounded-2xl shadow-md">
      <h1 class="text-3xl font-bold text-black mb-6">Novo Pedido</h1>

      <!-- ...mesmo começo omitido para clareza -->

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 font-semibold">CPF do Cliente</label>
        <input
          v-model="clienteCpf"
          type="text"
          class="w-full px-4 py-2 rounded-xl bg-[#e4e4e4] text-gray-700 focus:outline-none"
          placeholder="CPF do Cliente"
        />
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-gray-800 font-semibold">Códigos de Barras dos Produtos (separados por vírgula)</label>
        <input
          v-model="codigosBarrasInput"
          type="text"
          class="w-full px-4 py-2 rounded-xl bg-[#e4e4e4] text-gray-700 focus:outline-none"
          placeholder="Ex: 7891234567890,7891234567891"
        />
      </div>

      <div class="flex gap-4">
        <button
          @click="cadastrarPedido"
          class="bg-[#48A6A7] text-white px-4 py-2 rounded-lg font-semibold"
        >
          Salvar Pedido
        </button>

        <router-link
          to="/pedidos"
          class="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center"
        >
          Cancelar
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const clientes = ref([]);
const produtos = ref([]);

const clienteCpf = ref('');
const codigosBarrasInput = ref('');

const carregarDados = async () => {
  try {
    const [resClientes, resProdutos] = await Promise.all([
      axios.get('https://localhost:7136/api/cliente'),
      axios.get('https://localhost:7136/api/produto')
    ]);

    clientes.value = resClientes.data;
    produtos.value = resProdutos.data;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
};

onMounted(() => {
  carregarDados();
});

const cadastrarPedido = async () => {
  try {
    const cliente = clientes.value.find(c => c.cpf === clienteCpf.value);
    if (!cliente) {
      alert('Cliente não encontrado pelo CPF!');
      return;
    }

    const codigos = codigosBarrasInput.value
      .split(',')
      .map(c => c.trim());

    const codigosProdutos = produtos.value
      .filter(p => codigos.includes(p.codigoDeBarra))
      .map(p => p.codigoDeBarra);

    if (codigosProdutos.length === 0) {
      alert('Nenhum produto encontrado com os códigos fornecidos!');
      return;
    }

    const pedido = {
      clientecpf: cliente.cpf.replace(/\D/g, ''), // remove pontos e traços
      produtos: codigosProdutos.map(codigo => ({
      codigoDeBarra: codigo
    }))
  };
    await axios.post('https://localhost:7136/api/pedido', pedido);
    router.push('/pedidos');
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    alert('Erro ao criar pedido.');
  }
};
</script>