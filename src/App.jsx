import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setShowBookingModal={setShowBookingModal} />
      case 'teachers':
        return <Teachers setShowBookingModal={setShowBookingModal} setSelectedTeacher={setSelectedTeacher} />
      // case 'booking':
      //   return <Teachers setShowBookingModal={setShowBookingModal} setSelectedTeacher={setSelectedTeacher} />
      default:
        return <Home setCurrentPage={setCurrentPage} setShowBookingModal={setShowBookingModal} />
    }
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
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
