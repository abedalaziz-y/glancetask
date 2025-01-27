const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "f64fc4a3cfa7ca32e810f5a2c06b9de8",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
