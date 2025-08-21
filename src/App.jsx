import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import TeacherDetail from './pages/TeacherDetail'
import Auth from './pages/Auth'
import StudentDashboard from './pages/StudentDashboard'
import Pricing from './pages/Pricing'
import { teachersData } from './data/teachers'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulate login state

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentPage('teacher-detail');
  };

  const handleBookingClick = (teacher = null, scheduleInfo = null) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setShowBookingModal={setShowBookingModal} 
          />
        );
      case 'teachers':
        return (
          <Teachers 
            setShowBookingModal={setShowBookingModal} 
            setSelectedTeacher={setSelectedTeacher}
            onTeacherClick={handleTeacherClick}
          />
        );
      case 'teacher-detail':
        return (
          <TeacherDetail 
            teacher={selectedTeacher}
            onBookingClick={handleBookingClick}
            onBack={() => setCurrentPage('teachers')}
          />
        );
      case 'auth':
        return (
          <Auth 
            onBack={() => setCurrentPage('home')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'dashboard':
        return (
          <StudentDashboard 
            onNavigate={handleNavigation}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'pricing':
        return (
          <Pricing 
            onBack={() => setCurrentPage('home')}
            onBookingClick={handleBookingClick}
          />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setShowBookingModal={setShowBookingModal} 
          />
        );
    }
  }

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      
      <Footer />
      
      {showBookingModal && (
        <BookingModal 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)}
          selectedTeacher={selectedTeacher}
        />
      )}
    </div>
  )
}

export default App
