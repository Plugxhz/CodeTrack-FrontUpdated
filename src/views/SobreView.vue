<template>
  <div class="flex flex-col items-center px-4 py-8">
    <!-- Título e descrição -->
    <h1 class="text-5xl font-bold mb-6">Sobre o CodeTrack</h1>
    <p class="text-lg text-gray-700 max-w-3xl text-center mb-12">
      O <strong>CodeTrack</strong> é uma aplicação desenvolvida para facilitar o processo de gestão de pedidos e
      produtos.
      Criado com foco em eficiência e praticidade, permite o controle completo do ciclo de vendas.
    </p>


    <h2 class="text-3xl font-semibold mb-6">Nosso Time</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      <div v-for="membro in equipe" :key="membro.nome"
        class="group bg-white rounded-xl shadow-md p-5 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <img :src="membro.foto"
          class="mx-auto rounded-full w-[112px] h-[112px] object-cover border-4 border-teal-400 mb-3" />
        <h3 class="text-lg font-bold">{{ membro.nome }}</h3>
        <p class="text-gray-600 text-sm">{{ membro.funcao }}</p>
        <p class="text-sm text-gray-500 mt-2 italic">{{ membro.descricao }}</p>
        <div class="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition">
          <a v-if="membro.github" :href="membro.github" target="_blank">
            <i class="fab fa-github text-gray-700 hover:text-black"></i>
          </a>
          <a v-if="membro.linkedin" :href="membro.linkedin" target="_blank">
            <i class="fab fa-linkedin text-blue-600 hover:text-blue-800"></i>
          </a>
          <a v-if="membro.instagram" :href="membro.instagram" target="_blank">
            <i class="fab fa-instagram text-pink-500 hover:text-pink-700"></i>
          </a>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-semibold mb-6">Missão, Visão e Valores</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-2">Missão</h3>
        <p class="text-gray-600 text-sm">
          Oferecer soluções tecnológicas simples e eficientes para digitalizar a gestão de pedidos e produtos em
          pequenas e médias empresas.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-2">Visão</h3>
        <p class="text-gray-600 text-sm">
          Ser referência em soluções acessíveis e intuitivas, promovendo a transformação digital de negócios
          tradicionais.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-2">Valores</h3>
        <p class="text-gray-600 text-sm">
          Compromisso com a simplicidade, colaboração em equipe, respeito aos usuários e foco contínuo na inovação.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sobre',
  data() {
    return {
      equipe: [
        {
          nome: 'Joana Amorim',
          funcao: 'Desenvolvedora Front End',
          descricao: 'Desenvolve Interfaces web acessíveis e intuitivas.',
          foto: '/images/joana.jpg',
          github: 'https://github.com/joanasouzaa',
          linkedin: 'https://www.linkedin.com/in/joana-amorim-de-souza/',
          instagram: 'https://instagram.com/joanaamorim.s'
        },
        {
          nome: 'Marcos Paulo',
          funcao: 'Desenvolvedor Back End',
          descricao: 'Desenvolve API\'s seguras e escaláveis.',
          foto: '/images/MarcosJr.jpg',
          github: 'https://github.com/MarcosPSJ',
          linkedin: 'https://www.linkedin.com/in/marcos-paulo-sant-ana-j%C3%BAnior-090611208/',
          instagram: 'https://instagram.com/markin_psj'
        },
        {
          nome: 'Samira Silva',
          funcao: 'Designer de Interface',
          descricao: 'Desenvolve interfaces visuais agradáveis e fáceis de usar.',
          foto: '/images/samira.jpg',
          github: 'https://github.com/samira888w',
          linkedin: 'https://www.linkedin.com/in/samira-silva-71b29a275/',
          instagram: 'https://instagram.com/samirazqx'
        },
        {
          nome: 'Enzo Sakatauskas',
          funcao: 'Desenvolvedor Full Stack',
          descricao: 'Desenvolve soluções full stack para problemas complexos.',
          foto: '/images/enzo.jpg',
          github: 'https://github.com/Plugxhz',
          linkedin: 'https://www.linkedin.com/in/enzo-bedendo-sakatauskas-1a5228267',
          instagram: 'https://www.instagram.com/enzo.saka'
        }
      ]
    };
  }
};
</script>

<style scoped></style>
