<template>
  <div>
    <div class="col-md-offset-6">
      <input
        ref="input"
        class="ref-table-filter"
        :value="value"
        placeholder="Filter this board for..."
        @input="updateFilterKey($event.target.value)"
      >
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="60" :class="{ active: sortKey == 'bookmarks_count' }" @click="sort('bookmarks_count')">
            Bookmarks
            <span class="table-sort" :class="sortOrders['votes'] > 0 ? 'asc' : 'dsc'" />
          </th>
          <th width="50" :class="{ active: sortKey == 'age' }" @click="sort('age')">
            Age
            <span class="table-sort" :class="sortOrders['age'] < 0 ? 'asc' : 'dsc'" />
          </th>
          <th>Paper</th>
          <th width="30" />
          <th width="50" />
        </tr>
      </thead>
      <tbody
        is="reference-row"
        v-for="(reference, index) in filteredData"
        :index="index"
        :r="reference"
        :signed-in="signedIn"
        :edits-allowed="editsAllowed"
        :current-username="currentUsername"
      />
    </table>
  </div>
</template>

<script>
import ReferenceRow from './ReferenceRow.vue'

export default {

  components: { ReferenceRow },

  props: ['filteredData', 'value', 'sortKey', 'sortOrders', 'signedIn', 'editsAllowed', 'currentUsername'],

  methods: {
    sort (key) {
      this.$emit('sort', key)
    },

    updateFilterKey (value) {
      this.$emit('input', value)
    },
  },
}
</script>
