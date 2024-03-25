<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import parseSheet from '@/scripts/parse-sheet';
import SectionDetails from '@/components/AccountSettings/SectionDetails.vue';
import SectionDeleteAccount from '@/components/AccountSettings/SectionDeleteAccount.vue';

const toastStore = inject('toastStore');
const router = useRouter();

const currentAcc = ref({
  email: '',
  firstName: '',
  lastName: ''
});

const fontSize = ref(null);

onMounted(async () => {
  fontSize.value = localStorage.getItem('qotes_font_size');

  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/user/${localStorage.getItem('qotes_userID')}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    }
  })
    .then((res) => {
      currentAcc.value.email = res.data.email;
      currentAcc.value.firstName = res.data.firstName;
      currentAcc.value.lastName = res.data.lastName;
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    });
});

const clean = parseSheet('>> Verse\nC D E F G A B\nSample Lyrics G#m CmM7');

//save fontsize on each edit
watch(fontSize, () => localStorage.setItem('qotes_font_size', fontSize.value));
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="w-full grow overflow-y-auto">
      <header class="sticky top-0 bg-doublemint-50 pb-2 lg:px-14">
        <div class="place-self-start px-2 pb-2 pt-10">
          <AppButtonGhostIcon @click="$router.go(-1)" icon="arrow_back" />
        </div>
        <div class="flex w-full flex-col px-3">
          <p class="text-3xl font-medium leading-none">Settings</p>
          <p>Change your app and account preferences</p>
        </div>
      </header>

      <div class="flex flex-col gap-1 pb-4 lg:px-14">
        <div class="px-3">
          <p class="text-lg font-semibold">General</p>

          <div class="flex flex-col gap-2">
            <!-- Preview sheet font size -->
            <div class="flex w-full flex-row items-center justify-between md:max-w-[540px]">
              <p>Preview sheet font size (px)</p>
              <input
                v-model="fontSize"
                class="w-16 rounded-xl border border-deadgreen-200 bg-transparent px-2 py-1 text-deadgreen-700 outline-none transition-colors hover:border-deadgreen-300 focus:border-deadgreen-700"
                type="number"
              />
            </div>

            <div
              v-html="clean"
              class="sheet-preview h-[calc(100%-60px)] w-full rounded-xl border px-3 py-2 font-['Roboto_Mono'] lg:px-6"
            ></div>

            <!-- dark mode -->
            <div class="flex w-full flex-row items-center justify-between md:max-w-[540px]">
              <p class="opacity-50">Enable dark mode (soon)</p>
              <div class="flex w-16 items-center justify-center">
                <input
                  class="accent-inlay-500 disabled:cursor-not-allowed"
                  disabled
                  type="checkbox"
                />
              </div>
            </div>
          </div>
        </div>

        <hr class="mx-2 my-4 border-gray-300" />

        <div class="px-3">
          <p class="text-lg font-semibold">Account</p>

          <div class="flex flex-col gap-2">
            <SectionDetails
              v-model:email="currentAcc.email"
              v-model:first-name="currentAcc.firstName"
              v-model:last-name="currentAcc.lastName"
            />

            <hr class="m-4 border-gray-300" />

            <!-- delete account -->
            <SectionDeleteAccount />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sheet-preview {
  font-size: v-bind("fontSize + 'px'");
}
</style>