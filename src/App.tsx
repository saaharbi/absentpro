import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import RecordAttendance from './pages/RecordAttendance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

type Page = 'dashboard' | 'students' | 'attendance' | 'reports' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1>مدارس أجيال ينبع الأهلية</h1>
          <div className="header-spacer" />
        </div>
      </header>

      <div className="container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="nav">
            <button
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              📊 لوحة التحكم
            </button>
            <button
              className={`nav-item ${currentPage === 'students' ? 'active' : ''}`}
              onClick={() => handleNavClick('students')}
            >
              👥 إدارة الطلاب
            </button>
            <button
              className={`nav-item ${currentPage === 'attendance' ? 'active' : ''}`}
              onClick={() => handleNavClick('attendance')}
            >
              ✅ تسجيل الغياب
            </button>
            <button
              className={`nav-item ${currentPage === 'reports' ? 'active' : ''}`}
              onClick={() => handleNavClick('reports')}
            >
              📈 التقارير
            </button>
            <button
              className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavClick('settings')}
            >
              ⚙️ الإعدادات
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'students' && <ManageStudents />}
          {currentPage === 'attendance' && <RecordAttendance />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
