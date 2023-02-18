<template>
  <button
      @click="onCopyPasswordToClipboard"
      class="bg-white hover:bg-gray-100 text-xl font-semibold active:bg-gray-300
       active:drop-shadow-none active:text-gray-600 outline-none duration-200
        drop-shadow-md rounded-3xl px-24 py-3">
    Copy
  </button>
</template>

<script setup>
import copy from "copy-to-clipboard";

const props = defineProps(['password'])
const onCopyPasswordToClipboard = () => copy(props.password);
</script>
