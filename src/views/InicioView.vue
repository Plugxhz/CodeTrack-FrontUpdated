<template>
    <div class="w-full bg-[#F4F5F7]">
      <main class="max-w-7xl mx-auto px-6 py-16">
        <!-- Conteúdo -->
        <div class="text-center">
          <h2 class="text-5xl font-extrabold text-gray-800 mb-6">
            Bem-vindo ao <span class="text-gray-800">CodeTrack</span>
          </h2>
          <p class="text-lg text-gray-700 mb-8">
            Descubra todos os recursos e benefícios que oferecemos para você.<br />
            Cadastre-se agora e comece sua jornada conosco.
          </p>
        </div>
  
        <!-- Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <!-- Card 1 -->
          <a href="/produtos/cadastro" class="bg-[#DDE5D9] rounded-xl p-6 text-center hover:scale-105 transition">
            <div class="text-4xl text-[#48A6A7] mb-4">➕</div>
            <h3 class="font-semibold text-lg mb-2">Cadastro de Produto</h3>
            <p class="text-sm text-gray-600">Adicione novos produtos ao sistema</p>
          </a>
  
          <!-- Card 2 -->
          <a href="/listagem" class="bg-[#DDE5D9] rounded-xl p-6 text-center hover:scale-105 transition">
            <div class="text-4xl text-[#48A6A7] mb-4">📋</div>
            <h3 class="font-semibold text-lg mb-2">Listagem de Produtos</h3>
            <p class="text-sm text-gray-600">Visualize todos os produtos cadastrados</p>
          </a>
  
          <!-- Card 3 -->
          <a href="/busca/codigo" class="bg-[#DDE5D9] rounded-xl p-6 text-center hover:scale-105 transition">
            <div class="text-4xl text-[#48A6A7] mb-4">🔍</div>
            <h3 class="font-semibold text-lg mb-2">Busca por Código</h3>
            <p class="text-sm text-gray-600">Busque produtos pelo código de barras</p>
          </a>
  
          <!-- Card 4 -->
          <a href="/pedidos" class="bg-[#DDE5D9] rounded-xl p-6 text-center hover:scale-105 transition">
            <div class="text-4xl text-[#48A6A7] mb-4">👜</div>
            <h3 class="font-semibold text-lg mb-2">Pedidos</h3>
            <p class="text-sm text-gray-600">Gerencie pedidos e adicione produtos</p>
          </a>
        </div>
      </main>
    </div>
  </template>

