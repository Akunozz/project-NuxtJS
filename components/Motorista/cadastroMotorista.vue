<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'vue-sonner'
import { useMotoristaService } from '~/services/motoristaService'
import type { IMotorista } from '@/types/IMotorista'

const { criar } = useMotoristaService();
const emit = defineEmits(['motoristaCadastrado'])

const motoristaForm = ref<IMotorista>({
  id: '',
  nome: '',
  validadeCNH: '',
  aniversario: '',
  avatar: ''
})

// Função para cadastrar motorista
const cadastrarMotorista = async () => {
  try {
    const novoMotorista = await criar(motoristaForm.value)
    toast.success("Motorista cadastrado com sucesso")

    emit('motoristaCadastrado', novoMotorista)

    motoristaForm.value = {
      id: '',
      nome: '',
      validadeCNH: '',
      aniversario: '',
      avatar: ''
    }
  } catch (error) {
    console.error("Erro ao cadastrar motorista:", error)
    toast.error("Erro ao cadastrar motorista")
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button>Cadastrar Motorista</Button>
    </PopoverTrigger>
    <PopoverContent>
      <form @submit.prevent="cadastrarMotorista" class="space-y-4 p-4 text-sm">
        <div class="flex flex-col">
          <label for="nome" class="mb-1">Nome:</label>
          <input id="nome" type="text" v-model="motoristaForm.nome" required placeholder="Digite um nome..."
            class="border p-2 rounded text-black placeholder:text-gray-500 placeholder:text-sm" />
        </div>
        <div class="flex flex-col">
          <label for="validadeCNH" class="mb-1">Validade CNH:</label>
          <input id="validadeCNH" type="date" v-model="motoristaForm.validadeCNH" required
            class="border p-2 rounded text-black" />
        </div>
        <div class="flex flex-col">
          <label for="aniversario" class="mb-1">Data nascimento:</label>
          <input id="aniversario" type="date" v-model="motoristaForm.aniversario" required
            class="border p-2 rounded text-black" />
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