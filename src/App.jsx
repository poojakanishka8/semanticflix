import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-white selection:bg-primary/30">
      <ScrollToTop />
      {!isLoginPage && <Navbar />}
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
