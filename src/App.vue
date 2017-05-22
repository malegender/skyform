<template>
  <v-app top-toolbar>
    <header v-show="header">
      <v-card>
        <v-row row>
          <v-col xs6 class="text-xs-left">
            <h4 class="logo light-blue--text text--darken-2">{{ project }}</h4>
          </v-col>
          <v-col xs6 class="text-xs-right">
            <v-menu origin="center center" offset-y transition="v-scale-transition">
              <v-btn slot="activator" light flat class="menu">
                <v-icon class="mr-2 light-blue--text text--darken-1">account_circle</v-icon>
                {{ greeting.text }}<b class="ml-1">{{ greeting.name }}</b>!
              </v-btn>
              <v-list>
                <v-list-item v-for="item in menu" :key="item">
                  <v-list-tile>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
    </header>
    <main>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        header: true,
        project: 'SkyForm',
        greeting: {'text': 'Привет,', 'name': 'Сергей'},
        menu: [
          {'title': 'Профиль'},
          {'title': 'Выход'}
        ],
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
          'description': {'label': 'Описание', 'value': ''}
        }
      }
    },
    methods: {
      loadForm () {
        console.log(this.selectForm.selected.id)
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
