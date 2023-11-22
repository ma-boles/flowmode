import LandingPage from './pages/LandingPage';
import ShelfPage from './pages/ShelfPage';
/*import BrowsePage from './pages/BrowsePage';*/

import Footer from './components/Footer';

import "./pages/ShelfPage";
import './styles/App.css';

function App() {
  return (
    <>

    <div /*className='app'*/>
    <ShelfPage />

        {/* 
    <LandingPage />

      <BrowsePage />
      */}      
      <Footer />
    </div>
    </>

  );
}

export default App;
