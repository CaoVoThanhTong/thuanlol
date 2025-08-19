import React, { useState, useMemo } from 'react';
import { teachersData } from '../data/teachers';
import './Teachers.css';

const Teachers = ({ setShowBookingModal, setSelectedTeacher }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Lấy danh sách chuyên ngành duy nhất
  const specialties = useMemo(() => {
    const allSpecialties = teachersData.map(teacher => teacher.specialty);
    return [...new Set(allSpecialties)];
  }, []);

  // Lọc và sắp xếp giáo viên
  const filteredTeachers = useMemo(() => {
    let filtered = teachersData.filter(teacher => {
      // Tìm kiếm theo tên hoặc chuyên ngành
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Lọc theo chuyên ngành
      const matchesSpecialty = !selectedSpecialty || teacher.specialty === selectedSpecialty;
      
      // Lọc theo khoảng giá
      let matchesPrice = true;
      if (priceRange) {
        const price = parseInt(teacher.price.replace(/[^\d]/g, ''));
        switch (priceRange) {
          case 'low':
            matchesPrice = price < 300000;
            break;
          case 'medium':
            matchesPrice = price >= 300000 && price <= 350000;
            break;
          case 'high':
            matchesPrice = price > 350000;
            break;
          default:
            matchesPrice = true;
        }
      }
      
      return matchesSearch && matchesSpecialty && matchesPrice;
    });

    // Sắp xếp
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSpecialty, priceRange, sortBy]);

  const handleBookingClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setPriceRange('');
    setSortBy('rating');
  };

  return (
    <div className="teachers">
      <div className="container">
        <div className="teachers-header">
          <h1>Đội ngũ giáo viên chất lượng</h1>
          <p>Chọn giáo viên phù hợp với mục tiêu học tập của bạn</p>
        </div>
        
        {/* Tìm kiếm và Lọc */}
        <div className="teachers-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm giáo viên theo tên, chuyên ngành..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>Chuyên ngành:</label>
              <select 
                value={selectedSpecialty} 
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="filter-select"
              >
                <option value="">Tất cả chuyên ngành</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Khoảng giá:</label>
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="">Tất cả mức giá</option>
                <option value="low">Dưới 300.000 VNĐ</option>
                <option value="medium">300.000 - 350.000 VNĐ</option>
                <option value="high">Trên 350.000 VNĐ</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sắp xếp:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
            
            <button 
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              Xóa bộ lọc
            </button>
          </div>
          
          <div className="results-info">
            <span>Tìm thấy {filteredTeachers.length} giáo viên phù hợp</span>
          </div>
        </div>
        
        <div className="teachers-grid">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-card">
              <div className="teacher-avatar">
                <img src={teacher.avatar} alt={teacher.name} />
                <div className="rating">
                  <span>⭐ {teacher.rating}</span>
                </div>
              </div>
              
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <div className="specialty">{teacher.specialty}</div>
                <div className="experience">{teacher.experience}</div>
                <p className="description">{teacher.description}</p>
                <div className="price">{teacher.price}</div>
              </div>
              
              <div className="teacher-actions">
                <button 
                  className="book-trial-btn"
                  onClick={() => handleBookingClick(teacher)}
                >
                  Đặt lịch học thử
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">😔</div>
            <h3>Không tìm thấy giáo viên phù hợp</h3>
            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
            <button onClick={clearFilters} className="reset-filters-btn">
              Đặt lại bộ lọc
            </button>
          </div>
        )}
        </div>
        
        <div className="teachers-cta">
          <h2>Không tìm thấy giáo viên phù hợp?</h2>
          <p>Liên hệ với chúng tôi để được tư vấn và giới thiệu giáo viên phù hợp nhất</p>
          <button className="contact-btn">Liên hệ tư vấn</button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
