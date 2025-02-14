<script setup lang="ts">
import tabelaMotorista from '~/components/Motorista/tabelaMotorista.vue';
definePageMeta({
  layout: 'navbar-layout'
})
</script>

<template>
  <div class="text-sm sm:text-base">
    <tabelaMotorista />
  </div>
</template>