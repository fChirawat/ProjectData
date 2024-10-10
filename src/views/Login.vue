  <template>
  <div class="app-container">
    <div class="login-container">
      <div class="login-box">
        <router-link to="/"><div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-image">
        </div></router-link>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <label for="username"><i class="fas fa-user"></i></label>
            <input type="text" id="username" name="username" placeholder="Username" v-model="username" required>
          </div>
          <div class="input-group">
            <label for="password"><i class="fas fa-lock"></i></label>
            <input type="password" id="password" name="password" placeholder="Password" v-model="password" required>
          </div>
          <div class="actions">
            <div>
              <input type="checkbox" id="remember-me" v-model="rememberMe">
              <label for="remember-me">Remember me</label>
            </div>
            <a href="/forgot-password" class="forgot-password">Forgot your Password?</a>
          </div>
          <button type="submit" class="login-button">เข้าสู่ระบบ</button>
        </form>
        <div v-if="error">{{ error }}</div>
        <div class="signup-link">
          <p>Don't Have an Account? <router-link to="/register" class="text-black">Sign Up</router-link></p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer.vue';

export default {
  name: "Login",
  components: {
    Footer
  },
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username: this.username,
          password: this.password
        });

        if (response.status === 200) {
          alert('Login successful');
          
          const expirationTime = 3600; // เวลาในหน่วยวินาที (เช่น 1 ชั่วโมง)
          
          // เก็บ token ในคุกกี้
          document.cookie = `token=${response.data.token};path=/;max-age=${expirationTime}`;
          
          // เก็บ username ในคุกกี้
          document.cookie = `username=${this.username};path=/;max-age=${expirationTime}`;

          // รีเซ็ตข้อมูลการล็อกอิน
          this.username = '';
          this.password = '';

          // เปลี่ยนไปที่หน้า home
          this.$router.push({ path: '/home' });
        }
      } catch (error) {
        console.log('Error response:', error.response);
        this.error = error.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
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
  * {
    box-sizing: border-box;
  }
  
  html, body, #app {
    height: 100%;
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
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .login-button {
    background-color: #ff7f3f;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    width: 100%;
    cursor: pointer;
  }
  
  .signup-link {
    margin-top: 20px;
    font-size: 14px;
  }
</style>
