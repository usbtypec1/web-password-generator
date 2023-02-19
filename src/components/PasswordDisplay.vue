<template>
  <div class="w-11/12 sm:w-3/4 lg:w-7/12 bg-white flex justify-between drop-shadow-lg rounded-md px-6 py-4">
    <p class="text-center text-2xl overflow-scroll">
      {{ props.password }}
    </p>
    <button
        class="cursor-pointer w-8 ml-2 active:rotate-180 duration-150"
        @click="$emit('generateNewPassword')"
    >
      <img src="https://www.lastpass.com/assets/images/cdn/icon-generate-new.svg" alt="Regenerate button">
    </button>
  </div>
</template>

<script setup>
const props = defineProps(['password'])
</script>
