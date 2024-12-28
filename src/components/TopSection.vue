<template>
  <div id="containerr">
    <div class="storage-available">
      <h4>Archival Storage</h4>
      <div id="storage">
        <Pie class="pie" :data="storageAvailableData" :options="options" />
      </div>
    </div>
    <div class="storage-available2">
      <h4>Primary Storage</h4>
      <br>
      <div id="storagee" v-if="!showForm">
        <div class="charts">
          <div class="pie-chart">
            <h5>HCI Storage</h5>
            <Pie class="pie" :data="primaryStorageDataHCI" :options="options" />
          </div>
          <div class="pie-chart">
            <h5>Hitachi Storage</h5>
            <Pie class="pie" :data="primaryStorageDataHitachi" :options="options" />
          </div>
        </div>
        <button v-if="!showForm" @click="openForm" class="btn" style="position:relative;right:20px; top:-100px;">Open Storage Form</button>
      </div>
      <Storageform v-if="showForm" @back="closeForm" @storage-updated="handleStorageUpdated"/>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Storageform from './Storageform.vue';
import axios from 'axios';
import { BASE_URL } from '@/config';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default {
  name: 'TopSection',
  components: {
    Pie,
    Storageform
  },
  data() {
    return {
      storageAvailableData: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            backgroundColor: ['#072E2D', '#42997C'],
            data: [0, 0]  // Placeholder, will be updated dynamically
          }
        ]
      },
      primaryStorageDataHCI: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            backgroundColor: ['#072E2D', '#42997C'],
            data: [0, 0]  // Placeholder, will be updated dynamically
          }
        ]
      },
      primaryStorageDataHitachi: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            backgroundColor: ['#072E2D', '#42997C'],
            data: [0, 0]  // Placeholder, will be updated dynamically
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const dataset = tooltipItem.dataset;
                const dataIndex = tooltipItem.dataIndex;
                const value = dataset.data[dataIndex];
                const label = dataset.labels ? dataset.labels[dataIndex] : '';
                return `${label}: ${value} GB`;
              }
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 9,
              },
            },
            position: 'right',
          },
          datalabels: {
            color: '#fff',
            font: {
              weight: 'bold',
              size: 12,  // Adjust font size
            },
            formatter: (value, context) => {
              return `${Math.round(value)} GB`;  // Convert to integer
            }
          }
        }
      },
      showForm: false,
    }
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    handleStorageUpdated() {
      this.closeForm();
      this.fetchStorageData();
    },
    async fetchStorageData() {
      try {
        const [storageResponse, folderSizeResponse, configMasterResponse] = await Promise.all([
          axios.get(`${BASE_URL}/postSystemInfo`),
          axios.get(`${BASE_URL}/folder-size`),
          axios.get(`${BASE_URL}/postConfigMaster`)
        ]);

        const storageOptions = storageResponse.data;
        const hciData = storageOptions["1"];
        const hitachiData = storageOptions["2"];
        const usedFolderSize = parseFloat(folderSizeResponse.data.folder_size_in_tb);
        const totalStorageCapacity = parseFloat(configMasterResponse.data.nas_storage_capacity);

        // Update data for HCI Storage
        const hciFreeStorage = hciData.storage_capacity - hciData.storage_used;
        this.primaryStorageDataHCI = {
          ...this.primaryStorageDataHCI,
          datasets: [
            {
              ...this.primaryStorageDataHCI.datasets[0],
              data: [
                hciData.storage_used,
                hciFreeStorage
              ]
            }
          ]
        };

        // Update data for Hitachi Storage
        const hitachiFreeStorage = hitachiData.storage_capacity - hitachiData.storage_used;
        this.primaryStorageDataHitachi = {
          ...this.primaryStorageDataHitachi,
          datasets: [
            {
              ...this.primaryStorageDataHitachi.datasets[0],
              data: [
                hitachiData.storage_used,
                hitachiFreeStorage
              ]
            }
          ]
        };

        // Update data for Archival Storage
        const archivalFreeStorage = totalStorageCapacity - usedFolderSize;
        this.storageAvailableData = {
          ...this.storageAvailableData,
          datasets: [
            {
              ...this.storageAvailableData.datasets[0],
              data: [
                usedFolderSize,
                archivalFreeStorage
              ]
            }
          ]
        };

      } catch (error) {
        console.error('Error fetching storage data:', error);
        alert('Error fetching storage data: ' + error.message);
      }
    }
  },
  mounted() {
    this.fetchStorageData();
  }
};
</script>

<style scoped>
/* Existing styles */
h4 {
  margin-top: -0.2em; /* Adjust margin-top */
  margin-bottom: -0.2em; /* Adjust margin-bottom */
  margin-left: 0.1875em; 
}
.storage-available {
  border: 0.125em solid black;
  border-radius: 0.9375em; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 37%;
  margin-right: 3%;
  height: 15em; /* Increased height */
}
.storage-available2 {
  border: 0.125em solid black;
  border-radius: 0.9375em; 
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  position: relative;
  height: 15em; /* Increased height */
}
#containerr {
  display: flex;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 10px;
}
#storage {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15em; /* Increased height */
  margin-top: -1em;
}
#storagee {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  margin-top: -1em;
}
.charts {
  display: flex;
  justify-content: left; /* Corrected typo */
  gap: 10px;
}
.pie {
  width: 250px !important; /* Increased width */
  height: 250px !important; /* Increased height */
}
.btn {
  position: relative;
  background-color: #1a4d57;
  color: white;
  padding: 0.5em 1em;
  font-size: 0.875em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 30px;
  margin-left: 45em;
  white-space: nowrap;
}
.btn:hover {
  background-color: #2f6b77;
}
.pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pie-chart h5 {
  margin-bottom: -40px; /* Remove bottom margin */
  margin-right: 5em;
  padding-bottom: 0.2em; /* Add padding if needed */
}
h6 {
  margin-top: -20px; /* Adjust as necessary */
  font-size: 14px;
  color: #333;
  text-align: center;
}
</style>
