<template>
    <b-input-group>
        <b-form-input class="js-debtor"
	  		              :id="'debtor' + index"
			                v-model="debtor">
        </b-form-input>
        <b-input-group-append>
          <b-btn variant="danger"
	    	         @click="clearDebtor"
	        >Clear</b-btn>
        </b-input-group-append>
    </b-input-group>  
</template>

<script>
export default {
  data () {
    return {
      name: 'TabDebtor',
      debtor: this.value
    }
  },
  methods: {
    clearDebtor () {
      this.debtor = ''
    }
  },
  watch: {
    debtor (val) {
      this.$emit('input', {index: this.index, value: val})
    }
  },
  props: {
    index: Number,
    value: String
  }
}
</script>
