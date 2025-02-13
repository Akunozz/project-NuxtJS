<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'vue-sonner'

const emit = defineEmits(['motoristaCadastrado'])

const motoristaForm = ref({
  nome: '',
  validadeCNH: '',
  aniversario: '',
})

const postMotorista = async () => {
  const payload = {
    nome: motoristaForm.value.nome,
    validadeCNH: motoristaForm.value.validadeCNH,
    aniversario: motoristaForm.value.aniversario,
  }

  try {
    const response = await fetch("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/motorista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      const novoMotorista = await response.json()
      toast.success("Motorista cadastrado com sucesso")
      emit('motoristaCadastrado', novoMotorista)
      motoristaForm.value = { nome: '', validadeCNH: '', aniversario: '' }
    } else {
      throw new Error("Erro ao cadastrar motorista")
    }
  } catch (error) {
    console.error("Erro no POST:", error)
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
      <form @submit.prevent="postMotorista" class="space-y-4 p-4">
        <div class="flex flex-col">
          <label for="nome" class="mb-1">Nome:</label>
          <input 
            id="nome" 
            type="text" 
            v-model="motoristaForm.nome" 
            required 
            class="border p-2 rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="validadeCNH" class="mb-1">Validade CNH:</label>
          <input 
            id="validadeCNH" 
            type="date" 
            v-model="motoristaForm.validadeCNH" 
            required 
            class="border p-2 rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="aniversario" class="mb-1">Data nascimento:</label>
          <input 
            id="aniversario" 
            type="date" 
            v-model="motoristaForm.aniversario" 
            required 
            class="border p-2 rounded"
          />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </PopoverContent>
  </Popover>
</template>