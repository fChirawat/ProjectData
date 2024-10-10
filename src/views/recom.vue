<template>
  <div class="app-container">
    <div class="recommended-products">
      <h2 class="section-title">สินค้าเพิ่มเติม</h2>
      <RecommendedProducts />
    </div>
  </div>
  <Footer />
</template>

<script>
import RecommendedProducts from '@/components/RecommendedProducts.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    RecommendedProducts,
    Footer
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  font-family: Arial, sans-serif;
}
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .section-title {
  margin-left: 185px;
  font-size: 24px;
}
.recommended-products {
  padding: 20px 0;
}
</style>
