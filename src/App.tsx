import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DaycareProfilePage from './pages/DaycareProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import DashboardPage from './pages/DashboardPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ParentingTipsPage from './pages/ParentingTipsPage';
import ListYourDaycarePage from './pages/ListYourDaycarePage';
import ProviderResourcesPage from './pages/ProviderResourcesPage';
import DaycareLoginPage from './pages/DaycareLoginPage';
import DaycareSignupPage from './pages/DaycareSignupPage';
import DaycareDashboardPage from './pages/DaycareDashboardPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/daycare/:id" element={<DaycareProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/parenting-tips" element={<ParentingTipsPage />} />
            <Route path="/list-your-daycare" element={<ListYourDaycarePage />} />
            <Route path="/provider-resources" element={<ProviderResourcesPage />} />
            <Route path="/daycare-login" element={<DaycareLoginPage />} />
            <Route path="/daycare-signup" element={<DaycareSignupPage />} />
            <Route path="/daycare-dashboard" element={<DaycareDashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;