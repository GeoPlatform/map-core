const MAPBOX_STYLE = {
    "version": 8,
    "name": "Mapbox Streets tileset v8",
    "sources": {
        "wetlands": {
            "type": "vector",
            "url": "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
        }
    },
    "layers": [

        {
            "id": "nps_boundary",
            "desc": "NPS Boundaries",
            "type": "fill",
            "source": "nps_boundary",
            "source-layer": "nps_boundary",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color"        : "#c66c36",
                "fill-outline-color": "#9A5328",
                "fill-opacity"      : 0.6
            }
        },

        {
            "id": "nc_wetlands",
            "desc": "Wetlands",
            "type": "fill",
            "source": 'wetlands',
            "source-layer": "nc_wetlands",
            "hideFromLegend": true,
            "layout": {
              "visibility": "visible"
            },
            "paint": {
                "fill-color": [
                    "match",
                    ["get","WETLAND_TYPE"],
                    "Estuarine and Marine Deepwater","#097F8B",
                    "Estuarine and Marine Wetland","#73BAA7",
                    "Freshwater Emergent Wetland","#87C023",
                    "Freshwater Forested/Shrub Wetland","#108034",
                    "Freshwater Pond","#688FB6",
                    "Lake","#100673",
                    "Riverine","#048DB9",
                    "#AD816E"
                ]
            }
          },

          {
            "id": "va_wetlands",
            "desc": "Wetlands",
            "type": "fill",
            "source": 'wetlands',
            "source-layer": "va_wetlands",
            "layout": {
              "visibility": "visible"
            },
            "paint": {
                "fill-color": [
                    "match",
                    ["get","WETLAND_TYPE"],
                    "Estuarine and Marine Deepwater","#097F8B",
                    "Estuarine and Marine Wetland","#73BAA7",
                    "Freshwater Emergent Wetland","#87C023",
                    "Freshwater Forested/Shrub Wetland","#108034",
                    "Freshwater Pond","#688FB6",
                    "Lake","#100673",
                    "Riverine","#048DB9",
                    "#AD816E"
                ]
            }
        }
    ]
}
