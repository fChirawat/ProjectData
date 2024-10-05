<template>
    <div class="more-pages">
      <router-link to="/recom" class="text-black">เพิ่มเติม</router-link>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .more-pages {
    display: flex;
    align-items: center; 
    justify-content: center; 
    margin-top: 50px;
    margin-bottom: 250px;
    gap: 50px;
  }
  .more-pages a {
    text-decoration: none;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  </style>
  