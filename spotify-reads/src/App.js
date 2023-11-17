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
      <BookShelf />
      <Queue />
      <WishList />
    </section>
    </>

  );
}

export default App;
