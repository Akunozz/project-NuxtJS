<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { toast } from 'vue-sonner';

defineProps<{ id: string }>();
const emit = defineEmits(['caminhaoExcluido']);

const excluirCaminhao = async (id: string) => {
  try {
    const response = await fetch(`https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Caminhao excluído com sucesso");
      emit('caminhaoExcluido', id);
    } else {
      throw new Error("Erro ao excluir caminhao");
    }
  } catch (error) {
    console.error("Erro ao excluir caminhao:", error);
    toast.error("Erro ao excluir caminhao");
  }
};
</script>

<template>
  <button 
    @click="excluirCaminhao(id)" 
    class="p-2 text-red-500 hover:text-red-700 transition">
    <Icon icon="mdi:trash-can-outline" class="w-6 h-6" />
  </button>
</template>
