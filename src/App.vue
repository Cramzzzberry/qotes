<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-scale" mode="out-in">
      <suspense>
        <!-- what a weird issue, all of my components have only one root node, but without this div, the warning persists -->
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </suspense>
    </transition>
  </router-view>
</template>

<style>
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
