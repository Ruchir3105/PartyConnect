import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Calendar, Search, MapPin, TrendingUp, PartyPopper, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularEvents from './components/PopularEvents';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Login from './pages/login';
import AboutUs from './pages/AboutUs'; 
import HowItWorks from './pages/HowitWorks';
import Pricing from './pages/pricing';
import Contact from './pages/Contact';
import HelpCenter from './pages/HelpCenter';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQs from './pages/FAQs';
import NotFound from './pages/NotFound';
import MusicPage from './pages/Categories/MusicPage';
import TheaterPage from './pages/Categories/TheatrePage';
import FoodDrinkPage from './pages/Categories/FoodDrinkPage';
import ArtsPage from './pages/Categories/ArtsPage';
import CinemaPage from './pages/Categories/CinemaPage';
import ComedyPage from './pages/Categories/ComedyPage';
import EducationPage from './pages/Categories/EducationPage';
import PhotographyPage from './pages/Categories/PhotographyPage';
import GamingPage from './pages/Categories/GamingPage';
import SportsPage from './pages/Categories/SportsPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for home page */}
        <Route path="/" element={
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Categories />
      <PopularEvents />
      <Footer />
      
    </div>
        }/>
        {/* Route for login page */}
        <Route path="/login" element={<Login />} />
         {/* Add routes for footer links */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Categories />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/theater" element={<TheaterPage />} />
        <Route path="/food-and-drink" element={<FoodDrinkPage />} />
        <Route path="/arts" element={<ArtsPage />} />
        <Route path="/cinema" element={<CinemaPage />} />
        <Route path="/comedy" element={<ComedyPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="*" element={<div>Page Not Found</div>}/>

      </Routes>
    </Router>
  );
}

export default App;