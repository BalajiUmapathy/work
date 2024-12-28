<template>
  <footer class="app-footer hidden-footer">
    <div class="footer-content">
      <img :src="logo2" alt="Company Logo2" class="footer-logo2" />
      <img :src="logo" alt="Company Logo" class="footer-logo" />
      <img :src="logo3" alt="Company Logo3" class="footer-logo3" />
      <p>© 2024 National Informatics Centre. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import logo from '@/assets/nic.png';
import logo2 from '@/assets/gepnic.jpg';
import logo3 from '@/assets/digitalindia.jpg';

export default {
  name: 'Footer',
  data() {
      return {
          logo,
          logo2,
          logo3
      }
  }
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  text-align: center;
  padding: 0.5em 0; 
  position: fixed;
  bottom: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0; 
}

.footer-logo3,
.footer-logo,
.footer-logo2 {
  width: 3.125em;
}

.footer-logo {
  margin-right: 0.3125em; 
}
.footer-logo2 {
  margin-right: 0.3125em; 
  margin-left: 0.3125em; 
}

.footer-content p {
  margin: 0; 
  font-size: 0.75em; 
}


.hidden-footer {
  transform: translateY(100%);
}
</style>
