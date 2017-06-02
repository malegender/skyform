<template>
  <v-layout row wrap justify-center>
    <v-dialog v-model="dialogFields" fullscreen transition="v-dialog-bottom-transition" :overlay=false>
      <v-btn primary light slot="activator">{{ button_activator_label }}</v-btn>
      <v-card>
        <v-card-row>
          <v-navigation-drawer v-if="drawer" :mini-variant="mini" permanent clipped light>
            <v-list dense>
              <v-list-item v-if="mini">
                <v-list-tile @click.native.stop="mini = !mini">
                  <v-list-tile-action>
                    <v-icon>zoom_in</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-item>
              <v-list-item v-if="!mini">
                <v-list-tile @click.native.stop="mini = !mini">
                  <v-list-tile-action>
                    <v-icon>zoom_out</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
              <template v-for="(item, i) in menu">
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                <v-divider
                    v-else-if="item.divider"
                    dark
                    class="my-4"
                    :key="i"
                ></v-divider>
                <v-list-item
                    :key="i"
                    v-else
                >
                  <v-list-tile @click.native="add(item.action)">
                    <v-list-tile-action>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-item>
              </template>
            </v-list>
          </v-navigation-drawer>
          <v-toolbar>
            <v-btn icon="icon" @click.native="dialogFields = false" light>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn icon="icon" @click.native="drawer=!drawer" light>
              <v-icon>tune</v-icon>
            </v-btn>
            <v-toolbar-title>{{ button_activator_label }}</v-toolbar-title>
            <v-btn light flat @click.native="dialogFields = false">{{ button_save_label }}</v-btn>
          </v-toolbar>
        </v-card-row>
          <div id="form-content">
            <v-layout row wrap>
              <v-flex xs12 md6 offset-md3 class="wrap-content">
                  <draggable v-model="blocks">
                    <transition-group name="list-blocks">
                      <div v-for="(block, index) in blocks" :key="index" class="sort-block">
                        <v-btn @click.native.stop="settingBlock(index)"
                               floating small primary>
                          <v-icon light>settings</v-icon>
                        </v-btn>
                        <v-btn v-if="blocks.length > 1"
                               @click.native.stop="dialogConfirmOpen('removeBlock',{'index': index, 'message': remove_block_message})"
                               floating small error
                        >
                          <v-icon light>delete</v-icon>
                        </v-btn>
                        <draggable v-model="block.fields" :options="{group:'form'}">
                          <transition-group name="list-blocks-fields">
                            <v-card v-for="(field, index) in block.fields"
                                    :key="index"
                                    @mouseover="field.buttons=true"
                                    @mouseout="field.buttons=false"
                                    class="sort-field"
                            >
                              <v-layout row wrap>
                                <v-flex xs5 md9>
                                  {{ field.name }}
                                </v-flex>
                                <v-flex xs7 md3 class="text-xs-right" v-show="field.buttons">
                                  <v-btn floating small primary>
                                    <v-icon light>settings</v-icon>
                                  </v-btn>
                                  <v-btn floating small warning>
                                    <v-icon light>content_copy</v-icon>
                                  </v-btn>
                                  <v-btn @click.native.stop="removeField(index)" floating small error>
                                    <v-icon light>delete</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-card>
                          </transition-group>
                        </draggable>
                      </div>
                    </transition-group>
                  </draggable>
              </v-flex>
            </v-layout>
        </div>
        <v-dialog v-model="dialogConfirm.visible" :width="dialogConfirm.width">
          <v-card>
            <v-card-row>
              <v-card-title>{{ dialogConfirm.data.title ? dialogConfirm.data.title : dialogConfirm.title }}</v-card-title>
            </v-card-row>
            <v-card-row>
              <v-card-text>{{ dialogConfirm.data.message ? dialogConfirm.data.message : dialogConfirm.message }}</v-card-text>
            </v-card-row>
            <v-card-row actions>
              <v-btn class="red--text darken-1" flat="flat" @click.native.stop="dialogConfirm.visible = false">{{ button_cancel_label }}</v-btn>
              <v-btn class="blue--text darken-1" flat="flat" @click.native.stop="dialogConfirmAction">{{ button_save_label }}</v-btn>
            </v-card-row>
          </v-card>
        </v-dialog>
        <v-setting-block v-model="dialogSettingBlock.visible"
                         :title="dialogSettingBlock.title"
                         @close="dialogSettingBlock.visible = false"
                         :data="dialogSettingBlock.data"
                         width="320"
        ></v-setting-block>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import _ from 'lodash'
  import draggable from 'vuedraggable'
  import settingblock from './settingblock'

  export default {
    name: 'settings-form',
    data () {
      return {
        'dialogFields': false,
        'dialogSettingBlock': {
          'title': 'Настройка блока',
          'visible': false,
          'data': {}
        },
        'dialogConfirm': {
          'visible': false,
          'title': 'Внимание!',
          'message': 'Вы действительно хотите выполнить данное действие?',
          'cancel': 'Отмена',
          'continue': 'Продолжить',
          'action': null,
          'data': {},
          'width': '40%'
        },
        'remove_block_message': 'Будут удалены все поля входящие в эту группу!',
        'button_activator_label': 'Поля формы',
        'button_save_label': 'Сохранить',
        'button_cancel_label': 'Отменить',
        'drawer': true,
        'mini': true,
        'menu': [
          {'heading': 'Блоки'},
          {'icon': 'view_quilt', 'text': 'Группа полей', 'action': 'block'},
          {'icon': 'send', 'text': 'Кнопка отправки', 'action': 'submit'},
          {'icon': 'error_outline', 'text': 'Блок ошибок', 'action': 'error'},
          {'divider': true},
          {'heading': 'Поля'},
          {'icon': 'code', 'text': 'Произвольный код', 'action': 'freearea'},
          {'icon': 'input', 'text': 'Текстовое поле', 'action': 'input'},
          {'icon': 'reorder', 'text': 'Многострочное текстовое поле', 'action': 'textarea'},
          {'icon': 'check_box', 'text': 'Флажок', 'action': 'checkbox'},
          {'icon': 'radio_button_checked', 'text': 'Переключатель', 'action': 'radio'},
          {'icon': 'list', 'text': 'Раскрывающийся список', 'action': 'select'}
        ],
        'blocks': [
          {
            'tag': 'div',
            'attributes': [
              {'label': 'class', 'model': ''}
            ],
            'fields': [
              {'name': 'input', 'buttons': false},
              {'name': 'textarea', 'buttons': false}
            ]
          },
          {
            'tag': 'div',
            'attributes': [
              {'label': 'class', 'model': ''}
            ],
            'fields': [
              {'name': 'input2', 'buttons': false},
              {'name': 'textarea2', 'buttons': false}
            ]
          }
        ]
      }
    },
    components: {
      draggable,
      'v-setting-block': settingblock
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('/static/fields.json').then(response => {
          _.extend(this.$data, response.body)
        })
      })
    },
    methods: {
      add (field) {
        switch (field) {
          case 'block':
            this.blocks.push({
              'tag': 'div',
              'attributes': [],
              'fields': []
            })
            break
          case 'freearea':
            break
          case 'input':
            this.blocks[this.blocks.length - 1]['fields'].push({'name': 'input', 'buttons': false})
            break
          case 'textarea':
            this.blocks[this.blocks.length - 1]['fields'].push({'name': 'textarea', 'buttons': false})
            break
          case 'select':
            this.blocks[this.blocks.length - 1]['fields'].push({'name': 'select', 'buttons': false})
            break
        }
      },
      dialogConfirmOpen (action, data) {
        this.dialogConfirm.visible = true
        this.dialogConfirm.action = action
        this.dialogConfirm.data = data
      },
      dialogConfirmAction () {
        this[this.dialogConfirm.action](this.dialogConfirm.data)
        this.dialogConfirm.visible = false
      },
      settingBlock (index) {
        if (!this.dialogSettingBlock.visible) {
          this.dialogSettingBlock.data = this.blocks[index]
        }
        this.dialogSettingBlock.visible = !this.dialogSettingBlock.visible
      },
      removeBlock (data) {
        this.blocks.splice(data.index, 1)
      },
      removeField (index) {
        alert(index)
      }
    }
  }
</script>
