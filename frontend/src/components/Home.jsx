
import CategoryCaraousel from './CategoryCaraousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const Home = () => {
  return (
    <div> 
     <Navbar />
     <HeroSection />
     <CategoryCaraousel />
     <LatestJobs />
     <Footer />
    </div>
  )
}

export default Home