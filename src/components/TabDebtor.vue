<template>
  <b-form-checkbox :id="'debtor' + index"
                   v-model="partOfTab"
  >
    {{ debtor }}
  </b-form-checkbox>
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
