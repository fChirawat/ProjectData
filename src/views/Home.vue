<template>
      <Navbar />
  <div class="app-container">

    <div class="advertisement">
      <button class="arrow-button left-arrow">&#10094;</button>
      <div class="ads-container">
        <!-- Ads go here -->
      </div>
      <button class="arrow-button right-arrow">&#10095;</button>
      <div class="dot-navigation">
        <!-- Dot navigation goes here -->
      </div>
    </div>

    
<!-- product -->
<div class="recommended-products">
  <h2 class="section-title">สินค้าแนะนำ</h2>
    <RecommendedProducts />
  </div>
    <div class="more-pages">
      <router-link to="/recom" class="text-black">เพิ่มเติม</router-link>
    </div>
    
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';  // ใช้ @ เพื่ออ้างอิงโฟลเดอร์ src
import RecommendedProducts from '@/components/RecommendedProducts.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    RecommendedProducts,
    Footer
  },
  props: {
    username: {
      type: String,
      default: '' // กำหนดค่า default ถ้าไม่มีการส่ง props
    }
  },
  mounted() {
    console.log('Username:', this.username); // ตรวจสอบว่า username ถูกส่งมาถูกต้องหรือไม่
  }
};
</script>

<style scoped>
/* General Styles */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Advertisement Styles */
.advertisement {
  position: relative;
  width: 100%;
  height: 645px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recommended-products {
  padding: 20px 0;
}
.arrow-button {
  position: absolute;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
}
.categories {
    padding: 20px 0;
  }
.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.dot-navigation {
  position: absolute;
  bottom: 10px;
  display: flex;
}

.dot-navigation div {
  width: 10px;
  height: 10px;
  background-color: #888;
  border-radius: 50%;
  margin: 0 5px;
}

/* More Pages Button */
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

.section-title {
  margin-left: 185px;
  font-size: 24px;
}
</style>
