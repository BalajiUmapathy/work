<template>
<div class="infra-inventory">
    <h2>Edit Infra Inventory</h2>
    <form @submit.prevent="saveConfig" class="inventory-form">
    <fieldset>
        <div class="form-group">
        <label>Data Centre</label>
        <input v-model="config.datacentre" />
        </div>
        <div class="form-group">
        <label>Instance Name</label>
        <input v-model="config.instancename" />
        </div>
        <div class="form-group">
        <label>Portal Category</label>
        <input v-model="config.portal_category" />
        </div>
        <div class="form-group">
        <label>IP Segment</label>
        <input v-model="config.ip_segment" />
        </div>
        <div class="form-group">
        <label>URL</label>
        <input v-model="config.url" />
        </div>
        <div class="form-group">
        <label>XML User ID</label>
        <input v-model="config.xmluserid" />
        </div>
        <div class="form-group">
        <label>MSR SL NO</label>
        <input v-model="config.msrslno" />
        </div>
        <div class="form-group">
        <label>NESD Code</label>
        <input v-model="config.nesdcode" />
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
        <input v-model="config.primary_webnode1" />
        </div>
        <div class="form-group">
        <label>Primary Web Node 2</label>
        <input v-model="config.primary_webnode2" />
        </div>
        <div class="form-group">
        <label>Primary WebScript 1</label>
        <input v-model="config.primary_webscript1" />
        </div>
        <div class="form-group">
        <label>Primary WebScript 2</label>
        <input v-model="config.primary_webscript2" />
        </div>
        <div class="form-group">
        <label>Primary Worker File</label>
        <input v-model="config.primary_workerfile" />
        </div>
        <div class="form-group">
        <label>Gep Balancer</label>
        <input v-model="config.primary_gepbalancer" />
        </div>
        <div class="form-group">
        <label>Blue Workder</label>
        <input v-model="config.primary_blueworkder" />
        </div>
        <div class="form-group">
        <label>Green Worker</label>
        <input v-model="config.primary_greenworkder" />
        </div>
        <div class="form-group">
        <label>Apache Config</label>
        <input v-model="config.primary_apacheconf" />
        </div>
        <div class="form-group">
        <label>Apache SSL</label>
        <input v-model="config.primary_apachessl" />
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
        <input v-model="config.primary_appscript11" />
        </div>
        <div class="form-group">
        <label>App Script 12</label>
        <input v-model="config.primary_appscript12" />
        </div>

        <div class="form-group">
        <label>App Script 21</label>
        <input v-model="config.primary_appscript21" />
        </div>
        <div class="form-group">
        <label>App Script 22</label>
        <input v-model="config.primary_appscript22" />
        </div>
        <div class="form-group">
        <label>AppUser</label>
        <input v-model="config.primary_appuser" />
        </div>
        <div class="form-group">
        <label>RepUser</label>
        <input v-model="config.primary_repuser" />
        </div>
        <div class="form-group">
        <label>Rep Script 11</label>
        <input v-model="config.primary_repscript11" />
        </div>
        <div class="form-group">
        <label>Rep Script 21</label>
        <input v-model="config.primary_repscript21" />
        </div>
        <div class="form-group">
        <label>Mob Script 11</label>
        <input v-model="config.primary_mobscript11" />
        </div>
        <div class="form-group">
        <label>Mob Script 21</label>
        <input v-model="config.primary_mobscript21" />
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
        <!-- now here delete is not needed  -->
        <!-- <button type="button" @click="deleteData(config.instancename)">Delete</button> -->
        <button type="button" @click="$emit('back')" class="btn-back">Back</button>
    </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
import { BASE_URL, BASE_URL2 } from '@/config';

// const BASE_URL = 'http://192.168.0.110:8000'

export default {
    props: ['instancename'],
    data() {
        return {
        config: {
            datacentre: '',
            instancename: '',
            ip_segment: '',
            portal_category: '',
            url: '',
            xmluserid: '',
            msrslno: 0,
            nesdcode: 0,
            running_from: '',
            storage_box: '',
            primary_webnode1: '',
            primary_webnode2: '',
            primary_webscript1: '',
            primary_webscript2: '',
            primary_workerfile: '',
            primary_gepbalancer: '',
            primary_blueworkder: '',
            primary_greenworkder: '',
            primary_apacheconf: '',
            primary_apachessl: '',
            primary_appnode1: '',
            primary_appnode2: '',
            primary_appscript11: '',
            primary_appscript12: '',
            primary_appscript21: '',
            primary_appscript22: '',
            primary_appuser: '',
            primary_repuser: '',
            primary_repscript11: '',
            primary_repscript21: '',
            primary_mobscript11: '',
            primary_mobscript21: '',
            primary_dbnrdrnode: '',
            primary_dbbackupnode: '',
            primary_dbbackuppath: ''
        }
        };
    },
    methods: {
        fetchData(instancename){
        console.log(instancename)
        axios.get(`${BASE_URL2}/getConfig?table=gepnicas_primary_infra&instancename=${instancename}`)
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
        const payload = {
            instancename: this.config.instancename,
            datacentre: this.config.datacentre,
            portal_category: this.config.portal_category,
            ip_segment: this.config.ip_segment,
            url: this.config.url,
            xmluserid: this.config.xmluserid,
            msrslno: this.config.msrslno.toString(),
            nesdcode: this.config.nesdcode.toString(),
            running_from: this.config.running_from,
            storage_box: this.config.storage_box,
            primary_webnode1: this.config.primary_webnode1,
            primary_webnode2: this.config.primary_webnode2,
            primary_webscript1: this.config.primary_webscript1,
            primary_webscript2: this.config.primary_webscript2,
            primary_workerfile: this.config.primary_workerfile,
            primary_gepbalancer: this.config.primary_gepbalancer,
            primary_blueworkder: this.config.primary_blueworkder,
            primary_greenworkder: this.config.primary_greenworkder,
            primary_apacheconf: this.config.primary_apacheconf,
            primary_apachessl: this.config.primary_apachessl,
            primary_appnode1: this.config.primary_appnode1,
            primary_appnode2: this.config.primary_appnode2,
            primary_appscript11: this.config.primary_appscript11,
            primary_appscript12: this.config.primary_appscript12,
            primary_appscript21: this.config.primary_appscript21,
            primary_appscript22: this.config.primary_appscript22,
            primary_appuser: this.config.primary_appuser,
            primary_repuser: this.config.primary_repuser,
            primary_repscript11: this.config.primary_repscript11,
            primary_repscript21: this.config.primary_repscript21,
            primary_mobscript11: this.config.primary_mobscript11,
            primary_mobscript21: this.config.primary_mobscript21,
            primary_dbnrdrnode: this.config.primary_dbnrdrnode,
            primary_dbbackupnode: this.config.primary_dbbackupnode,
            primary_dbbackuppath: this.config.primary_dbbackuppath    
        };
        console.log('Payload:', payload);
        axios.post(`${BASE_URL2}/updateConfig?table=gepnicas_primary_infra`, payload)
            .then(response => {
            console.log('Response:', response.data);
            alert(response.data.message);
            })
            .catch(error => {
                console.error('Error:', error.response?.data || error.message);
                alert('Error saving config: ' + (error.response?.data?.error || error.message));
            });
        }},

  

        mounted(){
            if (this.instancename) {
                this.fetchData(this.instancename);
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