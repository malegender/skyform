<template>
    <v-row row>
        <v-col xs12 md8 offset-md2>
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
                        <v-row row>
                            <v-col xs6>
                                <v-select class=""
                                    :items="cms.values"
                                    v-model="cms.selected"
                                    item-text="name"
                                    item-value="value"
                                    light
                                    single-line
                                    auto
                                />
                            </v-col>
                            <v-col xs6 class="text-xs-right">
                                <v-btn primary darkt @click.native.stop="send">Войти</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
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
