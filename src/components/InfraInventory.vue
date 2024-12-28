<template>
  <div class="infra-inventory">
    <h2>Infra Inventory</h2>
    <form @submit.prevent="saveConfig" class="inventory-form">
      <fieldset>
        <div class="form-group">
          <label>Data Centre</label>
          <input v-model="config.datacentre" />
        </div>
        <div class="form-group">
          <label>Instance Name</label>
          <input v-model="config.instance_name" />
        </div>
        <div class="form-group">
          <label>Portal Category</label>
          <input v-model="config.portal_category" />
        </div>
        <div class="form-group">
          <label>IP Segment</label>
          <input v-model="config.ip_segment"/>
        </div>
        <div class="form-group">
          <label>URL</label>
          <input v-model="config.url"/>
        </div>
        <div class="form-group">
          <label>XML User ID</label>
          <input v-model="config.xml_user_id" />
        </div>
        <div class="form-group">
          <label>MSR SL NO</label>
          <input v-model="config.msr_slno" />
        </div>
        <div class="form-group">
          <label>NESD Code</label>
          <input v-model="config.nesd_code" />
        </div>
        <div class="form-group">
          <label>Running From</label>
          <input v-model="config.running_from" />
        </div>
        <div class="form-group">
          <label>Storage Box</label>
          <input v-model="config.storage_box" />
        </div>
        <div class="form-group">
          <label>Primary Web Node 1</label>
          <input v-model="config.primary_web_node1" />
        </div>
        <div class="form-group">
          <label>Primary Web Node 2</label>
          <input v-model="config.primary_web_node2" />
        </div>
        <div class="form-group">
          <label>Primary WebScript 1</label>
          <input v-model="config.primary_web_script1" />
        </div>
        <div class="form-group">
          <label>Primary WebScript 2</label>
          <input v-model="config.primary_web_script2" />
        </div>
        <div class="form-group">
          <label>Primary Worker File</label>
          <input v-model="config.primary_worker_file" />
        </div>
        <div class="form-group">
          <label>Gep Balancer</label>
          <input v-model="config.primary_gepbalancer" />
        </div>
        <div class="form-group">
          <label>Blue Work der</label>
          <input v-model="config.primary_blueworkder" />
        </div>
        <div class="form-group">
          <label>Green Work der</label>
          <input v-model="config.primary_greenworkder" />
        </div>
        <div class="form-group">
          <label>Apache Config</label>
          <input v-model="config.primary_apache_conf" />
        </div>
        <div class="form-group">
          <label>Apache SSL</label>
          <input v-model="config.primary_apache_ssl" />
        </div>
        <div class="form-group">
          <label>App Node 1</label>
          <input v-model="config.primary_appnode1" />
        </div>
        <div class="form-group">
          <label>App Node 2</label>
          <input v-model="config.primary_appnode2" />
        </div>

        <div class="form-group">
          <label>App Script 11</label>
          <input v-model="config.primary_app_script11" />
        </div>
        <div class="form-group">
          <label>App Script 12</label>
          <input v-model="config.primary_app_script12" />
        </div>

        <div class="form-group">
          <label>App Script 21</label>
          <input v-model="config.primary_app_script21" />
        </div>
        <div class="form-group">
          <label>App Script 22</label>
          <input v-model="config.primary_app_script22" />
        </div>
        <div class="form-group">
          <label>AppUser</label>
          <input v-model="config.primary_app_user" />
        </div>
        <div class="form-group">
          <label>RepUser</label>
          <input v-model="config.primary_rep_user" />
        </div>
        <div class="form-group">
          <label>Rep Script 11</label>
          <input v-model="config.primary_rep_script11" />
        </div>
        <div class="form-group">
          <label>Rep Script 21</label>
          <input v-model="config.primary_rep_script21" />
        </div>
        <div class="form-group">
          <label>Mob Script 11</label>
          <input v-model="config.primary_mob_script11" />
        </div>
        <div class="form-group">
          <label>Mob Script 21</label>
          <input v-model="config.primary_mob_script21" />
        </div>
        <div class="form-group">
          <label>Primary DBNrDR Node</label>
          <input v-model="config.primary_dbnrdrnode" />
        </div>
        <div class="form-group">
          <label>Primary Db Backup Node</label>
          <input v-model="config.primary_dbbackupnode" />
        </div>
        <div class="form-group">
          <label>Primary Db Backup Path</label>
          <input v-model="config.primary_dbbackuppath" />
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
export default {
  data() {
    return {
      config: {
        datacentre: '',
        instance_name: '',
        ip_segment: '',
        portal_category: '',
        url: '',
        xml_user_id: '',
        msr_slno: 0,
        nesd_code: 0,
        running_from: '',
        storage_box: '',
        primary_web_node1: '',
        primary_web_node2: '',
        primary_web_script1: '',
        primary_web_script2: '',
        primary_worker_file: '',
        primary_gepbalancer: '',
        primary_blueworkder: '',
        primary_greenworkder: '',
        primary_apache_conf: '',
        primary_apache_ssl: '',
        primary_appnode1: '',
        primary_appnode2: '',
        primary_app_script11: '',
        primary_app_script12: '',
        primary_app_script21: '',
        primary_app_script22: '',
        primary_app_user: '',
        primary_rep_user: '',
        primary_rep_script11: '',
        primary_rep_script21: '',
        primary_mob_script11: '',
        primary_mob_script21: '',
        primary_dbnrdrnode: '',
        primary_dbbackupnode: '',
        primary_dbbackuppath: ''
      }
    };
  },
  methods: {
    resetForm() {
    this.config = {
      datacentre: '',
      instance_name: '',
      ip_segment: '',
      portal_category: '',
      url: '',
      xml_user_id: '',
      msr_slno: 0,
      nesd_code: 0,
      running_from: '',
      storage_box: '',
      primary_web_node1: '',
      primary_web_node2: '',
      primary_web_script1: '',
      primary_web_script2: '',
      primary_worker_file: '',
      primary_gepbalancer: '',
      primary_blueworkder: '',
      primary_greenworkder: '',
      primary_apache_conf: '',
      primary_apache_ssl: '',
      primary_appnode1: '',
      primary_appnode2: '',
      primary_app_script11: '',
      primary_app_script12: '',
      primary_app_script21: '',
      primary_app_script22: '',
      primary_app_user: '',
      primary_rep_user: '',
      primary_rep_script11: '',
      primary_rep_script21: '',
      primary_mob_script11: '',
      primary_mob_script21: '',
      primary_dbnrdrnode: '',
      primary_dbbackupnode: '',
      primary_dbbackupnode: ''
    };
    },
    saveConfig() {
      const payload = {
        instancename: this.config.instance_name,
        datacentre: this.config.datacentre,
        portal_category: this.config.portal_category,
        ip_segment: this.config.ip_segment,
        url: this.config.url,
        xmluserid: this.config.xml_user_id,
        msrslno: this.config.msr_slno.toString(),
        nesdcode: this.config.nesd_code.toString(),
        running_from: this.config.running_from,
        storage_box: this.config.storage_box,
        primary_webnode1: this.config.primary_web_node1,
        primary_webnode2: this.config.primary_web_node2,
        primary_webscript1: this.config.primary_web_script1,
        primary_webscript2: this.config.primary_web_script2,
        primary_workerfile: this.config.primary_worker_file,
        primary_gepbalancer: this.config.primary_gepbalancer,
        primary_blueworkder: this.config.primary_blueworkder,
        primary_greenworkder: this.config.primary_greenworkder,
        primary_apacheconf: this.config.primary_apache_conf,
        primary_apachessl: this.config.primary_apache_ssl,
        primary_appnode1: this.config.primary_appnode1,
        primary_appnode2: this.config.primary_appnode2,
        primary_appscript11: this.config.primary_app_script11,
        primary_appscript12: this.config.primary_app_script12,
        primary_appscript21: this.config.primary_app_script21,
        primary_appscript22: this.config.primary_app_script22,
        primary_appuser: this.config.primary_app_user,
        primary_repuser: this.config.primary_rep_user,
        primary_repscript11: this.config.primary_rep_script11,
        primary_repscript21: this.config.primary_rep_script21,
        primary_mobscript11: this.config.primary_mob_script11,
        primary_mobscript21: this.config.primary_mob_script21,
        primary_dbnrdrnode: this.config.primary_dbnrdrnode  ,
        primary_dbbackuppath: this.config.primary_dbbackupnode,
        primary_dbbackuppath: this.config.primary_dbbackuppath    
      };
      console.log(payload)
      axios.post(`${BASE_URL2}/postConfig?table=gepnicas_primary_infra`, payload)
        .then(response => {
          alert(response.data.message);
          this.resetForm();
        })
        .catch(error => {
          console.error('Error saving config:', error);
          alert('Error saving config: ' + error.message);
        });
    }},
    mounted(){
      if (this.instanceData) {
        this.config = { ...this.instanceData }; // Populate the form with the instance data
      }
    }};
</script>

<style scoped>
/* Add your styles here */
</style>

  
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