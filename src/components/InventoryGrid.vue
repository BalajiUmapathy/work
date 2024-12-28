<template>
  <div>
    <div class="buttonclass">
      <button class="edit" @click="addInstance">Add New Instance</button>
    </div>
    <div class="container">
      <table>
        <tr>
          <th>Edit</th>
          <th>Datacentre</th>
          <th>Instance Name</th> 
          <th>Ip Segment</th>
          <th>Msrslno</th>
          <th>Nesdcode</th>
          <th>Portal Category</th>
          <th>Primary Apache Conf</th>
          <th>Primary Apache Ssl</th>
          <th>Primary App Node1</th>
          <th>Primary App Node2</th>
          <th>Primary App Script11</th>
          <th>Primary App Script12</th>
          <th>Primary App Script21</th>
          <th>Primary App Script22</th>
          <th>Primary App User</th>
          <th>Primary Blue Worker</th>
          <th>Primary DbNrdr Node</th>
          <th>Primary Gep Balancer</th>
          <th>Primary Green Worker</th>
          <th>Primary Mob Script11</th>
          <th>Primary Mob Script21</th>
          <th>Primary Rep Script11</th>
          <th>Primary Rep Script21</th>
          <th>Primary Rep User</th>
          <th>Primary Web Node1</th>
          <th>Primary Web Node2</th>
          <th>Primary Web Script1</th>
          <th>Primary Web Script2</th>
          <th>Primary Worker File</th>
          <th>Running From</th>
          <th>Storage Box</th>
          <th>Url</th>
          <th>Xmluserid</th>
          <th>Primary DB Backup Node</th>
          <th>Primary DB Backup Path</th>
        </tr>
        <tr v-for="item in gridData" :key="item.instancename">
          <td>
            <button @click="edit(item.instancename)" class="edit">Edit</button>&nbsp;
            <button @click="openDeleteDialog(item.instancename)" class="edit">Delete</button>
          </td>
          <td>{{ item.datacentre }}</td>
          <td>{{ item.instancename }}</td>
          <td>{{ item.ip_segment }}</td>
          <td>{{ item.msrslno }}</td>
          <td>{{ item.nesdcode }}</td>
          <td>{{ item.portal_category }}</td>
          <td>{{ item.primary_apacheconf }}</td>
          <td>{{ item.primary_apachessl }}</td>
          <td>{{ item.primary_appnode1 }}</td>
          <td>{{ item.primary_appnode2 }}</td>
          <td>{{ item.primary_appscript11 }}</td>
          <td>{{ item.primary_appscript12 }}</td>
          <td>{{ item.primary_appscript21 }}</td>
          <td>{{ item.primary_appscript22 }}</td>
          <td>{{ item.primary_appuser }}</td>
          <td>{{ item.primary_blueworkder }}</td>
          <td>{{ item.primary_dbnrdrnode }}</td>
          <td>{{ item.primary_gepbalancer }}</td>
          <td>{{ item.primary_greenworkder }}</td>
          <td>{{ item.primary_mobscript11 }}</td>
          <td>{{ item.primary_mobscript21 }}</td>
          <td>{{ item.primary_repscript11 }}</td>
          <td>{{ item.primary_repscript21 }}</td>
          <td>{{ item.primary_repuser }}</td>
          <td>{{ item.primary_webnode1 }}</td>
          <td>{{ item.primary_webnode2 }}</td>
          <td>{{ item.primary_webscript1 }}</td>
          <td>{{ item.primary_webscript2 }}</td>
          <td>{{ item.primary_workerfile }}</td>
          <td>{{ item.running_from }}</td>
          <td>{{ item.storage_box }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.xmluserid }}</td>
          <td>{{ item.primary_dbbackuppath }}</td>
          <td>{{ item.primary_dbbackupnode }}</td>
        </tr>
      </table>
    </div>

    <!-- Custom Delete Confirmation Modal -->
    <div v-if="showDeleteDialog" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this instance?</p>
        <button @click="confirmDelete" class="confirm">OK</button>
        <button @click="cancelDelete" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL2 } from '@/config';

export default {
  data() {
    return {
      gridData: [],
      showDeleteDialog: false, // Control the visibility of the dialog
      instancenameToDelete: null, // Store instancename to be deleted
    };
  },
  methods: {
    // Open the confirmation dialog
    openDeleteDialog(instancename) {
      this.instancenameToDelete = instancename;
      this.showDeleteDialog = true; // Show the modal
    },

    // Confirm delete action
    confirmDelete() {
      axios.delete(`${BASE_URL2}/deleteConfig?table=gepnicas_primary_infra&instancename=${this.instancenameToDelete}`)
        .then(response => {
          alert(response.data.message);
          this.takeGridData(); // Refresh the grid data after deletion
          this.showDeleteDialog = false; // Close the modal
        })
        .catch(error => {
          console.error('Error deleting config:', error);
          alert('Error deleting config: ' + error.message);
          this.showDeleteDialog = false; // Close the modal if error occurs
        });
    },

    // Cancel the delete action
    cancelDelete() {
      this.showDeleteDialog = false; // Close the modal without deleting
    },

    takeGridData() {
      // Fetch grid data
      axios.get(`${BASE_URL2}/getConfig?table=gepnicas_primary_infra`)
        .then(response => {
          this.gridData = response.data;
          console.log(this.gridData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

    addInstance() {
      this.$emit('add-instance'); // Emit event to parent component
    },

    edit(instancename) {
      this.$emit('edit', instancename); // Emit event to edit the instance
    }
  },
  mounted() {
    this.takeGridData(); // Fetch data when component is mounted
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

/* Styles for the modal dialog */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it sits on top of other content */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Set the width of the modal */
  max-width: 90%; /* Ensure it doesn't exceed screen width */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for a better look */
  text-align: center;
}

.modal p {
  font-size: 16px;
  margin-bottom: 20px;
}

.confirm, .cancel {
  padding: 8px 16px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin: 5px;
}

.confirm {
  background-color: #2f6b77;
}

.confirm:hover {
  background-color: #1a4d57;
}

.cancel {
  background-color: #e74c3c;
}

.cancel:hover {
  background-color: #c0392b;
}
</style>
