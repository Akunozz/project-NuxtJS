import { h } from 'vue'
import type { ICaminhao } from '~/types/ICaminhao'
import type { ColumnDef } from '@tanstack/table-core'
import excluirCaminhao from './excluirCaminhao.vue';

export const columns: ColumnDef<ICaminhao>[] = [
    {
        accessorKey: 'marca',
        header: () => h('div', { class: 'text-right' }, 'Marca'),
        },
    {
        accessorKey: 'placa',
        header: () => h('div', { class: 'text-right' }, 'Placa'),
        },
    {
        accessorKey: 'ultimaRevisao',
        header: () => h('div', { class: 'text-right' }, 'Última revisão'),
        },
    {
        accessorKey: 'nomeMotorista',
        header: () => h('div', { class: 'text-right' }, 'Nome do motorista'),
        },
        {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => h(excluirCaminhao, {
                id: row.original.id,
                onCaminhaoExcluido: () => row.original.id
            })
        }
]