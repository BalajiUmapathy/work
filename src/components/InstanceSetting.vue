<template>
    <div class="instance-settings">
      <h2> Instance Setting</h2>
      <form @submit.prevent="saveConfig" class="settings-form">
        <fieldset>
          <div class="form-group">
            <label>Instance Name</label>
            <input v-model="settings.instance_name" />
          </div>
          <div class="form-group">
            <label>Portal Name</label>
            <input v-model="settings.portal_name" />
          </div>
          <div class="form-group">
            <label>Logo</label>
            <input type="file" @change="handleFileUpload" />
            <div v-if="settings.logo">
              <img :src="settings.logo" alt="Logo Preview" class="logo-preview" />
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
    data() {
      return {
        settings: {
          instance_name: '',
          portal_name: '',
          logo: null, // Store the logo as a base64 or URL
        },
        logos: [], // Store the list of existing logos fetched from the backend
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.settings.logo = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      saveConfig() {
        const payload = {
          instance_name: this.settings.instance_name,
          portal_name: this.settings.portal_name,
          logo: this.settings.logo, // Send the logo as base64 string
        };
        console.log('Payload:', payload);
        axios.post(`${BASE_URL}/postConfig?table=gepnicas_logos`, payload)
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.error('Error saving instance settings:', error);
            alert('Error saving instance settings: ' + error.message);
          });
      },
      
    },
    mounted() {
      
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
  
  .logos-list {
    margin-top: 30px;
  }
  
  .logo-item {
    margin-bottom: 20px;
  }
  
  .logo-item h4 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .logo-item img {
    max-width: 150px;
    max-height: 100px;
    display: block;
  }
  </style>
  