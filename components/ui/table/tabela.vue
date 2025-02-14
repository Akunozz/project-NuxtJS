<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { valueUpdater } from '~/lib/utils'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

// Configuração da tabela
const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
  },
  get pageCount() {
    return Math.ceil(props.data.length / 5) // Exibe 5 registros por página
  }
})

// Pegando o estado da página atual
const pageIndex = computed(() => table.getState().pagination.pageIndex)

// Definir total de páginas baseado nos dados
const totalPaginas = computed(() => table.getPageCount())

</script>

<template>
  <div class="border rounded-md">
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm bg-white text-black"
        placeholder="Filtrando nome..."
        :model-value="table.getColumn('nome')?.getFilterValue() as string"
        @update:model-value="table.getColumn('nome')?.setFilterValue($event)"
      />
    </div>
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="text-center">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <!-- Paginação com ShadCN -->
  <div class="flex justify-center py-4">
    <Pagination v-slot="{ page }" :total="totalPaginas * 5" :sibling-count="1" show-edges :default-page="pageIndex + 1">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="table.setPageIndex(0)" :disabled="pageIndex === 0" />
        <PaginationPrev @click="table.previousPage()" :disabled="!table.getCanPreviousPage()" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value - 1 === pageIndex ? 'default' : 'outline'"
              @click="table.setPageIndex(item.value - 1)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="table.nextPage()" :disabled="!table.getCanNextPage()" />
        <PaginationLast @click="table.setPageIndex(totalPaginas - 1)" :disabled="pageIndex === totalPaginas - 1" />
      </PaginationList>
    </Pagination>
  </div>
</template>
