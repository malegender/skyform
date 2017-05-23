<template>
  <v-layout row wrap>
    <v-flex xs9 sm8 lg11>
      <v-text-field v-for="(item, index) in inputs"
                    :label="item.label"
                    v-model="item.model"
                    :key="index"
                    :required="item.required"
      ></v-text-field>
    </v-flex>
    <v-flex xs3 sm4 lg1 text-xs-center>
      <v-btn floating small dark primary @click.native="addFieldText" class="mt-4 btn-center">
        <v-icon light>add</v-icon>
      </v-btn>
      <v-btn v-for="(item, index) in buttons"
             floating small dark error
             @click.native="removeFieldText(index+1)"
             class="mt-4 btn-center"
             :key="index"
      >
        <v-icon light>remove</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'v-text-field-more',
    props: {'inputs': {type: Array}, 'moreLabel': {type: String}, 'moreRequired': {type: Boolean}},
    computed: {
      buttons () {
        return _.drop(this.inputs)
      }
    },
    methods: {
      addFieldText () {
        let input = {
          'label': this.moreLabel ? this.moreLabel : '',
          'required': this.moreRequired ? this.moreRequired : false
        }
        this.inputs.push(input)
      },
      removeFieldText (index) {
        this.inputs.splice(index, 1)
      }
    }
  }
</script>
