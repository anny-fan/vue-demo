<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <slot name="header">default header</slot>
      <div>
        <slot>default body</slot>
      </div>
      <footer class="footer">
        <button class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button class="btn btn-danger" @click="$emit('confirm')">
          Confirm
        </button>
        <slot name="footer"> </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  //   data,
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(var(--bs-dark-rgb), 0.4);
  display: grid;
  place-items: center;
}
.modal-container {
  background-color: white;
  padding: 1rem;
  max-width: 500px;
}
.footer {
  display: flex;
  gap: 0.5rem;
}
</style>
