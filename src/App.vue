<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <Navbar />
    <main class="flex-grow max-w-screen-lg mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/NavbarComponent.vue";
import Footer from "./components/FooterComponent.vue";
</script>

