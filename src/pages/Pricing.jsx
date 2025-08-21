import { useState } from 'react';
import { pricingPlans, faqData } from '../data/pricing';
import './Pricing.css';

const Pricing = ({ onBack, onBookingClick }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Có thể chuyển đến trang thanh toán hoặc hiển thị modal
    alert(`Bạn đã chọn ${plan.name}. Chúng tôi sẽ liên hệ với bạn sớm nhất!`);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <button className="back-btn" onClick={onBack}>
          ← Quay lại
        </button>
        
        <div className="pricing-header">
          <h1>Chọn gói học phù hợp với bạn</h1>
          <p>Đầu tư cho tương lai - Thành thạo tiếng Anh chỉ trong vài tháng</p>
        </div>

        <div className="pricing-plans">
          <h2>Bảng giá các gói học</h2>
          <div className="plans-grid">
            {pricingPlans.map(plan => (
              <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Phổ biến nhất</div>}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="original-price">{plan.originalPrice.toLocaleString()}đ</span>
                    <span className="current-price">{plan.price.toLocaleString()}đ</span>
                    <span className="price-per-lesson">{plan.pricePerLesson}</span>
                  </div>
                  <div className="discount-badge">{plan.discount}</div>
                </div>

                <div className="plan-description">
                  <p>{plan.description}</p>
                </div>

                <div className="plan-benefits">
                  <ul>
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={`select-plan-btn ${plan.popular ? 'popular' : ''}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Chọn gói này
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
