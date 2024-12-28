<script>
import axios from 'axios';
import { BASE_URL,  } from '@/config';
// const BASE_URL= 'http://192.168.0.110:5000';


export default {
  data() {
    return {
      config: {
        archive_solution_shortname: '',
        archive_solution_fullname: '',
        archive_age_in_years: '0',
        nas_storage_capacity: '0',
      }
    };
  },
  methods: {
    fetchConfig() {
      axios.get(`${BASE_URL}/postConfigMaster`)
        .then(response => {
          console.log(this.config)
          this.config = response.data;
          console.log(this.config);
        })
        .catch(error => {
          console.error('Error fetching config:', error);
          alert('Error fetching config: ' + error.message);
        });
    },
    saveConfig() {
      console.log(this.config)
      axios.post(`${BASE_URL}/postConfigMaster`, this.config)
        .then(response => {
          alert(response.data.message);
        })
        .catch(error => {
          console.error('Error saving config:', error);
          alert('Error saving config: ' + error.message);
        });
    }
  },
  mounted() {
    this.fetchConfig();
  }
};
</script>

<template>
  <div class="portal-settings">
    <h1>PORTAL SETTINGS</h1>
    <form @submit.prevent="saveConfig" class="settings-form">
      <div class="form-group">
        <label>Portal Short Name:</label>
        <input v-model="config.archive_solution_shortname" />
      </div>
      <div class="form-group">
        <label>Portal Name:</label>
        <input v-model="config.archive_solution_fullname" />
      </div>
      <div class="form-group">
        <label>Archive Age (Years):</label>
        <input v-model="config.archive_age_in_years" />
      </div>
      <div class="form-group">
        <label>NAS Storage Capacity:</label>
        <input v-model="config.nas_storage_capacity" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Save</button>
        <button type="button" @click="$emit('back')" class="btn-back">Back</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.portal-settings {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.portal-settings h1 {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
  color: #495057;
}

.settings-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #495057;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #80bdff;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-save, .btn-back {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-save {
  background-color: #1a571c;
  color: white;
}

.btn-save:hover {
  background-color: #33899a;
}

.btn-back {
  background-color: #6c757d;
  color: white;
}

.btn-back:hover {
  background-color: #5a6268;
}


</style>
