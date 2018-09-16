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
		      v-model="tab.description">
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
                  v-model="tab.amount"
                  :formatter="formatCurrency"
                  lazy-formatter
                  >
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
		      v-model="tab.payer">
        </b-form-input>
      </b-form-group>
      <b-form-group v-for="(item, index) in tab.debtors" :key="index"
      		          :label="index == 0 ? 'Who owes?' :'Debtor ' + (index + 1)"
		                horizontal
                    :label-sr-only="index > 0"
      >
        <tab-debtor :index="index"
                    v-model="tab.debtors[index]"
                    @input="(obj) => changeDebtor(obj.index, obj.value)"
                    />
      </b-form-group>
      <b-form-row v-if="canAddRow">
	      <b-col offset="2">
          <b-btn @click="addDebtor" size="sm">+ Add Row</b-btn>
	      </b-col>
      </b-form-row>
      <b-form-row class="cta">
        <b-col offset="2" cols="3">
          <b-button variant="link" size="lg">Cancel</b-button>
        </b-col>
        <b-col offset="2" cols="3">
          <b-button variant="outline-success"
                    size="lg"
                    @click="save"
          >Save</b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
import TabDebtor from './TabDebtor.vue'

export default {
  name: 'tabview',
  components: {
    TabDebtor
  },
  props: {
    tabParam: {
      type: Object,
      default () {
        return {
          description: '',
          amount: 0.00,
          payer: '',
          debtors: ['']
        }
      }
    }
  },
  data () {
    return {
      tab: this.tabParam
    }
  },
  computed: {
    canAddRow () {
      return this.tab.debtors.length === 0 ||
             this.tab.debtors.every((val) => { return val && val !== '' })
    },
    extraDebtors () {
      if (this.tab.debtors.length > 1) {
        return this.tab.debtors.slice(1)
      } else {
        return []
      }
    }
  },
  methods: {
    addDebtor () {
      this.tab.debtors.push('')
    },
    changeDebtor (index, val) {
      if (index >= 0 && index <= this.tab.debtors.length) {
        this.tab.debtors.splice(index, 1, val)
      }
    },
    save () {
      this.tab.amount = parseFloat(this.tab.amount)
      console.log(JSON.stringify(this.tab))
    },
    formatCurrency (value, event) {
      let valueAsFloat = typeof value.toFixed === 'function' ? value : parseFloat(value)
      return valueAsFloat.toFixed(2)
    }
  }
}
</script>

<style scoped>
.create {
  width: 80%;
  margin: 0 auto;
}
.cta {
  margin-top: 3em;
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
