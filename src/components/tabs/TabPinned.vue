<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Pinned'
const desc = 'Put sheets here that are used in general'
const icon = 'push_pin'
const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc" search-box-id="pinnedSheetsSB">
    <template #create-button>
      <VButton @click="modalToggle()" class="border border-emerald-400 hover:border-emerald-500">
        <span class="material-icons text-base"> add </span>
        Create
      </VButton>
    </template>

    <template #body="slotProps">
      <!-- Sheet list -->
      <Suspense>
        <VSheetList search-box-id="pinnedSheetsSB" category="pinned-sheets" :search-value="slotProps.searchValue" :music-key="slotProps.selectedKey" />

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
        <VFormCreateSheet :pinned-checked="true" />
      </VModal>
    </template>
  </VTopbar>
</template>
