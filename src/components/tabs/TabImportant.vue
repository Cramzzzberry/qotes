<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Important'
const desc = 'These are the sheets with the most priorities'
const icon = 'lightbulb'
const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc" search-box-id="importantSheetsSB">
    <template #create-button>
      <VButton @click="modalToggle()" class="border border-emerald-400 hover:border-emerald-500">
        <span class="material-icons text-base"> add </span>
        Create
      </VButton>
    </template>

    <template #body="slotProps">
      <!-- sheet list -->
      <Suspense>
        <VSheetList
          search-box-id="importantSheetsSB"
          category="important-sheets"
          :search-value="slotProps.searchValue"
          :music-key="slotProps.selectedKey"
        />

        <template #fallback>
          <VLoadingSheets />
        </template>
      </Suspense>

      <!-- create modal -->
      <VModal :state="modalState">
        <div class="flex flex-row items-center justify-between">
          <h2>Create a new sheet</h2>

          <!-- close button -->
          <VButton @click="modalToggle()" btn-style="icon-ghost" type="button">
            <span class="material-icons"> close </span>
          </VButton>
        </div>

        <VFormCreateSheet :important-checked="true" />
      </VModal>
    </template>
  </VTopbar>
</template>
