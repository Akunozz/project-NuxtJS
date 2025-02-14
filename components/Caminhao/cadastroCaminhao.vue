<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'vue-sonner'
import { useCaminhaoService } from '~/services/caminhaoService'
import type { ICaminhao } from '@/types/ICaminhao'

const { criar } = useCaminhaoService();
const emit = defineEmits(['caminhaoCadastrado'])

const caminhaoForm = ref<ICaminhao>({
  id: '',
  marca: '',
  placa: '',
  ultimaRevisao: '',
  motoristaId: '',
  nomeMotorista: '',
})

// Função para cadastrar motorista
const cadastrarCaminhao = async () => {
  try {
    const novoCaminhao = await criar(caminhaoForm.value)
    toast.success("Caminhão cadastrado com sucesso")

    emit('caminhaoCadastrado', novoCaminhao)

    caminhaoForm.value = {
      id: '',
      marca: '',
      placa: '',
      ultimaRevisao: '',
      motoristaId: '',
      nomeMotorista: '',
    }
  } catch (error) {
    console.error("Erro ao cadastrar caminhão:", error)
    toast.error("Erro ao cadastrar caminhão")
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button>Cadastrar caminhao</Button>
    </PopoverTrigger>
    <PopoverContent>
      <form @submit.prevent="cadastrarCaminhao" class="space-y-4 p-4 text-sm">
        <div class="flex flex-col">
          <label for="marca" class="mb-1">Marca:</label>
          <input id="marca" type="text" v-model="caminhaoForm.marca" required placeholder="Digite uma marca..."
            class="border p-2 rounded text-black placeholder:text-gray-500 placeholder:text-sm" />
        </div>
        <div class="flex flex-col">
          <label for="placa" class="mb-1">Placa:</label>
          <input id="placa" type="text" v-model="caminhaoForm.placa" required placeholder="Digite uma placa..."
            class="border p-2 rounded text-black placeholder:text-gray-500 placeholder:text-sm" />
        </div>
        <div class="flex flex-col">
          <label for="ultimaRevisao" class="mb-1">Selecione a data da última revisão:</label>
          <input id="ultimaRevisao" type="date" v-model="caminhaoForm.ultimaRevisao" required
            class="border p-2 rounded text-black" />
        </div>
        <div class="flex flex-col">
          <label for="nomeMotorista" class="mb-1">Nome do motorista:</label>
          <input id="nomeMotorista" type="text" v-model="caminhaoForm.nomeMotorista" required placeholder="Digite um nome..."
            class="border p-2 rounded text-black placeholder:text-gray-500 placeholder:text-sm" />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </PopoverContent>
  </Popover>
</template>








<style scoped>
/* Faz o ícone do input[type="date"] ficar preto */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  /* Inverte a cor (torna o branco em preto) */
}

/* Para compatibilidade com Firefox */
input[type="date"]::-moz-calendar-picker-indicator {
  filter: invert(1);
}

/* Para Edge e Safari */
input[type="date"]::-ms-clear,
input[type="date"]::-ms-reveal {
  filter: invert(1);
}
</style>