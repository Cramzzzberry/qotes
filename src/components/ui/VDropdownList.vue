<script setup>
const props = defineProps({
  label: String,
  items: Array,
  name: String,
})

defineEmits(['update:label'])
</script>

<template>
  <div class="dropdown"> <!-- month filter dropdown -->
    <button class="dropdown-btn">
      <span>{{ props.label }}</span>
      <span class="material-icons">
        expand_more
      </span>
    </button>
    <ul class="dropdown-content" tabindex="0"> <!-- dropdown content -->
      <li v-for="item in props.items" :key="item">
        <input 
          type="radio" 
          :name="props.name" 
          :id="item" 
          :value="item" 
          @input="$emit('update:label', $event.target.value)"
          class="hidden">
        <label :for="item" tabindex="0">{{ item }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  user-select: none;
  & > .dropdown-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem 0.625rem 0.5rem 1rem;
    width: 100%;

    background-color: var(--gray-50);
    color: var(--gray-600);
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    font-size: 1rem;

    cursor: pointer;
    transition: border 100ms ease-in-out;

    &:hover {
      border: 1px solid var(--green-600);
    }
  }

  & > .dropdown-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    --padding-x: 1rem;

    position: absolute;
    top: calc(100% + 8px);
    padding: 0.5rem;
    width: calc(100% - var(--padding-x));

    background-color: var(--gray-100);
    border-radius: 4px;

    opacity: 0;
    visibility: hidden;
    z-index: 10;
    overflow-y: auto;

    transition: opacity 65ms ease-in-out, visibility 65ms ease-in-out;

    & > li {
      width: 100%;
      
      & > input[type="radio"] {
        & + label {
          display: block;
          width: calc(100% - (var(--padding-x) * 2));
          padding: 0.5rem var(--padding-x);

          background-color: transparent;
          color: var(--gray-700);
          border-radius: 4px;

          cursor: pointer;
          transition: background-color 25ms ease-in-out, color 25ms ease-in-out;

          &:hover {
            color: var(--gray-800);
            background-color: var(--gray-200);
          }
        }

        &:checked + label {
          background-color: var(--green-400);
          color: var(--green-50);

          &:hover {
            background-color: var(--green-400);
            color: var(--green-50);
          }
        }
      }
    }
  }

  &:focus-within > .dropdown-content {
    opacity: 1;
    visibility: visible;
  }
}
</style>