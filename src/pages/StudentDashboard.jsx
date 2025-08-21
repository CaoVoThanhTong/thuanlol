import { useState } from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - thường sẽ được lấy từ API
  const studentData = {
    name: "Nguyễn Văn A",
    email: "vana@email.com",
    joinDate: "2024-01-15",
    currentPackage: "Gói Phổ Biến - 20 buổi",
    remainingLessons: 15,
    completedLessons: 5,
    nextLesson: {
      teacher: "Gia Thuận",
      date: "2024-12-22",
      time: "19:00",
      subject: "Business English"
    },
    recentLessons: [
      {
        id: 1,
        teacher: "Gia Thuận",
        date: "2024-12-20",
        time: "19:00",
        subject: "Business English",
        status: "completed",
        rating: 5,
        feedback: "Buổi học rất tốt, em đã hiểu rõ hơn về cách viết email chuyên nghiệp."
      },
      {
        id: 2,
        teacher: "Minh Châu",
        date: "2024-12-18",
        time: "20:00",
        subject: "IELTS Speaking",
        status: "completed",
        rating: 4,
        feedback: "Cô giải thích rất chi tiết về cấu trúc bài thi Speaking."
      },
      {
        id: 3,
        teacher: "Gia Thuận",
        date: "2024-12-15",
        time: "19:00",
        subject: "Business English",
        status: "completed",
        rating: 5,
        feedback: "Thầy hướng dẫn presentation skills rất hay."
      }
    ],
    upcomingLessons: [
      {
        id: 4,
        teacher: "Gia Thuận",
        date: "2024-12-22",
        time: "19:00",
        subject: "Business English"
      },
      {
        id: 5,
        teacher: "Minh Châu",
        date: "2024-12-25",
        time: "20:00",
        subject: "IELTS Speaking"
      }
    ]
  };

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Chào mừng trở lại, {studentData.name}!</h2>
        <p>Hãy tiếp tục hành trình học tiếng Anh của bạn</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{studentData.remainingLessons}</h3>
            <p>Buổi học còn lại</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{studentData.completedLessons}</h3>
            <p>Buổi đã hoàn thành</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>4.8</h3>
            <p>Đánh giá trung bình</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>75%</h3>
            <p>Tiến độ hoàn thành</p>
          </div>
        </div>
      </div>

      {studentData.nextLesson && (
        <div className="next-lesson-card">
          <h3>Buổi học sắp tới</h3>
          <div className="lesson-details">
            <div className="lesson-time">
              <span className="date">{studentData.nextLesson.date}</span>
              <span className="time">{studentData.nextLesson.time}</span>
            </div>
            <div className="lesson-info">
              <h4>{studentData.nextLesson.subject}</h4>
              <p>Giáo viên: {studentData.nextLesson.teacher}</p>
            </div>
            <button className="join-lesson-btn">Tham gia</button>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h3>Hành động nhanh</h3>
        <div className="action-buttons">
          <button onClick={() => onNavigate('teachers')} className="action-btn">
            <span className="action-icon">👨‍🏫</span>
            Tìm giáo viên
          </button>
          <button onClick={() => onNavigate('pricing')} className="action-btn">
            <span className="action-icon">💰</span>
            Mua gói học
          </button>
          <button onClick={() => setActiveTab('schedule')} className="action-btn">
            <span className="action-icon">📅</span>
            Xem lịch học
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="schedule-section">
      <h2>Lịch học của bạn</h2>
      
      <div className="schedule-tabs">
        <button className="schedule-tab active">Sắp tới</button>
        <button className="schedule-tab">Lịch sử</button>
      </div>

      <div className="lessons-list">
        {studentData.upcomingLessons.map(lesson => (
          <div key={lesson.id} className="lesson-card upcoming">
            <div className="lesson-time">
              <div className="date">{lesson.date}</div>
              <div className="time">{lesson.time}</div>
            </div>
            <div className="lesson-content">
              <h4>{lesson.subject}</h4>
              <p>Giáo viên: {lesson.teacher}</p>
            </div>
            <div className="lesson-actions">
              <button className="reschedule-btn">Đổi lịch</button>
              <button className="cancel-btn">Hủy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="history-section">
      <h2>Lịch sử học tập</h2>
      
      <div className="lessons-list">
        {studentData.recentLessons.map(lesson => (
          <div key={lesson.id} className="lesson-card completed">
            <div className="lesson-time">
              <div className="date">{lesson.date}</div>
              <div className="time">{lesson.time}</div>
            </div>
            <div className="lesson-content">
              <h4>{lesson.subject}</h4>
              <p>Giáo viên: {lesson.teacher}</p>
              <div className="lesson-rating">
                <span>Đánh giá: </span>
                <span className="stars">{"★".repeat(lesson.rating)}</span>
              </div>
              {lesson.feedback && (
                <p className="feedback">"{lesson.feedback}"</p>
              )}
            </div>
            <div className="lesson-status">
              <span className="status-badge completed">Đã hoàn thành</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>Thông tin cá nhân</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-placeholder">👤</div>
          <div className="profile-info">
            <h3>{studentData.name}</h3>
            <p>{studentData.email}</p>
            <p>Thành viên từ: {studentData.joinDate}</p>
          </div>
        </div>
        
        <div className="profile-details">
          <h4>Gói học hiện tại</h4>
          <p>{studentData.currentPackage}</p>
          
          <div className="progress-bar">
            <div className="progress-label">
              <span>Tiến độ học tập</span>
              <span>{studentData.completedLessons}/{studentData.completedLessons + studentData.remainingLessons}</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{
                  width: `${(studentData.completedLessons / (studentData.completedLessons + studentData.remainingLessons)) * 100}%`
                }}
              ></div>
            </div>
          </div>
          
          <button className="edit-profile-btn">Chỉnh sửa thông tin</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <button className="back-btn" onClick={onBack}>
          ← Quay lại trang chủ
        </button>
        <h1>Dashboard học viên</h1>
      </div>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">🏠</span>
            Tổng quan
          </button>
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <span className="nav-icon">📅</span>
            Lịch học
          </button>
          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="nav-icon">📚</span>
            Lịch sử
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span>
            Hồ sơ
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'schedule' && renderSchedule()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
