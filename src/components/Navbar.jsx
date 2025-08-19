import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>EnglishTutor</h2>
        </div>
        <ul className="navbar-menu">
          <li>
            <a 
              href="#" 
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('home');
              }}
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'teachers' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('teachers');
              }}
            >
              Giáo viên
            </a>
          </li>
          {/* <li>
            <a 
              href="#" 
              className={currentPage === 'booking' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('booking');
              }}
            >
              Đặt lịch
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
