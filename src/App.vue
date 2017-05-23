<template>
  <v-app top-toolbar>
    <header v-if="this.$route.name!='Login'">
      <v-card>
        <v-layout row wrap>
          <v-flex xs6 class="text-xs-left">
            <h4 class="logo light-blue--text text--darken-2">{{ project }}</h4>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-menu origin="center center" offset-y transition="v-scale-transition">
              <v-btn slot="activator" dark flat class="menu">
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
        'project': '',
        'greeting': {'text': '', 'name': ''},
        'menu': []
      }
    },
    mounted () {
      console.log(this.$route.name)
      if (this.$route.name === 'Login') return
      this.$nextTick(function () {
        this.$http.get('/static/header.json').then(response => {
          if (_.isEmpty(response.body)) document.router.push('Login')
          _.extend(this.$data, response.body)
        })
      })
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
