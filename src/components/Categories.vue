<template>
    <div class="categories">
      <h2 class="section-title">หมวดหมู่</h2>
      <div class="category-grid">
        <div class="category-box" v-for="(category, index) in categories" :key="index" @click="onCategoryClick(index)">
          <img :src="category.image" :alt="category.name" class="category-image">
          <p>{{ category.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import shirtImage from '@/assets/category1.png';
  import pantsImage from '@/assets/category2.png';
  import shoesImage from '@/assets/category3.png';
  import hatImage from '@/assets/category4.png';
  import necklaceImage from '@/assets/category5.png';
  import ringsImage from '@/assets/category6.png';
  import braceletsImage from '@/assets/category7.png';
  import earringImage from '@/assets/category8.png';
  
  export default {
    data() {
      return {
        categories: [
          { name: 'เสื้อผ้า', image: shirtImage },
          { name: 'กางเกง', image: pantsImage },
          { name: 'รองเท้า', image: shoesImage },
          { name: 'หมวก', image: hatImage },
          { name: 'สร้อยคอ', image: necklaceImage },
          { name: 'แหวน', image: ringsImage },
          { name: 'กำไลข้อมือ', image: braceletsImage },
          { name: 'ต่างหู', image: earringImage }
        ]
      };
    },
    methods: {
      onCategoryClick(index) {
        console.log("Selected category index:", index);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Categories Styles */
  .categories {
    padding: 20px 0;
  }
  
  .section-title {
    margin-left: 185px;
    font-size: 24px;
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    gap: 30px;
    justify-content: center;
  }
  
  .category-box {
    width: 200px;
    height: 200px;
    background-color: #f4f4f4;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .category-image {
    width: 100px;
    height: 100px;
  }
  </style>
  