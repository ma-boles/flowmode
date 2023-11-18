import Landing from './components/Landing';
import Nav from './components/Nav';
import BookShelf from './components/BookShelf';
import Queue from './components/Queue';
import WishList from './components/WishList';

import './styles/App.css';

function App() {
  return (
    <>
        <Nav />

    <section className='app'>
      <Landing />
      <h2 className="bookShelf--h2">BookShelf</h2>
      <BookShelf />
      <h3 className="queue--h3">Queue</h3>
      <Queue />
      <h3 className="wishList--h3">Wish List</h3>
      <WishList />
    </section>
    </>

  );
}

export default App;
