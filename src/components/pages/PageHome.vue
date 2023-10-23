<script setup>
import TheSidebar from '@/components/ui/TheSidebar.vue'
import TabAll from '@/components/tabs/TabAll.vue'
import TabPinned from '@/components/tabs/TabPinned.vue'
import TabImportant from '@/components/tabs/TabImportant.vue'

const tabs = [TabAll, TabPinned, TabImportant]
</script>

<template>
  <TheSidebar v-slot="slotProps">
    <Transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[slotProps.index]" />
      </KeepAlive>
    </Transition>
  </TheSidebar>
</template>
