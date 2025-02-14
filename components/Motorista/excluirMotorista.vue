<script setup lang="ts">
import { useMotoristaService } from '~/services/motoristaService';
import { Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const props = defineProps<{ id: string }>();
const emit = defineEmits(['motoristaExcluido']);

const { excluir } = useMotoristaService();

const removerMotorista = async () => {
  try {
    await excluir(props.id);
    toast.success("Motorista excluído com sucesso")
    emit('motoristaExcluido', props.id);
  } catch (error) {
    toast.error("Erro ao excluir motorista:");
  }
};
</script>

<template>
  <button @click="removerMotorista" class="bg-red-500 text-white p-2 rounded">
    <Trash2 class="w-5 h-5" />
  </button>
</template>
