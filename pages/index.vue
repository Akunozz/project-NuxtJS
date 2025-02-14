<script setup lang="ts">
import { useMotoristaService } from '~/services/motoristaService'
import type { IMotorista } from '~/types/IMotorista'
import { LoaderCircle } from 'lucide-vue-next'
import type { ICaminhao } from '~/types/ICaminhao'

definePageMeta({
  layout: 'navbar-layout'
})

const { listar } = useMotoristaService()
const motoristaProximoVencimento = ref<IMotorista | null>(null)
const errorMessage = ref<string | null>(null)

// Usa `useAsyncData` para armazenar os motoristas e reutilizar os dados em navegações
const { data: motoristas, error, pending } = await useAsyncData<IMotorista[]>('motoristas', listar)


// Processar os dados quando `motoristas` estiver carregado
watchEffect(() => {
  if (pending.value) return // Ainda carregando

  if (error.value) {
    console.error("Erro ao buscar motoristas:", error.value)
    errorMessage.value = "Erro ao carregar os dados."
    return
  }

  if (!motoristas.value || motoristas.value.length === 0) {
    errorMessage.value = "Nenhum motorista encontrado."
    return
  }

  motoristaProximoVencimento.value = motoristas.value
    .filter(m => m.validadeCNH)
    .sort((a, b) => new Date(a.validadeCNH).getTime() - new Date(b.validadeCNH).getTime())[0]
})
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <!-- Carregamento -->
    <div v-if="pending" class="flex justify-center items-center mt-6">
      <LoaderCircle class="w-10 h-10 animate-spin text-gray-500" />
    </div>

    <!-- Erro -->
    <div v-else-if="errorMessage" class="mt-6 text-red-500 text-center">
      {{ errorMessage }}
    </div>

    <!-- Dashboard do Motorista -->
    <div v-else-if="motoristaProximoVencimento" class="mt-6 p-6 bg-zinc-800 shadow rounded-lg">
      <h2 class="text-xl font-semibold">Próximo Vencimento de CNH</h2>
      <p class="mt-2"><strong>Nome:</strong> {{ motoristaProximoVencimento.nome }}</p>
      <p class="mt-1"><strong>Data de Vencimento:</strong> {{ motoristaProximoVencimento.validadeCNH }}</p>
      <img
        v-if="motoristaProximoVencimento.avatar"
        :src="motoristaProximoVencimento.avatar"
        alt="Foto do Motorista"
        class="w-24 h-24 rounded-full mt-4"
      />
    </div>
  </div>
</template>
