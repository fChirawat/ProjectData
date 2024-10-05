<template>
  <div id="app">
    <ProductDetails />

  </div>
  <Footer />
</template>

<script>
import ProductDetails from '@/components/ProductDetails.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    ProductDetails,
    Footer,
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
