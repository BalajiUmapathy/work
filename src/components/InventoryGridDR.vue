<template>
    <div class="buttonclass">
      <button class="edit" @click="addInstance">Add New Instance</button>
    </div>
    <div class="container">
    
      <table class="table-c">
        <tr>
          <th>Edit</th>
          <th>Instance Name</th>
          <th>DR Web Node 1</th>  
          <th>DR Web Node 2</th>
          <th>DR App Node 1</th>
          <th>DR App Node 2</th>
          <th>DR Catalina App</th>
          <th>DR Catalina Rep</th>
          <th>DR Catalina Mob</th>
          <th>DR AppScript 11</th>
          <th>DR AppScript 12</th>
          <th>DR AppScript 21</th>
          <th>DR AppScript 22</th>
          <th>DR RepScript 11</th>
          <th>DR RepScript 21</th>
          <th>DR MobScript 21</th>
          <th>DR DBNode</th>
          <th>DR DBAUserName</th>
        </tr>
        <tr v-for="item in gridData" :key="item.instancename">
          <td><Button @click="edit(item.instancename)" class="edit">Edit</Button>&nbsp;
          <button @click="deleteData(item.instancename)" class="edit">Delete</button></td>
          <td>{{ item.instancename }}</td>
        <td>{{ item.dr_webnode1 }}</td>
        <td>{{ item.dr_webnode2 }}</td>
        <td>{{ item.dr_appnode1 }}</td>
        <td>{{ item.dr_appnode2 }}</td>
        <td>{{ item.dr_catalina_app }}</td>
        <td>{{ item.dr_catalina_rep }}</td>
        <td>{{ item.dr_catalina_mob }}</td>
        <td>{{ item.dr_appscript11 }}</td>
        <td>{{ item.dr_appscript12 }}</td>
        <td>{{ item.dr_appscript21 }}</td>
        <td>{{ item.dr_appscript22 }}</td>
        <td>{{ item.dr_repscript11 }}</td>
        <td>{{ item.dr_repscript21 }}</td>
        <td>{{ item.dr_mobscript21 }}</td>
        <td>{{ item.dr_dbnode }}</td>
        <td>{{ item.dr_dba_username }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { BASE_URL, BASE_URL2 } from '@/config';
  
  
  export default {
    // props: ['instancename'],
    data() {
      return {
        gridData: []
      };
    },
    methods: {
      // deleteData(instancename){
      //     axios.delete(`http://192.168.0.109:8000/deleteConfigMaster?instancename=${instancename}`)
      //         .then(response => {
      //         alert(response.data.message);
      //         })
      //         .catch(error => {
      //         console.error('Error saving config:', error);
      //         alert('Error saving config: ' + error.message);
      //         });
      //     },
      deleteData(instancename) {
        axios.delete(`${BASE_URL2}/deleteConfig?table=gepnicas_dr_infra&instancename=${instancename}`)
        .then(response => { 
              alert(response.data.message);
              this.takeGridData()
          })
          .catch(error => {
              console.error('Error deleting config:', error);
              alert('Error deleting config: ' + error.message);
          });
      },
      takeGridData() {
        axios.get(`${BASE_URL2}/getConfig?table=gepnicas_dr_infra`)
        // axios.get('http://192.168.0.109:8111/getConfig?table=gepnicas_primary_infra')
          .then(response => {
            this.gridData = response.data;
            console.log(this.gridData);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      addInstance() {
        this.$emit('add-instance'); 
      },
      edit(instancename){
        this.$emit('edit', instancename)
      }
      // editConfig(instancename) {
      //   axios.get(`http://192.168.0.113:8000/getConfigMaster?instancename=${instancename}`)
      //     .then(response => {
      //       console.log('gotresponse')
      //       this.config = response.data;
      //     })
      //     .catch(error => {
      //       console.error('Error saving config:', error);
      //       alert('Error saving config: ' + error.message);
      //     });
      // }
    },
    mounted() {
      this.takeGridData();
    }
  };
  </script>
  
  <style scoped>
 
  
  table {
    
    width: 100%;
    border-collapse: collapse;
    background-color: grey;
    box-shadow: 0 2px 8px black;
  
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    white-space: nowrap;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  .edit{
    padding: 6px;
    background-color: #2f6b77;
    border-radius: 5px;
    color: white;
  }
  .edit:hover{
    background-color: #1a4d57;
  }
  .buttonclass {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  </style>
  