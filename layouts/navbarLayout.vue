<script setup lang="ts">
</script>

<template>
  <nav class="flex gap-10 py-4 px-4 shadow-md bg-blue-400 text-black">
    <NuxtLoadingIndicator />
    <NuxtLink class="hover:font-medium" to="/">Home</NuxtLink>
    <NuxtLink class="hover:font-medium" to="/Motorista/motorista">Tabela de Motorista</NuxtLink>
    <NuxtLink class="hover:font-medium" to="/Caminhao/caminhao">Tabela de Caminhão</NuxtLink>
  </nav>

  <main class="container mx-auto">
    <slot />
  </main>
</template>
