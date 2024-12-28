<script>
import axios from 'axios';
import { BASE_URL, BASE_URL2 } from '@/config';
// const BASE_URL= 'http://192.168.0.110:5000';
export default{
    computed:{
        image() {
            return 'src/assets/home.png';
        },
        logout_i() {
            return 'src/assets/logout.png';
        }
    },
    data(){
        return{
            config: {
        archive_solution_shortname: '',
        archive_solution_fullname: '',
        }
    };
    },
    methods: {
        fetchConfig() {
      axios.get(`${BASE_URL}/postConfigMaster`)
        .then(response => {
          console.log(this.config)
          this.config = response.data;
          console.log(this.config);
        })
        .catch(error => {
          console.error('Error fetching config:', error);
          alert('Error fetching config: ' + error.message);
        });
    },
        getTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); 
            const day = String(now.getDate()).padStart(2, '0');
            const hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const date = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
            return date;
        }
    },
    mounted() {
    this.fetchConfig();
  }
};
</script>

<template>
    <div id="top">
        <div class="left">
            <!-- <img class="home" :src="image"> -->
            <h1 id="title">{{  config.archive_solution_fullname }}</h1>
        </div>

        <div >

        </div>

        <div class="right">
            <!-- <p id="welcomep">Welcome {{ currentUser }} </p> -->
            <div class="logout-container">
                <!-- <p>Logout</p> -->
                <!-- <img class="home" :src="logout_i"> -->
            </div>
        </div>
       
        
    </div>
    
</template>

<style scoped>
/* #title{
    margin-bottom: 0px;
}
p{
    margin-bottom: 0;
}
.left{
    display: flex;
    gap: 20px;
}
.right{
    display: flex;
    gap: 20px;
}
#top{
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.home{
    height: 30px;
}
.logout-container{
    display: flex;
    align-items: center;
    gap: 2px;
} */
#title{
    color: rgb(249, 248, 248);
}
p{
    color: rgb(246, 243, 243);
}
h1{
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.home{
    height: 2.5em;
    margin-top: 1.5rem
}

#top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1a4d57;
}

.left{
    display: flex;
    gap: 1.25em;
}

.right{
    display: flex;
    gap: 1.25em;
}

.logout-container {
    display: flex;
    align-items: center; 
}

.logout-container p {
    margin: 0; 
    margin-right: 0.2em; 
}

.logout-container img.home {
    width: 1.9em; 
    height: 1.9em; 
}  


</style>