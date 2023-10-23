<template>
  <router-view v-slot="{ Component }">
    <suspense>
      <transition name="fade-scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </suspense>
  </router-view>
</template>

<style scoped>
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(99.25%);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 100ms ease-in-out,
    transform 150ms ease-in-out;
}
</style>
