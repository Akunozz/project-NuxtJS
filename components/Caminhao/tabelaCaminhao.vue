<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ICaminhao } from '~/types/ICaminhao'
import cadastroCaminhao from './cadastroCaminhao.vue'
import { columns } from '../Caminhao/columns';
import DataTable from '../ui/table/data-table.vue';

const { data, error, status } = await useFetch<ICaminhao[]>("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro")
const caminhoes = ref(data.value || [])

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

    <div class="container mx-auto">
      <cadastroCaminhao @caminhao-cadastrado="adicionarCaminhao" />
      <DataTable :columns="columns" :data="caminhoes" />
    </div>
  </div>

</template>