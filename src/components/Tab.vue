<template>
  <div class="create">
    <font-awesome-icon icon="file-invoice-dollar" size="8x"></font-awesome-icon>
    <b-form class="form">
      <b-form-group label="Description"
		    label-for="description"
		    horizontal
		    >
	<b-form-input id="description"
		      type="text"
		      required
		      placeholder="Lunch @ Joe's"
		      v-model="description">
        </b-form-input>
      </b-form-group>
      <b-form-group label="How Much?"
      		    label-for="amount"
		    horizontal
            	    >
	<b-input-group prepend="$">
	  <b-form-input id="amount"
	  		type="number"
			min="0.00"
			step="any"
			v-model="amount">
	  </b-form-input>
	</b-input-group>
      </b-form-group>
      <b-form-group label="Who Paid?"
		    label-for="payer"
		    horizontal
		    >
	<b-form-input id="payer"
		      type="text"
		      required
		      placeholder="Alice"
		      v-model="payer">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Who Owes?"
      		    label-for="debtor"
		    horizontal
		    >
        <tab-debtor :index=0 v-model="debtor"
		    @input="(obj) => changeDebtor(obj.index, obj.value)"/>
      </b-form-group>
      <b-form-group v-for="(item, index) in extraDebtors" :key="index"
      		    :label="'Extra Debtor ' + (index + 1)"
		    horizontal
		    label-sr-only
      >
        <tab-debtor :index="index + 1" v-model="extraDebtors[index]"
	            @input="(obj) => changeDebtor(obj.index, obj.value)"/>
      </b-form-group>
      <b-form-row v-if="canAddRow">
	<b-col offset="3">
          <b-btn @click="addDebtor">+ Add Row</b-btn>
	</b-col>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
import TabDebtor from './TabDebtor.vue'

export default {
  name: 'home',
  components: {
    TabDebtor
  },
  data () {
    return {
      description: '',
      amount: 0.00,
      payer: '',
      debtor: '',
      extraDebtors: []
    }
  },
  computed: {
    canAddRow () {
      return this.debtor !== '' &&
             (this.extraDebtors.length === 0 ||
             this.extraDebtors.every((val) => { return val && val !== '' }))
    }
  },
  methods: {
    addDebtor () {
      this.extraDebtors.push('')
    },
    changeDebtor (index, val) {
      if (index === 0) {
        this.debtor = val
      } else if (index > 0 && index <= this.debtor.length) {
        this.extraDebtors.splice(index - 1, 1, val)
      }
    }
  }
}
</script>

<style scoped>
.create {
  width: 80%;
  margin: 0 auto;
}
.form {
  margin-top: 10px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
