<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ICaminhao } from '~/types/ICaminhao'

const { data, error, status } = await useFetch<ICaminhao[]>("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro",
  { lazy: true });
  const caminhaoes = ref(data.value || [])
</script>

<template>
  <div class="container py-10 mx-auto">

    <div v-if="error" class="text-red-500">Erro ao carregar dados: {{ error.message }}</div>

    <template v-if="status === 'pending'">
      <div class="flex flex-col justify-center items-center space-x-4 py-10">
        <Icon icon="lucide:loader-circle" class="w-10 h-10 animate-spin text-blue-500" />
        <span class="text-gray-700 text-lg">Carregando...</span>
      </div>
    </template>


    <table v-if="!error" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Marca</th>
          <th scope="col" class="px-6 py-3">Placa</th>
          <th scope="col" class="px-6 py-3">Última revisão</th>
          <th scope="col" class="px-6 py-3">Motorista</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterando sobre os caminhao -->
        <tr 
          v-for="caminhao in caminhaoes" 
          :key="caminhao.id" 
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ caminhao.marca }}
      </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ caminhao.placa }}
          </td>
          <td class="px-6 py-4">
            {{ new Date(caminhao.ultimaRevisao).toLocaleDateString() }}
          </td>
          <td class="px-6 py-4">
            {{ new Date(caminhao.nomeMotorista).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>