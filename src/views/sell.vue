<template>
    <Navbar />
  <div class="app-container">
    <div class="container">
      <form @submit.prevent="submitForm">
        <!-- หัวข้อสินค้า -->
        <div class="form-group">
          <label for="productName">หัวข้อสินค้าที่คุณต้องการขาย*</label>
          <input
            v-model="productName"
            type="text"
            id="productName"
            class="form-control"
            :class="{ 'is-invalid': errors.productName }"
            placeholder="ชื่อสินค้าเช่น เสื้อบอลสภาพเหมือนใหม่"
            @input="validateProductName"
          />
        </div>
        <small class="text-danger small-text" v-if="errors.productName">ไม่ควรใส่อักขระพิเศษ เช่น &*#^</small>

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
            <input type="file" @change="handleImageUpload" multiple />
          </div>
        </div>
        <small class="small-text text-danger" v-if="images.length > 15">ใส่รูปได้สูงสุด 15 รูป</small>

        <!-- รายละเอียดสินค้า -->
        <div class="form-group">
          <label for="description">รายละเอียดสินค้า</label>
          <textarea v-model="description" id="description" class="form-control" placeholder="ข้อมูลเพิ่มเติม เช่น สภาพสินค้า สี อายุการใช้งาน ระยะประกัน"></textarea>
        </div>

        <!-- พื้นที่ของสินค้า -->
        <div class="form-group">
          <label for="location">ระบุพื้นที่ของสินค้า*</label>
          <div class="location-select">
            <select v-model="location.province" @change="fetchDistricts" class="form-control">
              <option disabled value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
            </select>

            <select v-model="location.district" class="form-control">
              <option disabled value="">เลือกอำเภอ</option>
              <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
            </select>
          </div>
        </div>

        <!-- เบอร์โทร -->
        <div class="form-group">
          <label for="phone">เบอร์โทรศัพท์ติดต่อ*</label>
          <input
            v-model="phone"
            type="tel"
            id="phone"
            class="form-control"
            placeholder="มือถือเช่น 08XXXXXXXX"
            @input="validatePhoneNumber"
          />
        </div>
        <small class="text-danger small-text" v-if="errors.phone">กรุณาใส่เบอร์โทรที่คุณใช้สมัครสมาชิก</small>

        <!-- ปุ่มส่งฟอร์ม -->
        <div class="form-group button-group">
          <p class="terms-text">คลิกปุ่ม ”ต่อไป” เพื่อยอมรับ <a href="#">ข้อกำหนดและเงื่อนไข</a></p>
          <button type="submit" class="btn-next">ต่อไป</button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: "sell",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      productName: '',
      category: '',
      price: '',
      images: [],
      description: '',
      location: {
        province: '',
        district: '',
      },
      phone: '',
      errors: {
        productName: false,
        phone: false,
      },
      categories: ['หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า', 'สร้อยคอ', 'แหวน', 'กำไลข้อมือ', 'ต่างหู'],
      provinces: ['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต'],
      districts: [],
    };
  },
  methods: {
    validateProductName() {
      const regex = /^[\u0E00-\u0E7Fa-zA-Z0-9\s\-_]+$/;
      this.errors.productName = !regex.test(this.productName);
    },
    handleImageUpload(event) {
      const files = event.target.files;
      if (files.length > 15) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    fetchDistricts() {
      if (this.location.province === 'กรุงเทพฯ') {
        this.districts = ['เขตดุสิต', 'เขตปทุมวัน'];
      } else if (this.location.province === 'เชียงใหม่') {
        this.districts = ['อำเภอเมืองเชียงใหม่', 'อำเภอสันทราย'];
      }
    },
    validatePhoneNumber() {
      const phoneRegex = /^08\d{8}$/;
      this.errors.phone = !phoneRegex.test(this.phone);
    },
    submitForm() {
      if (!this.errors.productName && !this.errors.phone && this.images.length <= 15) {
        // เก็บข้อมูลลงใน LocalStorage
        localStorage.setItem('sellProductData', JSON.stringify({
          productName: this.productName,
          category: this.category,
          price: this.price,
          images: this.images,
          description: this.description,
          location: this.location,
          phone: this.phone,
        }));

        // นำทางไปยังหน้า ConSell โดยไม่ส่ง params ใหญ่เกินไป
        this.$router.push({ name: 'ConSell' });
      } else {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง');
      }
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
