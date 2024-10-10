<template>
  <Navbar />
  <div class="app-container">
    <div class="container">
      <form @submit.prevent="submitForm">
        <!-- หัวข้อสินค้า -->
        <div class="form-group">
          <label for="productName">หัวข้อสินค้าที่คุณต้องการขาย*</label>
          <input
            v-model="product_name"
            type="text"
            id="productName"
            class="form-control"
            :class="{ 'is-invalid': errors.product_name }"
            placeholder="ชื่อสินค้าเช่น เสื้อบอลสภาพเหมือนใหม่"
            @input="validateProductName"
          />
        </div>
        <small class="text-danger small-text" v-if="errors.product_name">ไม่ควรใส่อักขระพิเศษ เช่น &*#^</small>

        <!-- เลือกหมวดหมู่ -->
        <div class="form-group">
          <label for="category">เลือกหมวดหมู่ให้ตรงกับสินค้า*</label>
          <select v-model="category" id="category" class="form-control">
            <option disabled value="">เลือกหมวดหมู่</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <!-- ราคา -->
        <div class="form-group">
          <label for="price">ระบุราคาที่เหมาะสม*</label>
          <input v-model="price" type="number" id="price" class="form-control" placeholder="ระบุราคาเต็มของสินค้า/บริการ" />
        </div>

        <!-- อัพโหลดรูปภาพ -->
        <div class="form-group">
          <label>รูปภาพสินค้า*</label>
          <div class="upload-container">
            <input type="file" @change="handleFileUpload" multiple />
          </div>
        </div>
        <small class="small-text text-danger" v-if="images.length > 15">ใส่รูปได้สูงสุด 15 รูป</small>

        <!-- รายละเอียดสินค้า -->
        <div class="form-group">
          <label for="description">รายละเอียดสินค้า</label>
          <textarea v-model="product_description" id="description" class="form-control" placeholder="ข้อมูลเพิ่มเติม เช่น สภาพสินค้า สี อายุการใช้งาน ระยะประกัน"></textarea>
        </div>

        <!-- พื้นที่ของสินค้า -->
        <div class="form-group">
          <label for="location">ระบุพื้นที่ของสินค้า*</label>
          <div class="location-select">
            <select v-model="product_location" class="form-control">
              <option disabled value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
            </select>
          </div>
        </div>

        <!-- เบอร์โทร -->
        <div class="form-group">
          <label for="phone">เบอร์โทรศัพท์ติดต่อ*</label>
          <input
            v-model="phone_number"
            type="tel"
            id="phone"
            class="form-control"
            placeholder="มือถือเช่น 08XXXXXXXX"
            @input="validatePhoneNumber"
          />
        </div>
        <small class="text-danger small-text" v-if="errors.phone_number">กรุณาใส่เบอร์โทรที่คุณใช้สมัครสมาชิก</small>

        <!-- ปุ่มส่งฟอร์ม -->
        <div class="form-group button-group">
          <button type="submit" class="btn-next">ยืนยันการขาย</button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  name: "sell",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      product_name: '',
      category: '',
      price: '',
      images: [],
      product_description: '',
      product_location: '',
      phone_number: '',
      errors: {
        product_name: false,
        phone_number: false,
      },
      categories: ['หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า', 'สร้อยคอ', 'แหวน', 'กำไลข้อมือ', 'ต่างหู'],
      provinces: ['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต'],
    };
  },
  methods: {
    validateProductName() {
      const regex = /^[\u0E00-\u0E7Fa-zA-Z0-9\s\-_]+$/;
      this.errors.product_name = !regex.test(this.product_name);
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 15) {
        return;
      }
      this.images = files;
    },
    validatePhoneNumber() {
      const phoneRegex = /^08\d{8}$/;
      this.errors.phone_number = !phoneRegex.test(this.phone_number);
    },
    async submitForm() {
      if (!this.errors.product_name && !this.errors.phone_number && this.images.length <= 15) {
        const formData = new FormData();
        formData.append('product_name', this.product_name);
        formData.append('category', this.category);
        formData.append('price', this.price);
        formData.append('product_description', this.product_description);
        formData.append('product_location', this.product_location);
        formData.append('phone_number', this.phone_number);

        for (let i = 0; i < this.images.length; i++) {
          formData.append('images', this.images[i]);
        }

        try {
          await axios.post('http://localhost:5000/api/sell', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Product posted successfully!');
          this.resetForm();
        } catch (error) {
          console.error('Error posting product:', error);
          alert('Failed to post product: ' + (error.response.data.error || 'An unknown error occurred.'));
        }
      } else {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง');
      }
    },
    
    resetForm() {
      this.product_name = '';
      this.category = '';
      this.price = '';
      this.images = [];
      this.product_description = '';
      this.product_location = '';
      this.phone_number = '';
    },
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  font-family: Arial, sans-serif;
}
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 90px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.MK{
  text-decoration: underline;
}
label {
  width: 30%;
  margin-right: 10px;
}

input[type="text"],
input[type="number"],
input[type="tel"],
select,
textarea {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 70%;
}

.location-select {
  display: flex;
  gap: 10px;
  width: 70%;
}

.small-text {
  display: block;
  margin-left: 31%;
  margin-bottom: 10px;
}

.button-group {
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.terms-text {
  text-align: center;
  margin-bottom: 10px;
  margin-left: 80px;
}

.btn-next {
  width: 250px;
  height: 50px;
  background-color: #eb8237;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.text-danger {
  color: red;
}
</style>
