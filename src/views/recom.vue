<template>
  <div class="app-container">
    <RecommendedProducts />

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
</style>
