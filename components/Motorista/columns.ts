import { h } from 'vue'
import type { IMotorista } from '~/types/IMotorista'
import type { ColumnDef } from '@tanstack/table-core'
import excluirMotorista from './excluirMotorista.vue';

export const columns: ColumnDef<IMotorista>[] = [
    {
        accessorKey: 'avatar',
        header: () => h('div', { class: 'text-right' }, 'Foto'),
        cell: ({ getValue }) => {
            const avatarUrl = getValue() as string;
            return h('img', {
                src: avatarUrl,
                alt: 'Foto do motorista',
                class: 'w-12 h-12 rounded-full object-cover mx-auto'
            });
        }
    },
    {
        accessorKey: 'nome',
        header: () => h('div', { class: 'text-right' }, 'Nome'),
    },
    {
        accessorKey: 'validadeCNH',
        header: () => h('div', { class: 'text-right' }, 'Validade CNH'),
    },
    {
        accessorKey: 'aniversario',
        header: () => h('div', { class: 'text-right' }, 'Data nascimento'),
    },
    {
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => h(excluirMotorista, {
            id: row.original.id,
            onMotoristaExcluido: () => row.original.id
        })
    }
]