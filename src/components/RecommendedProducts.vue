<template>

    <div class="product-grid">
      <div class="product-box" v-for="(product, index) in products" :key="index" @click="onProductClick(index)">
        <div class="like-button">❤️</div>
        <!-- Use getImageUrl to generate the correct image URL -->
        <img :src="getImageUrl(product.product_image)" alt="Product Image" class="product-image" />
        <p>{{ product.product_name }}</p>
        <p>Category: {{ product.category }}</p>
        <p>Price: {{product.price }} ฿</p>
      </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        getImageUrl(imagePath) {
            return `http://localhost:5000${imagePath}`;
        },
        formatPrice(price) {
            if (typeof price === 'number') {
                return price.toFixed(2);
            }
            return 'N/A';
        }
    },
    created() {
        this.fetchProducts();
    },
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
