<template>
  <div class="instance-settings">
    <h2>Edit Instance Configuration</h2>
    <form @submit.prevent="saveConfig" class="settings-form">
      <fieldset>
        <div class="form-group">
          <label>Instance Name</label>
          <input v-model="config.instancename" readonly />
        </div>
        <div class="form-group">
          <label>Portal Name</label>
          <input v-model="config.portal_name" />
        </div>
        <div class="form-group">
          <label>Logo</label>
          <input type="file" @change="handleFileUpload" />
          <div v-if="config.logo">
            <img :src="config.logo" alt="Logo Preview" class="logo-preview" />
          </div>
        </div>
      </fieldset>

      <div class="form-actions">
        <button type="submit" class="btn-save">Save</button>
        <button type="button" @click="$emit('back')" class="btn-back">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/config';

export default {
  props: ['instancename'], // Accept instancename as a prop
  data() {
    return {
      config: {
        instancename: this.instancename || '',
        portal_name: '',
        logo: null,
      },
    };
  },
  methods: {
    fetchConfigData() {
      axios
        .get(`${BASE_URL}/getImages`)
        .then((response) => {
          const imageData = response.data.find(
            (item) => item.instancename === this.instancename
          );
          if (imageData) {
            this.config.portal_name = imageData.portalname;
            this.config.logo = `data:image/png;base64,${imageData.logo}`;
          }
        })
        .catch((error) => {
          console.error('Error fetching instance configuration:', error);
        });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.config.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveConfig() {
      const payload = {
        instancename: this.config.instancename,
        portal_name: this.config.portal_name,
        logo: this.config.logo,
      };
      console.log('Payload:', payload);
      axios
        .post(`${BASE_URL}/updateConfig?table=gepnicas_logos`, payload)
        .then((response) => {
          console.log('Response:', response.data);
          alert(response.data.message);
        })
        .catch((error) => {
          console.error('Error saving config:', error.response?.data || error.message);
          alert('Error saving config: ' + (error.response?.data?.error || error.message));
        });
    },
  },
  mounted() {
    if (this.instancename) {
      this.fetchConfigData(); // Fetch the instance data when the component is mounted
    }
  },
};
</script>
  
  <style scoped>
  .instance-settings {
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .instance-settings h2 {
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
  
  .logo-preview {
    max-width: 200px;
    max-height: 100px;
    margin-top: 10px;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .btn-save,
  .btn-back {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-save {
    background-color: #1a4d57;
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
  
  