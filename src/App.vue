<template>
  <router-view class="overflow-clip" v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>

/* vue transitions */
.v-enter-active,
.v-leave-active {
  transition: all 100ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: scale(98.75%);
  opacity: 0;
}
</style>