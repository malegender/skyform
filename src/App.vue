<template>
  <v-app top-toolbar>
    <header v-if="this.header">
      <v-card>
        <v-layout row wrap>
          <v-flex xs4 sm5 md5 lg6 class="text-xs-left">
            <h4 class="logo light-blue--text text--darken-2">{{ project }}</h4>
          </v-flex>
          <v-flex xs5 sm4 md5 lg5 class="text-xs-right">
            <v-menu origin="center center" offset-y transition="v-scale-transition" class="menu-login">
              <v-btn slot="activator" dark flat class="menu">
                <v-icon class="mr-2 light-blue--text text--darken-1">account_circle</v-icon>
                <span class="hidden-xs-only">{{ greeting.text }}</span><b class="ml-1">{{ greeting.name }}</b><span class="hidden-xs-only">!</span>
              </v-btn>
              <v-list>
                <v-list-item v-for="item in menu" :key="item">
                  <v-list-tile>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-flex>
          <v-flex xs3 sm3 md2 lg1 class="menu-languages">
            <v-layout row wrap>
              <v-flex sm7 class="hidden-xs-only">
                <v-subheader class="pa-0">{{ languages.label }}</v-subheader>
              </v-flex>
              <v-flex xs12 sm3 class="pa-0 text-xs-center">
                <v-menu offset-y>
                  <img :src="languageSrc" slot="activator">
                  <v-list>
                    <v-list-item v-for="item in languages.values" @click="selectLanguage(item.value)" :key="item.value">
                      <v-list-tile>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </header>
    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'app',
    data () {
      return {
        'header': false,
        'project': '',
        'greeting': {'text': '', 'name': ''},
        'menu': [],
        'languages': {
          'label': '',
          'values': [],
          'model': ''
        }
      }
    },
    computed: {
      languageSrc () {
        return '/static/languages/' + this.languages.model + '/' + this.languages.model + '.png'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('/static/header.json').then(response => {
          if (_.isEmpty(response.body)) document.router.push('Login')
          _.extend(this.$data, response.body)
        })
      })
    },
    methods: {
      selectLanguage (lang) {
        console.log('Меняем язык на ' + lang)
        this.languages.model = lang
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
