//Wyczyść src/App.jsx i umieść tablicę FILMS na poziomie modułu (poza funkcją App)

const FILMS = [
  { id: 1, title: 'Oppenheimer',       year: 2023, genre: 'Dramat',  rating: 5, watched: true  },
  { id: 2, title: 'Dune: Część druga', year: 2024, genre: 'Sci-Fi',  rating: 4, watched: false },
  { id: 3, title: 'Past Lives',        year: 2023, genre: 'Romans',  rating: 5, watched: true  },
  { id: 4, title: 'Poor Things',       year: 2023, genre: 'Komedia', rating: 4, watched: false },
];

//RatingStars({ rating = 3 }) — przepisz z zadania 1 na JSX. Prop rating ma wartość domyślną 3 — użyj parametru domyślnego ES6, nie defaultProps (usunięte w React 19).

function RatingStars({rating = 3}){
  const fullStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  const stars = fullStars + emptyStars;

 //return React.createElement('span', null, stars);
 //<type {...props}>children</type>
 return <span>{stars}</span>
}

// GenreBadge({ genre }) — nowy komponent nieobecny w zadaniu 1. Renderuje <span> z inline stylem ustawiającym kolor tła zależny od gatunku. Zdefiniuj mapę gatunków do kolorów (co najmniej: Dramat, Sci-Fi, Romans, Komedia). Dla gatunku spoza mapy użyj koloru zastępczego — zastosuj operator ??.

function GenreBadge({genre}) {
  const colors = {
    'Dramat': 'red',
    'Sci-Fi': 'purple',
    'Romans': 'green',
    'Komedia': 'yellow'
  };
  return <span style={{backgroundColor: colors[genre] ?? 'blue'}}>{genre}</span>
}

//WatchedBadge({ watched }) — stosuje wzorzec early return: gdy !watched zwraca null, w przeciwnym razie element z tekstem ✓ Obejrzany.

function WatchedBadge ({ watched }) {
  if(!watched) {
    return null;
  }
  return <p>✓ Obejrzany</p>
}

//FilmCard({ title, year, genre, rating, watched }) — przepisz na JSX używając komponentów GenreBadge, RatingStars i WatchedBadge.

function FilmCard({title, year, genre, rating, watched}) {
  console.log('render:', title);

  return (
    <div>
      <h3>{title} ({year})</h3>
      <GenreBadge genre = {genre} />
      <RatingStars rating = {rating} />
      <WatchedBadge watched = {watched} />
    </div>
  );
}

//FilmList({ title, films }) — nowy komponent nieobecny w zadaniu 1. Przyjmuje tytuł sekcji (<h2>) i tablicę filmów. Renderuje FilmCard dla każdego elementu tablicy używając .map() z key={film.id}.

function FilmList({title, films}){
  return (
    <div>
      <h2>{title}</h2>

      {films.map(function (film){
        return (
          <FilmCard
          key = {film.id}
          title = {film.title}
          year = {film.year}
          genre = {film.genre}
          rating = {film.rating}
          watched = {film.watched} />
        );
      })}
    </div>
  );
}

//App() — dzieli tablicę FILMS na dwie grupy przy użyciu Array.filter() i renderuje dwa komponenty FilmList: jeden z tytułem „Obejrzane”, drugi „Do obejrzenia”.

function App() {

  const watchedFilms = FILMS.filter(function (film) {
    return film.watched === true; 
  });

  const unwatchedFilms = FILMS.filter(function (film) {
    return film.watched === false;
  });

  return (
    <div>
      <h1>Biblioteka filmów</h1>      
      <FilmList title = "Obejrzane" films = {watchedFilms} />
      <FilmList title = "Do obejrzenia" films = {unwatchedFilms} />
    </div>
  );

}

export default App;