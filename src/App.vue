<template>
  <div>
    
    <TopBar />
    <SearchBar 
      @infraclicked="goToGrid" 
      @settingsclicked="goToSettings" 
      @homeclicked="handleHomeClick" 
      @infradrclicked="goToDRGrid" 
      @instancesettingclicked="goToInstanceGrid"
    />
    <PortalSettings v-if="showSettings && !showGrid" @back="goToSettings"/>
    <InventoryGrid v-if="showGrid && !showSettings && !showInfra && !showEdit" @back="goToGrid" @edit="editRecord" @addInstance="showInfraInventory"/>
    <InfraInventory v-if="showInfra" @back="hideInfraInventory"/>
    <EditInventory v-if="showEdit" :instancename="editingInstance" @back="goToGrid"/>
    <EditInstance v-if="showEditInstance" :instancename="editingInstance" @back="goToInstanceGrid"/>
    <InventoryGridDR v-if="showDRGrid && !showSettings && !showInfraDR && !showEditDR" @back="goToDRGrid" @edit="editRecordDR" @addInstance="showInfraInventoryDR"/>
    <InfraInventoryDR v-if="showInfraDR" @back="hideInfraInventoryDR"/>
    <EditInventoryDR v-if="showEditDR" :instancename="editingInstance" @back="goToDRGrid"/>
    <InstanceGrid v-if="showInstanceGrid" @back="goToInstanceGrid" @edit="editRecordInstance" @add-instanceDB="goToInstanceSetting"/>
    <InstanceSetting v-if="showInstanceSettings" @back="goToInstanceSetting"/>
    
    <TopSection v-if="!showSettings && !showGrid && !showForm && !showInfra && !showEditInstance && !showEdit && !showInstanceGrid && !showDRGrid && !showInfraDR && !showEditDR  &&!showInstanceSettings"  @open-form="toggleForm"/>
    <InstanceSection v-if="!showSettings && !showGrid && !showForm && !showInfra && !showEditInstance && !showEdit && !showInstanceGrid && !showDRGrid && !showInfraDR && !showEditDR &&!showInstanceSettings "/>
    <BidsTenders />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import SearchBar from './components/SearchBar.vue';
import TopSection from './components/TopSection.vue';
import InstanceSection from './components/InstanceSection.vue';
import Footer from './components/Footer.vue';
import PortalSettings from './components/PortalSettings.vue';
import Storageform from './components/Storageform.vue';
import InfraInventory from './components/InfraInventory.vue';
import InventoryGrid from './components/InventoryGrid.vue';
import EditInventory from './components/EditInventory.vue';
import InventoryGridDR from './components/InventoryGridDR.vue';
import InfraInventoryDR from './components/InfraInventoryDR.vue';
import EditInventoryDR from './components/EditInventoryDR.vue';
import InstanceSetting from './components/InstanceSetting.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';



export default {
  components: {
    TopBar,
    SearchBar,
    TopSection,
    InstanceSection,
    Footer,
    PortalSettings,
    Storageform,
    InfraInventory,
    InventoryGrid,
    EditInventory,
    InventoryGridDR,
    InfraInventoryDR,
    EditInventoryDR,
    InstanceSetting,
    
  },
  data() {
    return {
      showGrid: false,
      showSettings: false,
      showForm: false,
      showInfra: false,
      showEdit: false,
      showDRGrid: false,
      showInfraDR: false,
      showEditDR: false,
      showEditInstance:false,
      showInstanceGrid: false, // Tracks visibility of InstanceSetting
      showInstanceSettings: false, // Add this variable to track visibility of InstanceSetting
      editingInstance: ''
    };
  },
  methods: {
    editRecord(instancename) {
      this.editingInstance = instancename;
      this.showEdit = true;
      this.showInfra = false;
      this.showGrid = false;
      this.showSettings = false;
    },
    editRecordInstance(instancename){
      this.editingInstance = instancename;
      this.showEditInstance = true;
      this.showInfraDR = false;
      this.showDRGrid = false;
      this.showSettings = false;
      this.showInstanceGrid=false;
    },
    editRecordDR(instancename) {
      this.editingInstance = instancename;
      this.showEditDR = true;
      this.showInfraDR = false;
      this.showDRGrid = false;
      this.showSettings = false;
    },
    goToSettings() {
      this.showSettings = !this.showSettings;
      if (this.showSettings) {
        this.showGrid = false;
        this.showDRGrid = false;
        this.showInstanceGrid = false;
        this.showInstanceSettings = false; // Hide InstanceSettings when in Settings
      }
    },
    goToGrid() {
      this.showGrid = !this.showGrid;
      if (this.showGrid) {
        this.showSettings = false;
        this.showEdit = false;
        this.showInfra = false;
        this.showInstanceGrid = false;
        this.showInstanceSettings = false; // Hide InstanceSettings when in Grid
      }
    },
    goToInstanceGrid() {
      this.showInstanceGrid = !this.showInstanceGrid; // Toggle visibility
      if (this.showInstanceGrid) {
        this.showGrid = false;
        this.showSettings = false;
        this.showDRGrid = false;
        this.showEditInstance =false;
        this.showInstanceSettings = false; // Ensure InstanceSettings is hidden
      }
    },
    goToDRGrid() {
      this.showDRGrid = !this.showDRGrid;
      if (this.showDRGrid) {
        this.showSettings = false;
        this.showEditDR = false;
        this.showInfraDR = false;
        this.showInstanceGrid = false;
        this.showInstanceSettings = false; // Ensure InstanceSettings is hidden
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    showInfraInventory() {
      this.showInfra = true;
      this.showGrid = false;
      this.showSettings = false;
    },
    hideInfraInventory() {
      this.showInfra = false;
      this.showGrid = true;
    },
    
 goToInstanceSetting() {
    this.showInstanceSettings = !this.showInstanceSettings; // Toggle visibility

    if (this.showInstanceSettings) {
      this.showInstanceGrid = false;  // Hide InstanceGrid
      this.showGrid = false;          // Hide InventoryGrid
      this.showInfra = false;         // Hide InfraInventory
      this.showEdit = false;          // Hide EditInventory
      this.showDRGrid = false;        // Hide InventoryGridDR
      this.showInfraDR = false;       // Hide InfraInventoryDR
      this.showEditDR = false;        // Hide EditInventoryDR
      this.showSettings = false;      // Hide settings
      this.showEditInstance = false;
    }
    
    },
    
    showInfraInventoryDR() {
      this.showInfraDR = true;
      this.showDRGrid = false;
      this.showSettings = false;
    },
    hideInfraInventoryDR() {
      this.showInfraDR = false;
      this.showDRGrid = true;
    },
    handleHomeClick() {
      this.showSettings = false;
      this.showGrid = false;
      this.showInfra = false;
      this.showForm = false;
      this.showEdit = false;
      this.showDRGrid = false;
      this.showInfraDR = false;
      this.showEditDR = false;
      this.showInstanceGrid = false;
      this.showInstanceSettings = false; // Hide InstanceSetting on home click
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
