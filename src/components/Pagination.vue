<template>
  <div class="overflow-auto total">
    <div class="pgtitle" style="padding-left: 4em;">
      <h4 class="title">{{ this.title }}</h4>
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
          <input type="radio" v-model="selectedOption" value="bids">
          <label style="font-size: larger;">Bids</label>
        </div>
        <div>
          <input type="radio" v-model="selectedOption" value="tender">
          <label style="font-size: larger;">Tenders</label>
        </div>
      </div>
    </div>

    <!-- Sync button, appears only on Sync page -->
    <div v-if="title === 'Sync'" class="sync-container" style="padding-left: 64em; margin-bottom: 10px;">
      <button @click="syncDatafolders" class="btn btn-sm btn-outline-primary">
        Sync Datafolders
      </button>
    </div>

    <!-- Select all only appears on Sync page -->
    <div v-if="title === 'Sync'" class="select-all-container" style="padding-left: 68em; margin-bottom: 10px;">
      <button @click="toggleSelectAll" class="btn btn-sm btn-outline-primary">
        {{ selectAll ? 'Deselect All' : 'Select All' }}
      </button>
    </div>

    <b-table
      id="my-table"
      :items="filteredItems"
      :fields="fieldsWithCheckbox"
      :per-page="perPage"
      :current-page="currentPage"
      bordered
      small
    >
      <!-- Checkbox appears only on Sync page -->
      <template v-if="title === 'Sync'" #cell(checkbox)="data">
        <input type="checkbox" v-model="selectedRows" :value="data.item" @change="updateSelectAll">
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios';
  import { BPagination, BTable } from 'bootstrap-vue-next';
  import { BASE_URL, BASE_URL2, BASE_URL3 } from '@/config';

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
        selectedOption: 'tender',

        selectedRows: [], // Array to store selected rows
        selectAll: false, // Flag for select all checkbox
      };
    },
    computed: {
      fieldsWithCheckbox() {
        // Add checkbox field only if the title is 'Sync'
        const existingFields = this.selectedOption === 'tender' 
          ? Object.keys(this.bidstenders.tenders[0] || {})
          : Object.keys(this.bidstenders.bids[0] || {});
        
        if (this.title === 'Sync') {
          return [...existingFields.map(field => ({ key: field, sortable: true })), 
                  { key: 'checkbox', label: 'Select', sortable: false }];
        } else {
          return existingFields.map(field => ({ key: field, sortable: true }));
        }
      },
      filteredItems() {
        const items = this.selectedOption === 'tender' ? this.bidstenders.tenders : this.bidstenders.bids;
        if (!this.search_text.trim()) {
          return items;
        } else {
          const searchTerm = this.search_text.trim().toLowerCase();
          return items.filter(item => {
            return Object.values(item).some(value =>
              value.toString().toLowerCase().includes(searchTerm)
            );
          });
        }
      },
      totalRows() {
        return this.selectedOption === 'tender' ? this.bidstenders.tenders.length : this.bidstenders.bids.length;
      },
    },
    methods: {
      currentPageChanged(page) {
        this.$emit('update:currentPage', page);
      },
      toggleSelectAll() {
        this.selectAll = !this.selectAll;
        this.selectedRows = this.selectAll ? [...this.filteredItems] : [];
      },
      updateSelectAll() {
        this.selectAll = this.selectedRows.length === this.filteredItems.length;
      },
      // Function to get selected datafolders
      getSelectedDatafolders() {
        return this.selectedRows.map(item => item.datafolder); // Adjust based on your data structure
      },
      // Function to sync datafolders
      async syncDatafolders() {
        try {
          const folderPaths = this.getSelectedDatafolders();
          const response = await axios.post(`${BASE_URL3}/sync_datafolders`, {
            datafolders: folderPaths,  // Array of folder paths selected by the user
            instance_name: 'TN',  // Adjust if needed
            folder_type: this.selectedOption  // Adjust if needed
          });

          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

.pgtitle {
  display: flex;
  justify-content: space-between;
}

.title {
  color: #1a4d57;
  font-weight: bold;
}

.sync-container {
  display: flex;
  justify-content: flex-start;
}

.select-all-container {
  display: flex;
  justify-content: flex-start;
}
</style>
