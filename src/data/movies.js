export const GENRES = [
  "Action", "Comedy", "Horror", "Romance", "Thriller", "Sci-Fi", "Adventure"
];

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
      const rating = (Math.random() * (9.5 - 6.5) + 6.5).toFixed(1);
      const hours = Math.floor(Math.random() * 2) + 1;
      const mins = Math.floor(Math.random() * 59);
      const year = Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990;
      
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

  // Shuffle array slightly so the home page trending isn't just one genre
  return movies.sort(() => Math.random() - 0.5);
};

export const MOVIES = generateMovies();
