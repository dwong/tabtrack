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
                  v-model="tab.amount">
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
      <b-form-group label="Who Owes?"
                    label-for="debtor"
                    horizontal
		  >
        <tab-debtor :index=0
                    v-model="tab.debtor"
                    @input="(obj) => changeDebtor(-1, obj.value)"/>
      </b-form-group>
      <b-form-group v-for="(item, index) in tab.extraDebtors" :key="index"
      		          :label="'Extra Debtor ' + (index + 1)"
		                horizontal
		                label-sr-only
      >
        <tab-debtor :index="index"
                    v-model="tab.extraDebtors[index]"
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
          debtor: '',
          extraDebtors: []
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
      return this.tab.debtor !== '' &&
             (this.tab.extraDebtors.length === 0 ||
             this.tab.extraDebtors.every((val) => { return val && val !== '' }))
    }
  },
  methods: {
    addDebtor () {
      this.tab.extraDebtors.push('')
    },
    changeDebtor (index, val) {
      if (index === -1) {
        this.tab.debtor = val
      } else if (index >= 0 && index <= this.tab.debtor.length) {
        this.tab.extraDebtors.splice(index, 1, val)
      }
    },
    save () {
      console.log(JSON.stringify(this.tab))
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
