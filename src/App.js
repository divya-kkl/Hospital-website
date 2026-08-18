
import './App.css';
import Topheader from './Componenet/Topheader/Topheader';
import Header from './Componenet/Header/Header';
import HeroSection from './Componenet/HeroSection/HeroSection';
import Category from './Componenet/Category/Category';
import TopSpecialties from './Componenet/TopSpecialties/TopSpecialties';
import FeaturedDoctors from './Componenet/FeaturedDoctors/FeaturedDoctors';
import ScrollBanner from './Componenet/Scroll-banner/Scroll-banner';
import ReasonSection from './Componenet/Reason-Section/Reason-Section';

function App() {
  return (
    <div className="App">
      <Topheader />
      <Header />
      <HeroSection />
      <Category />
      <TopSpecialties />
      <FeaturedDoctors />
      <ScrollBanner />
      <ReasonSection />
    </div>
  );
}

export default App;
