import axios from "axios";

// جلب التوكن من localStorage
const token = localStorage.getItem("UserToken");

// إنشاء نسخة axios مع رأس المصادقة (Authorization header)
const axiosAuth = axios.create({
  baseURL: "https://mytshop.runasp.net/api", // يمكن تغييره حسب الحاجة
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export default axiosAuth;
