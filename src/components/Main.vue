<template>
  <div id="settings">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3>
        <v-select class="select-form"
                  v-bind:items="selectForm.values"
                  v-bind:label="selectForm.label"
                  item-text="name"
                  item-value="value"
                  v-model="selectForm.model"
                  single-line
        />
      </v-flex>
      <v-flex xs12 sm6 md8 lg9 v-if="selectForm.model" class="text-xs-center text-sm-left">
        <div>
          <v-btn floating small primary class="mt-3" @click.native.stop="loadForm" v-if="selectForm.model">
            <v-icon light>loop</v-icon>
          </v-btn>
          <v-btn floating small warning class="mt-3" @click.native.stop="copyForm">
            <v-icon light>content_copy</v-icon>
          </v-btn>
          <v-btn floating small error class="mt-3" @click.native.stop="copyForm">
            <v-icon light>delete</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3>
        <v-text-field :label="settingsForm.name.label" v-model="settingsForm.name.model" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <v-text-field :label="settingsForm.id.label" v-model="settingsForm.id.model" :disabled="selectForm.model!==''" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md4 lg6>
        <v-text-field :label="settingsForm.description.label"
                      v-model="settingsForm.description.model"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 lg2>
        <v-text-field :label="settingsForm.charset.label" v-model="settingsForm.charset.model"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2>
        <v-text-field :label="settingsForm.validation.min_length.label" v-model="settingsForm.validation.min_length.model"></v-text-field>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <v-text-field :label="settingsForm.validation.text_error.label" v-model="settingsForm.validation.text_error.model"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2>
        <v-checkbox :label="settingsForm.validation.html5.label" v-model="settingsForm.validation.html5.model" dark primary></v-checkbox>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2>
        <v-select :items="settingsForm.action.values"
                  :label="settingsForm.label"
                  item-text="name"
                  item-value="value"
                  v-model="settingsForm.action.model"
                  single-line
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="settingsForm.action.model=='send'">
      <v-flex xs12 md4 lg4>
        <v-text-field :label="settingsForm.subject.label" v-model="settingsForm.subject.model" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-text-field-more :inputs="settingsForm.mail_to.fields" :more-label="settingsForm.mail_to.more_label" :more-required="false"></v-text-field-more>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-text-field-more :inputs="settingsForm.mail_cc.fields" :more-label="settingsForm.mail_cc.more_label" :more-required="false"></v-text-field-more>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="settingsForm.action.model=='send'">
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.mail_from_name.label" v-model="settingsForm.mail_from_name.model"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 v-if="settingsForm.reverse_email.model">
        <v-text-field :label="settingsForm.reverse_email_field.label" v-model="settingsForm.reverse_email_field.model" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <v-checkbox :label="settingsForm.reverse_email.label" v-model="settingsForm.reverse_email.model" dark primary></v-checkbox>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <v-checkbox :label="settingsForm.smtp.on.label" v-model="settingsForm.smtp.on.model" dark primary></v-checkbox>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="settingsForm.smtp.on.model && settingsForm.action.model=='send'">
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.smtp.host.label" v-model="settingsForm.smtp.host.model" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.smtp.secure.label" v-model="settingsForm.smtp.secure.model"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.smtp.port.label" v-model="settingsForm.smtp.port.model"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 sm6 md4 lg2>
        <v-checkbox :label="settingsForm.smtp.auth.label" v-model="settingsForm.smtp.auth.model" dark primary></v-checkbox>
      </v-flex>
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.smtp.username.label"
                      v-model="settingsForm.smtp.username.model"
                      :disabled="!settingsForm.smtp.auth.model"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 lg2>
        <v-text-field :label="settingsForm.smtp.password.label"
                      v-model="settingsForm.smtp.password.model"
                      :append-icon="settingsForm.smtp.password.visibility ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (settingsForm.smtp.password.visibility = !settingsForm.smtp.password.visibility)"
                      :type="!settingsForm.smtp.password.visibility ? 'password' : 'text'"
                      :disabled="!settingsForm.smtp.auth.model"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-settings-form></v-settings-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import _ from 'lodash'
  import textFieldMore from './inputmore'
  import settingsForm from './settingsform'

  export default {
    name: 'main',
    data () {
      return {
        selectForm: {
          'label': '',
          'values': [],
          'model': ''
        },
        settingsForm: {
          'id': {'label': '', 'model': ''},
          'name': {'label': '', 'model': ''},
          'description': {'label': '', 'model': ''},
          'charset': {'label': '', 'model': ''},
          'validation': {
            'html5': {'label': '', 'model': false},
            'min_length': {'label': '', 'model': 3},
            'text_error': {'label': '', 'model': ''}
          },
          'smtp': {
            'on': {'label': '', 'model': false},
            'host': {'label': '', 'model': ''},
            'secure': {'label': '', 'model': 'ssl'},
            'port': {'label': '', 'model': 465},
            'auth': {'label': '', 'model': false},
            'username': {'label': '', 'model': ''},
            'password': {'label': '', 'model': '', 'visibility': false}
          },
          'subject': {'label': '', 'model': ''},
          'mail_to': {
            'more_label': '',
            'fields': [
              {'label': '', 'model': '', 'required': true}
            ]
          },
          'mail_cc': {
            'more_label': '',
            'fields': [
              {'label': '', 'model': '', 'required': false}
            ]
          },
          'mail_from_name': {'label': '', 'model': ''},
          'reverse_email': {'label': '', 'model': false},
          'reverse_email_field': {'label': '', 'model': ''},
          'action': {
            'label': '',
            'values': [],
            'model': ''
          }
        }
      }
    },
    components: {
      'v-text-field-more': textFieldMore,
      'v-settings-form': settingsForm
    },
    methods: {
      loadForm () {
        console.log(this.selectForm.model)
      },
      copyForm () {
        console.log(this.selectForm.model)
      },
      deleteForm () {
        console.log(this.selectForm.model)
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('/static/form.json').then(response => {
          if (_.isEmpty(response.body)) document.router.push('Login')
          _.extend(this.$data, response.body)
        })
      })
    }
  }
</script>
