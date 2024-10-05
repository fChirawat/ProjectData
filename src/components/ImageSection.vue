<template>
    <div class="image-section">
      <div class="main-image-container">
        <button class="arrow-button left-arrow" @click="prevImage">←</button>
        <img :src="currentImage" alt="Product Image" class="main-image">
        <button class="arrow-button right-arrow" @click="nextImage">→</button>
        <div class="like-icon">❤️</div>
      </div>
      <div class="thumbnail-container">
        <img v-for="(image, index) in productImages" :key="index" :src="image" class="thumbnail" @click="selectImage(index)">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['productImages'],
    data() {
      return {
        currentImageIndex: 0,
      };
    },
    computed: {
      currentImage() {
        return this.productImages[this.currentImageIndex];
      },
    },
    methods: {
      selectImage(index) {
        this.currentImageIndex = index;
      },
      nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
      },
      prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
      },
    },
  };
  </script>
  
  <style scoped>
  .image-section {
    position: relative;
    width: 600px;
    height: 700px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .main-image-container {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .main-image {
    width: 350px;
    height: 350px;
  }
  .thumbnail-container {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  .thumbnail {
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .arrow-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  .like-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  