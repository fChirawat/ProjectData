<template>
    <div class="related-products">
      <h3>สินค้าที่คุณอาจจะสนใจ</h3>
      <div class="product-grid">
        <div class="product-box" v-for="product in relatedProducts" :key="product.id">
          <img :src="product.image" alt="Related Product" class="related-image">
          <div class="like-icon">❤️</div>
          <p>{{ product.name }}</p>
          <p class="price">{{ product.price }} บาท</p>
          <div class="location-icon">
            <img src="@/assets/location.png" alt="Location Icon" class="icon"> {{ product.location }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['relatedProducts']
  };
  </script>
  
  <style scoped>
  .related-products {
    text-align: left;
    margin-top: 40px;
    padding: 20px;
  }
  
  .product-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .product-box {
    width: 300px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  
  .like-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  
  .related-image {
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  
  .location-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .location-icon img {
    width: 14px;
    margin-right: 5px;
  }
  
  .price {
    font-size: 18px;
    color: #ff7f3f;
  }
  </style>
  