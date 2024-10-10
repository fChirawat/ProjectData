<template>
  <div>
    <!-- แสดงหมวดหมู่ -->
    <div class="category-grid">
      <div class="category-box" v-for="(category, index) in categories" :key="index" @click="onCategoryClick(category.name)">
        <img :src="category.image" :alt="category.name" class="category-image">
        <p>{{ category.name }}</p>
      </div>
    </div>

    <!-- แสดงสินค้าหลังจากที่เลือกหมวดหมู่ -->
    <div class="product-grid">
      <div class="product-box" v-for="(product, index) in filteredProducts" :key="index">
        <div class="like-button">❤️</div>
        <img :src="getImageUrl(product.product_image)" alt="Product Image" class="product-image" />
        <p>{{ product.product_name }}</p>
        <p>Category: {{ product.category }}</p>
        <p>Price: {{ product.price }} ฿</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      ],
      filteredProducts: [],  // ตัวแปรเก็บสินค้าที่กรองตามหมวดหมู่
    };
  },
  methods: {
    async fetchProducts(category) {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        this.filteredProducts = response.data;
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    },
    onCategoryClick(categoryName) {
      this.fetchProducts(categoryName);
    },
    getImageUrl(imageName) {
      return `http://localhost:5000/uploads/${imageName}`;
    },
    formatPrice(price) {
      if (typeof price === 'number') {
        return price.toFixed(2);
      }
      return 'N/A';
    }
  },
  created() {
    this.fetchProducts('เสื้อผ้า'); // Default category
  },
};
</script>

<style scoped>
/* Categories and Products Styles */
.category-grid, .product-grid {
  display: grid;
  grid-template-columns: repeat(4, 200px);
  gap: 30px;
  justify-content: center;
}

.category-box, .product-box {
  width: 200px;
  height: 200px;
  background-color: #f4f4f4;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-image, .product-image {
  width: 100px;
  height: 100px;
}

.like-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
