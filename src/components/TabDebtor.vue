<template>
  <b-button :id="'debtor' + index"
            :pressed.sync="partOfTab"
            :variant="partOfTab ? 'primary' : 'secondary'"
  >
    {{ debtor }}
  </b-button>
</template>

<script>
export default {
  data () {
    return {
      name: 'TabDebtor',
      debtor: this.value,
      partOfTab: this.checked
    }
  },
  watch: {
    partOfTab () {
      this.$emit('change', {inTab: this.partOfTab, value: this.debtor})
    }
  },
  props: {
    index: Number,
    value: String,
    checked: Boolean
  }
}
</script>
