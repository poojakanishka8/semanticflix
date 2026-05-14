const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'semanticflix_secret_key_123';

app.use(cors());
app.use(express.json());

// Accurate Trailer Mapping
const MOVIE_TRAILERS = {
  "Interstellar": "zSWdZVtXT7E",
  "The Dark Knight": "EXeTwQWaywY",
  "Inception": "YoHD9XEInc0",
  "Dune: Part Two": "Way9Dexny3w",
  "Parasite": "5xH0HfJHsaY",
  "Everything Everywhere All at Once": "wxN1T1uxQ2g",
  "Joker": "zAGVQLHvwOY",
  "La La Land": "0pdqf4P9MB8",
  "Avengers: Endgame": "TcMBFSGZo1c",
  "The Conjuring": "k10ETZ41q5o",
  "Mad Max: Fury Road": "hEJnMQG9ev8",
  "Die Hard": "jaJuwKqJ22w",
  "Gladiator": "P5ieIbInFpg",
  "John Wick": "C0BMx-qxsP4",
  "The Matrix": "vKQi3bBA1y8",
  "Terminator 2": "lwSysg9o7wE",
  "Mission: Impossible": "2m1drlzP874",
  "Kill Bill": "7kSuas6mRfk",
  "Superbad": "4eaZ_adeFYk",
  "The Hangover": "tcdUhdOtz9s",
  "Dumb and Dumber": "l13yPhimE3o",
  "Step Brothers": "8Q96_N4pYg8",
  "Anchorman": "-T3wnP91OnI",
  "Bridesmaids": "n2L-p6n_X54",
  "Shaun of the Dead": "Lfg1Z8shUtE",
  "Hot Fuzz": "Cun-D6N20pM",
  "Tropic Thunder": "T-6YhRZowgc",
  "Hereditary": "V6wWKNij_1M",
  "Get Out": "DzfpyWOmXls",
  "A Quiet Place": "WR7cc5t7tv8",
  "It": "hAUTDJfwOrc",
  "The Shining": "S014qV56f-D",
  "Halloween": "ek1ePFp-nBI",
  "Scream": "beToTslH17s",
  "The Exorcist": "YDGw1MTEe9k",
  "Sinister": "_kbQA6_u_nk",
  "The Notebook": "yDJIcYE32uQ",
  "Pride & Prejudice": "1dYv5u6v55Y",
  "Titanic": "zq6i_vY388U",
  "Before Sunrise": "6S0fP9vSst0",
  "Crazy Rich Asians": "ZQ-YX-5bAs0",
  "Silver Linings Playbook": "Lj5_FhLaaQQ",
  "A Walk to Remember": "i72wRvPw_ik",
  "Notting Hill": "fMls_ZAfll0",
  "Love Actually": "fOS-HMBXzAD",
  "Se7en": "znmZoVkCjpI",
  "Prisoners": "bpXfcTF6iVk",
  "Gone Girl": "2-_-1nJf8Vg",
  "Shutter Island": "5iaYLCiq5RM",
  "Zodiac": "q6q_40_S6-8",
  "Nightcrawler": "X8kWeprgJ-w",
  "The Silence of the Lambs": "W6Mm8Sbe--o",
  "Memento": "0vS0E9bBSL0",
  "Blade Runner 2049": "gCcx85zbxz4",
  "Arrival": "tFMo3UJ4B4g",
  "The Martian": "ej3ioOneTy8",
  "Dune": "n9xhJrPXop4",
  "Avatar": "5PSNL1qE6VY",
  "Ex Machina": "bggUmgeMCdc",
  "Gravity": "OiTiKOy59o4",
  "Alien": "jQ5lPt9edzQ",
  "Lord of the Rings": "v7v1hIk_BWk",
  "Indiana Jones": "a6JB2suJY6Y",
  "Jurassic Park": "lc0UehYemQA",
  "Pirates of the Caribbean": "naQr0uTrH_s",
  "The Goonies": "hJ2j4oWdQtU",
  "Jumanji": "2QKg5SZ_35I",
  "Up": "ORFWdXl_zJ4",
  "Spider-Man: Into the Spider-Verse": "tg52up16eq0",
  "Life of Pi": "3mMN69797U8"
};

const GENRES = ["Action", "Comedy", "Horror", "Romance", "Thriller", "Sci-Fi", "Adventure"];
const generateMovies = () => {
  const titlesByGenre = {
    "Action": ["The Dark Knight", "Avengers: Endgame", "Mad Max: Fury Road", "Die Hard", "Gladiator", "John Wick", "The Matrix", "Terminator 2", "Mission: Impossible", "Kill Bill"],
    "Comedy": ["Everything Everywhere All at Once", "Superbad", "The Hangover", "Dumb and Dumber", "Step Brothers", "Anchorman", "Bridesmaids", "Shaun of the Dead", "Hot Fuzz", "Tropic Thunder"],
    "Horror": ["The Conjuring", "Hereditary", "Get Out", "A Quiet Place", "It", "The Shining", "Halloween", "Scream", "The Exorcist", "Sinister"],
    "Romance": ["La La Land", "The Notebook", "Pride & Prejudice", "Titanic", "Before Sunrise", "Crazy Rich Asians", "Silver Linings Playbook", "A Walk to Remember", "Notting Hill", "Love Actually"],
    "Thriller": ["Parasite", "Joker", "Se7en", "Prisoners", "Gone Girl", "Shutter Island", "Zodiac", "Nightcrawler", "The Silence of the Lambs", "Memento"],
    "Sci-Fi": ["Interstellar", "Inception", "Blade Runner 2049", "Arrival", "The Martian", "Dune", "Avatar", "Ex Machina", "Gravity", "Alien"],
    "Adventure": ["Dune: Part Two", "Lord of the Rings", "Indiana Jones", "Jurassic Park", "Pirates of the Caribbean", "The Goonies", "Jumanji", "Up", "Spider-Man: Into the Spider-Verse", "Life of Pi"]
  };

  const movies = [];
  let idCounter = 1;

  for (const genre of GENRES) {
    const titles = titlesByGenre[genre];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
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
        banner: `https://picsum.photos/seed/banner_${idCounter}/2000/800`,
        trailerId: MOVIE_TRAILERS[title] || "dQw4w9WgXcQ"
      });
      idCounter++;
    }
  }

  return movies.sort((a, b) => (a.id * 7 % 10) - (b.id * 7 % 10));
};

const MOVIES = generateMovies();

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email && email.includes('@')) {
    const token = jwt.sign({ email, id: 1 }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { email, name: email.split('@')[0] } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/movies', (req, res) => {
  res.json({ movies: MOVIES, genres: GENRES });
});

app.listen(PORT, () => {
  console.log(`SemanticFlix Backend is running on http://localhost:${PORT}`);
});
