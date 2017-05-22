<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 offset-md1 md6 offset-md3 lg4 offset-lg4>
      <v-card class="login-form">
        <v-card-row class="green darken-1">
          <v-card-title class="light-blue">
            <span class="white--text">SkyForm</span>
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <v-text-field
                :label="login.label"
                v-model="login.model"
                :rules="login.rules"
            ></v-text-field>
            <v-text-field
                :label="password.label"
                v-model="password.model"
                min="6"
                type="password"
                :rules="password.rules"
            ></v-text-field>
            <v-layout row wrap>
              <v-flex xs6>
                <v-select class=""
                          :items="cms.values"
                          v-model="cms.selected"
                          item-text="name"
                          item-value="value"
                          dark
                          single-line
                          auto
                />
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn primary light @click.native.stop="send">Войти</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        login: {
          'label': 'Логин',
          'model': '',
          'rules': [],
          'error': 'Логин должен содержать не менее 3 символов'
        },
        password: {
          'label': 'Пароль',
          'model': '',
          'rules': [],
          'error': 'Пароль должен содержать не менее 6 символов'
        },
        cms: {
          'values': [
            {'name': 'Без CMS', 'value': 'nocms'},
            {'name': 'Битрикс', 'value': 'bitrix'},
            {'name': 'WordPress', 'value': 'wordpress'},
            {'name': 'Joomla', 'value': 'joomla'},
            {'name': 'Opencart', 'value': 'opencart'}
          ],
          'selected': 'nocms'
        }
      }
    },
    methods: {
      send () {
        let error = false
        if (this.login.model.length < 3) {
          this.login.rules = [() => this.login.model.length > 2 || this.login.error]
        }
        if (this.password.model.length < 6) {
          error = true
          this.password.rules = [() => this.password.model.length > 5 || this.password.error]
        }
        if (error) return
        console.log('Отправляем..')
      }
    }
  }
</script>
