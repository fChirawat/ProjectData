<template>
  <div class="recommended-products">
    <h2 class="section-title">สินค้าแนะนำ</h2>
    <div class="product-grid">
      <div class="product-box" v-for="(product, index) in recommendedProducts" :key="index" @click="onProductClick(index)">
        <div class="like-button">❤️</div>
        <img :src="product.image" :alt="product.name" class="product-image">
        <p>{{ product.name }}</p>
        <p>Price: {{ product.price }} บาท</p>
        <p>{{ product.store }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import productAImage from '@/assets/product1.png';

export default {
  data() {
    return {
      recommendedProducts: [
        { name: 'Manchester United 23/24', image: productAImage, price: 1000, store: 'ร้านค้า 1' }
      ]
    };
  },
  methods: {
    onProductClick(index) {
      console.log("Selected product index:", index);
    }
  }
};
</script>

<style scoped>
/* Recommended Products Styles */
.recommended-products {
  padding: 20px 0;
}

.section-title {
  margin-left: 185px;
  font-size: 24px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  gap: 30px;
  justify-content: center;
}

.product-box {
  width: 300px;
  height: 400px;
  background-color: #f4f4f4;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 150px;
  height: 150px;
}

.like-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
