<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IMotorista } from '~/types/IMotorista'
import cadastroMotorista from './cadastroMotorista.vue';
import DataTable from '../ui/table/data-table.vue';
import { columns } from '../Motorista/columns';


const { data, error, status } = await useFetch<IMotorista[]>
  ("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/motorista")
const motoristas = ref(data.value || [])

const adicionarMotorista = (novoMotorista: IMotorista) => {
  motoristas.value.push(novoMotorista);
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
      <cadastroMotorista @motoristaCadastrado="adicionarMotorista" />
      <DataTable :columns="columns" :data="motoristas" />
    </div>

  </div>
</template>