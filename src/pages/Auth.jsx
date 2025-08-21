import { useState } from 'react';
import './Auth.css';

const Auth = ({ onBack, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Họ tên là bắt buộc';
      }

      if (!formData.phone) {
        newErrors.phone = 'Số điện thoại là bắt buộc';
      } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      console.log(isLogin ? 'Login:' : 'Register:', formData);
      // Here you would normally call your authentication API
      
      // Simulate successful login/register
      setTimeout(() => {
        alert(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!');
        onLoginSuccess(); // Chuyển đến dashboard
      }, 500);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-btn" onClick={onBack}>
          ← Quay lại
        </button>
        
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h1>
            <p>
              {isLogin 
                ? 'Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục học tập.'
                : 'Tạo tài khoản để bắt đầu hành trình học tiếng Anh của bạn.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Nhập họ và tên của bạn"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Nhập địa chỉ email của bạn"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Nhập số điện thoại của bạn"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">Mật khẩu *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <button type="button" onClick={toggleMode} className="toggle-btn">
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
            
            {isLogin && (
              <p className="forgot-password">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Quên mật khẩu?
                </a>
              </p>
            )}
          </div>

          {!isLogin && (
            <div className="terms-notice">
              <p>
                Bằng việc đăng ký, bạn đồng ý với{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản sử dụng</a>{' '}
                và{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>{' '}
                của chúng tôi.
              </p>
            </div>
          )}
        </div>

        <div className="auth-benefits">
          <h3>Tại sao nên tạo tài khoản?</h3>
          <ul>
            <li>
              <span className="benefit-icon">📚</span>
              Quản lý lịch học cá nhân
            </li>
            <li>
              <span className="benefit-icon">📊</span>
              Theo dõi tiến độ học tập
            </li>
            <li>
              <span className="benefit-icon">💬</span>
              Nhận tư vấn từ giáo viên
            </li>
            <li>
              <span className="benefit-icon">🎁</span>
              Nhận ưu đãi đặc biệt
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
