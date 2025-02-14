import { h } from 'vue'
import type { IMotorista } from '~/types/IMotorista'
import type { ColumnDef } from '@tanstack/table-core'
import excluirMotorista from './excluirMotorista.vue';
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<IMotorista>[] = [
    {
        accessorKey: 'avatar',
        header: () => h('div', { class: 'text-center text-white' }, 'Foto'),
        cell: ({ getValue }) => {
            const avatarUrl = getValue() as string;
            return h('img', {
                src: avatarUrl,
                alt: 'Foto do motorista',
                class: 'w-5 h-5 sm:w-12 sm:h-12 rounded-full object-cover mx-auto'
            });
        }
    },
    {
        accessorKey: 'nome',
        header: () => h('div', { class: 'text-center text-white' }, 'Nome'),
    },
    {
        accessorKey: 'validadeCNH',
        header: ({ column }) => {
            return h('div', { class: 'flex justify-center items-center text-white' }, [
                h(Button, {
                    variant: 'ghost',
                    class: 'flex items-center text-white',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Validade CNH', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 text-white' })])
            ]);
        },
        cell: ({ row }) => h('div', { class: 'text-white text-center' }, row.getValue('validadeCNH')),
    },
    {
        accessorKey: 'aniversario',
        header: () => h('div', { class: 'text-center text-white' }, 'Data nascimento'),
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-white text-center' }, 'Excluir'),
        cell: ({ row }) => h(excluirMotorista, {
            id: row.original.id,
            onMotoristaExcluido: () => row.original.id
        })
    }
]