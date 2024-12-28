<template>
  <div>
    <div class="buttonclass">
      <button class="edit" @click="addInstanceDB">Add New Instance</button>
    </div>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Logo</th>
            <th>Instance Name</th>
            <th>Portal Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in gridData" :key="item.instancename">
            <td>
              <button @click="edit(item.instancename)" class="edit">Edit</button>&nbsp;
              <button @click="deleteData(item.instancename)" class="edit">Delete</button>
            </td>
            <td>
              <!-- Display the logo using base64 -->
              <img :src="'data:image/jpeg;base64,' + item.logo" alt="Logo" class="logo" v-if="item.logo">
              <span v-else>No Logo</span>
            </td>
            <td>{{ item.instancename }}</td>
            <td>{{ item.portalname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/config';

export default {
  data() {
    return {
      gridData: [] // Stores fetched instance data, including logos
    };
  },
  methods: {
    fetchLogos() {
      // Fetch logos and instance data
      axios
        .get(`${BASE_URL}/getImages`)
        .then((response) => {
          this.gridData = response.data; // Set the logos data in gridData
        })
        .catch((error) => {
          console.error('Error fetching logos:', error);
        });
    },

    deleteData(instancename) {
      axios.delete(`${BASE_URL}/deleteConfig?table=gepnicas_logos&instancename=${instancename}`)
        .then(response => {
          alert(response.data.message);
          this.fetchLogos(); // Refresh the grid after deletion
        })
        .catch(error => {
          console.error('Error deleting config:', error);
          alert('Error deleting config: ' + error.message);
        });
    },

    addInstanceDB() {
      this.$emit('add-instanceDB');
    },

    edit(instancename) {
      this.$emit('edit', instancename);
    }
  },
  mounted() {
    this.fetchLogos(); // Fetch logos when the component is mounted
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  white-space: nowrap;
}

th {
  background-color: #f2f2f2;
}

.edit {
  padding: 6px;
  background-color: #2f6b77;
  border-radius: 5px;
  color: white;
}

.edit:hover {
  background-color: #1a4d57;
}

.buttonclass {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
