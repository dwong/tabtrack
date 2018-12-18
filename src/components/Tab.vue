<template>
  <div class="create">
    <font-awesome-icon icon="file-invoice-dollar" size="8x"
    class="d-none d-lg-inline"
    ></font-awesome-icon>
    <b-form class="form">
      <b-form-group label="Description"
		    label-for="description"
		    horizontal
		    >
	<b-form-input id="description"
		      type="text"
		      required
		      placeholder="Lunch @ Joe's"
		      v-focus
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
      <b-form-group label="Who Owes?"
        label-for="newDebtor"
        horizontal
      >
        <b-input-group>
            <b-form-input
              v-model="newDebtorName"
              id="newDebtor"
              @keyup.enter.native="addDebtor"
            >
            </b-form-input>
            <b-input-group-append>
              <b-btn @click="addDebtor"
              >+</b-btn>
            </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <div v-for="(item, index) in tab.members" :key="index"
           class="debtor"
           :label="'Member ' + (index + 1)"
      >

        <tab-debtor :index="index"
                    :value="item"
                    :checked="tab.debtors.indexOf(item) >= 0"
                    @change="(obj) => changeDebtor(obj.inTab, obj.value)"
                    />
      </div>
      <b-form-row class="cta">
        <b-col offset="2" cols="3">
          <b-button variant="link"
                    size="lg"
                    @click="cancel">Cancel</b-button>
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
import _ from 'lodash'

export default {
  name: 'tabview',
  components: {
    TabDebtor
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    tabParam: {
      type: Object
    }
  },
  data () {
    return {
      tab: {},
      defaultTab: {
        id: '',
        description: '',
        amount: 0.00,
        payer: '',
        debtors: [],
        members: []
      },
      newDebtorName: ''
    }
  },
  computed: {
    isNewTab () {
      return this.tab.id.length === 0
    }
  },
  created () {
    Object.assign(this.tab, this.defaultTab, this.tabParam)
    this.tab.members = _.union(this.tab.members, this.tab.debtors)
  },
  methods: {
    addDebtor () {
      if (this.newDebtorName.length > 0) {
        this.tab.debtors.push(this.newDebtorName)
        this.tab.members.push(this.newDebtorName)
        this.newDebtorName = ''
      }
    },
    changeDebtor (inTab, val) {
      let index = this.tab.debtors.indexOf(val)
      if (!inTab) {
        if (index >= 0) {
          this.tab.debtors.splice(index, 1)
        }
      } else if (index === -1) {
        this.tab.debtors.push(val)
      }
    },
    cancel () {
      this.$router.push({name: 'TabSummary'})
    },
    save () {
      this.tab.amount = parseFloat(this.tab.amount)
      let tabs = this.getSavedTabsWithoutCurrentTab()
      if (this.isNewTab) {
        this.tab.id = this.generateIdForCurrentTab()
      }
      tabs.push(this.tab)
      localStorage.setItem('tabs', JSON.stringify(tabs))
      this.$router.push({name: 'TabSummary'})
    },
    formatCurrency (value, event) {
      let valueAsFloat = typeof value.toFixed === 'function' ? value : parseFloat(value)
      return valueAsFloat.toFixed(2)
    },
    getSavedTabsWithoutCurrentTab () {
      let tabs = localStorage.getItem('tabs')
      if (tabs == null) {
        tabs = []
      } else {
        tabs = JSON.parse(tabs)
      }
      if (!this.isNewTab) {
        let currentTabIndex = -1
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].id === this.tab.id) {
            currentTabIndex = i
            break
          }
        }
        if (currentTabIndex !== -1) {
          tabs.splice(currentTabIndex, 1)
        }
      }
      return tabs
    },
    generateIdForCurrentTab () {
      let text = ''
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  }
}
</script>

<style scoped>
.debtor {
  display: inline-block;
  padding: .5em;
}

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
