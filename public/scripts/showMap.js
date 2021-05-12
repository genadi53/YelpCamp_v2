
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuNG8iLCJhIjoiY2tvandoOWsxMDJtMjJzbnBoeG55Nno0NSJ9.pbt7fE2CfcngOirA4BfEmQ';
//mapboxgl.accessToken = token
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL light-v10
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )

// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
//     center: campground.geometry.coordinates, // starting position [lng, lat]
//     zoom: 10 // starting zoom
// });

// new mapboxgl.Marker()
//     .setLngLat(campground.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 })
//             .setHTML(
//                 `<h3>${campground.title}</h3><p>${campground.location}</p>`
//             )
//     )
//     .addTo(map)