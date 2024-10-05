<template>
  <div class="app-container">
    <div class="confirm-container">
      <div class="confirm-content">
        <div class="product-summary">
          <h2>รายละเอียดสินค้า</h2>
          <div class="product-images">
            <img v-for="(image, index) in imagePreviews" :key="index" :src="image" class="product-image" />
          </div>
          <ul>
            <li><strong>ชื่อสินค้า:</strong> {{ productName }}</li>
            <li><strong>หมวดหมู่:</strong> {{ category }}</li>
            <li><strong>ราคา:</strong> {{ price }}</li>
            <li><strong>รายละเอียด:</strong> {{ description }}</li>
            <li><strong>พื้นที่:</strong> {{ location.province }}, {{ location.district }}</li>
            <li><strong>เบอร์โทรศัพท์:</strong> {{ phone }}</li>
          </ul>
        </div>

        <div class="order-summary">
          <h2>สรุปรายการ</h2>
          <p>คุณมี {{ imageFiles.length }} รายการที่จะลงขาย</p>
          <button @click="confirmSale" class="btn-confirm">ยืนยันการลงขาย</button>
        </div>
      </div>

      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>ลงขายสำเร็จ!</h2>
          <p>สินค้าของคุณถูกลงขายเรียบร้อยแล้ว</p>
          <button @click="goToSell" class="btn-home">ลงขายเพิ่ม</button>
          <button @click="goToHome" class="btn-home">กลับไปหน้า Home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Consell",
  data() {
    return {
      productName: '',
      category: '',
      price: '',
      description: '',
      location: { province: '', district: '' },
      phone: '',
      imageFiles: [], // Store the actual files selected by the user
      imagePreviews: [], // Store the base64 preview images
      showPopup: false,
    };
  },
  mounted() {
    // ดึงข้อมูลจาก LocalStorage
    const productData = JSON.parse(localStorage.getItem('sellProductData'));

    if (productData) {
      this.productName = productData.productName;
      this.category = productData.category;
      this.price = productData.price;
      this.description = productData.description;
      this.location = productData.location;
      this.phone = productData.phone;
      this.imagePreviews = productData.images; // This assumes that base64 or URLs were stored
    }
  },
  methods: {
    async confirmSale() {
      const formData = new FormData();

      // Append form data
      formData.append('productName', this.productName);
      formData.append('category', this.category);
      formData.append('price', this.price);
      formData.append('description', this.description);
      formData.append('location', JSON.stringify(this.location)); // Send as JSON string
      formData.append('phone', this.phone);

      // Append image files
      this.imageFiles.forEach((file) => {
        formData.append('images', file); // Key should be 'images' to match backend
      });

      try {
        // ส่งข้อมูลไปยัง backend ผ่าน API
        await axios.post('http://localhost:5000/api/sell', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.showPopup = true;
      } catch (error) {
        console.error('Error uploading product:', error);
        alert('การอัปโหลดสินค้าเกิดข้อผิดพลาด');
      }
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToSell() {
      this.$router.push('/sell');
    },
    handleFileUpload(event) {
      this.imageFiles = Array.from(event.target.files); // Store the selected files

      // Generate previews
      this.imagePreviews = [];
      this.imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result); // Store base64 preview
        };
        reader.readAsDataURL(file);
      });
    }
  }
};
</script>

<style scoped>
/* General Styles */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.confirm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.confirm-content {
  display: flex;
  justify-content: space-between;
}

.product-summary, .order-summary {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.product-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-confirm, .btn-home {
  background-color: #EB8237;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}
</style>
