<template>
  <button
    :class="{
      'is-disabled': disabled
    }"
    :disabled="disabled"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ZnButton',
  props: {
    disabled: Boolean
  }
})
</script>
