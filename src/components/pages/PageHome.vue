<script setup>
import TheSidebar from '@/components/ui/TheSidebar.vue'
import TabAll from '@/components/tabs/TabAll.vue'
import TabPinned from '@/components/tabs/TabPinned.vue'
import TabImportant from '@/components/tabs/TabImportant.vue'

const tabs = [TabAll, TabPinned, TabImportant]
</script>

<template>
  <TheSidebar v-slot="slotProps">
    <Transition name="fade-y" mode="out-in">
      <KeepAlive>
        <component :is="tabs[slotProps.index]" />
      </KeepAlive>
    </Transition>
  </TheSidebar>
</template>

<style>
/* vue transitions */
.fade-y-enter-from,
.fade-y-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-y-enter-active,
.fade-y-leave-active {
  overflow-x: clip;
  transition:
    opacity 100ms ease-in-out,
    transform 150ms ease-in-out;
}
</style>
