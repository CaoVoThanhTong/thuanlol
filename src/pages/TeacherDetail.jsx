import { useState } from 'react';
import './TeacherDetail.css';

const TeacherDetail = ({ teacher, onBookingClick, onBack }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  if (!teacher) return null;

  const handleBooking = () => {
    if (selectedDay && selectedTime) {
      onBookingClick(teacher, { day: selectedDay, time: selectedTime });
    } else {
      onBookingClick(teacher);
    }
  };

  return (
    <div className="teacher-detail">
      <button className="back-btn" onClick={onBack}>
        ← Quay lại danh sách
      </button>
      
      <div className="teacher-header">
        <div className="teacher-basic-info">
          <img src={teacher.avatar} alt={teacher.name} className="teacher-avatar-large" />
          <div className="teacher-main-info">
            <h1>{teacher.name}</h1>
            <div className="teacher-specialty">{teacher.specialty}</div>
            <div className="teacher-experience">{teacher.experience}</div>
            <div className="teacher-rating">
              <span className="rating-stars">{"★".repeat(Math.floor(teacher.rating))}</span>
              <span className="rating-number">{teacher.rating}</span>
              <span className="review-count">({teacher.detailedInfo?.reviews?.length || 0} đánh giá)</span>
            </div>
            <div className="teacher-price">{teacher.price}</div>
          </div>
        </div>
        
        <div className="teacher-video">
          <h3>Video giới thiệu</h3>
          <div className="video-container">
            <iframe
              src={teacher.detailedInfo?.videoUrl}
              title={`Video giới thiệu ${teacher.name}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="teacher-content">
        <div className="teacher-info-section">
          <div className="description-section">
            <h3>Giới thiệu</h3>
            <p>{teacher.detailedInfo?.fullDescription}</p>
          </div>

          <div className="qualifications-section">
            <h3>Bằng cấp & Chứng chỉ</h3>
            <ul className="qualifications-list">
              {teacher.detailedInfo?.qualifications?.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>

          <div className="teaching-areas-section">
            <h3>Chuyên môn giảng dạy</h3>
            <div className="teaching-areas">
              {teacher.detailedInfo?.teachingAreas?.map((area, index) => (
                <span key={index} className="teaching-area-tag">{area}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-section">
          <div className="schedule-section">
            <h3>Lịch trống</h3>
            <div className="available-slots">
              {teacher.detailedInfo?.availableSlots?.map((slot, index) => (
                <div key={index} className="day-slot">
                  <h4>{slot.day}</h4>
                  <div className="time-slots">
                    {slot.times.map((time, timeIndex) => (
                      <button
                        key={timeIndex}
                        className={`time-slot ${selectedDay === slot.day && selectedTime === time ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedDay(slot.day);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-actions">
            <button className="book-trial-btn primary-btn" onClick={handleBooking}>
              Đặt lịch học thử miễn phí
            </button>
            <p className="booking-note">
              {selectedDay && selectedTime 
                ? `Đã chọn: ${selectedDay}, ${selectedTime}`
                : "Chọn thời gian phù hợp để đặt lịch học thử"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
