const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'semanticflix_secret_key_123';

app.use(cors());
app.use(express.json());

// Generated movies data
const GENRES = ["Action", "Comedy", "Horror", "Romance", "Thriller", "Sci-Fi", "Adventure"];
const generateMovies = () => {
  const titlesByGenre = {
    "Action": [
      "The Dark Knight", "Avengers: Endgame", "Mad Max: Fury Road", "Die Hard", "Gladiator", 
      "John Wick", "The Matrix", "Terminator 2", "Mission: Impossible", "Kill Bill"
    ],
    "Comedy": [
      "Everything Everywhere All at Once", "Superbad", "The Hangover", "Dumb and Dumber", "Step Brothers", 
      "Anchorman", "Bridesmaids", "Shaun of the Dead", "Hot Fuzz", "Tropic Thunder"
    ],
    "Horror": [
      "The Conjuring", "Hereditary", "Get Out", "A Quiet Place", "It", 
      "The Shining", "Halloween", "Scream", "The Exorcist", "Sinister"
    ],
    "Romance": [
      "La La Land", "The Notebook", "Pride & Prejudice", "Titanic", "Before Sunrise", 
      "Crazy Rich Asians", "Silver Linings Playbook", "A Walk to Remember", "Notting Hill", "Love Actually"
    ],
    "Thriller": [
      "Parasite", "Joker", "Se7en", "Prisoners", "Gone Girl", 
      "Shutter Island", "Zodiac", "Nightcrawler", "The Silence of the Lambs", "Memento"
    ],
    "Sci-Fi": [
      "Interstellar", "Inception", "Blade Runner 2049", "Arrival", "The Martian", 
      "Dune", "Avatar", "Ex Machina", "Gravity", "Alien"
    ],
    "Adventure": [
      "Dune: Part Two", "Lord of the Rings", "Indiana Jones", "Jurassic Park", "Pirates of the Caribbean", 
      "The Goonies", "Jumanji", "Up", "Spider-Man: Into the Spider-Verse", "Life of Pi"
    ]
  };

  const movies = [];
  let idCounter = 1;

  for (const genre of GENRES) {
    const titles = titlesByGenre[genre];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      // Generate deterministic numbers based on id
      // Using simple hash-like logic so it doesn't change on every server restart
      const pseudoRandom = (idCounter * 137) % 100; 
      const rating = (6.5 + (pseudoRandom / 100) * 3).toFixed(1);
      const hours = (pseudoRandom % 2) + 1;
      const mins = pseudoRandom % 60;
      const year = 1990 + (pseudoRandom % 35);
      
      movies.push({
        id: idCounter,
        title: title,
        genre: genre,
        rating: parseFloat(rating),
        duration: `${hours}h ${mins}m`,
        year: year,
        description: `Experience the epic journey of ${title}. A critically acclaimed masterpiece in the ${genre} genre that will leave you on the edge of your seat.`,
        poster: `https://picsum.photos/seed/poster_${idCounter}/800/1200`,
        banner: `https://picsum.photos/seed/banner_${idCounter}/2000/800`
      });
      idCounter++;
    }
  }

  // Shuffle array deterministically
  return movies.sort((a, b) => (a.id * 7 % 10) - (b.id * 7 % 10));
};

const MOVIES = generateMovies();

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Dummy auth logic: Accept any valid-looking email
  if (email.includes('@')) {
    const token = jwt.sign({ email, id: 1 }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { email, name: email.split('@')[0] } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Movies Endpoint
app.get('/api/movies', (req, res) => {
  res.json({ movies: MOVIES, genres: GENRES });
});

// Single Movie Endpoint
app.get('/api/movies/:id', (req, res) => {
  const movie = MOVIES.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.listen(PORT, () => {
  console.log(`SemanticFlix Backend is running on http://localhost:${PORT}`);
});
