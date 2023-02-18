<template>
  <div class="h-screen flex flex-col justify-center items-center bg-teal-300 gap-4">
    <div class="w-11/12 sm:w-3/4 lg:w-7/12 bg-white flex justify-between drop-shadow-lg rounded-md px-6 py-4">
      <p class="text-center text-2xl overflow-scroll">
        {{ password }}
      </p>
      <button class="cursor-pointer w-8 ml-2 active:rotate-180 duration-150" @click="onGenerateNewPassword">
        <img src="https://www.lastpass.com/assets/images/cdn/icon-generate-new.svg">
      </button>
    </div>
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
          v-for="characteristicsGroup in characteristics"
          :key="characteristicsGroup.name"
        >
          <input
            class="accent-emerald-400 h-6 w-6 cursor-pointer"
            type="checkbox"
            v-model="characteristicsGroup.isEnabled"
            :id="`checkbox-${characteristicsGroup.name}`"
          >
          <label
            :for="`checkbox-${characteristicsGroup.name}`"
            class="text-lg cursor-pointer"
          >
            {{ characteristicsGroup.name }}
          </label>
        </div>
      </div>
    </div>
    <div class="w-11/12 sm:w-3/4 lg:w-7/12 drop-shadow-lg rounded-md px-6 py-4 flex justify-center">
      <button
        @click="onCopyPasswordToClipboard"
        class="bg-white hover:bg-gray-100 active:bg-gray-300 active:drop-shadow-none active:text-gray-600 outline-none duration-200 drop-shadow-md rounded-3xl px-24 py-3">
        Copy
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import copy from "copy-to-clipboard";

const characteristics = reactive([
  {
    name: "Uppercase",
    isEnabled: true,
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  {
    name: "Lowercase",
    isEnabled: true,
    value: "abcdefghijklmnopqrstuvwxyz"
  },
  {
    name: "Numbers",
    isEnabled: true,
    value: "0123456789"
  },
  {
    name: "Punctuation",
    isEnabled: false,
    value: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
  }
]);

const generatePassword = length => {
  let chosenCharacteristics = characteristics.filter(({ isEnabled }) => isEnabled).map(({ value }) => value);
  if (chosenCharacteristics.length === 0) return "Choose characters";
  chosenCharacteristics = chosenCharacteristics.reduce((a, b) => a + b);
  return [...Array(length).keys()]
    .map(() => chosenCharacteristics.charAt(Math.floor(Math.random() * chosenCharacteristics.length)))
    .reduce((a, b) => a + b);
};


const passwordLength = ref(10);
const password = ref(generatePassword(passwordLength.value));


const onCopyPasswordToClipboard = () => copy(password.value);

watch(passwordLength, value => {
  password.value = generatePassword(value);
});

watch(characteristics, () => {
  password.value = generatePassword(passwordLength.value);
});

const onGenerateNewPassword = () => {
  password.value = generatePassword(passwordLength.value);
};


</script>
