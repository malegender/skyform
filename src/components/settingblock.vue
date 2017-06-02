<template>
  <v-dialog v-model="dialog" :width="width" persistent>
    <v-card>
      <v-card-row>
        <v-card-title>{{ title }}</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>
          <v-text-field label="Тэг" v-model="data.tag" :rules="rulesTag" required></v-text-field>
          <v-attribute-more :inputs="data.attributes" :more-label="attributes_more_label"></v-attribute-more>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn class="blue--text darken-1" flat="flat" @click.native.stop="dialog = false">{{ button_close_label }}</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
  import attributeFieldMore from './attributemore'

  export default {
    name: 'v-setting-block',
    model: {
      prop: 'modal'
    },
    props: ['modal', 'width', 'data', 'title'],
    components: {
      'v-attribute-more': attributeFieldMore
    },
    data () {
      return {
        'button_close_label': 'Закрыть',
        'attributes_more_label': 'Название атрибута',
        'emptyTagError': 'Поле Тэг не может быть пустым!',
        'rulesTag': []
      }
    },
    computed: {
      dialog: {
        get: function () {
          return this.modal
        },
        set: function (val) {
          if (!this.data.tag) {
            this.rulesTag = [
              () => { if (!this.data.tag) return this.emptyTagError }
            ]
            return
          }
          this.$emit('close')
        }
      }
    },
    methods: {

    }
  }
</script>
