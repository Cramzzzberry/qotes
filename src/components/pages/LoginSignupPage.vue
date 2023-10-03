<script setup>
import VTextBox from '@/components/ui/VTextBox.vue';
import VButton from '@/components/ui/VButton.vue';
</script>

<template>
  <div class="body-wrapper">
    <form class="input-wrapper">
      <h1>Login your account</h1>
      <div class="login">
        <label>
          Email
          <VTextBox type="email"/>
        </label>
        <label>
          Password
          <VTextBox type="password"/>
        </label>
      </div>
      <VButton type="submit">
        Login
      </VButton>
    </form>
  </div>
</template>

<style scoped>
.body-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 25%;

  & > :deep(button) {
    width: 100%;
  }
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  & > label {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--gray-600);

    transition: color 100ms ease-in-out;

    &:focus-within {
      color: var(--gray-700);
    }
  }
}
</style>