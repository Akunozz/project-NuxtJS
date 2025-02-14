<script setup lang="ts">
import { useCaminhaoService } from '~/services/caminhaoService';
import { toast } from 'vue-sonner';
import { Trash2 } from 'lucide-vue-next';

const props = defineProps<{ id: string }>();
const emit = defineEmits(['CaminhaoExcluido']);

const { excluir } = useCaminhaoService();

const removerCaminhao = async () => {
  try {
    await excluir(props.id);
    toast.success("Caminhão excluído com sucesso")
    emit('CaminhaoExcluido', props.id);
  } catch (error) {
    toast.error("Erro ao excluir caminhão:");
  }
};
</script>

<template>
  <button @click="removerCaminhao" class="bg-red-500 text-white p-2 rounded">
    <Trash2 class="w-5 h-5" />
  </button>
</template>