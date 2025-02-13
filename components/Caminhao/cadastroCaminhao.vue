<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'vue-sonner'

const emit = defineEmits(['caminhaoCadastrado'])

const caminhaoForm = ref({
  marca: '',
  placa: '',
  ultimaRevisao: '',
  nomeMotorista: ''
})

const postCaminhao = async () => {
  const payload = {
    marca: caminhaoForm.value.marca,
    placa: caminhaoForm.value.placa,
    ultimaRevisao: caminhaoForm.value.ultimaRevisao,
    nomeMotorista: caminhaoForm.value.nomeMotorista
  }

  try {
    const response = await fetch("https://67a9ea7365ab088ea7e4f65e.mockapi.io/api/estudo/carro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      const novoCaminhao = await response.json()
      toast.success("Caminhão cadastrado com sucesso")
      emit('caminhaoCadastrado', novoCaminhao)
      caminhaoForm.value = {
        marca: '',
        placa: '',
        ultimaRevisao: '',
        nomeMotorista: ''
      }
    } else {
      throw new Error("Erro ao cadastrar caminhão")
    }
  } catch (error) {
    console.error("Erro no POST:", error)
    toast.error("Erro ao cadastrar caminhão")
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button>Cadastrar Caminhao</Button>
    </PopoverTrigger>
    <PopoverContent>
      <form @submit.prevent="postCaminhao" class="space-y-4 p-4">
        <div class="flex flex-col">
          <label for="marca" class="mb-1">Marca:</label>
          <input id="marca" type="text" v-model="caminhaoForm.marca" required class="border p-2 rounded" />
        </div>
        <div class="flex flex-col">
          <label for="placa" class="mb-1">Placa:</label>
          <input id="placa" type="text" v-model="caminhaoForm.placa" required class="border p-2 rounded" />
        </div>
        <div class="flex flex-col">
          <label for="ultimaRevisao" class="mb-1">ultimaRevisao:</label>
          <input id="ultimaRevisao" type="date" v-model="caminhaoForm.ultimaRevisao" required
            class="border p-2 rounded" />
        </div>
        <div class="flex flex-col">
          <label for="nomeMotorista" class="mb-1">nomeMotorista:</label>
          <input id="nomeMotorista" type="text" v-model="caminhaoForm.nomeMotorista" required
            class="border p-2 rounded" />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </PopoverContent>
  </Popover>
</template>