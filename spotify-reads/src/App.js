import Nav from './components/Nav';
import Landing from './components/Landing';
import Works from './components/Works';
import BookShelf from './components/BookShelf';
import Queue from './components/Queue';
import WishList from './components/WishList';
import Footer from './components/Footer';

import './styles/App.css';

function App() {
  return (
    <>
        <Nav />

    <div className='app'>

      <section className='landing--section'>
        <Landing />
      </section>

      <Works />
      {/*
      <section className='bookshelf--section'>
        <h2 className="bookshelf--h2">BookShelf</h2>
        <BookShelf />
      </section>

      <section className='queue--section'>
        <h3 className="queue--h3">Queue</h3>
        <Queue />
      </section>

      <section className='wishlist--section'>
        <h3 className="wishlist--h3">Wish List</h3>
  <WishList />
  </section>*/}

      <Footer />

    </div>
    </>

  );
}

export default App;
