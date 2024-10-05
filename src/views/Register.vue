<template>
  <div class="app-container">
    <div class="login-container">
      <div class="login-box">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-image">
        </div>
        <h2>Sign Up</h2>
        <form @submit.prevent="register">
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" placeholder="Username" required />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <div class="password-container">
              <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" placeholder="Password" required />
              <button type="button" @click="togglePasswordVisibility" class="password-toggle">
                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <div class="password-container">
              <input :type="passwordVisible ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword" placeholder="Confirm Password" required />
              <button type="button" @click="togglePasswordVisibility" class="password-toggle">
                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <!-- แสดงข้อความเมื่อรหัสผ่านไม่ตรงกัน -->
          <div v-if="passwordMismatch" class="error-message">
            รหัสผ่านไม่ตรงกัน กรุณาลองอีกครั้ง
          </div>
          <button type="submit" :disabled="!isFormValid" class="signup-button">Register</button>
        </form>
        <div v-if="error" class="error-message">{{ error }}</div>
        <div class="login-link">
          <p>Already Have an Account? <router-link to="/login" class="text-black">Sign In</router-link></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer.vue';

export default {
  name: "register",
  components: {
    Footer
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      error: '',
      passwordMismatch: false // สถานะการตรวจสอบรหัสผ่านไม่ตรงกัน
    };
  },
  computed: {
    isFormValid() {
      return (
        this.username &&
        this.email &&
        this.password &&
        this.confirmPassword
      );
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async register() {
      try {
        // ตรวจสอบรหัสผ่านให้ตรงกัน
        if (this.password !== this.confirmPassword) {
          this.passwordMismatch = true;
          return; // หยุดการทำงานถ้ารหัสผ่านไม่ตรงกัน
        }

        // Clear mismatch error ถ้ารหัสผ่านตรงกัน
        this.passwordMismatch = false;

        // ส่งข้อมูลการสมัครไปยัง backend
        const response = await axios.post('http://localhost:5000/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        // Handle การสมัครสำเร็จ
        alert(response.data.message);
        this.$router.push('/login');
      } catch (err) {
        // แสดงข้อผิดพลาด
        this.error = err.response?.data?.message || err.message || 'Registration failed';
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

html, body, #app {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.logo {
  margin-bottom: 20px;
}

.logo-image {
  width: 50px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
}

.password-toggle i {
  font-size: 18px;
}

.signup-button {
  background-color: #ff7f3f;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover {
  background-color: #ff671c;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}

.login-link a {
  color: #ff7f3f;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
