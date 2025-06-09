<template>
  <section class="bg-[#F4F5F7] py-16 px-4 flex justify-center items-start ">
    <div class="bg-[#d8e5d3] w-full max-w-2xl rounded-2xl shadow-md p-10">
      <h2 class="text-4xl font-extrabold text-[#333] mb-4 text-center">Contato</h2>
      <p class="text-gray-600 mb-8 text-center">
        Entre em contato conosco para dúvidas, sugestões ou informações sobre a plataforma.
      </p>

      <form @submit.prevent="enviarFormulario" class="space-y-6">
        <div>
          <label for="nome" class="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
          <input
            v-model="form.nome"
            type="text"
            id="nome"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#48A6A7]"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#48A6A7]"
            required
          />
        </div>

        <div>
          <label for="mensagem" class="block text-sm font-semibold text-gray-700 mb-1">Mensagem</label>
          <textarea
            v-model="form.mensagem"
            id="mensagem"
            rows="5"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#48A6A7]"
            required
          ></textarea>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-[#48A6A7] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#3b9091] transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContatoPage',
  data() {
    return {
      form: {
        nome: '',
        email: '',
        mensagem: '',
      }
    };
  },
  methods: {
    enviarFormulario() {
      alert(`Mensagem enviada por ${this.form.nome}`);
      this.form = { nome: '', email: '', mensagem: '' };
    }
  }
};
</script>