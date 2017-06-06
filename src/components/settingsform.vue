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
                  <v-list-tile @click.native="add(item.entity)">
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
                      <div v-for="(block, bindex) in blocks" :key="bindex" class="sort-block">
                        <v-btn @click.native.stop="settingBlock(bindex)"
                               floating small primary>
                          <v-icon light>settings</v-icon>
                        </v-btn>
                        <v-btn v-if="blocks.length > 1"
                               @click.native.stop="dialogConfirmOpen('removeBlock',{'bindex': bindex, 'message': remove_block_message})"
                               floating small error
                        >
                          <v-icon light>delete</v-icon>
                        </v-btn>
                        <draggable v-model="block.fields" :options="{group:'form'}">
                          <transition-group name="list-blocks-fields">
                            <v-card v-for="(field, findex) in block.fields"
                                    :key="findex"
                                    @mouseover="field.buttons=true"
                                    @mouseout="field.buttons=false"
                                    class="sort-field"
                            >
                              <v-layout row wrap>
                                <v-flex xs12>
                                  <label v-if="field.label">{{ field.label }}</label>
                                  <pre v-if="field.entity == 'freearea'">{{ field.attributes.value }}</pre>
                                  <input :type="field.attributes.type"
                                         :class="{label: field.label, 'error-text': field.error}"
                                         :value="field.attributes.value"
                                         :placeholder="field.attributes.placeholder"
                                         readonly
                                         v-if="['input', 'email', 'phone', 'checkbox', 'radio'].indexOf(field.entity) > -1"
                                  >
                                  <textarea rows="2"
                                            :class="{label: field.label, 'error-text': field.error}"
                                            :placeholder="field.attributes.placeholder"
                                            readonly
                                            v-if="field.entity == 'textarea'"
                                  >{{ field.attributes.value }}</textarea>
                                  <select v-model="field.attributes.value"
                                          :class="{label: field.label, 'error-text': field.error}"
                                          :placeholder="field.attributes.placeholder"
                                          readonly
                                          v-if="field.entity == 'select'"
                                  >
                                    <option v-for="(option, oindex) in field.options"
                                            :key="oindex"
                                            :value="option.value ? option.value : option.label"
                                            :selected="option.value == field.value"
                                    >{{ option.label }}</option>
                                  </select>
                                  <div class="error-text cross" v-if="field.error">{{ field.error }}</div>
                                </v-flex>
                                <v-flex xs12
                                        class="text-xs-right block-buttons"
                                        v-show="field.buttons"
                                >
                                  <v-btn floating small primary>
                                    <v-icon light>settings</v-icon>
                                  </v-btn>
                                  <v-btn @click.native.stop="copyField(bindex, findex)" floating small warning>
                                    <v-icon light>content_copy</v-icon>
                                  </v-btn>
                                  <v-btn @click.native.stop="removeField(bindex, findex)" floating small error>
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
              <v-btn class="blue--text darken-1" flat="flat" @click.native.stop="dialogConfirmAction">{{ button_continue_label }}</v-btn>
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
        'button_continue_label': 'Продолжить',
        'button_cancel_label': 'Отменить',
        'drawer': true,
        'mini': true,
        'menu': [
          {'heading': 'Блоки'},
          {'icon': 'view_quilt', 'text': 'Группа полей', 'entity': 'block'},
          {'icon': 'send', 'text': 'Кнопка отправки', 'entity': 'submit'},
          {'icon': 'error_outline', 'text': 'Блок ошибок', 'entity': 'error'},
          {'divider': true},
          {'heading': 'Поля'},
          {'icon': 'code', 'text': 'Произвольный код', 'entity': 'freearea'},
          {'icon': 'input', 'text': 'Текстовое поле', 'entity': 'input'},
          {'icon': 'email', 'text': 'Текстовое поле "E-mail"', 'entity': 'email'},
          {'icon': 'phone', 'text': 'Текстовое поле "Телефон"', 'entity': 'phone'},
          {'icon': 'reorder', 'text': 'Многострочное текстовое поле', 'entity': 'textarea'},
          {'icon': 'check_box', 'text': 'Флажок', 'entity': 'checkbox'},
          {'icon': 'radio_button_checked', 'text': 'Переключатель', 'entity': 'radio'},
          {'icon': 'list', 'text': 'Раскрывающийся список', 'entity': 'select'}
        ],
        'blocks': [
          {
            'tag': 'div',
            'attributes': [
              {'label': 'class', 'model': ''}
            ],
            'fields': [
              {
                'entity': 'input',
                'attributes': {
                  'type': 'text',
                  'placeholder': 'Как к Вам обращаться?'
                },
                'label': 'Ваше имя',
                'error': 'Поле заполнено не корректно!',
                'container': {
                  'tag': 'div',
                  'attributes': {}
                },
                'buttons': false
              },
              {
                'entity': 'textarea',
                'attributes': {
                  'placeholder': 'Оставьте Ваше сообщение'
                },
                'label': 'Комментарий',
                'error': 'Поле заполнено не корректно!',
                'container': {
                  'tag': 'div',
                  'attributes': {}
                },
                'buttons': false
              },
              {
                'entity': 'select',
                'label': 'Выберите город',
                'error': 'Город не выбран!',
                'attributes': {
                  'placeholder': 'Выбрать...',
                  'value': 36
                },
                'options': [
                  {'label': 'Тамбов', 'value': 68},
                  {'label': 'Липецк', 'value': 48},
                  {'label': 'Воронеж', 'value': 36}
                ],
                'container': {
                  'tag': 'div',
                  'attributes': {}
                },
                'buttons': false
              }
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
      add (entity) {
        let field = {
          'entity': entity,
          'attributes': {},
          'container': {
            'tag': 'div',
            'attributes': {}
          },
          'buttons': false
        }
        switch (entity) {
          case 'block':
            this.blocks.push({
              'tag': 'div',
              'attributes': [],
              'fields': []
            })
            return
          case 'input':
            field.attributes.type = 'text'
            field.attributes.name = this.generatorName()
            break
          case 'email':
            field.attributes.type = 'text'
            field.attributes.name = this.generatorName()
            field.attributes.pattern = /^([a-z,._,.\-,0-9])+@([a-z,._,.\-,0-9])+(\.([a-z])+)+$/
            break
          case 'phone':
            field.attributes.type = 'text'
            field.attributes.name = this.generatorName()
            field.attributes.pattern = /^\+?[\d,\-,(,),\s]+$/
            break
          case 'checkbox':
            field.attributes.type = 'checkbox'
            field.attributes.name = this.generatorName()
            break
          case 'radio':
            field.attributes.type = 'radio'
            field.attributes.name = this.generatorName()
            break
          case 'textarea':
          case 'select':
            field.attributes.name = this.generatorName()
            break
        }
        this.blocks[this.blocks.length - 1]['fields'].push(field)
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
      settingBlock (bindex) {
        if (!this.dialogSettingBlock.visible) {
          this.dialogSettingBlock.data = this.blocks[bindex]
        }
        this.dialogSettingBlock.visible = !this.dialogSettingBlock.visible
      },
      removeBlock (data) {
        this.blocks.splice(data.bindex, 1)
      },
      removeField (bindex, findex) {
        this.blocks[bindex]['fields'].splice(findex, 1)
      },
      copyField (bindex, findex) {
        let field = _.cloneDeep(this.blocks[bindex]['fields'][findex])
        if (field.attributes && field.attributes.name) field.attributes.name = this.generatorName()
        this.blocks[bindex]['fields'].splice(findex, 0, field)
      },
      generatorName () {
        let name = `field-${(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)}`
        let double = false

        _.forEach(this.blocks, function (block) {
          _.forEach(block.fields, function (field) {
            if (field.attributes && field.attributes.name && field.attributes.name === name) {
              double = true
            }
          })
        })

        if (double) name = this.generatorName()

        return name
      }
    }
  }
</script>
