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
