<template>
  <div>
      <!--providing icon image along with names-->
    <div id="mainDashboard" v-if="dashboard.counts">
          <div class="details1">
              <div class="detail1">
                  <img class="detail_logos" :src="folder" @click="TotalMain({iname: 'getBidsTenderInstance',title: 'Total Folders'})">
                  <h6>     Total Folders</h6>
                  <div class="instance-name">{{ dashboard.counts.total_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="complete" @click="TotalMain({iname: 'getBidsTenderInstanceArchived', title: 'Archived Folder'})">
                  <h6>Archived</h6>
                  <div class="instance-name">{{ dashboard.counts.archived_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="sync" @click="TotalMain({iname: 'getBidsTenderInstanceSyncPending', title: 'Sync'})">
                  <h6>Sync</h6>
                  <div class="instance-name">{{ dashboard.counts.sync_pending_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="link" @click="TotalMain({iname: 'getBidsTenderInstanceMetalinkPending', title: 'Meta Data'})">
                  <h6>Meta Data</h6>
                  <div class="instance-name">{{ dashboard.counts.meta_link_created_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="process" @click="TotalMain({iname: 'getBidsTenderInstanceSoftlinkPending', title: 'Soft Link'})">
                  <h6>Soft Links</h6>
                  <div class="instance-name">{{ dashboard.counts.soft_link_created_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="error" @click="TotalMain({iname: 'getBidsTenderInstanceError', title: 'Errors'})">
                  <h6>Errors</h6>
                  <div class="instance-name">{{ dashboard.counts.errors_count }}</div>
              </div>
              <div class="detail1">
                  <img class="detail_logos" :src="db" @click="TotalMain('sd')">
                  <h6>Storage</h6>
                  <div class="instance-name">{{ dashboard.counts.instance_storage_size }}</div>
              </div>
          </div>
      </div>
    
      <!-- Lists all instances in a horizontally scrollable container.
Each instance is represented by an image (logo) and a name.
Clicking an image invokes the buttonClick method, which fetches and displays details for the selected instance.-->
   

      <div id="instance">
          <div id="ins">
              <h4>Instances</h4>
          </div>
          <div class="scroll-buttons">
              <button class="ba" @click="scrollLeft">‹</button>
              <div class="scroll-container" ref="scrollContainer">
                  <div class="instance-item" v-for="(instance, index) in response" :key="index">
                      <img class="logo" :id="`i${index+1}`" :src="imageSrc(instance.logo)" @click="buttonClick(instance.instancename)">
                      <!--button click method will displays the information-->
                      <!-- <div class="instance-name">{{ instance.instancename }}</div> -->
                       <div class="instance-name" >
                          <h5 style="font-size: 1.2em;">{{ instance.instancename }}</h5>    
                       </div>
                  </div>
              </div>
              <button class="ba" @click="scrollRight">›</button>
          </div>
      </div>
      
      <div id="infoDiv" v-if="infodiv && details.counts">
<!--Displays detailed information about a selected instance, including counts and options for processing bids and tenders. Clicking on counts provides detailed views, and progress messages appear until the operation is complete.-->
          <div class="details" >
              <div class="infodetail-name">
                  <img :src="imageSrc(details.counts.logo)" class="logo">
                  <div class="instance-name-detail">{{ details.instancename }}</div>
                  <div class="button-container">
                  <button class="btn" @click="processbids(details.instancename)" >Bids Folders Master</button>
                  <button class="btn" @click="processtenders(details.instancename)" style="padding-right: 2em;">Tenders Folders Master</button>
                  </div>
              </div>
              
              <div class="detail">
                  <div class="cols">
                      <img class="detail_logos" :src="folder" @click="Totalfile(details.instancename)">
                      <h6>Total Folders</h6>
                      <div class="instance-name">{{ details.counts.total_count }}</div>
                  </div>
                  <div class="cols">
                      <img class="detail_logos" :src="complete" @click="Archived(details.instancename)">
                      <h6>Archived</h6>
                      <div class="instance-name">{{ details.counts.archived_count }}</div>
                  </div>
                  <div class="cols">
                      <img class="detail_logos" :src="sync">
                      <h6>Sync</h6>
                      <div class="instance-name">{{ details.counts.sync_pending_count }}</div>
                  </div>
                  <div class="cols">
                      <img class="detail_logos" :src="link" @click="Metalink(details.instancename)">
                      <h6>Meta data</h6>
                      <div class="instance-name">{{ details.counts.meta_link_created_count }}</div>
                  </div>
                  <div class= "cols">
                      <img class="detail_logos" :src="process">
                      <h6>Soft Links</h6>
                      <div class="instance-name">{{ details.counts.soft_link_created_count }}</div>
                  </div>
                  <div class="cols">
                      <img class="detail_logos" :src="error" @click="Errorr(details.instancename)">
                      <h6>Errors</h6>
                      <div class="instance-name">{{ details.counts.errors_count }}</div>
                  </div>
                  <div class="cols">
                      <img class="detail_logos" :src="db">
                      <h6>Storage</h6>
                      <div class="instance-name">{{ details.counts.instance_storage_size }}</div>
                  </div>
              </div>

              <div style="display: flex; flex-direction: row;">
              <p v-if="bidsMessage" style =" padding-right: 25px;">{{ bidsMessage }}</p>
              <p v-if="tendersMessage" style =" padding-right: 25px;">{{ tendersMessage }}</p> 
          </div>
          </div>
        
      </div>
     
      <div v-if="showformain || showPage">
          <Pagination 
          :currentPage="currentPage"
          :perPage="perPage"
          :rows="rows"
          :selectedOption="selectedOption"
          :bidstenders= bidstenders
          :title="title"
          @changeBids="handleChangeBids"/>
      </div>
  <div style="height: 5em;"></div> 
  </div>
</template>

<script>
import axios from 'axios';
//pagination -The component handles the display of items per page, current page tracking, and changes between bids and tenders.
import Pagination from './Pagination.vue';
import { BASE_URL, BASE_URL2, BASE_URL3 } from '@/config';

// const BASE_URL = 'http://192.168.0.110:5000';

export default {
  components: {
      Pagination
  },
  watch: {
  selectedOption(newVal) {
    if (newVal) {
      this.changeBids();
    }
  }},
  data() {
      return {
          instances: [],
          infodiv: false,
          response: [],
          details: {},  
          dashboard: {},
          bidstenders: {bids: [], tenders:[]},
          perPage: 10,
          currentPage: 1,
          showPage :   false,
          displayTenders: true,
          selectedOption: null,
          showformain: false,
          title: null,
          bidsMessage: '',
          tendersMessage: ''
      };
  },
  methods: {
      giveIlink(state) {
          return 'src/assets/' + state + '.png';
      },
      scrollLeft() {
          this.$refs.scrollContainer.scrollLeft -= 100;
      },
      scrollRight() {
          this.$refs.scrollContainer.scrollLeft += 100;
      },
      //this will process the bids
      processbids(iname){
          this.bidsMessage = 'Bids folders processing...';
          axios.get(`${BASE_URL3}/process_bids?instancename=${iname}&folder_type=bids`)
              .then(response => {
                  alert(response.data.message);
                  this.bidsMessage = '';
              })
              //error handling for bids
              .catch(error => {
                  console.error('Error saving config:', error);
                  alert('Error saving config: ' + error.message);
                  this.bidsMessage = '';
      });
              
      },
      //this will process the tenders
      processtenders(iname) {
    this.tendersMessage = 'Tenders folders processing...';
    axios.get(`${BASE_URL3}/process_tenders?instancename=${iname}&folder_type=tender`)
      .then(response => {
        alert(response.data.message);
        this.tendersMessage = ''; // Clear the message after response
      })
      //error handling for tenders
      .catch(error => {
        console.error('Error processing tenders:', error);
        alert('Error processing tenders: ' + error.message);
        this.tendersMessage = ''; // Clear the message even if there's an error
      });
  },
      getImages() {
          axios.get(`${BASE_URL}/getImages`)
              .then(response => {
                  this.response = response.data;
                  console.log(this.response);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      },
      getDashboard() {
          axios.get(`${BASE_URL}/getInstanceCount`)
              .then(response => {
                  this.dashboard = response.data;
                  console.log(this.dashboard);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      },
      imageSrc(base) {
          return `data:image/png;base64,${base}`;
      },
      buttonClick(iname) {
          this.infodiv = true
          // this.showPage = false
          this.showformain = false
          axios.get(`${BASE_URL}/getInstanceCount?instancename=${iname}`)
              .then(response => {
                  this.details = response.data;  
                  console.log(this.details);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      },
      Totalfile(iname){
              this.showPage=true
              axios.get(`${BASE_URL}/getBidsTenderInstance?instancename=${iname}`)
                  .then(response => {

                      const transformedBids = response.data.bids.map(bid => ({
                      bids_datafolder: bid.bids_datafolder,
                      folder_size:bid.folder_size,
                      bids_archivefolder: bid.bids_archivefolder
                      }));

                      const transformedTenders = response.data.tenders.map(tender => ({
                      tenders_datafolder: tender.tenders_datafolder,
                      folder_size:tender.folder_size,
                      tenders_archivefolder: tender.tenders_archivefolder
                      }));

                      // this.bidstenders.bids = response.data.bids; 
                      // this.bidstenders.tenders = response.data.tenders;
                      
                      this.bidstenders.bids = transformedBids;
                      this.bidstenders.tenders = transformedTenders;

                      this.title = 'Total Folders'
                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
      },
      TotalMain(reqq){
          this.infodiv = false
          this.showformain=true
          this.currentPage = 1
          axios.get(`${BASE_URL}/${reqq.iname}`)
          .then(response => {
              const transformedBids = response.data.bids.map(bid => ({
              bids_datafolder: bid.bids_datafolder,
              folder_size:bid.folder_size,
              bids_archivefolder: bid.bids_archivefolder
              }));

              const transformedTenders = response.data.tenders.map(tender => ({
              tenders_datafolder: tender.tenders_datafolder,
              folder_size:tender.folder_size,
              tenders_archivefolder: tender.tenders_archivefolder
              }));

              this.bidstenders.bids = transformedBids;
              this.bidstenders.tenders = transformedTenders;
              this.title = reqq.title
          })
          .catch(error => {
              console.error('Error:', error);
          });
          
      },
      Archived(iname){
              this.showPage=true
              axios.get(`${BASE_URL}/getBidsTenderInstanceArchived?instancename=${iname}`)
                  .then(response => {
                      const transformedBids = response.data.bids.map(bid => ({
                      bids_datafolder: bid.bids_datafolder,
                      folder_size:bid.folder_size,
                      bids_archivefolder: bid.bids_archivefolder
                      }));

                      const transformedTenders = response.data.tenders.map(tender => ({
                      tenders_datafolder: tender.tenders_datafolder,
                      folder_size:tender.folder_size,
                      tenders_archivefolder: tender.tenders_archivefolder
                      }));

                      this.bidstenders.bids = transformedBids;
                      this.bidstenders.tenders = transformedTenders; 
                      this.title = 'Folders Archived'
                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
      },
      Sync(iname){
              this.showPage=true
              axios.get(`${BASE_URL}/getBidsTenderInstanceSyncPending?instancename=${iname}`)
                  .then(response => {
                      const transformedBids = response.data.bids.map(bid => ({
                      bids_datafolder: bid.bids_datafolder,
                      folder_size:bid.folder_size,
                      bids_archivefolder: bid.bids_archivefolder
                      }));

                      const transformedTenders = response.data.tenders.map(tender => ({
                      tenders_datafolder: tender.tenders_datafolder,
                      folder_size:tender.folder_size,
                      tenders_archivefolder: tender.tenders_archivefolder
                      }));

                      this.bidstenders.bids = transformedBids;
                      this.bidstenders.tenders = transformedTenders; 
                      this.title = 'Folders Archived'
                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
      },
      Metalink(iname){
          axios.get(`${BASE_URL}/getBidsTenderInstanceMetalink?instancename=${iname}`)
              .then(response => {
                  const transformedBids = response.data.bids.map(bid => ({
                  bids_datafolder: bid.bids_datafolder,
                  bids_archivefolder: bid.bids_archivefolder
                  }));

                  const transformedTenders = response.data.tenders.map(tender => ({
                  tenders_datafolder: tender.tenders_datafolder,
                  tenders_archivefolder: tender.tenders_archivefolder
                  }));

                  this.bidstenders.bids = transformedBids;
                  this.bidstenders.tenders = transformedTenders;
                  this.title = 'Meta Data'
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      },
      Errorr(iname){
          axios.get(`${BASE_URL}/getBidsTenderInstanceError?instancename=${iname}`)
              .then(response => {
                  const transformedBids = response.data.bids.map(bid => ({
                  bids_datafolder: bid.bids_datafolder,
                  folder_size:bid.folder_size,
                  bids_archivefolder: bid.bids_archivefolder
                  }));

                  const transformedTenders = response.data.tenders.map(tender => ({
                  tenders_datafolder: tender.tenders_datafolder,
                  folder_size:tender.folder_size,
                  tenders_archivefolder: tender.tenders_archivefolder
                  }));

                  this.bidstenders.bids = transformedBids;
                  this.bidstenders.tenders = transformedTenders;
                  this.title = 'Errors'
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      },
      changeBids() {
          this.displayTenders = !this.displayTenders;
      },
      handleChangeBids(page, option) {
        this.currentPage = page;
        this.selectedOption = option;
        this.changeBids();
      }
  },
  computed: {
      folder() {
          return 'src/assets/folder.png';
      },
      complete() {
          return 'src/assets/complete.png';
      },
      sync() {
       return 'src/assets/sync.png';
      },
      process() {
          return 'src/assets/process.png';
      },
      link() {
          return 'src/assets/link.png';
      },
      error() {
          return 'src/assets/error.png';
      },
      db() {
          return 'src/assets/database.png';
      },
      rows() {
          return this.bidstenders.tenders.length;
      },
      currentItems() {
      return this.displayTenders ? this.bidstenders.tenders : this.bidstenders.bids;
      }
  },
  mounted() {
      this.getImages();
      this.getDashboard();
  }
};
</script>

<style scoped>
/* .btn {
background-color: #1a4d57;
color: white;
padding: 0.5em 1em;
font-size: 0.875em;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
bottom: 30px;
margin-left: 45em;
white-space: nowrap;
}
.btn:hover {
background-color: #2f6b77;
} */
#ins{
  display: flex;
  justify-content: center;
  
}
h4 {
margin-top: 0.375em; 
margin-bottom: 0.375em;
margin-left: 0.1875em; 
}
#rad{
  display: flex;
  justify-content: center;
}
#radiobutton{
  display: flex;
  gap: 20px;
  background-color: black;
  height: 30px; 
  width: 30%;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
}
label{
  color: white;
}
h3 {
  /* font-size: 22px; */
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
.bt{
background-color: grey;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
}

.instance-name-detail{
  font-weight: bold;
  margin-left: 0;
  font-size: 1em; 
  /* margin-top: 40px */

}
.infodetail-name{
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: row; */
  /* cursor: pointer; */
}
.detail_logos {
  /* height: 4.375em;  */
  /* width: 4.375em;  */
  height: 2em;
  width: 2em;
  margin-left: 0;
}

.total{
  width: 80%;
  margin-left: 10%;
  margin-right: 20%;
  border: 0.125em solid rgb(5, 5, 6); 
  border-radius: 0.9375em; 
  margin-top: 0.3125em; 
}
.detail{
  display: flex;
  justify-content: space-around;
  
}
.details {
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  border: 0.125em solid black; 
  border-radius: 0.9375em; 
  margin-top: 0.3125em; 
  
}
.details1 {
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  border: 0.125em solid rgb(13, 13, 13);
  border-radius: 0.9375em; 
  margin-top: 0.5em;
  padding-top: 1em;
}
.logo {
  /* width: 6.25em;  */
  /* height: 6.25em;  */
  height: 4em;
  width: 4em;
  /* align-items: center; */
  cursor: pointer;
}
#instance {
  border: 2px solid rgb(11, 10, 10);
  border-radius: 15px;
  margin-top: 0.5em;
  /* margin-bottom: 0.5em; */
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  overflow: hidden;
}
.scroll-buttons {
  display: flex;
  align-items: center;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.625em 0;    
  gap: 10px; 
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
.ba {
  background-color: white;
  color: rgb(11, 11, 12); 
  border: none;
  font-size: 2.5em; 
  cursor: pointer;
  padding: 0.5em 0.2em;
}
/* img {
  margin-left: 1.25em;
} */
h4 {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
.instance-item {
  text-align: center; 
  /* align-items: center; */
  /* cursor: pointer; */
}

h6{
  margin-top:0;
  margin-bottom:0;
}
.instance-name{
  font-weight: bold;
  text-align: center; 
  font-size: 0.75em; 
  margin-top: 0em;
  
  

}

.detail1,
.cols{
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

#mainDashboard {
  text-align: center; 
 
}

.details {
display: flex;
flex-direction: column;
}

.infodetail-name {
display: flex;
align-items: center;
}


.instance-name-detail {
margin-left: 5px; /* Adjust as needed */
margin-right:100px;
}

.button-container {
display: flex;
margin-left: auto; /* Pushes the buttons to the rightmost side */
}

.btn {

background-color: #1a4d57;
color: white;
padding: 0.5em 0.5em;
font-size: 0.875em;
border: none;
border-radius: 3px;
cursor: pointer;
transition: background-color 0.3s;
margin-right: 40px;
bottom: 30px;

white-space: nowrap;
}
.btn:hover {
background-color: #2f6b77;
}
/* Remove the margin for the last button */
.button-container .btn:last-child {
margin-right: 0;
}



</style>