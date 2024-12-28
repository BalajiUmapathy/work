<template>
    <div class="infra-inventory">
      <h2>Infra Inventory DR</h2>
      <form @submit.prevent="saveConfig" class="inventory-form">
        <fieldset>
          <div class="form-group">
            <label>Instance Name</label>
            <input v-model="config.instancename" />
          </div>
          <div class="form-group">
            <label>DR Web Node 1</label>
            <input v-model="config.dr_webnode1" />
          </div>
          <div class="form-group">
            <label>DR Web Node 2</label>
            <input v-model="config.dr_webnode2" />
          </div>
          <div class="form-group">
            <label>DR App Node 1</label>
            <input v-model="config.dr_appnode1" />
          </div>
          <div class="form-group">
            <label>DR App Node 2</label>
            <input v-model="config.dr_appnode2" />
          </div>
          <div class="form-group">
            <label>DR Catalina App</label>
            <input v-model="config.dr_catalina_app" />
          </div>
          <div class="form-group">
            <label>DR Catalina Rep</label>
            <input v-model="config.dr_catalina_rep" />
          </div>
          <div class="form-group">
            <label>DR Catalina Mob</label>
            <input v-model="config.dr_catalina_mob" />
          </div>
          <div class="form-group">
            <label>DR AppScript 11</label>
            <input v-model="config.dr_appscript11" />
          </div>
          <div class="form-group">
            <label>DR AppScript 12</label>
            <input v-model="config.dr_appscript12" />
          </div>
          <div class="form-group">
            <label>DR AppScript 21</label>
            <input v-model="config.dr_appscript21" />
          </div>
          <div class="form-group">
            <label>DR AppScript 22</label>
            <input v-model="config.dr_appscript22" />
          </div>
          <div class="form-group">
            <label>DR RepScript 11</label>
            <input v-model="config.dr_repscript11" />
          </div>
          <div class="form-group">
            <label>DR RepScript 21</label>
            <input v-model="config.dr_repscript21" />
          </div>
          <div class="form-group">
            <label>DR MobScript 21</label>
            <input v-model="config.dr_mobscript21" />
          </div>
          <div class="form-group">
            <label>DR DBNode</label>
            <input v-model="config.dr_dbnode" />
          </div>
          <div class="form-group">
            <label>DR DBAUserName</label>
            <input v-model="config.dr_dba_username" />
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
  import { BASE_URL, BASE_URL2 } from '@/config';
  // const BASE_URL = 'http://192.168.0.110:8001';
  export default {
    props: ['instancename'],
    data() {
      return {
        config: {
          instancename: '',
          dr_webnode1: '',
          dr_webnode2: '',
          dr_appnode1: '',
          dr_appnode2: '',
          dr_catalina_app: '',
          dr_catalina_rep: '',
          dr_catalina_mob: '',
          dr_appscript11: '',
          dr_appscript12: '',
          dr_appscript21: '',
          dr_appscript22: '',
          dr_repscript11: '',
          dr_repscript21: '',
          dr_mobscript21: '',
          dr_dbnode: '',
          dr_dba_username: '',
        }
      };
    },
    methods: {
      fetchData(instancename){
        console.log(instancename)
        axios.get(`${BASE_URL2}/getConfig?table=gepnicas_dr_infra&instancename=${instancename}`)
            .then(response => {
            console.log('gotresponse')
            this.config = response.data[0];
            console.log(this.config)
            })
            .catch(error => {
            console.error('Error saving config:', error);
            alert('Error saving config: ' + error.message);
            });
        },
      saveConfig() {
        const payload = { ...this.config };
        console.log('Saving config with payload:', payload);
        axios.post(`${BASE_URL2}/updateConfig?table=gepnicas_dr_infra`, payload)
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
      if (this.instancename) {
        this.fetchData(this.instancename);
      }
    }
  };
  </script>
  
  <style scoped>
  .infra-inventory {
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .infra-inventory h2 {
    font-size: 2em;
    margin-bottom: 20px;
    text-align: center;
    color: #495057;
  }
  
  .inventory-form {
    display: flex;
    flex-direction: column;
  }
  
  .fieldset {
    margin-bottom: 20px;
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
  