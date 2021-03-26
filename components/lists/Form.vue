<template>
  <div class="form-horizontal">
    <div class="form-group">
      <label for="input_name" class="col-md-2 control-label">Name</label>
      <div class="col-md-10">
        <input id="input_name" v-model="form.name" type="text" name="list[name]" class="form-control">
      </div>
    </div>

    <div class="form-group">
      <label for="input_description" class="col-md-2 control-label">Description</label>
      <div class="col-md-10">
        <textarea id="input_description" v-model="form.description" name="list[description]" rows="5" class="form-control" />
      </div>
    </div>

    <div class="form-group">
      <div class="col-md-2 control-label">
        <label for="tags_input">Tags</label>
        <p>
          <small>(separated by commas)</small>
        </p>
      </div>
      <div class="col-md-10">
        <input
          id="tags_input"
          v-model="form.tag_list"
          type="text"
          name="list[tag_list]"
          class="form-control"
          placeholder="Ex: biology, chemistry, physics"
        >
      </div>
    </div>

    <div class="form-group">
      <label class="col-md-2 control-label">
        Owner
      </label>
      <div class="col-md-3">
        <div class="form-control contributor-list">
          <a :href="'/' + list.user.username">{{ list.user.username }}</a>
        </div>
      </div>
    </div>

    <div class="form-group form-image-group">
      <label class="col-md-2 control-label">Cover Image</label>
      <div class="col-md-10">
        <input id="input_cover" type="file" name="list[cover]" class="form-control">
        <div v-if="list.cover_file_name" class="form-selected-image">
          <a class="fancy-box" :href="list.cover">
            <img class="form-image-preview" :src="list.cover_thumb" alt="">
          </a>
          <div><a :href="listUrl + '/remove-attachment/cover'">Remove</a></div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <input
          type="submit"
          class="btn btn-primary"
          name="commit"
          :value="buttonName"
          data-disable-with="Update Board"
        >
        <a :href="listUrl">cancel</a>
      </div>
    </div>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect/src/Multiselect.vue'

export default {

  components: { Multiselect },

  props: ['list', 'buttonName', 'currentUser', 'listUrl'],

  data () {
    return {
      form: {
        name: '',
        tag_list: '',
        description: '',
      },
    }
  },

  computed: {
    //
  },

  created () {
    this.form = Object.assign({}, this.list)
    this.form.tag_list = this.list.tags.map(t => t.name).join(', ')
  },

  mounted () {
    jQuery('[data-toggle="popover"]').popover()
  },

  methods: {

    limitText (count) {
      return `and ${count} other users`
    },

  },
}
</script>
