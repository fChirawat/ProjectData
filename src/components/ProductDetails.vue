<template>
    <div class="product-details">
      <div class="main-content">
        <ImageSection :productImages="productImages" />
        <InfoSection :productName="productName" :price="price" :sellerName="sellerName" />
      </div>
      <SellerInfo />
      <RelatedProducts :relatedProducts="relatedProducts" />
    </div>
  </template>
  
  <script>
  import ImageSection from './ImageSection.vue';
  import InfoSection from './InfoSection.vue';
  import SellerInfo from './SellerInfo.vue';
  import RelatedProducts from './RelatedProducts.vue';
  
  export default {
    components: {
      ImageSection,
      InfoSection,
      SellerInfo,
      RelatedProducts,
    },
    data() {
      return {
        productImages: ['@/assets/product1.png', '@/assets/product2.png'],
        productName: 'เสื้อManchester United 23/24',
        price: 1000,
        sellerName: 'Jeng12345',
        relatedProducts: [
          { id: 1, name: 'เสื้อ Chelsea 2024', price: 1200, location: 'กรุงเทพ', image: '@/assets/product1.png' },
          { id: 2, name: 'เสื้อ Liverpool 2023', price: 900, location: 'นนทบุรี', image: '@/assets/product2.png' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-content {
    display: flex;
    gap: 20px;
    margin-bottom: 50px;
    border: 2px solid #ddd;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  