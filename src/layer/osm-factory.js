
/**
 * @param {Object} layer - GeoPlatform Layer
 * @return {L.TileLayer}
 */
function OSMLayerFactory(layer) {

    if(!L || !L.TileLayer) throw new Error("Leaflet is not available");

    return new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
}

export default OSMLayerFactory;
