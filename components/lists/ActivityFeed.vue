<template>
  <div id="activity-feed">
    <div class="row">
      <div class="col-md-3">
        <client-only>
          <div v-if="signedIn">
            <nuxt-link to="/lists/new" class="btn panel panel-default new-list">
              <h3>Create a new<br> board</h3>
            </nuxt-link>
            <div class="index-filters">
              <h4>Filters</h4>
              <button class="filter-btn" :class="{active: ! filterPins}" @click="filterPins = false">
                All Research Activity
              </button>
              <button class="filter-btn" :class="{active: filterPins}" @click="filterPins = true">
                Your Pins
              </button>
            </div>
          </div>
        </client-only>
      </div>
      <div class="col-md-9">
        <h4>Recent Board Activity</h4>
        <div v-for="list in lists" :key="list.id">
          <list-card
            v-if="list.pinned || ! filterPins"
            :key="list.id"
            :list="list"
            :signed-in="signedIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListCard from './ListCard'

export default {
  components: {
    ListCard,
  },

  props: {
    lists: { type: Array, required: true },
    signedIn: Boolean,
  },

  data () {
    return {
      filterPins: false,
    }
  },

  methods: {
    //
  },
}
</script>
