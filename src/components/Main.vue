<template>
  <div id="settings">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-select class="select-form"
                  v-bind:items="selectForm.values"
                  v-bind:label="selectForm.label"
                  item-text="name"
                  item-value="id"
                  v-model="selectForm.selected"
                  single-line
        />
      </v-flex>
      <v-flex xs12 sm6>
        <div>
          <v-btn floating small primary class="mt-3" @click.native.stop="loadForm" v-if="selectForm.selected">
            <v-icon light>file_download</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field
            name="form-name"
            v-bind:label="settingsForm.name.label"
            v-bind:value="settingsForm.name.value"
            required
        ></v-text-field>
        <v-text-field
            name="form-id"
            v-bind:label="settingsForm.id.label"
            v-bind:value="settingsForm.id.value"
            required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
            name="form-description"
            v-bind:label="settingsForm.description.label"
            v-bind:value="settingsForm.description.value"
            multi-line
            rows="4"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field-more :inputs="settingsForm.mail_to.fields" more-label="Дополнительный адрес почты" :more-required="false"></v-text-field-more>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field-more :inputs="settingsForm.mail_cc.fields" more-label="Дополнительный адрес почты" :more-required="false"></v-text-field-more>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import _ from 'lodash'
  import textFieldMore from './inputmore'

  export default {
    name: 'main',
    data () {
      return {
        selectForm: {
          'label': 'Выбрать',
          'values': [
            {'name': 'Новая форма', 'id': ''},
            {'name': 'Заказ звонка', 'id': 'skcallme'},
            {'name': 'Контакты', 'id': 'skfeedback'}
          ],
          'selected': ''
        },
        settingsForm: {
          'name': {'label': 'Название', 'value': ''},
          'id': {'label': 'Символьный код', 'value': ''},
          'description': {'label': 'Описание', 'value': ''},
          'mail_to': {
            'btn_remove': [],
            'fields': [
              {'position': 0, 'label': 'Адрес получателя', 'model': '', 'required': true}
            ]
          },
          'mail_cc': {
            'btn_remove': [],
            'fields': [
              {'position': 0, 'label': 'Адрес копии', 'model': '', 'required': false}
            ]
          }
        }
      }
    },
    components: {
      'v-text-field-more': textFieldMore
    },
    methods: {
      loadForm () {
        console.log(this.selectForm.selected.id)
      },
      addFieldText (name) {
        let index = this.settingsForm[name].fields.length + 1
        this.settingsForm[name].fields.push(
          {'position': index, 'label': 'Дополнительный адрес получателя', 'model': '', 'required': false}
        )
        this.settingsForm[name].btn_remove.push(index)
      },
      removeFieldText (name, position) {
        let index = _.findKey(this.settingsForm[name].fields, (o) => o.position === position)
        this.settingsForm[name].fields.splice(index, 1)
        this.settingsForm[name].btn_remove = _.pull(this.settingsForm[name].btn_remove, position)
      }
    }
  }
</script>
