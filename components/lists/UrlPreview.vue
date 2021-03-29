<template>
  <div class="url-preview">
    <div v-if="loading">
      Fetching preview...
    </div>
    <div v-else>
      <div v-if="info.images.length" class="urlp-image cropped-image cropped-image-3by1">
        <div><img :src="info.images[0].src" alt=""></div>
      </div>
      <div class="urlp-title">
        {{ info.title }}
      </div>
      <div class="urlp-descr">
        {{ info.description }}
      </div>
      <div v-if="info.papers && info.papers.length" class="urlp-papers">
        <div class="urlp-papers-header" @click="showPapers = ! showPapers">
          <span v-if="! showPapers">Show</span><span v-else>Hide</span>
          {{ info.papers.length }} found papers
        </div>
        <ul class="urlp-papers-list" :class="{show: showPapers}">
          <li v-for="paper in info.papers.filter(p => p.title)" :key="paper.id" :title="paper.title">
            <input v-model="checked" type="checkbox" :value="paper.id">
            {{ paper.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'loading'],

  data () {
    return {
      showPapers: false,
      checked: [],
    }
  },

  watch: {
    info () {
      this.checked = this.info.papers.map(p => p.id)
    },

    checked () {
      this.$emit('checked', this.checked)
    },
  },
}
</script>
