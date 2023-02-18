<template>
  <div class="h-screen flex flex-col justify-center items-center bg-teal-300 gap-4">
    <password-display :password="password" @generate-new-password="regeneratePassword"/>
    <div
        class="w-11/12 sm:w-3/4 lg:w-7/12 bg-white flex gap-4 lg:gap-12 justify-between drop-shadow-lg rounded-md px-6 py-4">
      <div class="flex-1">
        <p class="text-xl font-semibold mb-3">
          Password Length
        </p>
        <div class="flex items-center gap-5">
          <input
              id="password-length"
              class="outline-1 border-2 rounded-md border-emerald-400 outline-emerald-500 px-3 py-2"
              type="number"
              v-model.number="passwordLength"
              step="1"
              min="1"
              max="50"
          >
          <input
              class="range w-full accent-emerald-400 rounded-xl"
              type="range"
              v-model.number="passwordLength"
              min="1"
              max="50"
              step="1"
          >
        </div>
      </div>
      <div>
        <div
            class="flex items-center gap-3"
            v-for="charactersGroup in characters"
            :key="charactersGroup.name"
        >
          <input
              class="accent-emerald-400 h-6 w-6 cursor-pointer"
              type="checkbox"
              v-model="charactersGroup.isEnabled"
              :id="`checkbox-${charactersGroup.name}`"
          >
          <label
              :for="`checkbox-${charactersGroup.name}`"
              class="text-lg cursor-pointer"
          >
            {{ charactersGroup.name }}
          </label>
        </div>
      </div>
    </div>
    <div class="w-11/12 sm:w-3/4 lg:w-7/12 drop-shadow-lg rounded-md px-6 py-4 flex justify-center">
      <copy-to-clipboard-button :password="password"/>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import PasswordDisplay from "./components/PasswordDisplay.vue";
import {generatePassword} from "./services/passwordGenerator.js";
import CopyToClipboardButton from "./components/CopyToClipboardButton.vue";
import charactersRaw from './data/characters.json'

const characters = reactive(charactersRaw);
const passwordLength = ref(10);
const password = ref(generatePassword(characters, passwordLength.value));

const regeneratePassword = () => password.value = generatePassword(characters, passwordLength.value)

watch(passwordLength, regeneratePassword);
watch(characters, regeneratePassword);
</script>
