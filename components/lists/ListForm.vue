<template>
  <div>
    <div v-if="errors && Object.keys(errors).length" class="alert alert-danger">
      <ul>
        <li v-for="(error, name) in errors" :key="name">
          <b class="text-bold">{{ name }}:</b> {{ error[0] }}
        </li>
      </ul>
    </div>

    <div class="form-horizontal">
      <div class="form-group">
        <label for="input_name" class="col-md-2 control-label">Name</label>
        <div class="col-md-10">
          <input id="input_name" v-model="form.name" type="text" class="form-control">
        </div>
      </div>

      <div class="form-group">
        <label for="input_description" class="col-md-2 control-label">Description</label>
        <div class="col-md-10">
          <textarea id="input_description" v-model="form.description" rows="5" class="form-control" />
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
            class="form-control"
            placeholder="Ex: biology, chemistry, physics"
          >
        </div>
      </div>

      <div class="form-group form-image-group">
        <label for="list_cover" class="col-md-2 control-label">Cover Image</label>
        <div class="col-md-10">
          <input id="list_cover" accept="image/png,image/gif,image/jpeg" class="form-control" type="file" @change="form.cover = $event.target.files[0]">
          <div v-if="list && list.cover.present" class="form-selected-image">
            <a class="fancy-box" :href="list.cover.medium">
              <img class="form-image-preview" :src="list.cover.thumb" alt="">
            </a>
            <div><a role="button" @click="removeAttachment('cover')">Remove</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  props: {
    value: { type: Object, required: true },
    list: { type: Object, default: null },
    errors: { type: [Object, Array], default: null },
  },

  data () {
    return {
      form: {
        name: '',
        tag_list: '',
        description: '',
        cover: null,
      },
    }
  },

  watch: {
    form: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      },
    },
  },

  mounted () {
    jQuery('[data-toggle="popover"]').popover()
  },

  methods: {
    async removeAttachment (type) {
      try {
        const res = await axios.delete(`/api/lists/remove-attachment/${type}`)
        this.setForm(res.data)
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
    },
  },
}
</script>
