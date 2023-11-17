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

      <div className="header">
        <h1>Keep track of <br></br>
         your monthly <br></br>
         Spotify audiobooks</h1>
      </div>

      <BookShelf />
      <Queue />
      <WishList />
    </section>
    </>

  );
}

export default App;
