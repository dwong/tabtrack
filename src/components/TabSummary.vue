<template>
  <b-table hover
           :items="tabs"
           :fields="fields"
           @row-clicked="rowClicked"
  >
    <template slot="alldebtors" slot-scope="data">
      {{data.item.debtor}}<span v-for="item in data.item.extraDebtors">, {{ item }}</span>
    </template>
  </b-table>
</template>

<script>
const tabs = [
  {
    description: 'lunch somewhere',
    amount: 5.50,
    payer: 'Alice',
    debtor: 'Bob',
    extraDebtors: ['Charlie']
  },
  {
    description: 'dinner elsewhere',
    amount: 10.75,
    payer: 'Bob',
    debtor: 'Charlie',
    extraDebtors: []
  }
]

export default {
  name: 'tab-summary',
  data () {
    return {
      tabs: tabs,
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
  methods: {
    rowClicked (val) {
      this.$router.push(
        {
          name: 'Tab',
          query: { t: JSON.stringify(val) }
        }
      )
    }
  }
}
</script>
