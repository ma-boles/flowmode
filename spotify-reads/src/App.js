import Landing from './components/Landing';
import Works from './components/Works';
import Footer from './components/Footer';
import ShelfPage from './pages/ShelfPage';

import "./pages/ShelfPage";
import './styles/App.css';

function App() {
  return (
    <>

    <div className='app'>

    <ShelfPage />
      {/*<section className='landing--section'>
        <Landing />
      </section>

      <Works />*/}
      

      <Footer />
    </div>
    </>

  );
}

export default App;
