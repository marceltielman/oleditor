<template>
  <div class="wrapper">
    <span class="label">zIndex: {{zIndex}}</span>
    <div class="icon-bar">
      <svgicon icon="system/editor/flip_auto" width="22" height="22"
        @click.native="$emit('change', 'auto')" v-tooltip="'auto'">
      </svgicon>
      <svgicon icon="system/editor/flip_front" width="22" height="22" v-tooltip="'flip front'"
        @click.native="$emit('change', (zIndex !== 'auto') ? (zIndex + 1) : 1)">
      </svgicon>
      <svgicon icon="system/editor/flip_back" width="22" height="22" v-tooltip="'flip back'"
        @click.native="$emit('change', (zIndex !== 'auto' && zIndex > 0) ? (zIndex - 1) : 0)">
      </svgicon>
    </div>
  </div>
</template>


<script>
export default {
  name: 'checkbox',
  props: ['zIndex']
}
</script>