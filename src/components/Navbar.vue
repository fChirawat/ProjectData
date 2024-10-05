<template>
  <div class="navbar">
    <div class="navbar-left">
      <router-link to="/Home"><img src="@/assets/logo.png" alt="Logo" class="navbar-logo"></router-link>
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="ค้นหา" 
          class="search-input" 
          v-model="searchQuery" 
          @focus="showSuggestions = true" 
          @blur="hideSuggestions"
          @input="onSearchInput"
        />
        <div class="search-icon-wrapper">
          <img src="@/assets/search-icon.png" alt="Search Icon" class="search-icon" />
        </div>

        <div v-if="showSuggestions && filteredSuggestions.length" class="autocomplete-popup">
          <ul>
            <li 
              v-for="(suggestion, index) in filteredSuggestions" 
              :key="index" 
              @mousedown="selectSuggestion(suggestion)"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
      <div class="icons">
        <img src="@/assets/user.png" alt="User Icon" class="icon" />
        <p>{{ username }}</p> 
        <img 
          :src="isMenuOpen ? openMenuIcon : closeMenuIcon" 
          alt="Menu Icon" 
          class="icon" 
          @click="toggleMenu" 
        />  
        <div v-if="isMenuOpen" class="popup-menu">
          <ul>
            <li><a href="#">จัดประกาศ</a></li>
            <li><a href="#">หน้าร้านของฉัน</a></li>
            <li><a href="#">ประวัติการใช้บริการ</a></li>
            <li><a href="#">เเชท</a></li>
            <li><a href="#">รายการโปรด</a></li>
            <li><a href="#">เเก้ไขข้อมูลส่วนตัว</a></li>
            <li><a href="#" @click="logout">ออกจากระบบ</a></li> <!-- ปุ่มออกจากระบบ -->
          </ul>
        </div>
      </div>
      <button class="sell-button"><router-link to="/sell" class="text-black">ลงขายสินค้า</router-link></button>
      
    </div>
  </div>
</template>

<script>
import closeMenuIcon from '@/assets/closemenu.png';
import openMenuIcon from '@/assets/openmenu.png';

export default {
  data() {
    return {
      username: '', // กำหนดให้เริ่มต้นเป็นค่าว่าง
      isMenuOpen: false,
      closeMenuIcon,
      openMenuIcon,
      searchQuery: '',
      showSuggestions: false,
      suggestions: ['รองเท้า', 'เสื้อผ้า', 'หมวก', 'สร้อยคอ', 'กำไลข้อมือ'],
    };
  },
  mounted() {
    this.fetchUserData(); // เรียกใช้เมื่อ component ถูก mount
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    fetchUserData() {
      // ดึงข้อมูล username จากคุกกี้
      this.username = this.getCookie('username') || 'Guest'; // ถ้าไม่มีให้แสดงเป็น Guest
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      // ลบคุกกี้ username และ token
      document.cookie = "username=; path=/; max-age=0";
      document.cookie = "token=; path=/; max-age=0";

      // เปลี่ยนเส้นทางไปที่หน้า login
      this.$router.push({ path: '/login' });
    },
    onSearchInput() {
      this.showSuggestions = true;
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.showSuggestions = false;
    }
  },
  computed: {
    filteredSuggestions() {
      return this.suggestions.filter(suggestion =>
        suggestion.includes(this.searchQuery)
      );
    }
  },
};
</script>


  
  <style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  position: relative;
}

.navbar-left {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1800px; /* Adjust to fit your design */
}

.navbar-logo {
  width: 50px;
  margin-right: 20px;
  margin-left: 100px; /* Adjust to add space from the left edge */
}

.autocomplete-popup {
  position: absolute;
  top: 45px; /* ระยะห่างจากช่องค้นหา */
  left: 0;
  width: 85%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 999;
  display: flex; /* ใช้ flexbox สำหรับการจัดเรียง */
  justify-content: flex-start; /* จัดให้อยู่ชิดซ้าย */
  padding: 10px;
}

.autocomplete-popup ul {
  display: flex; /* แสดงรายการในแนวนอน */
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap; /* ถ้ามีรายการยาวเกินจะให้เลื่อนไปบรรทัดถัดไป */
}

.autocomplete-popup li {
  padding: 10px;
  cursor: pointer;
  white-space: nowrap; /* ป้องกันการตัดคำในบรรทัดเดียว */
}

.autocomplete-popup li:hover {
  background-color: #f0f0f0;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 100%;
  max-width: 970px;
  height: 40px;
  padding-left: 10px;
  padding-right: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-icon-wrapper {
  position: absolute;
  right: 170px;
  display: flex;
  align-items: center;
  height: 100%;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.icons {
  display: flex;
  align-items: center;
  margin-right: 250px;
}

.icon {
  width: 30px;
  margin-right: 10px;
  cursor: pointer; /* ทำให้ไอคอนดูเป็นปุ่ม */
}

.popup-menu {
  position: absolute; /* ทำให้เมนูลอย */
  top: 60px; /* ระยะห่างจากปุ่ม */
  right: 400px; /* ปรับตำแหน่งให้ตรงกับปุ่มกด */
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 150px;
  z-index: 1000; /* เพื่อให้อยู่ด้านบน */
}

.popup-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.popup-menu li {
  padding: 10px;
  text-align: left;
}

.popup-menu li a {
  text-decoration: none;
  color: #333;
}

.popup-menu li:hover {
  background-color: #f0f0f0;
}

.sell-button {
  background-color: #ff7f3f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto; /* Align to the right */
}

.sell-button a {
  text-decoration: none; /* ลบเส้นใต้ */
  color: #000; /* สีตัวหนังสือ */
  padding: 5px 10px; /* เพิ่มพื้นที่รอบๆตัวหนังสือ */
  border-radius: 5px; /* เพิ่มความโค้งให้กับลิงก์ */
  transition: background-color 0.3s ease; /* เพิ่ม transition effect */
}

  </style>
  