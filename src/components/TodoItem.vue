<template>
  <li class="mb-2">
    {{ title }}
    <button class="btn btn-danger" @click="$emit('remove')">Remove</button>
  </li>
</template>

<script setup>
const props = defineProps(["title"]);
</script>

<style lang="scss" scoped></style>
