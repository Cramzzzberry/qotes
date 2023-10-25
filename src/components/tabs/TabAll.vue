<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'All Sheets'
const desc = 'A collection of sheets including pinned and important ones'
const icon = 'description'
const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc" search-box-id="allSheetsSB">
    <template #create-button>
      <VButton @click="modalToggle()">
        <span class="material-icons text-base"> add </span>
        Create
      </VButton>
    </template>

    <template #body="slotProps">
      <!-- list of sheets -->
      <Suspense>
        <VSheetList search-box-id="allSheetsSB" categopry="all-sheets" :search-value="slotProps.searchValue" />

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

        <VFormCreateSheet />
      </VModal>
    </template>
  </VTopbar>
</template>
