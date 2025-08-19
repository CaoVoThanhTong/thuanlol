import React from 'react';
import './Home.css';

const Home = ({ setCurrentPage, setShowBookingModal }) => {
  const benefits = [
    {
      icon: "👨‍🏫",
      title: "Học 1-1 cá nhân hóa",
      description: "Giáo viên tập trung 100% vào bạn, phù hợp với trình độ và mục tiêu của bạn"
    },
    {
      icon: "🎯",
      title: "Chọn giáo viên phù hợp",
      description: "Đa dạng giáo viên với chuyên môn khác nhau: IELTS, TOEIC, giao tiếp, business..."
    },
    {
      icon: "🆓",
      title: "Học thử miễn phí",
      description: "Trải nghiệm buổi học đầu tiên hoàn toàn miễn phí để đảm bảo sự hài lòng"
    },
    {
      icon: "⏰",
      title: "Lịch học linh hoạt",
      description: "Đặt lịch theo thời gian rảnh của bạn, học mọi lúc mọi nơi"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5b8?w=80&h=80&fit=crop&crop=face",
      feedback: "Tôi đã cải thiện được IELTS Speaking từ 5.5 lên 7.0 chỉ sau 2 tháng học với cô Sarah!",
      rating: 5
    },
    {
      name: "Trần Văn Nam",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      feedback: "Thầy Michael dạy Business English rất hay, giúp tôi tự tin giao tiếp trong công việc.",
      rating: 5
    },
    {
      name: "Lê Thị Hoa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      feedback: "Con tôi rất thích học với cô Emma, giờ đây bé đã tự tin nói tiếng Anh hơn rất nhiều!",
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Học tiếng Anh 1-1 với giáo viên phù hợp</h1>
            <p>Đặt lịch học thử miễn phí ngay hôm nay và trải nghiệm phương pháp học hiệu quả nhất!</p>
            <div className="hero-buttons">
              <button 
                className="cta-button primary"
                onClick={() => setCurrentPage('teachers')}
              >
                Đặt lịch học thử ngay
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => setCurrentPage('teachers')}
              >
                Xem danh sách giáo viên
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
              alt="Online English Learning"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
