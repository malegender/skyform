<template>
  <div id="settings">
    <v-layout row wrap>
      <v-flex xs6>
        <v-select class="select-form"
                  v-bind:items="selectForm.values"
                  v-bind:label="selectForm.label"
                  item-text="name"
                  item-value="id"
                  v-model="selectForm.selected"
                  single-line
        />
      </v-flex>
      <v-flex xs6>
        <div>
          <v-btn floating small dark primary class="mt-3" @click.native.stop="loadForm" v-if="selectForm.selected.id">
            <v-icon>file_download</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
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
      <v-flex xs6>
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
      <v-flex xs4 md5>
        <v-text-field v-for="item in settingsForm.mail_to.fields"
                      :label="item.label"
                      v-model="item.model"
                      :key="item.position"
                      :required="item.required"
        ></v-text-field>
      </v-flex>
      <v-flex xs2 md1 text-xs-center>
        <v-btn floating small dark primary @click.native.stop="addFieldText('mail_to')" class="mt-4">
          <v-icon light>add</v-icon>
        </v-btn>
        <v-btn v-for="item in settingsForm.mail_to.btn_remove"
               floating small dark error
               @click.native.stop="removeFieldText('mail_to', item)"
               class="mt-4"
               :key="item"
        >
          <v-icon light>remove</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4 md5>
        <v-text-field v-for="item in settingsForm.mail_cc.fields"
                      :label="item.label"
                      v-model="item.model"
                      :key="item.position"
                      :required="item.required"
        ></v-text-field>
      </v-flex>
      <v-flex xs2 md1 text-xs-center>
        <v-btn floating small dark primary @click.native.stop="addFieldText('mail_cc')" class="mt-4">
          <v-icon light>add</v-icon>
        </v-btn>
        <v-btn v-for="item in settingsForm.mail_cc.btn_remove"
               floating small dark error
               @click.native.stop="removeFieldText('mail_cc', item)"
               class="mt-4"
               :key="item"
        >
          <v-icon light>remove</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import _ from 'lodash'

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
