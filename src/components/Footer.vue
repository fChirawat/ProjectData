<template>
    <footer>
      <div class="footer-section">
        <h3>เกี่ยวกับเรา</h3>
        <p>ติดตามเราบน:</p>
        <div class="social-icons">
          <img src="@/assets/fb.png" alt="Facebook" class="social-icon">
          <img src="@/assets/line.png" alt="Line" class="social-icon">
          <img src="@/assets/ig.png" alt="Instagram" class="social-icon">
        </div>
      </div>
      <div class="footer-section">
        <h3>ศูนย์ช่วยเหลือ</h3>
        <p><a href="#">ข้อกำหนดและเงื่อนไขในการใช้งาน</a></p>
        <p><a href="#">นโยบายความเป็นส่วนตัว</a></p>
      </div>
      <div class="footer-section">
        <h3>ติดต่อเรา</h3>
        <p>บริษัท จูอาโล่ มาร์เก็ตเพลส จำกัด</p>
        <p>เลขที่ 191/23 อาคารซีทีไอ ทาวเวอร์ ชั้น 26</p>
      </div>
    </footer>
  </template>
  
  <style scoped>
  /* Footer Styles */
  footer {
    padding: 20px;
    background-color: #ff7f3f;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
  
  .footer-section h3 {
    margin-bottom: 10px;
  }
  
  .footer-section p, .footer-section a {
    color: #fff;
  }
  
  .social-icons {
    display: flex;
  }
  
  .social-icon {
    width: 20px;
    margin-right: 10px;
  }
  </style>
  