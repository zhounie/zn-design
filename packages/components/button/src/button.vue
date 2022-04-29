<script lang="ts">
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'ZnButton',
  setup(props, { slots }) {
    return () => h('button', {}, h('span', {}, slots.default()))
  }
})
</script>

<style></style>
