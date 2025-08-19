import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, selectedTeacher }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây sẽ gọi API để lưu booking
    console.log('Booking data:', { ...formData, teacher: selectedTeacher });
    setIsSubmitted(true);
    
    // Reset form sau 3 giây và đóng modal
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });
      onClose();
    }, 3000);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        {!isSubmitted ? (
          <>
            <div className="modal-header">
              <h2>Đặt lịch học thử miễn phí</h2>
              {selectedTeacher && (
                <div className="selected-teacher">
                  <img src={selectedTeacher.avatar} alt={selectedTeacher.name} />
                  <div>
                    <h3>{selectedTeacher.name}</h3>
                    <p>{selectedTeacher.specialty}</p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="0123456789"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Ngày học thử *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={getTomorrowDate()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Giờ học thử *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn giờ học</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Ghi chú (tùy chọn)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mục tiêu học tập, trình độ hiện tại, yêu cầu đặc biệt..."
                  rows="3"
                />
              </div>

              <button type="submit" className="submit-btn">
                Xác nhận đặt lịch
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Đặt lịch thành công!</h2>
            <p>Chúng tôi đã nhận được yêu cầu đặt lịch học thử của bạn.</p>
            <p>Giáo viên sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận lịch học.</p>
            <div className="booking-summary">
              <h4>Thông tin đặt lịch:</h4>
              <p><strong>Giáo viên:</strong> {selectedTeacher?.name}</p>
              <p><strong>Ngày:</strong> {formData.date}</p>
              <p><strong>Giờ:</strong> {formData.time}</p>
              <p><strong>Liên hệ:</strong> {formData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
