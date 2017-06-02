<template>
  <div class="more-attribute">
    <v-layout row wrap>
      <v-flex xs9 sm8 lg10>
        <v-text-field v-for="(item, index) in inputs"
                      :label="item.label"
                      v-model="item.model"
                      :key="index"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 sm4 lg2 text-xs-center>
        <v-btn v-for="(item, index) in inputs"
               floating small dark error
               @click.native.stop="removeFieldText(index)"
               class="mt-4 btn-center"
               :key="index"
        >
          <v-icon light>remove</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs9 sm8 lg10>
        <v-text-field v-model="addField" :label="addRulesLabel" :rules="addRules"></v-text-field>
      </v-flex>
      <v-flex xs3 sm4 lg2 text-xs-center>
        <v-btn floating small dark primary @click.native="addFieldText" class="mt-4 btn-center">
          <v-icon light>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'v-text-field-more',
    props: {'inputs': {type: Array}, 'moreLabel': {type: String}},
    data () {
      return {
        'addField': '',
        'addRules': [],
        'emptyError': 'Укажите название атрибута!',
        'doubleError': 'Данный атрибут уже добавлен!',
        'addRulesLabel': 'Введите название атрибута'
      }
    },
    computed: {
      buttons () {
        return _.drop(this.inputs)
      }
    },
    methods: {
      addFieldText () {
        this.addRules = []
        this.addField = this.addField.toLowerCase()
        if (!this.addField) {
          this.addRules = [this.emptyError]
          return
        }
        if (_.find(this.inputs, (o) => { return o.label === this.addField })) {
          this.addRules = [this.doubleError]
          return
        }
        let input = {
          'label': this.addField,
          'model': ''
        }
        this.inputs.push(input)
        this.addField = ''
      },
      removeFieldText (index) {
        this.inputs.splice(index, 1)
      }
    }
  }
</script>
