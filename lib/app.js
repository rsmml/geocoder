import mapboxgl from 'mapbox-gl';
// TODO: Write your JS code in here
const accessToken = "pk.eyJ1Ijoicm9kcmlnb3NvbW1hY2FsIiwiYSI6ImNrYjgzcGdldTAwZ2wyc29iMHV0a2hnaWsifQ.CEKKGBQJJEHZxl-Bw1EsHg";

const searchForm = document.querySelector("#search-form");

const locationDefault = (data) => {
  mapboxgl.accessToken = `${accessToken}`;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: data,
    zoom: 12
  });
  new mapboxgl.Marker()
    .setLngLat(data)
    .addTo(map);
};

const geoLocation = (location) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
      locationDefault(data.features[0].center);
    });
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = document.querySelector("#search-location").value;
  return geoLocation(location);
});

// Default Location (Berlin)


locationDefault([13.38333, 52.51667]);
