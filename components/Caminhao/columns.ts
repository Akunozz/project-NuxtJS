import { h } from 'vue'
import type { ICaminhao } from '~/types/ICaminhao'
import type { ColumnDef } from '@tanstack/table-core'
import excluirCaminhao from './excluirCaminhao.vue';
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'


export const columns: ColumnDef<ICaminhao>[] = [
    {
        accessorKey: 'marca',
        header: () => h('div', { class: 'text-white text-center' }, 'Marca'),
    },
    {
        accessorKey: 'placa',
        header: () => h('div', { class: 'text-white text-center' }, 'Placa'),
    },
    {
        accessorKey: 'ultimaRevisao',
        header: ({ column }) => {
            return h('div', { class: 'flex justify-center items-center text-white' }, [
                h(Button, {
                    variant: 'ghost',
                    class: 'flex items-center text-white',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Última revisão realizada', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 text-white' })])
            ]);
        },
        cell: ({ row }) => h('div', { class: 'text-white text-center' }, row.getValue('ultimaRevisao')),
    },
    {
        accessorKey: 'nomeMotorista',
        header: () => h('div', { class: 'text-white text-center' }, 'Nome do motorista'),
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-white text-center' }, 'Excluir'),
        cell: ({ row }) => h(excluirCaminhao, {
            id: row.original.id,
            onCaminhaoExcluido: () => row.original.id
        })
    }
]