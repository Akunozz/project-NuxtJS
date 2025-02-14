<script setup lang="ts">
import type { IMotorista } from '~/types/IMotorista';
import cadastroMotorista from './cadastroMotorista.vue';
import tabela from '../ui/table/tabela.vue';
import { columns } from '../Motorista/columns';
import { useMotoristaService } from '~/services/motoristaService';
// Serviço de API
const { listar, criar } = useMotoristaService();

// Buscar motoristas ao carregar a página
const { data, error } = await useAsyncData<IMotorista[]>('motoristas', listar);

// Certificar que motoristas sempre seja um array (evita erro do TypeScript)
const motoristas = ref<IMotorista[]>(data.value ?? []);

// Função para adicionar novo motorista
const adicionarMotorista = async (novoMotorista: IMotorista) => {
  const motoristaCriado = await criar(novoMotorista);
  motoristas.value = [...motoristas.value, motoristaCriado]; // Atualiza reativamente a tabela
};

const removerMotorista = (id: string) => {
  motoristas.value = motoristas.value.filter(m => m.id !== id);
};


</script>

<template>
  <div class="container py-10 mx-auto">
    <div v-if="error" class="text-red-500">Erro ao carregar dados: {{ error.message }}</div>

    <div class="container mx-auto">
      <!-- Cadastro -->
      <cadastroMotorista @motoristaCadastrado="adicionarMotorista" />

      <!-- Tabela -->
      <tabela :columns="columns" :data="motoristas" @motoristaExcluido="removerMotorista" />
    </div>
  </div>
</template>
