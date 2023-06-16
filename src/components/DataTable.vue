<template>
  <table class="table table-light table-striped-columns">
    <thead>
      <tr>
        <th
          v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
        >
          {{ capitalize(key) }}

          <span
            class="arrow"
            :class="sortColumns[key] > 0 ? 'asc' : 'dsc'"
          ></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredTitles">
        <td v-for="key in columns">{{ entry[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  entries: Array,
  columns: Array,
  filterKey: String,
});

let sortKey = $ref("");
const sortColumns = $ref([]);

const filteredTitles = computed(() => {
  const filterKey = props.filterKey?.toLowerCase();
  const order = sortColumns[sortKey] || 1;
  let entries = props.entries;
  if (filterKey) {
    entries = entries.filter(function (row) {
      return Object.keys(row).some(function (key) {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
      });
    });
  }
  if (sortKey) {
    entries = entries.sort(function (x, y) {
      x = x[sortKey];
      y = y[sortKey];
      return (x === y ? 0 : x > y ? 1 : -1) * order;
    });
  }
  return entries;
});

// Initialize sortColumns
const initSortColumns = () => {
  props.columns.forEach((key) => {
    sortColumns[key] = 1;
  });
};
initSortColumns();

// helper methods
function capitalize(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
function sortBy(key) {
  sortKey = key;
  sortColumns[key] *= -1;
}
</script>

<style lang="scss" scoped>
th {
  &:hover {
    cursor: pointer;
  }
  &.active {
    color: var(--bs-info);
  }
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 1rem;
  &.asc {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--bs-dark);
  }
  &.dsc {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--bs-dark);
  }
}
</style>
