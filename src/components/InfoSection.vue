<template>
    <div class="info-section">
      <h2>{{ productName }}</h2>
      <p class="price">{{ price }} บาท</p>
      <p class="seller">ลงขายโดย {{ sellerName }}</p>
      <div class="action-buttons">
        <button class="action-button">
          <img src="@/assets/chat.png" alt="Chat Icon" class="icon"> คุยกับผู้ขาย
        </button>
        <button class="action-button">
          <img src="@/assets/phone.png" alt="Phone Icon" class="icon"> โทร
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['productName', 'price', 'sellerName'],
  };
  </script>
  
  <style scoped>
  .info-section {
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
  }
  .price {
    font-size: 24px;
    color: #ff7f3f;
  }
  .action-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;
  }
  .action-button {
    display: flex;
    align-items: center;
    background-color: #ff7f3f;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  .icon {
    width: 24px;
    margin-right: 10px;
  }
  </style>
  