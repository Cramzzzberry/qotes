<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import sanitizeHtml from 'sanitize-html';
import htmlParse from '../../assets/scripts/chordsheet';

const route = useRoute()

const csInput = ref(`# Song Title ${ route.params.id }\n## Songwriter - Key of X\n---\n`);
const csHtml = computed(() => sanitizeHtml(htmlParse(csInput.value), { allowedAttributes: false })
);
</script>

<template>
  <div class="navbar">
    <div> <!-- logo -->
      <router-link to="/dashboard" class="main-brand">Achord</router-link>
    </div>
    <div class="profile-wrapper"> <!-- profile-cluster -->
      <div class="editor-toggle">
        <span class="material-icons">article</span>
        <input type="checkbox" class="switch">
        <span class="material-icons">vertical_split</span>
      </div>

      <a href="#" class="profile-cluster">
        <span>Jan Roe Bantuan</span>
        <div class="profile-picture"></div>
      </a>
    </div>
  </div>

  <div class="body">
    <div class="textarea-wrapper">
      <textarea v-model="csInput"></textarea>
    </div>
    <div class="markdown-preview" v-html="csHtml">
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  position: sticky;
  top: 0;

  width: 100%;
  height: 61px;
  padding: 0 16px;

  background-color: var(--gray-950);
  border-bottom: 1px solid var(--gray-900);

  & > div > .main-brand {
    color: var(--green-400);
    font-size: 1.5rem;
    font-weight: 600;

    opacity: 1;
    transition: opacity 100ms ease-in-out;

    &:hover {
      opacity: 0.75;
    }
  }

  & > .tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 8px;

    & > .tab {
      flex-grow: 1;
      min-width: 75px;

      & > span.material-icons {
        font-size: 1.75rem;
      }
    }
  }

  & > .profile-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;

    & > .editor-toggle {
      /* display: flex; */
      display: none;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 8px;

      & > span.material-icons {
        color: var(--gray-600);
        font-size: 1.5rem;
        user-select: none;
      }

      & > input[type='checkbox'].switch {
        appearance: none;
        -webkit-appearance: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        
        padding: 0 2px;

        background-color: var(--gray-900);

        width: 40px;
        height: 20px;

        border: none;
        border-radius: 25px;

        cursor: pointer;

        transition: background-color 125ms ease-in-out;

        &::after {
          content: "";
          background-color: var(--gray-400);

          width: 18px;
          height: 18px;

          border-radius: 100%;

          transform: translateX(0);

          transition: transform 125ms ease-in-out, background-color 125ms ease-in-out;
        }

        &:checked {
          background-color: var(--green-400);

          &::after {
            transform: translateX(100%);
            background-color: var(--green-900);
          }
        }
      }
    }

    & > .profile-cluster {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      & > .profile-picture {
        flex-shrink: 0;

        width: 2rem;
        height: 2rem;

        background-color: var(--green-400);
        border-radius: 100%;
      }
    }
  }
}

.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 61px);

  & > .textarea-wrapper {
    border-right: 1px solid var(--gray-900);
    padding: 16px;

    & > textarea {
      resize: none;
      width: 100%;
      height: 100%;
      
      border: none;
      outline: none;

      background-color: var(--gray-950);
      color: var(--gray-300);
      font-size: 1rem;
      font-family: 'RobotoMono';
    }
  }

  & > .markdown-preview {
    border-left: 1px solid var(--gray-900);
    width: 100%;
    height: 100%;
    padding: 0.5in 0.5in;
    overflow-y: auto;

    background-color: var(--gray-950);
  }
}
</style>