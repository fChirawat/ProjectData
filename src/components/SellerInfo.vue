<template>
    <div class="seller-info">
      <img src="@/assets/seller.png" alt="Seller Image" class="seller-image">
      <div class="seller-text">
        <p>ขายเสื้อบอลมือ2สภาพดี</p>
        <p>เป็นสมาชิกมาแล้ว 1 ปี 3 เดือน 11 วัน</p>
      </div>
      <div class="seller-actions">
        <button class="action-button">
          <img src="@/assets/phone.png" alt="Phone Icon" class="icon"> โทร
        </button>
        <button class="action-button">
          <img src="@/assets/products.png" alt="Products Icon" class="icon"> ดูสินค้าทั้งหมด
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .seller-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
  }
  .seller-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .seller-text {
    flex: 1;
    margin-left: 10px;
    margin-right: 20px;
  }
  .seller-actions {
    display: flex;
    gap: 10px;
  }
  </style>
  