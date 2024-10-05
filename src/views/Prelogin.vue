<template>
    <Navbar />
  <div class="app-container">

    <Advertisement />
    <Categories />
    <RecommendedProducts />
    <MorePages />

  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Advertisement from '@/components/Advertisement.vue';
import Categories from '@/components/Categories.vue';
import RecommendedProducts from '@/components/RecommendedProducts.vue';
import MorePages from '@/components/MorePages.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Advertisement,
    Categories,
    RecommendedProducts,
    MorePages,
    Footer,
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
