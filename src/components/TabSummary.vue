<template>
  <div>
  <b-table hover
           :items="tabs"
           :fields="fields"
           @row-clicked="rowClicked"
  >
    <template slot="alldebtors" slot-scope="data">
      {{data.item.debtors[0]}}<span v-for="item in data.item.debtors.slice(1)">, {{ item }}</span>
    </template>
  </b-table>
  <b-container>
    <b-row class="cta" align-h="center" align-v="end">
      <b-col cols="4">
        <b-button variant="primary"
                  size="lg"
                  @click="addToTab"
                  >New Entry</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>

export default {
  name: 'tab-summary',
  data () {
    return {
      tabs: [],
      fields: [
        'description',
        {
          key: 'amount',
          label: 'Tab Amount',
          formatter: (value) => {
            return '$' + value.toFixed(2)
          }
        },
        'payer',
        {
          key: 'alldebtors',
          label: 'Debtors'
        }
      ]
    }
  },
  created () {
    const tabs = localStorage.getItem('tabs')
    if (tabs == null) {
      this.$router.push({name: 'Tab'})
    } else {
      this.tabs = JSON.parse(tabs)
    }
  },
  methods: {
    rowClicked (val) {
      this.$router.push(
        {
          name: 'Tab',
          query: { t: JSON.stringify(val) }
        }
      )
    },
    addToTab () {
      this.$router.push({name: 'Tab'})
    }
  }
}
</script>

<style scoped>
.cta {
  margin-top: 3em;
}
</style>
