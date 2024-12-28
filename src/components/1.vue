<template>
  <div class="overflow-auto total">
    <div class="pgtitle" style="padding-left: 4em;">
      <h4 class="title">{{ title }}</h4>
      <b-pagination 
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
        first-number
        last-number
        @input="currentPageChanged"
      ></b-pagination>
    </div>
    <div id="search_c" style="padding-left: 4em;">
      <input type="text" placeholder="Search" v-model="search_text">
      <br>
    </div>
    <br>
    <div id="rad" style="padding-left: 4em;">
      <div id="radiobutton" style="display: flex; justify-content: space-between; width: 15em;">
        <div>
          <input type="radio" v-model="selectedOption" value="Bids">
          <label style="font-size: larger;">Bids</label>
        </div>
        <div>
          <input type="radio" v-model="selectedOption" value="Tenders">
          <label style="font-size: larger;">Tenders</label>
        </div>
      </div>
    </div>

    <b-table
      id="my-table"
      :items="paginatedItems"
      :per-page="perPage"
      :current-page="currentPage"
      bordered
      :fields="fields"
      small
    >
      <template #cell(checkbox)="data">
        <input 
          type="checkbox" 
          v-model="selectedItems" 
          :value="data.item" 
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import { BPagination, BTable } from 'bootstrap-vue-next';

export default {
  components: {
    BPagination: () => import('bootstrap-vue-next').then(({ BPagination }) => BPagination),
    BTable: () => import('bootstrap-vue-next').then(({ BTable }) => BTable),
  },
  props: {
    currentPage: Number,
    perPage: Number,
    selectedOption: String,
    bidstenders: Object,
    title: String
  },
  data() {
    return {
      currentPage: this.currentPage,
      search_text: '',
      selectedOption: 'Tenders',
      selectedItems: [], // Store selected items
    };
  },
  computed: {
    filteredItems() {
      const items = this.selectedOption === 'Tenders' ? this.bidstenders.tenders : this.bidstenders.bids;
      if (!this.search_text.trim()) {
        return items;
      } else {
        const searchTerm = this.search_text.trim().toLowerCase();
        return items.filter(item => {
          return Object.values(item).some(value =>
            value.toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredItems.slice(start, end);
    },
    totalRows() {
      return this.filteredItems.length;
    },
    fields() {
      // Assuming your table has 4 existing columns
      return [
        { key: 'column1', label: 'Column 1' },
        { key: 'column2', label: 'Column 2' },
        { key: 'column3', label: 'Column 3' },
        { key: 'column4', label: 'Column 4' },
        { key: 'checkbox', label: 'Select' }, // Add checkbox as the 5th column
      ];
    },
  },
  methods: {
    currentPageChanged(page) {
      this.$emit('update:currentPage', page);
    },
  },
};
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

.pgtitle {
  display: flex;
  justify-content: space-between;
}
#my-table {
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.154);
}
.title {
  color: #1a4d57;
  font-weight: bold;
}
</style>
