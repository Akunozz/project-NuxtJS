<script setup lang="ts">
import type { ICaminhao } from '~/types/ICaminhao'
import cadastroCaminhao from './cadastroCaminhao.vue'
import { columns } from '../Caminhao/columns';
import tabela from '../ui/table/tabela.vue';
import { useCaminhaoService } from '~/services/caminhaoService';

const { listar, criar } = useCaminhaoService();
const { data, error } = await useAsyncData<ICaminhao[]>('caminhao', listar);
const caminhao = ref<ICaminhao[]>(data.value ?? []);

const adicionarCaminhao = async (novoCaminhao: ICaminhao) => {
  const caminhaoCriado = await criar(novoCaminhao);
  caminhao.value = [...caminhao.value, caminhaoCriado];
};

const removerCaminhaoDaLista = (id: string) => {
  caminhao.value = caminhao.value.filter(m => m.id !== id);
};

</script>

<template>
  <div class="container py-10 mx-auto">
    <div v-if="error" class="text-red-500">Erro ao carregar dados: {{ error.message }}</div>

    <div class="container mx-auto">
      <!-- Cadastro -->
      <cadastroCaminhao @caminhaoCadastrado="adicionarCaminhao" />

      <!-- Tabela -->
      <tabela :columns="columns" :data="caminhao" @caminhaoExcluido="removerCaminhaoDaLista" />
    </div>
  </div>
</template>