<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { toast } from 'vue-sonner';

defineProps<{ id: string }>();
const emit = defineEmits(['motoristaExcluido']);

const excluirMotorista = async (id: string) => {
  try {
    const response = await fetch(`https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/motorista/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Motorista excluído com sucesso");
      emit('motoristaExcluido', id);
    } else {
      throw new Error("Erro ao excluir motorista");
    }
  } catch (error) {
    console.error("Erro ao excluir motorista:", error);
    toast.error("Erro ao excluir motorista");
  }
};
</script>

<template>
  <button 
    @click="excluirMotorista(id)" 
    class="p-2 text-red-500 hover:text-red-700 transition">
    <Icon icon="mdi:trash-can-outline" class="w-6 h-6" />
  </button>
</template>
