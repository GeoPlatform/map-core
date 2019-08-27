const MAPBOX_STYLE = {
    "version": 8,
    "name": "Mapbox Streets tileset v8",
    "sources": {
        "wetlands": {
            "type": "vector",
            "url": "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
        },
        "mapbox-streets": {
            "type": "vector",
            "url": "mapbox://mapbox.mapbox-streets-v8"
        }
    },
    "layers": [

        {
            "id": "Estuarine and Marine Deepwater",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Estuarine and Marine Deepwater"],
            "paint": {
                "fill-color" : "#097F8B"
            }
        },
        {
            "id": "Estuarine and Marine Wetland",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Estuarine and Marine Wetland"],
            "paint": {
                "fill-color" : "#73BAA7"
            }
        },
        {
            "id": "Freshwater Emergent Wetland",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Freshwater Emergent Wetland"],
            "paint": {
                "fill-color" : "#87C023"
            }
        },
        {
            "id": "Freshwater Forested/Shrub Wetland",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Freshwater Forested/Shrub Wetland"],
            "paint": {
                "fill-color" : "#108034"
            }
        },
        {
            "id": "Freshwater Pond",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Freshwater Pond"],
            "paint": {
                "fill-color" : "#688FB6"
            }
        },
        {
            "id": "Lake",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Lake"],
            "paint": {
                "fill-color" : "#100673"
            }
        },
        {
            "id": "Riverine",
            "source": "wetlands",
            "source-layer": "va_wetlands",
            "filter": ['==', ['get', 'WETLAND_TYPE'], "Riverine"],
            "paint": {
                "fill-color" : "#048DB9"
            }
        },


        {
            "id": "admin",
            "source": "mapbox-streets",
            "source-layer": "admin",
            "type": "line",
            "paint": {
                "line-color": "#ffffff"
            }
        },
        {
            "id": "aeroway",
            "source": "mapbox-streets",
            "source-layer": "aeroway",
            "type": "line",
            "paint": {
                "line-color": "#ffffff"
            }
        },
        {
            "id": "airport_label",
            "source": "mapbox-streets",
            "source-layer": "airport_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "building",
            "source": "mapbox-streets",
            "source-layer": "building",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(66,100,251, 0.3)",
                "fill-outline-color": "rgba(66,100,251, 1)"
            }
        },
        {
            "id": "housenum_label",
            "source": "mapbox-streets",
            "source-layer": "housenum_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "landuse_overlay",
            "source": "mapbox-streets",
            "source-layer": "landuse_overlay",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(66,100,251, 0.3)",
                "fill-outline-color": "rgba(66,100,251, 1)"
            }
        },
        {
            "id": "landuse",
            "source": "mapbox-streets",
            "source-layer": "landuse",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(66,100,251, 0.3)",
                "fill-outline-color": "rgba(66,100,251, 1)"
            }
        },
        {
            "id": "motorway_junction",
            "source": "mapbox-streets",
            "source-layer": "motorway_junction",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "natural_label",
            "source": "mapbox-streets",
            "source-layer": "natural_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "place_label",
            "source": "mapbox-streets",
            "source-layer": "place_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "poi_label",
            "source": "mapbox-streets",
            "source-layer": "poi_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "road",
            "source": "mapbox-streets",
            "source-layer": "road",
            "type": "line",
            "paint": {
                "line-color": "#ffffff"
            }
        },
        {
            "id": "structure",
            "source": "mapbox-streets",
            "source-layer": "structure",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(66,100,251, 0.3)",
                "fill-outline-color": "rgba(66,100,251, 1)"
            }
        },
        {
            "id": "transit_stop_label",
            "source": "mapbox-streets",
            "source-layer": "transit_stop_label",
            "type": "circle",
            "paint": {
                "circle-radius": 3,
                "circle-color": "rgba(238,78,139, 0.4)",
                "circle-stroke-color": "rgba(238,78,139, 1)",
                "circle-stroke-width": 1
            }
        },
        {
            "id": "water",
            "source": "mapbox-streets",
            "source-layer": "water",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(66,100,251, 0.3)",
                "fill-outline-color": "rgba(66,100,251, 1)"
            }
        },
        {
            "id": "waterway",
            "source": "mapbox-streets",
            "source-layer": "waterway",
            "type": "line",
            "paint": {
                "line-color": "#ffffff"
            }
        }
    ]
}
