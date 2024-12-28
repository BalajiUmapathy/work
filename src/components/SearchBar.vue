<template>
  <div id="menu">
    <div class="date">
      <img class="menuicon" @click="homePage" src="/src/assets/home.png" alt="Home">
      <p>{{ date }}</p>
    </div>
    <div class="menu-content">
      <div class="menu-item">
        <div class="menuu">
          <!-- <p>{{ currentPath }}</p>  -->
        </div>
      </div>
      <div class="menu-item">
        <div class="menuu">
        </div>
      </div>

      <div class="menu-item rightmost" @mouseover="showDropdown" @mouseleave="hideDropdown">
        <a href="#" @mouseover.prevent="showDropdown">Site Settings</a>
        <div class="dropdown-content" v-if="dropdownVisible">
          <a href="#" @click="handleDropdownClick(handleInfraInventoryClick)">Infra Inventory - Primary</a>
          <a href="#" @click="handleDropdownClick(handleInfraInventoryDRClick)">Infra Inventory - DR</a>
          <a href="#" @click="handleDropdownClick(handleSettingsClick)">Settings</a>
          <a href="#" @click="handleDropdownClick(handleInstanceSettingClick)">Instance Setting</a>
          <a href="#" @click="handleDropdownClick(handleUserManagementClick)">Manage Users</a>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      date: this.getTime(),
      dropdownVisible: false,
      intervalId: null
    };
  },
  computed: {
    currentPath() {
      const path = this.$route.path;
      const pathSegments = path.split('/').filter(segment => segment); // remove empty segments
      let formattedPath = 'Gepnicas';

      if (pathSegments.length > 0) {
        formattedPath += '/' + pathSegments.map(segment => this.capitalize(segment)).join('/');
      }

      return formattedPath;
    }
  },
  methods: {
    getTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      const date = `${hours}:${minutes} ${ampm} ${day}-${month}-${year} `;
      return date;
    },
    updateTime() {
      this.date = this.getTime();
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    handleSettingsClick() {
      this.$emit('settingsclicked');
    },
    handleInfraInventoryClick() {
      this.$emit('infraclicked');
      console.log('Infra Inventory clicked');
    },
    handleInfraInventoryDRClick() {
      this.$emit('infradrclicked');
      console.log('Infra Inventory DR clicked');
    },
    handleHomeClick() {
      console.log('Home clicked');
      this.$emit('homeclicked');
    },
    homePage() {
      console.log('Home clicked');
      this.handleHomeClick();
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    handleDropdownClick(callback) {
      this.dropdownVisible = false;
      callback();
    },

    // Handle the Instance Setting menu click
    handleInstanceSettingClick() {
      this.$emit('instancesettingclicked');
      // Navigate to the InstanceGrid page
      console.log('Instance Setting clicked');
    }

    
  },
  mounted() {
    this.intervalId = setInterval(this.updateTime, 40000); // Update time every second
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
}
</script>

<style scoped>
#menu {
  width: 100%;
  background-color: #2f6b77;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px; 
  box-sizing: border-box;
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.menu-item {
  position: relative;
  display: inline-block;
  margin-right: 20px;
}

.menu-item a {
  text-decoration: none;
  color: white;
  padding: 10px;
  display: block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: pointer;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.menuu {
  display: flex;
  align-items: center;
  gap: 1px;
}

.menuicon {
  width: 25px;
  height: 25px;
  margin-right: -5px;
}

.menu-link {
  cursor: pointer;
  margin: 0;
  padding: 0 5px; 
}

.menu-link:hover {
  text-decoration: underline;
}

img {
  cursor: pointer;
}
</style>
