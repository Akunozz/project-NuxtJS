<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ICaminhao } from '~/types/ICaminhao'
import cadastroCaminhao from './cadastroCaminhao.vue'
import excluirCaminhao from './excluirCaminhao.vue';

const { data, error, status } = await useFetch<ICaminhao[]>("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro",
  { lazy: true });
const caminhoes = ref(data.value || [])

const removerCaminhao = (id: string) => {
  caminhoes.value = caminhoes.value.filter(caminhao => caminhao.id !== id);
};
const adicionarCaminhao = (novoCaminhao: ICaminhao) => {
  caminhoes.value.push(novoCaminhao);
};
</script>

<template>
  <div class="container py-10 mx-auto">

    <div v-if="error" class="text-red-500">Erro ao carregar dados: {{ error.message }}</div>

    <template v-if="status === 'pending'">
      <div class="flex flex-col justify-center items-center space-x-4 py-10">
        <Icon icon="lucide:loader-circle" class="w-10 h-10 animate-spin text-blue-500" />
        <span class="text-zinc-700 text-lg">Carregando...</span>
      </div>
    </template>

    <cadastroCaminhao @caminhao-cadastrado="adicionarCaminhao"/>
    <table v-if="!error" class="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
      <thead class="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
        <tr>
          <th scope="col" class="px-6 py-3">Marca</th>
          <th scope="col" class="px-6 py-3">Placa</th>
          <th scope="col" class="px-6 py-3">Última revisão</th>
          <th scope="col" class="px-6 py-3">Motorista</th>
          <th scope="col" class="px-6 py-3">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caminhao in caminhoes" :key="caminhao.id"
          class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700">
          <td class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
            {{ caminhao.marca }}
          </td>
          <td class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
            {{ caminhao.placa }}
          </td>
          <td class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
            {{ new Date(caminhao.ultimaRevisao).toLocaleDateString() }}
          </td>
          <td class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
            {{ caminhao.nomeMotorista }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <excluirCaminhao :id="caminhao.id" @caminhao-excluido="removerCaminhao"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>