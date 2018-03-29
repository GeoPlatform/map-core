(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('q'), require('geoplatform.client'), require('jquery'), require('leaflet')) :
    typeof define === 'function' && define.amd ? define(['q', 'geoplatform.client', 'jquery', 'leaflet'], factory) :
    (global.GeoPlatformMapCore = factory(global.Q,global.GeoPlatformClient,global.jQuery,global.L$1));
}(this, (function (Q,GeoPlatformClient,jQuery,L$1) { 'use strict';

    Q = Q && Q.hasOwnProperty('default') ? Q['default'] : Q;
    var GeoPlatformClient__default = 'default' in GeoPlatformClient ? GeoPlatformClient['default'] : GeoPlatformClient;
    jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

    var loadingControl = !L || !L.Control ? null : L.Control.extend({
        options: {
            position: 'topleft',
            separate: false,
            zoomControl: null,
            spinjs: false,
            spin: {
              lines: 7,
              length: 3,
              width: 3,
              radius: 5,
              rotate: 13,
              top: "83%"
            }
        },

        initialize: function(options) {
            L.setOptions(this, options);
            this._dataLoaders = {};

            // Try to set the zoom control this control is attached to from the
            // options
            if (this.options.zoomControl !== null) {
                this.zoomControl = this.options.zoomControl;
            }
        },

        onAdd: function(map) {
            if (this.options.spinjs && (typeof Spinner !== 'function')) {
                return console.error("Leaflet.loading cannot load because you didn't load spin.js (http://fgnass.github.io/spin.js/), even though you set it in options.");
            }
            this._addLayerListeners(map);
            this._addMapListeners(map);

            // Try to set the zoom control this control is attached to from the map
            // the control is being added to
            if (!this.options.separate && !this.zoomControl) {
                if (map.zoomControl) {
                    this.zoomControl = map.zoomControl;
                } else if (map.zoomsliderControl) {
                    this.zoomControl = map.zoomsliderControl;
                }
            }

            // Create the loading indicator
            var classes = 'leaflet-control-loading';
            var container;
            if (this.zoomControl && !this.options.separate) {
                // If there is a zoom control, hook into the bottom of it
                container = this.zoomControl._container;
                // These classes are no longer used as of Leaflet 0.6
                classes += ' leaflet-bar-part-bottom leaflet-bar-part last';
            }
            else {
                // Otherwise, create a container for the indicator
                container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
            }
            this._indicator = L.DomUtil.create('a', classes, container);
            if (this.options.spinjs) {
              this._spinner = new Spinner(this.options.spin).spin();
              this._indicator.appendChild(this._spinner.el);
            }
            return container;
        },

        onRemove: function(map) {
            this._removeLayerListeners(map);
            this._removeMapListeners(map);
        },

        removeFrom: function (map) {
            if (this.zoomControl && !this.options.separate) {
                // Override Control.removeFrom() to avoid clobbering the entire
                // _container, which is the same as zoomControl's
                this._container.removeChild(this._indicator);
                this._map = null;
                this.onRemove(map);
                return this;
            }
            else {
                // If this control is separate from the zoomControl, call the
                // parent method so we don't leave behind an empty container
                return L.Control.prototype.removeFrom.call(this, map);
            }
        },

        addLoader: function(id) {
            this._dataLoaders[id] = true;
            this.updateIndicator();
        },

        removeLoader: function(id) {
            delete this._dataLoaders[id];
            this.updateIndicator();
        },

        updateIndicator: function() {
            if (this.isLoading()) {
                this._showIndicator();
            }
            else {
                this._hideIndicator();
            }
        },

        isLoading: function() {
            return this._countLoaders() > 0;
        },

        _countLoaders: function() {
            var size = 0, key;
            for (key in this._dataLoaders) {
                if (this._dataLoaders.hasOwnProperty(key)) size++;
            }
            return size;
        },

        _showIndicator: function() {
            // Show loading indicator
            L.DomUtil.addClass(this._indicator, 'is-loading');

            // If zoomControl exists, make the zoom-out button not last
            if (!this.options.separate) {
                if (this.zoomControl instanceof L.Control.Zoom) {
                    L.DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                }
                else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                    L.DomUtil.removeClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                }
            }
        },

        _hideIndicator: function() {
            // Hide loading indicator
            L.DomUtil.removeClass(this._indicator, 'is-loading');

            // If zoomControl exists, make the zoom-out button last
            if (!this.options.separate) {
                if (this.zoomControl instanceof L.Control.Zoom) {
                    L.DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                }
                else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                    L.DomUtil.addClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                }
            }
        },

        _handleLoading: function(e) {
            this.addLoader(this.getEventId(e));
        },

        _handleLoad: function(e) {
            this.removeLoader(this.getEventId(e));
        },

        getEventId: function(e) {
            if (e.id) {
                return e.id;
            }
            else if (e.layer) {
                return e.layer._leaflet_id;
            }
            return e.target._leaflet_id;
        },

        _layerAdd: function(e) {
            if (!e.layer || !e.layer.on) return;
            try {
                e.layer.on({
                    loading: this._handleLoading,
                    load: this._handleLoad
                }, this);
            }
            catch (exception) {
                console.warn('L.Control.Loading: Tried and failed to add ' +
                             ' event handlers to layer', e.layer);
                console.warn('L.Control.Loading: Full details', exception);
            }
        },

        _addLayerListeners: function(map) {
            // Add listeners for begin and end of load to any layers already on the
            // map
            map.eachLayer(function(layer) {
                if (!layer.on) return;
                layer.on({
                    loading: this._handleLoading,
                    load: this._handleLoad
                }, this);
            }, this);

            // When a layer is added to the map, add listeners for begin and end
            // of load
            map.on('layeradd', this._layerAdd, this);
        },

        _removeLayerListeners: function(map) {
            // Remove listeners for begin and end of load from all layers
            map.eachLayer(function(layer) {
                if (!layer.off) return;
                layer.off({
                    loading: this._handleLoading,
                    load: this._handleLoad
                }, this);
            }, this);

            // Remove layeradd listener from map
            map.off('layeradd', this._layerAdd, this);
        },

        _addMapListeners: function(map) {
            // Add listeners to the map for (custom) dataloading and dataload
            // events, eg, for AJAX calls that affect the map but will not be
            // reflected in the above layer events.
            map.on({
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad
            }, this);
        },

        _removeMapListeners: function(map) {
            map.off({
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad
            }, this);
        }
    });



    if(L) {
        if(L.Control) {
            L.Control.Loading = loadingControl;
            L.Control.loading = function(options) {
                return new L.Control.Loading(options);
            };
        }
        if(L.Map) {
            L.Map.addInitHook(function () {
                if (this.options.loadingControl) {
                    this.loadingControl = new loadingControl();
                    this.addControl(this.loadingControl);
                }
            });
        }
    }

    var measureControl = !L || !L.Control ? null : L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            var className = 'leaflet-control-zoom leaflet-bar leaflet-control',
                container = L.DomUtil.create('div', className);

            this._createButton('&#8674;', 'Measure', 'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom', container, this._toggleMeasure, this);

            return container;
        },

        _createButton: function (html, title, className, container, fn, context) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent
                .on(link, 'click', L.DomEvent.stopPropagation)
                .on(link, 'click', L.DomEvent.preventDefault)
                .on(link, 'click', fn, context)
                .on(link, 'dblclick', L.DomEvent.stopPropagation);

            return link;
        },

        _toggleMeasure: function () {
            this._measuring = !this._measuring;

            if(this._measuring) {
                L.DomUtil.addClass(this._container, 'leaflet-control-measure-on');
                this._startMeasuring();
            } else {
                L.DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
                this._stopMeasuring();
            }
        },

        _startMeasuring: function() {
            this._oldCursor = this._map._container.style.cursor;
            this._map._container.style.cursor = 'crosshair';

            this._doubleClickZoom = this._map.doubleClickZoom.enabled();
            this._map.doubleClickZoom.disable();

            L.DomEvent
                .on(this._map, 'mousemove', this._mouseMove, this)
                .on(this._map, 'click', this._mouseClick, this)
                .on(this._map, 'dblclick', this._finishPath, this)
                .on(document, 'keydown', this._onKeyDown, this);

            if(!this._layerPaint) {
                this._layerPaint = L.layerGroup().addTo(this._map);
            }

            if(!this._points) {
                this._points = [];
            }
        },

        _stopMeasuring: function() {
            this._map._container.style.cursor = this._oldCursor;

            L.DomEvent
                .off(document, 'keydown', this._onKeyDown, this)
                .off(this._map, 'mousemove', this._mouseMove, this)
                .off(this._map, 'click', this._mouseClick, this)
                .off(this._map, 'dblclick', this._mouseClick, this);

            if(this._doubleClickZoom) {
                this._map.doubleClickZoom.enable();
            }

            if(this._layerPaint) {
                this._layerPaint.clearLayers();
            }

            this._restartPath();
        },

        _mouseMove: function(e) {
            if(!e.latlng || !this._lastPoint) {
                return;
            }

            if(!this._layerPaintPathTemp) {
                this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], {
                    color: 'black',
                    weight: 1.5,
                    clickable: false,
                    dashArray: '6,3'
                }).addTo(this._layerPaint);
            } else {
                this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
            }

            if(this._tooltip) {
                if(!this._distance) {
                    this._distance = 0;
                }

                this._updateTooltipPosition(e.latlng);

                var distance = e.latlng.distanceTo(this._lastPoint);
                this._updateTooltipDistance(this._distance + distance, distance);
            }
        },

        _mouseClick: function(e) {
            // Skip if no coordinates
            if(!e.latlng) {
                return;
            }

            // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
            if(this._lastPoint && this._tooltip) {
                if(!this._distance) {
                    this._distance = 0;
                }

                this._updateTooltipPosition(e.latlng);

                var distance = e.latlng.distanceTo(this._lastPoint);
                this._updateTooltipDistance(this._distance + distance, distance);

                this._distance += distance;
            }
            this._createTooltip(e.latlng);


            // If this is already the second click, add the location to the fix path (create one first if we don't have one)
            if(this._lastPoint && !this._layerPaintPath) {
                this._layerPaintPath = L.polyline([this._lastPoint], {
                    color: 'black',
                    weight: 2,
                    clickable: false
                }).addTo(this._layerPaint);
            }

            if(this._layerPaintPath) {
                this._layerPaintPath.addLatLng(e.latlng);
            }

            // Upate the end marker to the current location
            if(this._lastCircle) {
                this._layerPaint.removeLayer(this._lastCircle);
            }

            this._lastCircle = new L.CircleMarker(e.latlng, {
                color: 'black',
                opacity: 1,
                weight: 1,
                fill: true,
                fillOpacity: 1,
                radius:2,
                clickable: this._lastCircle ? true : false
            }).addTo(this._layerPaint);

            this._lastCircle.on('click', function() { this._finishPath(); }, this);

            // Save current location as last location
            this._lastPoint = e.latlng;
        },

        _finishPath: function() {
            // Remove the last end marker as well as the last (moving tooltip)
            if(this._lastCircle) {
                this._layerPaint.removeLayer(this._lastCircle);
            }
            if(this._tooltip) {
                this._layerPaint.removeLayer(this._tooltip);
            }
            if(this._layerPaint && this._layerPaintPathTemp) {
                this._layerPaint.removeLayer(this._layerPaintPathTemp);
            }

            // Reset everything
            this._restartPath();
        },

        _restartPath: function() {
            this._distance = 0;
            this._tooltip = undefined;
            this._lastCircle = undefined;
            this._lastPoint = undefined;
            this._layerPaintPath = undefined;
            this._layerPaintPathTemp = undefined;
        },

        _createTooltip: function(position) {
            var icon = L.divIcon({
                className: 'leaflet-measure-tooltip',
                iconAnchor: [-5, -5]
            });
            this._tooltip = L.marker(position, {
                icon: icon,
                clickable: false
            }).addTo(this._layerPaint);
        },

        _updateTooltipPosition: function(position) {
            this._tooltip.setLatLng(position);
        },

        _updateTooltipDistance: function(total, difference) {
            var totalRound = this._round(total),
                differenceRound = this._round(difference);

            var text = '<div class="leaflet-measure-tooltip-total">' + totalRound + ' nm</div>';
            if(differenceRound > 0 && totalRound != differenceRound) {
                text += '<div class="leaflet-measure-tooltip-difference">(+' + differenceRound + ' nm)</div>';
            }

            this._tooltip._icon.innerHTML = text;
        },

        _round: function(val) {
            return Math.round((val / 1852) * 10) / 10;
        },

        _onKeyDown: function (e) {
            if(e.keyCode == 27) {
                // If not in path exit measuring mode, else just finish path
                if(!this._lastPoint) {
                    this._toggleMeasure();
                } else {
                    this._finishPath();
                }
            }
        }
    });

    if(L) {
        if(L.Control) {
            L.Control.Measure = measureControl;
            L.control.measure = function (options) {
                return new L.Control.Measure(options);
            };
        }
        if(L.Map) {

            L.Map.mergeOptions({
                measureControl: false
            });

            L.Map.addInitHook(function () {
                if (this.options.measureControl) {
                    this.measureControl = new measureControl();
                    this.addControl(this.measureControl);
                }
            });
        }
    }

    var positionControl = !L || !L.Control ? null : L.Control.extend({
      options: {
        position: 'bottomleft',
        separator: ' : ',
        emptyString: 'Unavailable',
        lngFirst: false,
        numDigits: 6,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
      },

      onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML=this.options.emptyString;
        return this._container;
      },

      onRemove: function (map) {
        map.off('mousemove', this._onMouseMove);
      },

      _onMouseMove: function (e) {
        var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
      }

    });


    if(L) {
        if(L.Control) {
            L.Control.MousePosition =  positionControl;
            L.control.mousePosition = function (options) {
                return new L.Control.MousePosition(options);
            };
        }
        if(L.Map) {
            L.Map.mergeOptions({
                positionControl: false
            });

            L.Map.addInitHook(function () {
                if (this.options.positionControl) {
                    this.positionControl = new positionControl();
                    this.addControl(this.positionControl);
                }
            });
        }
    }

    const QueryFactory = GeoPlatformClient__default.QueryFactory;
    const LayerService = GeoPlatformClient__default.LayerService;
    const HttpClient = GeoPlatformClient__default.JQueryHttpClient;
    const Config = GeoPlatformClient__default.Config;

    /**
     * @param {LayerService} layerService - optional, GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    var OSM = {

        /**
         * @param {Object} layer - GeoPlatform Layer object
         * @return {boolean} true if is an OSM layer
         */
        test : function(layer) {
            return  layer &&
                    layer.resourceTypes &&
                    layer.resourceTypes.length &&
                    ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        },

        get : function(layerService) {
            let query = QueryFactory()
                .fields('*')
                .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
            if(!layerService)
                layerService = new LayerService(Config.ualUrl, new HttpClient());
            return layerService.search(query)
            .then( response => response.results.length ? response.results[0] : null)
            .catch( e => Q.reject(e));
        }

    };

    const url = GeoPlatformClient__default.Config.ualUrl;
    const baseLayerId = GeoPlatformClient__default.Config.defaultBaseLayerId;
    const LayerService$1 = GeoPlatformClient__default.LayerService;
    const HttpClient$1 = GeoPlatformClient__default.JQueryHttpClient;

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @param {LayerService} layerService - GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving GeoPlatform Layer object
     */
    function DefaultBaseLayer(layerService) {
        if(!GeoPlatformClient__default.Config.defaultBaseLayerId)
            return OSM.get();

        if(!layerService)
            layerService = new LayerService$1(url, new HttpClient$1());
        return layerService.get(baseLayerId)
        .catch(e => Q.resolve( OSM.get() ));
    }

    const ItemService = GeoPlatformClient__default.ItemService;
    const HttpClient$2 = GeoPlatformClient__default.JQueryHttpClient;
    const QueryFactory$1 = GeoPlatformClient__default.QueryFactory;
    const Config$1 = GeoPlatformClient__default.Config;


    const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
    const esriExpr = /Esri REST ([A-Za-z]+) Service/;
    const keyFn = (expr, str) => {
        let m = expr.exec(str);
        return (m && m.length) ? m[1] : null;
    };

    var types = {
        //will be populated by function
        //...
        //...
        //...
        refresh: updateList //method to allow refreshing list later
    };

    function updateList() {
        
        let url = Config$1.ualUrl;
        if(!url) {
            console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
        } else {

            let query = QueryFactory$1()
                .types('dct:Standard')
                .resourceTypes('ServiceType')
                .pageSize(50);

            new ItemService(url, new HttpClient$2()).search(query)
            .then( data => {

                for(let i=0; i<data.results.length; ++i) {

                    let type = data.results[i],
                        key = null,
                        label = type.label;

                    if(~label.indexOf("WMS-T")) {
                        key = 'WMST';
                        type.supported = true;

                    } else if(~label.indexOf('OGC')) {
                        key = keyFn(ogcExpr, label);
                        type.supported = 'WMS' === key || 'WMTS' === key;

                    } else if(~label.indexOf('Esri')) {
                        key = keyFn(esriExpr, label);
                        type.supported = true;
                        key = 'ESRI_' + key.toUpperCase() + '_SERVER';

                    } else if(~label.indexOf("Feed")) {
                        key = "FEED";
                        type.supported = true;

                    } else {
                        key = label;

                    }

                    types[key] = type;
                }
                // console.log(types);
            })
            .catch( error => {
                console.log("Error loading supported service types: " + error.message);
            });
        }
    }

    function featurePopupTemplate$1(feature) {

        let props = Object.keys(feature.properties);

        const pFn = function(list, names) {
            if(!list || !list.find) return null;
            let match = list.find( name => {
                let lc = name.toLowerCase();
                return names.indexOf(lc)>=0;
            });
            return match;
        };

        let titleProp = pFn(props, ['title','name','label']);
        let title = titleProp ? feature.properties[titleProp] : "Untitled";

        let descProp = pFn(props, ['description', 'summary', 'descript']);
        let description = descProp ? feature.properties[descProp] : "No description provided";

        let result = '<div class="feature-popup">' +
            '<h5>' + title + '</h5>' +
            '<p>' + description + '</p>';

        if(feature.properties.modified) {
            let modified = new Date(feature.properties.modified);
            result += '<div><span class="label">Updated</span><span class="value">' +
                modified.toDateString() + '</span></div>';
        }

        if(feature.properties['cap:effective']) {
            let date = new Date(feature.properties['cap:effective']);
            result += '<div>' +
                '<span class="label">Effective</span>' +
                '<span class="value">' +
                date.toDateString() + ' ' + date.toTimeString() +
                '</span>' +
                '</div>';
        }
        if(feature.properties['cap:expires']) {
            let date = new Date(feature.properties['cap:expires']);
            result += '<div>' +
                '<span class="label">Expires</span>' +
                '<span class="value">' +
                date.toDateString() + ' ' + date.toTimeString() +
                '</span>' +
                '</div>';
        }

        let linkProp = pFn(props, ['landingpage','link','website']);
        if(linkProp) {
            result += '<br>';
            result += '<a href="' + feature.properties[linkProp] + '" target="_blank">link</a>';
        }

        result += '<hr>';

        for(let prop in feature.properties) {
            if(titleProp === prop || descProp === prop ||
                linkProp === prop || 'modified' === prop)
                continue;
            let value = feature.properties[prop];
            if(typeof(value) === 'object') {
                for(let p in value) {
                    result += '<div>' +
                        '<span class="label">' + prop + '.' + p + '</span>' +
                        '<span class="value">' + value[p] + '</span>' +
                        '</div>';
                }
            } else {
                result += '<div>' +
                    '<span class="label">' + prop + '</span>' +
                    '<span class="value">' + value + '</span>' +
                    '</div>';
            }
        }
        result += '</div>';
        return result;
    }

    /**
     * Feature Layer
     * Provides custom style loading and point-ilization as well
     * as adding visibility and opacity manipulation methods
     * @extends L.esri.FeatureLayer
     */
    var FeatureLayer = !L || !L.esri ? null : L.esri.FeatureLayer.extend({

        _gpStyle : { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

        /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
        pointToLayerFn: function (feature, latlng) {

            // console.log("Feature: " + feature.id);

            var style = feature && feature.properties ? feature.properties.style : null;
            if(!style && typeof this.options.style === 'function') {
                // console.log("Using local style function");
                try {
                    style = this.options.style(feature);
                } catch(e) {
                    console.log("error using style function in ClusteredFeatureLayer: " + e.message);
                }
            }

            style = style || this.options.style || {};

            let marker = null;
            if(style.shape === 'image') {
                let width = style.width || 16;
                let height = style.height || 16;
                var icon = L.icon( {
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width*0.5, height*0.5],
                    popupAnchor: [0, -11],
                });
                marker = L.marker( latlng, {
                    icon: icon,
                    pane: GeoPlatformClient.Config.leafletPane
                });

            } else {
                style.radius = style.radius || style['stroke-width'] || 4;
                style.weight = style.weight || style['stroke-width'] || 2;
                style.color = style.color || style.stroke || '#03f';
                style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                style.fillColor = style.color || style.fill;
                style.renderer = this.options.renderer;  //important for pane!
                marker = L.circleMarker(latlng, style);
            }

            let popupTemplate = this.options.popupTemplate || featurePopupTemplate$1;
            marker.bindPopup(popupTemplate(feature));
            return marker;
        },

        /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
        eachFeatureFn: function(feature, layer) {
            if(!feature || !feature.geometry || feature.geometry.type === 'Point') {
                return;
            }
            layer.bindPopup(featurePopupTemplate$1(feature));
        },



        initialize: function (options) {
            options = options || {};

            if(GeoPlatformClient.Config.leafletPane)
                options.pane = GeoPlatformClient.Config.leafletPane;

            let getGPStyle = () => { return this._gpStyle; };
            options.style = options.style || getGPStyle();

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            let svgOpts = {};
            if(GeoPlatformClient.Config.leafletPane)
                svgOpts.pane = GeoPlatformClient.Config.leafletPane;
            var renderer = (L.SVG && L.svg(svgOpts)) || (L.Canvas && L.canvas());
            options.renderer = renderer;

            options.pointToLayer = L.bind(this.pointToLayerFn, this);
            options.onEachFeature = L.bind(this.eachFeatureFn, this);

            // options.fields = ['FID', 'type', 'title', 'geometry'];

            L.esri.FeatureLayer.prototype.initialize.call(this, options);

            this.on('load', function() {
                if(typeof this.options.zIndex !== 'undefined')
                    this.setZIndex(this.options.zIndex);
            });

        },

        setZIndex : function (index) {
            this.options.zIndex = index;
            for(var id in this._layers)
                this._layers[id].setZIndex(index);
        },

        toggleVisibility: function() {
            for(var id in this._layers) {
                let layer = this._layers[id];
                if(layer.toggleVisibility)
                    this._layers[id].toggleVisibility();
            }
        },

        setOpacity: function(opacity) {
            for(var id in this._layers) {
                let layer = this._layers[id];
                if(layer.setOpacity)
                    layer.setOpacity(opacity);
            }
        },

        loadStyle: function(gpLayerId) {

            if(this.options.styleLoader) {
                this.options.styleLoader(gpLayerId)
                .then( json => {

                    if(!json) return;

                    let style = null;

                    if(json && json.styles) {

                        let styleFn = L.Util.bind(function(feature) {

                            let property = this.property || this.field1;
                            let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                            let style = null;
                            if(this.styles) {
                                let wrapper = this.styles.find( sw => sw.value === v );
                                if(wrapper) {
                                    style = wrapper.style;
                                    style.radius = style.radius || style['stroke-width'] || 4;
                                    style.weight = style.weight || style['stroke-width'] || 2;
                                    style.color = style.color   || style.stroke || '#03f';
                                    style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                                    style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                                    style.fillColor = style.color || style.fill;
                                }
                            }
                            // console.log("Using style: " + JSON.stringify(style));
                            return style;
                        }, json);
                        this.options.style = styleFn;
                        this.setStyle(styleFn);
                        return;

                    } else if(json && typeof(json.push) !== 'undefined') {
                        //multiple styles returned
                        style = json[0];  //use first for now

                    } else if(json) {
                        style = json;

                    } else {
                        return; //unrecognizable style
                    }

                    if(style.shape) {
                        var obj = jQuery.extend({}, style);
                        obj.style = style;
                        this._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for(let id in this._layers)
                            this._layers[id].setStyle(obj);

                    }
                })
                .catch( e => {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }

    });

    var FeatureLayer$1 = !L || !L.esri || !L.esri.Cluster ? null : 
        L.esri.Cluster.FeatureManager.extend({

      statics: {
        EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
        CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
      },

      /**
       * Constructor
       */

      initialize: function (options) {
        esriLeaflet.FeatureManager.prototype.initialize.call(this, options);

        options = L.setOptions(this, options);

        this._layers = {};
        this._leafletIds = {};

        this.cluster = L.markerClusterGroup(options);
        this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');

        this.cluster.addEventParent(this);
      },

      /**
       * Layer Interface
       */

      onAdd: function (map) {
        esriLeaflet.FeatureManager.prototype.onAdd.call(this, map);
        this._map.addLayer(this.cluster);

        // NOTE !!!!!!!
        // Using this type of layer requires map.maxZoom to be set during map creation!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      },

      onRemove: function (map) {
        esriLeaflet.FeatureManager.prototype.onRemove.call(this, map);
        this._map.removeLayer(this.cluster);
      },

      /**
       * Feature Management Methods
       */

      createLayers: function (features) {
        var markers = [];

        for (var i = features.length - 1; i >= 0; i--) {
          var geojson = features[i];
          var layer = this._layers[geojson.id];

          if (!layer) {
            var newLayer = L.GeoJSON.geometryToLayer(geojson, this.options);
            newLayer.feature = L.GeoJSON.asFeature(geojson);
            newLayer.defaultOptions = newLayer.options;
            newLayer._leaflet_id = this._key + '_' + geojson.id;

            this.resetStyle(newLayer.feature.id);

            // cache the layer
            this._layers[newLayer.feature.id] = newLayer;

            this._leafletIds[newLayer._leaflet_id] = geojson.id;

            if (this.options.onEachFeature) {
              this.options.onEachFeature(newLayer.feature, newLayer);
            }

            this.fire('createfeature', {
              feature: newLayer.feature
            });

            // add the layer if it is within the time bounds or our layer is not time enabled
            if (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson))) {
              markers.push(newLayer);
            }
          }
        }

        if (markers.length) {
          this.cluster.addLayers(markers);
        }
      },

      addLayers: function (ids) {
        var layersToAdd = [];
        for (var i = ids.length - 1; i >= 0; i--) {
          var layer = this._layers[ids[i]];
          this.fire('addfeature', {
            feature: layer.feature
          });
          layersToAdd.push(layer);
        }
        this.cluster.addLayers(layersToAdd);
      },

      removeLayers: function (ids, permanent) {
        var layersToRemove = [];
        for (var i = ids.length - 1; i >= 0; i--) {
          var id = ids[i];
          var layer = this._layers[id];
          this.fire('removefeature', {
            feature: layer.feature,
            permanent: permanent
          });
          layersToRemove.push(layer);
          if (this._layers[id] && permanent) {
            delete this._layers[id];
          }
        }
        this.cluster.removeLayers(layersToRemove);
      },

      /**
       * Styling Methods
       */

      resetStyle: function (id) {
        var layer = this._layers[id];

        if (layer) {
          layer.options = layer.defaultOptions;
          this.setFeatureStyle(layer.feature.id, this.options.style);
        }

        return this;
      },

      setStyle: function (style) {
        this.eachFeature(function (layer) {
          this.setFeatureStyle(layer.feature.id, style);
        }, this);
        return this;
      },

      setFeatureStyle: function (id, style) {
        var layer = this._layers[id];

        if (typeof style === 'function') {
          style = style(layer.feature);
        }
        if (layer.setStyle) {
          layer.setStyle(style);
        }
      },

      /**
       * Utility Methods
       */

      eachFeature: function (fn, context) {
        for (var i in this._layers) {
          fn.call(context, this._layers[i]);
        }
        return this;
      },

      getFeature: function (id) {
        return this._layers[id];
      }
    });

    function featureLayer (options) {
      return new FeatureLayer$1(options);
    }

    /**
     * Fetches style information from GeoPlatform UAL
     * @param {string} id - identifier of layer to resolve style for
     */
    function featureStyleResolver(id) {
        let deferred = Q.defer();
        jQuery.ajax({
           url: GeoPlatformClient.Config.ualUrl + '/api/layers/' + id + '/style',
           dataType: 'json',
           success: function(data) {
               deferred.resolve(data);
           },
           error: function(xhr, status, message) {
               let em = `FeatureStyleResolver() -
               Error loading style information for layer ${id} : ${message}`;
               let error = new Error(em);
               deferred.reject(error);
           }
        });
        return deferred.promise;
    }

    /**
     * Clustered Feature Layer
     * Provides custom style loading and point-ilization as well
     * as adding visibility and opacity manipulation methods
     * @extends L.esri.ClusterFeatureLayer
     */
    var ClusteredFeatureLayer = !L || !FeatureLayer$1 ? null :
    FeatureLayer$1.extend({

        _gpStyle : { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

        /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
        pointToLayerFn: function (feature, latlng) {

            var style = feature && feature.properties ? feature.properties.style : null;
            if(!style && typeof this.options.style === 'function') {
                // console.log("Using local style function");
                try {
                    style = this.options.style(feature);
                } catch(e) {
                    console.log("error using style function in ClusteredFeatureLayer: " + e.message);
                }
            }

            style = style || this.options.style || {};
            style.radius      = style['stroke-width'] || style.radius || 4;
            style.weight      = style['stroke-width'] || style.weight || 2;
            style.color       = style.stroke || style.color || '#03f';
            style.opacity     = style['stroke-opacity'] || style.opacity || 0.9;
            style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
            style.fillColor   = style.fill || style.color || '#03f';
            style.renderer    = this.options.renderer;  //important for pane!

            let marker = null;
            if(style.shape === 'image') {
                let width = style.width || 16;
                let height = style.height || 16;
                var icon = L.icon( {
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width*0.5, height*0.5],
                    popupAnchor: [0, -11],
                });
                marker = L.marker( latlng, {
                    icon: icon,
                    pane: GeoPlatformClient.Config.leafletPane
                });
            } else {
                marker = L.circleMarker(latlng, style);
            }

            let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
            marker.bindPopup(popupTemplate(feature));

            return marker;
        },

        /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
        eachFeatureFn: function(feature, layer) {
            if(!feature || !feature.geometry || feature.geometry.type === 'Point') {
                return;
            }
            layer.bindPopup(featurePopupTemplate(feature));
        },



        initialize: function (options) {

            options = options || {};

            if(GeoPlatformClient.Config.leafletPane)
                options.pane = GeoPlatformClient.Config.leafletPane;

            options.pointToLayer = L.bind(this.pointToLayerFn, this);
            options.onEachFeature = L.bind(this.eachFeatureFn, this);
            // options.fields = ['FID', 'type', 'title', 'geometry'];

            //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
            // This needs to be increased to ensure all markers can be clicked
            // when spiderfied (some get stuck under the spider legs)
            options.spiderfyDistanceMultiplier = 2;

            let getGPStyle = () => { return this._gpStyle; };
            options.style = options.style || getGPStyle;
            if(options.styleResolver) {
                this.styleResolver = options.styleResolver;
            }

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            let svgOpts = {};
            if(GeoPlatformClient.Config.leafletPane)
                svgOpts.pane = GeoPlatformClient.Config.leafletPane;
            var renderer = (L.SVG && L.svg(svgOpts)) || (L.Canvas && L.canvas());
            options.renderer = renderer;

            L.esri.Cluster.FeatureLayer.prototype.initialize.call(this, options);

            this.on('load', function() {
                if(typeof this.options.zIndex !== 'undefined')
                    this.setZIndex(this.options.zIndex);
            });

        },

        onAdd: function(map) {
            L.esri.Cluster.FeatureLayer.prototype.onAdd.call(this, map);

            if(this.options.layerId) {
                this.loadStyle(this.options.layerId);
            }
        },

        setZIndex : function (index) {
            this.options.zIndex = index;
            for(var id in this._layers)
                this._layers[id].setZIndex(index);
        },

        toggleVisibility: function() {

            //clustered features
            if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for(let id in this.cluster._featureGroup._layers) {
                    let layer = this.cluster._featureGroup._layers[id];
                    if(layer._icon) {
                        jQuery(layer._icon).toggleClass('invisible');
                    }
                }
            }

            //non-clustered features
            if(this._layers) {
                for(let id in this._layers)
                    this._layers[id].toggleVisibility();
            }
        },

        setVisibility: function(bool) {

            //clustered features
            if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for(let id in this.cluster._featureGroup._layers) {
                    let layer = this.cluster._featureGroup._layers[id];
                    if(layer._icon) {
                        //probably is a more efficient way to do this,
                        // but this works currently.
                        // TODO look at using
                        //  markerCluster.refreshIconOptions({className:'invisible'});
                        var icon = jQuery(layer._icon);
                        if(bool) icon.removeClass('invisible');
                        else icon.addClass('invisible');
                    }
                }
            }

            //non-clustered features
            if(this._layers) {
                for(let id in this._layers) {
                    let layer = this._layers[id];
                    if(layer.setVisibility)
                        layer.setVisibility(bool);
                    else if(layer.setStyle)
                        layer.setStyle({display: bool ? '':'none'});
                }
            }
        },

        setOpacity: function(opacity) {

            //clustered features
            if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for(let id in this.cluster._featureGroup._layers) {
                    let layer = this.cluster._featureGroup._layers[id];
                    if(layer._icon) {
                        jQuery(layer._icon).css({opacity: opacity});
                    }
                }
            }

            //non-clustered features
            if(this._layers) {
                for(let id in this._layers) {
                    let layer = this._layers[id];
                    if(layer.setOpacity)
                        layer.setOpacity(opacity);
                }
            }
        },

        setStyle: function(style) {
            this.eachFeature(function (layer) {
                this.setFeatureStyle(layer.feature.id, style);
            }, this);
        },

        loadStyle: function(gpLayerId) {

            if(this.options.styleLoader) {
                this.options.styleLoader(gpLayerId)
                .then( json => {

                    if(!json) return;

                    let style = null;

                    if(json && json.styles) {

                        let styleFn = L.Util.bind(function(feature) {

                            let property = this.property || this.field1;
                            let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                            let style = null;
                            if(this.styles) {
                                let wrapper = this.styles.find( sw => sw.value === v );
                                if(wrapper) {
                                    style = wrapper.style;
                                    style.radius = style['stroke-width'] || style.radius || 4;
                                    style.weight = style['stroke-width'] || style.weight || 2;
                                    style.color = style.stroke || style.color || '#03f';
                                    style.opacity = style['stroke-opacity'] || style.opacity || 0.9;
                                    style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
                                    style.fillColor = style.fill || style.color || '#03f';
                                } else {
                                    console.log("No matching style for " + JSON.stringify(feature.properties));
                                }
                            }
                            // console.log("Using style: " + JSON.stringify(style));
                            return style;
                        }, json);
                        this.options.style = styleFn;
                        setTimeout( (layer, style) => { layer.setStyle(style); }, 1000, this, styleFn);
                        return;

                    } else if(json && typeof(json.push) !== 'undefined') {
                        //multiple styles returned
                        style = json[0];  //use first for now

                    } else if(json) {
                        style = json;

                    } else {
                        return; //unrecognizable style
                    }

                    if(style.shape) {
                        var obj = jQuery.extend({}, style);
                        obj.style = style;
                        this._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for(let id in this._layers)
                            this._layers[id].setStyle(obj);

                    }
                })
                .catch( e => {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }
    });



    function clusteredFeatures(layer) {

        let service = layer.services && layer.services.length ?
            layer.services[0] : null;
        if(!service) {
            let msg = `clusteredFeatures() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
            throw new Error(msg);
        }

        let url     = service.href,
            format  = layer.supportedFormats ? layer.supportedFormats[0] : null;

        return new ClusteredFeatureLayer({
            url: url + '/' + layer.layerName,
            styleLoader: featureStyleResolver,
            layerId: layer.id,
            pane: GeoPlatformClient.Config.leafletPane
        });
    }


    function geoJsonFeed(layer) {

        let service = layer.services && layer.services.length ?
            layer.services[0] : null;
        if(!service) {
            let msg = `geoJsonFeed() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
            throw new Error(msg);
        }

        let url     = service.href,
            format  = layer.supportedFormats ? layer.supportedFormats[0] : null;

        let layerUrl = url + (url[url.length-1]==='/'?'':'/') +
            layer.id + '/FeatureServer/' + layer.layerName;

        let styleUrl = url.replace('feeds','styles') +
            (url[url.length-1]==='/'?'':'/') + layer.id;

        let styleLoaderFactory = function(url) {
            return function (layerId) {
                let deferred = Q.defer();
                jQuery.ajax(url, {
                    dataType:'json',
                    success: function(data) {
                        deferred.resolve(data);
                    },
                    error: function(xhr, status, message) {
                        let em = `geoJsonFeed() -
                        Error loading style information for layer ${layerId} : ${message}`;
                        let error = new Error(em);
                        deferred.reject(error);
                    }
                });
                return deferred.promise;          //uses jQuery promise
            };
        };

        return new ClusteredFeatureLayer({
            url: layerUrl,
            isModern: true,         //force to use GeoJSON
            layerId: layer.id,    //used by style loader
            styleLoader: styleLoaderFactory(styleUrl),
            pane: GeoPlatformClient.Config.leafletPane
        });

    }

    var WMS = !L || !L.TileLayer ? null : L.TileLayer.WMS.extend({

        enableGetFeatureInfo: function () {
            this._map.on('click', this.getFeatureInfo, this);
            this._enabled = true;
        },

        disableGetFeatureInfo: function() {
            this._map.off('click', this.getFeatureInfo, this);
            this._enabled = false;
        },

        isGetFeatureInfoEnabled: function() {
            return this._enabled;
        },

        onRemove: function (map) {

            //if GFI is enabled, disable it before removing
            if(this.isGetFeatureInfoEnabled())
            this.disableGetFeatureInfo();

            // Triggered when the layer is removed from a map.
            //   Unregister a click listener, then do all the upstream WMS things
            L.TileLayer.WMS.prototype.onRemove.call(this, map);
        },

        getFeatureInfo: function (evt) {
            // Make an AJAX request to the server and hope for the best
            var url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this),
            parseGetFeatureInfo = this.parseGetFeatureInfo;
            jQuery.ajax({
                url: url,
                success: function (data, status, xhr) {
                    // var err = typeof data === 'string' ? null : data;
                    if(typeof(data) !== 'string')
                    data = parseGetFeatureInfo(data);
                    showResults(null, evt.latlng, data);
                },
                error: function (xhr, status, error) {
                    showResults(error);
                }
            });
        },

        getFeatureInfoUrl: function (latlng) {
            // Construct a GetFeatureInfo request URL given a point
            var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
            size = this._map.getSize(),

            params = {
                srs: 'EPSG:4326',
                bbox: this._map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                // layers: this.wmsParams.layers,
                // query_layers: this.wmsParams.layers,
                info_format: 'text/xml',
                x: point.x,
                y: point.y,
                i: point.x, //1.3.0
                j: point.y  //1.3.0
            };

            // return this._url + L.Util.getParamString(params, this._url, true);
            var url = '/api/layers/' + this.wmsParams.wmvId + '/feature';
            return GeoPlatformClient.Config.ualUrl + url + L.Util.getParamString(params, url, true);
        },

        parseGetFeatureInfo: function(content) {
            var fields = [];
            for(var field in content) {
                fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
            }
            if(fields.length == 0)
            fields.push('<em>No data available</em>');
            return '<div>' + fields.join(' ') + '</div>';
        },

        showGetFeatureInfo: function (err, latlng, content) {
            if (err) { console.log(err); return; } // do nothing if there's an error

            // Otherwise show the content in a popup, or something.
            L.popup({ maxWidth: 800})
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
        }

    });


    function wms(layer) {

        let service = layer.services && layer.services.length ?
            layer.services[0] : null;
        if(!service) {
            let msg = `wms() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
            throw new Error(msg);
        }

        let url = service.href;
        let format  = layer.supportedFormats ? layer.supportedFormats[0] : "image/png";

        let opts = {
            layers: layer.layerName,
            transparent: true,
            format: format,
            wmvId: layer.id
        };
        if(GeoPlatformClient.Config.leafletPane)
            opts.pane = GeoPlatformClient.Config.leafletPane;

        return new WMS(url, opts);

    }

    if(L) {
        L.TileLayer.WMS = WMS;
        L.tileLayer.wms = wms;
    }

    var WMST = !L || !L.TimeDimension ? null : L.TimeDimension.Layer.WMS.extend({

        //override default parser to query all Layers (whether queryable or not)
        _parseTimeDimensionFromCapabilities: function(xml) {
            var layers = xml.querySelectorAll('Layer');
            var layerName = this._baseLayer.wmsParams.layers;
            var layer = null;
            var times = null;

            layers.forEach(function(current) {
                if (current.querySelector("Name").innerHTML === layerName) {
                    layer = current;
                }
            });
            if (layer) {
                times = this._getTimesFromLayerCapabilities(layer);
                if (!times) {
                    times = this._getTimesFromLayerCapabilities(layer.parentNode);
                }
            }

            return times;
        },

        //override default parser to fall back if Dimension is provided but has no values
        _getTimesFromLayerCapabilities: function(layer) {
            var times = null;
            var dimensions = layer.querySelectorAll("Dimension[name='time']");
            if (dimensions && dimensions.length && dimensions[0].textContent.length) {
                times = dimensions[0].textContent.trim();
            }
            if(!times || !times.length) {
                var extents = layer.querySelectorAll("Extent[name='time']");
                if (extents && extents.length && extents[0].textContent.length) {
                    times = extents[0].textContent.trim();
                }
            }
            if(times && ~times.indexOf("current")) {
                times = times.replace('current', new Date().toISOString());
            }
            return times;
        }

    });




    function wmst(gpLayer) {

        let service = gpLayer.services[0];
        let url = service.href;

        let opts = {
            layers: gpLayer.layerName,
            transparent: true,
            format: "image/png",
            wmvId: gpLayer.layerId
        };
        if(GeoPlatformClient.Config.leafletPane)
            opts.pane = GeoPlatformClient.Config.leafletPane;

        let leafletLayer = new L.TileLayer.CustomWMS( url, opts );

        let proxyUrl = GeoPlatformClient.Config.ualUrl + '/api/services/' +
            service.id + '/proxy/capabilities';

        let tdOpts = {};

        if(gpLayer.temporal) {

            let d1 = gpLayer.temporal.startDate ?
                new Date(gpLayer.temporal.startDate) : new Date();
            let d2 = gpLayer.temporal.endDate ?
                new Date(gpLayer.temporal.endDate) : new Date();

            tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
        }

        return new WMST(leafletLayer, {
            timeDimension: L.timeDimension(tdOpts),
            proxy: proxyUrl
        });
    }


    if(L) {
        L.TileLayer.WMST = WMST;
        L.tileLayer.wmst = wmst;
    }

    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }


    const paramRe = /\{ *([\w_-]+) *\}/g;

    // @function template(str: String, data: Object): String
    // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
    // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
    // `('Hello foo, bar')`. You can also specify functions instead of strings for
    // data values — they will be evaluated passing `data` as an argument.
    function template(str, data) {
    	return str.replace(paramRe, function (str, key) {
    		var value = data[key];
            if (value === undefined) {
                value = data[key.toLowerCase()];
            }
            if (value === undefined) {
            	throw new Error('No value provided for variable ' + str);
    		} else if (typeof value === 'function') {
    			value = value(data);
    		}
    		return value;
    	});
    }


    /*
     * inspired by and uses code from https://github.com/mylen/leaflet.TileLayer.WMTS
     */
    var WMTS = !L || !L.TileLayer ? null : L.TileLayer.extend({

        defaultWmtsParams: {

            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            layers: '',
            styles: '',
            tileMatrixSet: '',
            format: 'image/png'
        },

        initialize: function (url, options) { // (String, Object)
            this._url = url;
            var wmtsParams = L.extend({}, this.defaultWmtsParams);
            var tileSize = options.tileSize || this.options.tileSize;
            if (options.detectRetina && L.Browser.retina) {
                wmtsParams.width = wmtsParams.height = tileSize * 2;
            } else {
                wmtsParams.width = wmtsParams.height = tileSize;
            }
            for (var i in options) {
                // all keys that are not TileLayer options go to WMTS params
                if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                    wmtsParams[i] = options[i];
                }
            }
            this.wmtsParams = wmtsParams;
            this.matrixIds = options.matrixIds||this.getDefaultMatrix();
            L.setOptions(this, options);
        },

        onAdd: function (map) {
            this._crs = this.options.crs || map.options.crs;
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (coords) { // (Point, Number) -> String
            var tileSize = this.options.tileSize;
            var nwPoint = coords.multiplyBy(tileSize);
            nwPoint.x+=1;
            nwPoint.y-=1;
            var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
            var zoom = this._tileZoom;
            var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
            var se = this._crs.project(this._map.unproject(sePoint, zoom));
            var tilewidth = se.x-nw.x;
            //zoom = this._map.getZoom();
            var ident = this.matrixIds[zoom].identifier;
            var tileMatrix = this.wmtsParams.tileMatrixSet + ":" + ident;
            var X0 = this.matrixIds[zoom].topLeftCorner.lng;
            var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
            var tilecol=Math.floor((nw.x-X0)/tilewidth);
            var tilerow=-Math.floor((nw.y-Y0)/tilewidth);


            let url = this._url;
            let isTileMatrixTemplated = url.indexOf('{TileMatrix}');
            let isTileRowTemplated = url.indexOf('{TileRow}');
            let isTileColTemplated = url.indexOf('{TileCol}');

            let o = Object.assign({ s: this._getSubdomain(coords) }, this.wmtsParams);
            if(isTileMatrixTemplated>0) o.TileMatrix = ident;
            if(isTileRowTemplated>0) o.TileRow = tilerow;
            if(isTileColTemplated>0) o.TileCol = tilecol;
            for(let k in o) {
                o[k.toLowerCase()] = o[k];
            }
            // url = L.Util.template(url.toLowerCase(), o);
            url = template(url, o);

            let qsi = url.indexOf("?");
            if(qsi<0 || (isTileMatrixTemplated<qsi && isTileRowTemplated<qsi || isTileColTemplated<qsi)) {
                //if the TM,TR,TC variables are templated but not as querystring parameters
                // (ie, no '?' present or those params are before the '?'),
                // then the URL must not be OGC WMTS, so no need for WMTS parameters

            } else {
                url = url + L.Util.getParamString(this.wmtsParams, url);
                if(isTileMatrixTemplated<0)
                    url += "&TileMatrix=" + ident; //tileMatrixSet
                if(isTileRowTemplated<0)
                    url += "&TileRow=" + tilerow;
                if(isTileColTemplated<0)
                    url += "&TileCol=" + tilecol;
            }

            return url;
        },

        setParams: function (params, noRedraw) {
            L.extend(this.wmtsParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        },

        getDefaultMatrix : function () {
            /**
             * the matrix3857 represents the projection
             * for in the IGN WMTS for the google coordinates.
             */
            var matrixIds3857 = new Array(22);
            for (var i= 0; i<22; i++) {
                matrixIds3857[i]= {
                    identifier    : "" + i,
                    topLeftCorner : new L.LatLng(20037508.3428,-20037508.3428)
                };
            }
            return matrixIds3857;
        }
    });




    function wmts(layer) {

        let url = layer.services && layer.services.length ? layer.services[0].href : null;

        let options = {
            layer: layer.layerName,
            style: 'default',
            tileMatrixSet: "default",
            format: "image/png"
        };
        if(GeoPlatformClient.Config.leafletPane)
            options.pane = GeoPlatformClient.Config.leafletPane;

        let distro = (layer.distributions || []).find( dist => {
            return dist.href && ( dist.mediaType==='image/png' || dist.mediaType==='image/jpeg' );
        });
        if(distro) {
            url = distro.href;
            options.format = distro.mediaType;

            let params = distro.parameters || [];
            params.each( param => {
                let value = param.defaultValue || param.values && param.values.length && param.values[0];
                if(value !== null && value !== undefined) {
                    url = url.replace('{' + param.name + '}', value);
                }
            });

        }

        if(!url) throw new Error("Unable to get URL for layer " + layer.id);

        return new WMTS( url, options );

    }

    if(L) {
        L.TileLayer.WMTS = WMTS;
        L.tileLayer.wmts = wmts;
    }

    var esriTileLayer = !L || !L.TileLayer ? null : L.TileLayer.extend({

        defaultESRIParams: {
            layers:       '', //=show:0,1,2
            transparent:  true,
            format:       'png32',
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            f:            'image'
            // imagesr:      '4326'
        },

        initialize: function (url, options) { // (String, Object)

            if(url.indexOf("/export") < 0) {
                let qidx = url.indexOf("?");
                if(qidx > 0) {
                    url = url.substring(0, qidx) + '/export' + url.substring(qidx);
                } else {
                    url += '/export';
                }
            }
            this._url = url;

            let esriParams = L.extend({}, this.defaultESRIParams),
                tileSize = options.tileSize || this.options.tileSize;

            let dim;
            if (options.detectRetina && L.Browser.retina) {
                dim = esriParams.height = tileSize * 2;
            } else {
                dim = esriParams.height = tileSize;
            }
            esriParams.size = dim + ',' + dim;

            for (var i in options) {
                // all keys that are not TileLayer options go to WMS params
                if (!this.options.hasOwnProperty(i) && i !== 'crs') {
                    esriParams[i] = options[i];
                }
            }

            //layer ids
            // esriParams.layers = "show:" + esriParams.layers;

            this.esriParams = esriParams;

            L.setOptions(this, options);

        },

        onAdd: function (map) {
            this._crs = this.options.crs || map.options.crs;
            this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (tilePoint) { // (Point, Number) -> String

            let map = this._map,
                tileSize = this.options.tileSize,

            nwPoint = tilePoint.multiplyBy(tileSize),
            sePoint = nwPoint.add([tileSize, tileSize]),

            nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
            se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
            bbox = [nw.x, se.y, se.x, nw.y].join(','),

            url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

            let params = L.extend({}, this.esriParams);
            params.layers = "show:" + params.layers;

            //convert to esri-special SR for spherical mercator
            if(params.bboxsr === 'EPSG:3857')
                params.bboxsr = '102100';
            if(params.imagesr === 'EPSG:3857')
                params.imagesr = '102100';

            return url + L.Util.getParamString(params, url, true) + '&BBOX=' + bbox;
        },

        setParams: function (params, noRedraw) {
            L.extend(this.esriParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        }
    });

    if(L && L.TileLayer) {
        L.TileLayer.ESRI = esriTileLayer;
        L.tileLayer.esri = function (url, options) {
            return new L.TileLayer.ESRI(url, options);
        };
    }

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

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {L.Layer} Leaflet layer instance
     */
    var LayerFactory = function(layer) {

        if(!layer) {
            throw new Error(`
            L.GeoPlatform.LayerFactory() -
            Invalid argument: must provide a layer object
        `);
        }

        //OSM layers have no "services" so we have to treat them differently
        if(OSM.test(layer)) {
            return OSMLayerFactory();
        }

        if(!layer.services || !layer.services.length) {
            throw new Error(`
            L.GeoPlatform.LayerFactory() -
            Cannot create Leaflet layer for GP Layer ${layer.id},
            layer has no services defined!
        `);
        }

        let service = layer.services[0],
            url     = service.href,
            typeUri = service.serviceType.uri,
            srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
            opts = {};


        if(types.ESRI_MAP_SERVER &&
            types.ESRI_MAP_SERVER.uri === typeUri) {
            opts = {
                layers: layer.layerName,
                transparent: true,
                format: format || "png32"
            };
            if(srs) opts.srs = srs;
            if(GeoPlatformClient.Config.leafletPane)
                opts.pane = GeoPlatformClient.Config.leafletPane;
            return new esriTileLayer(url, opts);

        } else if(types.ESRI_FEATURE_SERVER &&
            types.ESRI_FEATURE_SERVER.uri === typeUri) {
            return clusteredFeatures(layer);

        } else if(types.ESRI_TILE_SERVER &&
            types.ESRI_TILE_SERVER.uri === typeUri) {
            opts = { url: url, useCors: true };
            if(GeoPlatformClient.Config.leafletPane)
                opts.pane = GeoPlatformClient.Config.leafletPane;
            return L$1.esri.tiledMapLayer(opts);

        } else if(types.FEED && types.FEED.uri === typeUri) {
            return geoJsonFeed(layer);

        } else if(types.WMS && types.WMS.uri === typeUri) {
            return wms(layer);

        } else if(types.WMST && types.WMST.uri === typeUri) {
            return wmst(layer);

        } else if(types.WMTS && types.WMTS.uri === typeUri) {
            return wmts(layer);

        } else {
            console.log("LayerFactory() - Could not create Leaflet layer for " +
                "GeoPlatform Layer with service type: " + typeUri);
            return null;
        }
    };

    const ItemTypes = GeoPlatformClient__default.ItemTypes;
    const ServiceFactory = GeoPlatformClient__default.ServiceFactory;
    const HttpClient$3 = GeoPlatformClient__default.JQueryHttpClient;
    const Config$2 = GeoPlatformClient__default.Config;


    class Listener {

        constructor() {
            //listeners to be unregistered upon destroy
            this._listeners = {};
        }

        on (type, listener) {
            if(!this._listeners[type])
                this._listeners[type] = [];
            this._listeners[type].push(listener);
        }

        off (type, listener) {
            if(!type) this._listeners = {};
            if(!this._listeners[type]) return;
            if(!listener) this._listeners[type] = [];
            else {
                var idx = this._listeners[type].indexOf(listener);
                if(idx >= 0)
                    this._listeners[type].splice(idx, 1);
            }
        }

        notify(type) {
            if(!this._listeners[type]) return;
            var args = Array.prototype.slice.call(arguments, 1);
            this._listeners[type].each(function(l) { l.apply(null, args); });
        }

    }



    class MapInstance extends Listener {

        constructor(key) {
            super();

            this.setHttpClient(new HttpClient$3());
            this.setServiceFactory(ServiceFactory);

            //generate random key (see factory below)
            this._key = key || Math.ceil(Math.random()*9999);

            //registry id of current map if available
            this._mapId = null, this._mapDef = this.initializeMapDefinition(), this._mapInstance = null, this._defaultExtent = null, this._baseLayerDef = null, this._baseLayer = null, this._layerStates = [], this._layerCache = {}, this._layerErrors= [], this._featureLayer = null, this._featureLayerVisible = true, this._tools = [], this.state = { dirty: false }; // jshint ignore:line


            this._geoJsonLayerOpts = {
                style: function(feature) {
                    if(feature.properties.style)
                        return feature.properties.style;
                },
                onEachFeature: function(feature, layer) {

                    var style = { weight: 2, color: '#03f', opacity: 0.9, radius: 4, fillColor: '#03f', fillOpacity: 0.5 };
                    if(~feature.geometry.type.indexOf('Point')) {
                        style.fillOpacity = 0.9;
                    }

                    var props = feature.properties = feature.properties || {};
                    feature.properties.id = Math.floor(Math.random()*999999);
                    feature.properties.label = props.label || props.title || props.name || "Untitled " + feature.geometry.type + " Feature";
                    feature.properties.description = props.description || props.desc || "This feature needs a description!";
                    feature.properties.style = props.style || style;

                    layer.bindTooltip(props.label);
                    /*
                    toggle: setLabelNoHide(bool)
                    it may only exist on markers!
                    */
                },
                pointToLayer: function (feature, latlng) {

                    var style = feature.properties.style || {};
                    style.radius = style.radius || 4;
                    style.weight = style.weight || 2;
                    style.color = style.color || '#03f';
                    style.opacity = style.opacity || 0.9;
                    style.fillOpacity = style.opacity;
                    style.fillColor = style.color;

                    if(!L) {
                        throw new Error("Leaflet is not available");
                    }
                    return L.circleMarker(latlng, style);
                }
            };

        }

        dispose () {
            this.destroyMap();
            this.svcCache = null;
            this.serviceFactory = null;
            this.httpClient = null;
            this._key = null;
            this._mapId = null;
            this._mapDef = null;
            this._mapInstance = null;
            this._defaultExtent = null;
            this._baseLayerDef = null;
            this._baseLayer = null;
            this._layerStates = null;
            this._layerCache = null;
            this._layerErrors= null;
            this._featureLayer = null;
            this._featureLayerVisible = true;
            this._tools = null;
            this.state = null;
            this._geoJsonLayerOpts = null;
        }


        getKey () {
            return this._key;
        }

        /**
         * Override default (JQuery-based) map service used by this instance
         * @param {ItemService} mapService - service to use to CRUD map objects
         * @deprecated use setServiceFactory instead
         */
        setService(mapService) {
            // this.mapService = mapService;
        }

        /**
         * @param {ServiceFactory} factory - GeoPlatform ServiceFactory to instantiate services for maps and layers
         */
        setServiceFactory(factory) {
            this.svcCache = {}; //wipe out cached services
            this.serviceFactory = factory;
        }

        /**
         * @param {HttpClient} httpClient - HttpClient impl to use with the new factory
         */
        setHttpClient(httpClient) {
            this.svcCache = {}; //wipe out cached services
            this.httpClient = httpClient;
        }

        /**
         * @param {string} type - GeoPlatform Object model type to support ("Map", "Layer", etc)
         * @return {ItemService} item service implementation for the requested type
         */
        getService(type) {
            if(!this.svcCache[type])
                this.svcCache[type] = this.serviceFactory(type, Config$2.ualUrl, this.httpClient);
            return this.svcCache[type];
        }


        //-----------------
        getLayerStateIndex (layerId) {
            if(!layerId) return -1;
            for(let i=0; i<this._layerStates.length; ++i) {
                if(this._layerStates[i].layer && layerId === this._layerStates[i].layer.id) {
                    return i;
                }
            }
            return -1;
            // return this._layerStates.indexOfObj(layerId, (id, state) => state.layer.id === id );
        }

        getLayerState (layerId) {
            let index = this.getLayerStateIndex(layerId);
            return index >= 0 ? this._layerStates[index] : null;
        }
        //-----------------


        initializeMapDefinition() {
            return {
                type: ItemTypes.MAP,
                title: "My New Map",
                label: "My New Map",
                description: "This map needs a description",
                createdBy: null,
                baseLayer: this._baseLayerDef,
                layers: [],
                keywords: [],
                themes: [],
                resourceTypes: ['http://www.geoplatform.gov/ont/openmap/GeoplatformMap']
            };
        }

        /**
         * @param metadata object
         * @return object definition of the current map suitable for sending to WMVR
         */
        getMapResourceContent(metadata) {

            metadata = metadata || {};

            //map layers
            metadata.layers = this._layerStates.slice(0);
            // ... UAL should support accepting just an id here, so we'll do just that
            metadata.baseLayer = this._baseLayerDef;

            metadata.annotations = this._featureLayer ?
                { title: "Map Features", geoJSON: this._featureLayer.toGeoJSON() } : null;

            //geographic extent
            let extent = this._mapInstance.getBounds();
            metadata.extent = {
                minx: extent.getWest(),
                miny: extent.getSouth(),
                maxx: extent.getEast(),
                maxy: extent.getNorth()
            };

            return metadata;
        }

        /**
         * @return Leaflet toolbar
         */
        getDrawControlToolbar() {
            if(!this._mapInstance.drawControl) return null;
            var toolbars = this._mapInstance.drawControl._toolbars;
            var toolbar = null;
            for(var key in toolbars) {
                if(toolbars.hasOwnProperty(key)) {
                    if(toolbars[key]._modes) {
                        toolbar = toolbars[key];
                        break;
                    }
                }
            }
            return toolbar;
        }

        /**
         * @param error Leaflet tile load error (.target is layer, .tile is image)
         */
        handleLayerError(error) {
            var layer = error.target;
            for(var id in this._layerCache) {
                if(this._layerCache[id] === layer) {
                    this.processLayerError(error, id);
                    break;
                }
            }
        }

        /**
         * Given a Leaflet tile load error and the responsible layer id,
         * Try to isolate the cause of the error using the proxy
         * and notify listeners that an error has occurred
         */
        processLayerError(error, id) {

            var finder = function(l){return l.id === id;};

            if(!this._layerErrors.find(finder)) {

                // console.log("Logging error for layer "  + id);
                var obj = {
                    id: id,
                    message: "Layer failed to completely load. " +
                        "It may be inaccessible or misconfigured."
                };
                this._layerErrors.push(obj);

                var url = error.tile.src;
                var params = {id:id};
                url.substring(url.indexOf("?")+1, url.length).split('&').each(function(param) {
                    var p = param.split('=');
                    params[p[0]] = p[1];
                });

                this.layerService.validate(id, params)
                .catch(e => {
                    var def = this._layerStates.find(finder);
                    obj.message = "Layer '" + def.label + "' failed to completely load. " +
                            "It may be inaccessible or misconfigured. Reported cause: " + e.message;
                    this.notify('layer:error', obj);
                });
            }
        }


        /* -- State Management of internal model -- */

        touch (event) {
            this.state.dirty = true;
            if(event) {
                if(arguments.length > 1) {
                    this.notify.apply(this, Array.prototype.slice.call(arguments));
                } else
                    this.notify(event);
                // console.log("Dirtying map for " + event);
            }
            // else console.log("Dirtying map");
        }
        clean() {
            // console.log("Cleaning map");
            this.state.dirty = false;
        }
        /* --------------------------------------- */




        /* ==============================================
            Map manipulation operations
           ============================================== */

        setMap (map) {
            this._mapInstance = map;
        }

        /**
         * @return {L.Map} map instance
         */
        getMap () { return this._mapInstance; }

        /** @return {object} definition of map */
        getMapDefinition () { return this._mapDef; }

        /** @return {string} identifier of map */
        getMapId () { return this._mapId; }

        /**
         * Focuses the map on the specified lat/lng coordinate
         * @param lat number
         * @param lng number
         * @param zoom number (optional)
         */
        setView (lat, lng, zoom) {
            let z = zoom;
            if(typeof(z) === 'undefined')
                z = this._mapInstance.getZoom();
            this._mapInstance.setView([lat,lng], z);
            this.touch('map:view:changed');
        }

        /**
         * Retrieve the current center of the map
         * @return [lat,lng]
         */
        getView () {
            var latLng = this._mapInstance.getCenter();
            return [latLng.lat, latLng.lng];
        }

        /**
         * @return integer current zoom level of the map
         */
        getZoom () {
            return this._mapInstance.getZoom();
        }

        /**
         * Zoom to the map's default extent
         * If the map is saved, this will be the saved viewport
         * otherwise, it will be CONUS
         */
        zoomToDefault () {
            if(!this._mapInstance) return;
            if(this._defaultExtent) {
                this._mapInstance.fitBounds([
                    [this._defaultExtent.miny, this._defaultExtent.minx],
                    [this._defaultExtent.maxy, this._defaultExtent.maxx]
                ]);
            } else {
                console.log("MapInstance.zoomToDefault() - No default extent specified");
                this._mapInstance.setView([38, -96], 5);
            }
            try {
                this.touch('map:view:changed');
            } catch(e) { }
        }

        /**
         * @param {Object} extent - either a GP extent object or Leaflet LatLngBounds object
         */
        setExtent(extent) {
            if(!extent) return;
            if( typeof(extent.minx) !== 'undefined' &&
                typeof(extent.miny) !== 'undefined' &&
                typeof(extent.maxx) !== 'undefined' &&
                typeof(extent.maxy) !== 'undefined' ) {
                //GP model extent
                this._mapInstance.fitBounds([
                    [extent.miny, extent.minx],
                    [extent.maxy, extent.maxx]
                ]);
            } else if(typeof(extent.getWest) !== 'undefined') {
                //L.LatLngBounds
                this._mapInstance.fitBounds(extent);
            } else {

            }
        }


        /* ==============================================
            Layer operations
           ============================================== */


        /**
         * @param layer Leaflet Layer instance or object definition
         */
        setBaseLayer (layer) {

            let promise = null;
            if(!layer) {
                promise = OSM.get();
            } else
                promise = Q.resolve(layer);

            promise.then( layer => {

                let leafletLayer = LayerFactory(layer);
                if(!leafletLayer) return;

                this._mapInstance.addLayer(leafletLayer);
                leafletLayer.setZIndex(0);  //set at bottom

                let oldBaseLayer = this._baseLayer;
                if(oldBaseLayer) {
                    this._mapInstance.removeLayer(oldBaseLayer);
                }

                //remember new base layer
                this._baseLayer = leafletLayer;
                this._baseLayerDef = layer;
                this.touch('baselayer:changed', layer);

            })
            .catch(e => {
                console.log(`MapInstance.setBaseLayer() - Error getting base layer for map : ${e.message}`);
                this._layerErrors.push({id:layer.id, message: e.message});
            });
        }

        /**
         * @return array of base layers definitions that can be used
         */
        // getBaseLayerOptions () {
        //     return this._baseLayerOptions;
        // },

        getBaseLayer () { return this._baseLayerDef; }

        /**
         * @return {array[object]} list of layer states containing layer information
         */
        getLayers () { return this._layerStates; }

        getLayerErrors () { return this._layerErrors; }

        clearLayerErrors () {
            this._layerErrors = [];
            this.notify('layer:error');
        }

        clearOverlays () {
            for(var i=this._layerStates.length-1; i>=0; --i) {
                var state = this._layerStates[i];
                var layerInstance = this._layerCache[state.layer.id];
                if(layerInstance) {
                    layerInstance.off("layer:error");
                    this._layerCache[state.layer.id] = null;
                    this._mapInstance.removeLayer(layerInstance);
                }
            }
            this._layerStates = [];
            this.touch('layers:changed');

            //TODO stop listening for layer events
        }

        /**
         * @param {array[object]} layers - list of layers (NOTE: not wrapped by layer states, this method applies that)
         */
        addLayers (layers) {

            layers.each( (obj,index) => {

                let layer = null, state = null;

                if(obj.id) {            //is a layer
                    layer = obj;
                } else if(obj.layer) {  //is layer state
                    layer = obj.layer;  // containing a layer
                    state = obj;
                }

                if(!layer) return;  //layer info is missing, skip it

                //DT-442 prevent adding layer that already exists on map
                if(this._layerCache[layer.id]) return;

                if(!state) {
                    state = {
                        opacity: 1,
                        visibility: true,
                        layer: JSON.parse(JSON.stringify(layer))
                    };
                }

                let z = layers.length - index;
                state.zIndex = z;

                this.addLayerWithState(layer, state);

            });

            this.touch('layers:changed');
        }

        /**
         * @param {Object} layer - GeoPlatform Layer instance
         * @param {Object} state - GeoPlatform Layer State
         */
        addLayerWithState(layer, state) {

            var leafletLayer = null;
            try {
                if(!layer || !state)
                    throw new Error("Invalid argument, missing layer and or state");

                leafletLayer = LayerFactory(layer);

                if(!leafletLayer)
                    throw new Error("Layer factory returned nothing");

            } catch(e) {
                this._layerErrors.push({
                    id:layer.id,
                    message: 'MapInstance.addLayerWithState() - ' +
                        'Could not create a Leaflet layer: ' + e.message
                });
            }

            if(!leafletLayer) return;

            //listen for layer errors so we can inform the user
            // that a layer hasn't been loaded in a useful way
            leafletLayer.on('tileerror', this.handleLayerError);

            this._layerCache[layer.id] = leafletLayer;
            this._mapInstance.addLayer(leafletLayer);

            if( !isNaN(state.zIndex) && leafletLayer.setZIndex )
                leafletLayer.setZIndex(state.zIndex);

            this._layerStates.push(state);


            // if layer is initially "off" or...
            // if layer is initially not 100% opaque
            if(!state.visibility || state.opacity < 1) {
                // initialize layer visibility and opacity async, or else
                // some of the layers won't get properly initialized
                setTimeout( (layer, state) => {
                    this.setLayerVisibility(layer, state.visibility);
                    this.setLayerOpacity(layer, state.opacity);
                    //TODO notify of change
                }, 500, leafletLayer, state);
            }
        }

        /**
         * @param {integer} from - position of layer being moved
         * @param {integer} to - desired position to move layer to
         */
        moveLayer (from, to) {

            if(isNaN(from)) return;

            //end of list
            if(isNaN(to)) to = this._layerStates.length-1;

            let copy = this._layerStates.splice(from, 1)[0];    //grab layer being moved
            this._layerStates.splice(to, 0, copy);

            for(let z=1, i=this._layerStates.length-1; i>=0; --i, ++z) {
                let layerState = this._layerStates[i];
                let layerInstance = this._layerCache[ layerState.layer.id ];
                if(layerInstance) {
                    layerInstance.setZIndex(z);
                    layerState.zIndex = z;
                }
            }

            this.touch('layers:changed', this.getLayers());
        }

        /**
         *
         */
        removeLayer (id) {

            var layerInstance = this._layerCache[id];
            if(layerInstance) {

                //remove layer from tracked defs array
                let index = this.getLayerStateIndex(id);
                this._layerStates.splice(index, 1);

                //stop listening for errors
                layerInstance.off("layer:error");

                //remove layer from map
                this._mapInstance.removeLayer(layerInstance);

                //remove layer from cache
                this._layerCache[id] = null;
            }
            this.touch('layers:changed');
        }

        /**
         *
         */
        toggleLayerVisibility (id) {
            var layerInstance = this._layerCache[id];
            if(layerInstance) {
                let state = this.getLayerState(id);
                state.visibility = !state.visibility;

                if(layerInstance._currentImage) {
                    //ESRI Image Service layers have an IMG element
                    // that gets modified and replaced every map event (zoom/pan)
                    // so we can't just toggle classes like on other layers.
                    //Instead, we need to use the ESRI setOpacity method to toggle
                    // but need to update layer state as well.
                    layerInstance.setOpacity(state.visibility ? 1 : 0);
                    state.opacity = layerInstance.getOpacity();
                    return;
                }

                this.setLayerVisibility(layerInstance, state.visibility);
            }
        }

        /**
         * Note: this does not update layer definition state. Use
         * MapInstance.toggleLayerVisibility to do that and adjust
         * rendered layer's visibility.
         *
         * @param {L.Layer} layerInstance - leaflet layer instance
         * @param {boolean} visible - flag indicating visibility of layer
         */
        setLayerVisibility (layerInstance, visible) {

            if(layerInstance.setVisibility) {
                //using custom method provided in src/layer/module.js
                layerInstance.setVisibility(visible);

            } else if(layerInstance._container) {
                //otherwise, using jquery on dom directly
                let el = jQuery(layerInstance._container);
                if(visible) el.removeClass("invisible");
                else el.addClass('invisible');

            }

            this.touch('map:layer:changed');
        }

        /**
         *
         */
        updateLayerOpacity (id, opacity) {

            var layerInstance = this._layerCache[id];

            //if layer id is for base layer...
            if(!layerInstance && this._baseLayerDef.id === id) {
                layerInstance = this._baseLayer;
            }

            //adjust rendered leaflet layer
            opacity = this.setLayerOpacity(layerInstance, opacity);

            // if overlay layer, update state value
            let state = this.getLayerState(id);
            if(state) state.opacity = opacity;

        }

        /**
         * Note: this method does not update the associated Layer Definition
         * state value for opacity. Use MapInstance.updateLayerOpacity() to
         * both update state and adjust rendered layer.
         *
         * @param {L.Layer} layerInstance - leaflet layer instance
         * @param {number} opacity - value between 0 and 1.0 or 0 and 100
         * @return {number} normalized opacity value between 0 and 1.0
         */
        setLayerOpacity (layerInstance, opacity) {
            if(layerInstance && layerInstance.setOpacity) {
                if(opacity > 1.0) opacity = opacity / 100.0;
                layerInstance.setOpacity(opacity);
                this.touch('map:layer:changed');
            }
            return opacity;
        }

        /**
         * @param {Object} GeoPlatform Layer instance
         * @return {L.Layer} Leaflet layer instance representing that layer or null
         */
        getLeafletLayerFor (gpLayer) {
            if(!gpLayer) return null;
            let leafletLayer = this._layerCache[gpLayer.id];
            return leafletLayer || null;
        }

        /**
         *
         */
        toggleGetFeatureInfo (layerId) {
            var layerInstance = this._layerCache[layerId];
            if(layerInstance) {
                if(typeof(layerInstance.enableGetFeatureInfo) !== 'undefined') {
                    if(layerInstance.isGetFeatureInfoEnabled()) {
                        layerInstance.disableGetFeatureInfo();
                        jQuery(_mapInstance._container).removeClass('selectable-cursor');
                    } else {
                        layerInstance.enableGetFeatureInfo();
                        jQuery(_mapInstance._container).addClass('selectable-cursor');
                    }
                }

            }
        }


        /* ==============================================
           Feature operations
           ============================================== */


        /**
         * @return array of features on the map
         */
        getFeatures () {
            if(this._featureLayer) {
                return this._featureLayer.toGeoJSON().features;
            }
            return [];
        }

        /**
         * @param json geojson object or array of geojson objects
         */
        addFeatures (json) {

            if(!json) return;

            if(typeof(json.push) !== 'undefined') {
                //array of features
                for(var i=0; i<json.length; ++i)
                    this.addFeature(json[i], false);
                this.touch('features:changed');

            } else if(json.features) {
                this.addFeatures(json.features);

            } else { //single feature
                this.addFeature(json, true);
            }

        }

        /**
         * @param json geojson object
         */
        addFeature (json, fireEvent) {
            // var type = json.type;
            // var coordinates = json.coordinates;

            if(!L) {
                throw new Error("Leaflet is not available");
            }

            if(!this._featureLayer) {

                // _featureLayer = L.geoJson([], _geoJsonLayerOpts).addTo(_mapInstance);
                this._featureLayer = L.featureGroup().addTo(this._mapInstance);

            }

            // _featureLayer.addData(json);
            var opts = jQuery.extend({}, this._geoJsonLayerOpts);
            L.geoJson(json, opts).eachLayer((l)=>this.addFeatureLayer(l));

            if(typeof(fireEvent) === 'undefined' || fireEvent === true)
                this.touch('features:changed');
            else this.touch();

            // console.log(JSON.stringify(_featureLayer.toGeoJSON()));

        }

        /**
         * @param featureJson object defining a GeoJSON feature
         */
        updateFeature (featureJson) {
            var layer = this.getFeatureLayer(featureJson.properties.id);
            if(layer) {

                layer.feature = featureJson;

                //update style
                layer.setStyle(featureJson.properties.style);

                //rebind label in case that changed
                var label = featureJson.properties.label ||
                    "Untitled " + featureJson.geometry.type + " Feature";
                layer.bindTooltip(label);

                // layer.redraw();
                this.touch("map:feature:changed");
            }
        }

        /**
         * Replace an existing L.Path-based layer with one using
         * the supplied Feature GeoJSON object.  Removes the existing
         * layer and adds a new one created from the GeoJSON.
         *
         * @param featureJson object defining GeoJSON feature
         */
        replaceFeature (featureJson) {

            if(!L) {
                throw new Error("Leaflet is not available");
            }

            //find existing layer for this feature
            var layer = this.getFeatureLayer(featureJson.properties.id);
            if(layer) {

                //remove existing
                this._featureLayer.removeLayer(layer);

                //add replacement
                L.geoJson(featureJson, this._geoJsonLayerOpts)
                    .eachLayer((l)=>this.addFeatureLayer(l));

                this.touch("map:feature:changed");
            }
        }

        /**
         * @param featureId identifier of feature to focus the map on
         */
        focusFeature (featureId) {
            var layer = this.getFeatureLayer(featureId);
            if(layer) {
                if( typeof(layer.getBounds) !== 'undefined') {
                    let extent = layer.getBounds();
                    this._mapInstance.fitBounds(extent);
                } else if(typeof(layer.getLatLng) !== 'undefined') {
                    let latLng = layer.getLatLng();
                    this._mapInstance.panTo(latLng);
                } else {
                    console.log("MapInstance.focusFeature() - Cannot focus feature because it has no bounds or lat/lng");
                }
            } else {
                console.log("MapInstance.focusFeature() - Cannot focus feature because it has no layer");
            }
        }

        /**
         * @param
         */
        removeFeature (featureId) {
            var layer = this.getFeatureLayer(featureId);
            if(layer && this._featureLayer) {
                this._featureLayer.removeLayer(layer);
                this.touch('features:changed');
            }
        }

        /**
         *
         */
        removeFeatures () {
            if(this._featureLayer) {
                this._featureLayer.clearLayers();
                this.touch("features:changed");
            }
        }

        /**
         *
         */
        getFeatureLayer (featureId) {
            if(!this._featureLayer) return null;

            var features = this._featureLayer.getLayers();
            for(var i=0; i<features.length; ++i) {
                if(features[i].feature.properties.id === featureId) {
                    return features[i];
                }
            }
            return null;
        }

        toggleFeaturesLayer () {
            if(!this._featureLayer) return false;    //ignore if not rendered yet

            this._featureLayerVisible = !this._featureLayerVisible;
            this.setFeatureLayerVisibility(this._featureLayer, this._featureLayerVisible);
            return this._featureLayerVisible;
        }

        /**
         * @param {L.Feature} feature - Leaflet feature instance
         * @param {boolean} visibility - flag
         */
        setFeatureVisibility (feature, visibility) {
            this.setFeatureLayerVisibility(feature, visibility);
        }

        getFeaturesLayerVisibility () {
            return this._featureLayerVisible;
        }


        /*
         * method for adding feature layers to the map
         * when these layers may be layer groups.
         * finds leaf node layers and adds them to the
         * map's feature group
         */
        addFeatureLayer(layer) {
            this._addFeatureLayer(layer);
            this.touch("features:changed");
        }

        /**
         * Internal method, use 'addFeatureLayer' instead
         * @param {Object} layer
         */
        _addFeatureLayer(layer) {
            if(!L) {
                throw new Error("Leaflet is not available");
            }
            if(!layer.feature && layer instanceof L.LayerGroup) {
                layer.eachLayer( (child) => {
                    this._addFeatureLayer(child);
                });
            } else {
                this._featureLayer.addLayer(layer);
            }
        }


        //toggle visibility of parent feature layer
        setFeatureLayerVisibility(layer, visibility) {
            if(!layer) return;
            this._featureLayerVisible = visibility;

            if(layer.getLayers) {
                layer.getLayers().each( (child) => {
                    this.setFeatureLayerVisibility(child, visibility);
                });

            } else {
                let container = layer._container || layer._path;
                if(container)
                    container.style.display = visibility ? '' : 'none';
            }
        }



        /* ==============================================
           Map lifecycle operations
           ============================================== */

        /**
         * @param {Object} metadata
         * @return {Promise} resolving persisted map
         */
        save (metadata) {
            return this.saveMap(metadata);
        }

        /**
         * @param md object containing metadata properties for map
         */
        saveMap (md) {

            let metadata = md || {};

            //add GeoPlatformMap resource type if not already present
            const gpMapType = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
            metadata.resourceTypes = metadata.resourceTypes || [];
            if(metadata.resourceTypes.indexOf(gpMapType) < 0)
                metadata.resourceTypes.push(gpMapType);

            var content = this.getMapResourceContent(metadata);

            //ensure the two name properties line up
            if(content.title && content.title !== content.label) {
                content.label = content.title;
            } else if(content.label && !content.title) {
                content.title = content.label;
            }

            // console.log("Updating: " + JSON.stringify(map));
            return this.getService(ItemTypes.MAP)
            .save(content)
            .then( result => {

                //track new map's info so we can update it with next save
                if(!this._mapId)
                    this._mapId = result.id;

                this._mapDef = result;
                this._defaultExtent = result.extent;
                this.clean();
                return result;
            })
            .catch(err=>{
                let e = new Error("MapInstance.saveMap() - " +
                    "The requested map could not be saved because: " +
                    err.message);
                return Q.reject(e);
            });

        }

        /**
         * Retrieve a map's descriptor from the registry
         * @param {string} mapId identifier of map
         * @return {Promise} resolving the map object
         */
        fetchMap (mapId) {
            //Having to send cache busting parameter to avoid CORS header cache
            // not sending correct Origin value
            return this.getService(ItemTypes.MAP).get(mapId);
        }

        /**
         * Retrieve a map's descriptor and load it as the
         * current map managed by this service
         * @param {string} mapId identifier of map
         * @return {Promise} resolving the map object
         */
        loadMap (mapId) {

            return this.fetchMap(mapId).then(map => {

                if(!map) {
                    throw new Error("The requested map came back null");

                } else if(typeof(map) === 'string') {
                    throw new Error("The requested map came back as a string");

                } else if(map.message) {
                    throw new Error("There was an error loading the requested map: " + map.message);
                }


                //loading a map by its ID, so we need to increment it's view count
                if('development' !== Config$2.env) {

                    setTimeout( (map) => {
                        //update view count
                        let views = map.statistics ? (map.statistics.numViews||0) : 0;
                        let patch = [ { op: 'replace', path: '/statistics/numViews', value: views+1 } ];
                        this.getService(ItemTypes.MAP).patch(map.id, patch)
                        // this.mapService.patch(map.id, patch)
                        .then( updated => { map.statistics = updated.statistics; })
                        .catch( e => { console.log("Error updating view count for map: " + e); });
                    }, 1000, map);

                }

                //load the map into the viewer
                this.loadMapFromObj(map);

                return map;
            })
            .catch( err => {
                let e = new Error("MapInstance.loadMap() - " +
                    "The requested map could not be loaded because " + err.message);
                return Q.reject(e);
            });
        }

        /**
         * Load a map from its descriptor as the current
         * map managed by this service
         * @param map object
         */
        loadMapFromObj (map) {

            // console.log(map);

            this._mapId = map.id;
            this._mapDef = map;

            //ensure x,y is ordered correctly
            var t;
            t = Math.min(map.extent.minx, map.extent.maxx);
                map.extent.maxx = Math.max(map.extent.minx, map.extent.maxx);
                map.extent.minx = t;
            t = Math.min(map.extent.miny, map.extent.maxy);
                map.extent.maxy = Math.max(map.extent.miny, map.extent.maxy);
                map.extent.miny = t;

            //prevent out-of-bounds extents
            if(map.extent.minx < -180.0) map.extent.minx = -179.0;
            if(map.extent.maxx > 180.0) map.extent.maxx = 179.0;
            if(map.extent.miny < -90.0) map.extent.miny = -89.0;
            if(map.extent.maxy > 90.0) map.extent.maxy = 89.0;

            //set extent from loaded map
            this._defaultExtent = map.extent;
            var extent = map.extent;

            //remove existing layers
            this._mapInstance.eachLayer((l) => {
                this._mapInstance.removeLayer(l);
            });
            this._layerCache = {};
            this._layerStates = [];

            //set new base layer
            this.setBaseLayer(map.baseLayer);

            //add layers from loaded map
            this.addLayers(map.layers);

            //add features
            if(map.annotations && map.annotations.geoJSON) {
                let fc = map.annotations.geoJSON;
                if(fc.features)
                    this.addFeatures(fc.features);
                else
                    this.addFeatures([fc]);
            }

            this._mapInstance.fitBounds([
                [extent.miny, extent.minx],
                [extent.maxy, extent.maxx]
            ]);

            this.clean();
            this.notify('map:loaded', map);

        }


        /**
         *
         */
        destroyMap () {
            this._mapInstance = null;
            this._layerCache = null;
            this._layerStates = null;
            this._featureLayer = null;
        }

        /**
         * Used to take an existing map that is already persisted on the
         * server and unlink it here in the client so that it will be saved
         * as a completely new map when mapService.saveMap(...) is next called
         */
        setAsNewMap (mapToUse) {
            this._mapId = null;
            this._mapDef = mapToUse || this.initializeMapDefinition();
        }


        /* ==============================================
            Tool operations
           ============================================== */

        registerTool (id, tool) {
            this._tools[id] = tool;
        }

        unregisterTool (id) {
            this._tools[id] = null;
        }

        enableTool (id, finish) {
            if(!this._tools[id]) return false;
            this._tools[id].activate(function() {
                this.notify('tool:disabled', id);
            });
            this.notify('tool:enabled', id);
        }


        /* ----------- MISC ------------ */

        //https://github.com/gsklee/ngStorage
        cacheMap () {

            if(state.dirty) {
                var map = this.getMapResourceContent();
                //use exploded layer info
                map.layers = this._layerStates.slice(0);
                // $sessionStorage.map = map;
            }
        }

        restoreMap () {
            // if($sessionStorage.map) {
            //     console.log("Restoring cached map");
            //     let map = $sessionStorage.map;
            //     // console.log(JSON.stringify(map));
            //     $sessionStorage.map = null;
            //     this.loadMapFromObj(map);
            // }
        }
        /* ---------------------------- */
    }

    var cache = {};

    var MapFactory = {

        get: function(key) {
            if(key && cache[key])
                return cache[key];

            let instance = new MapInstance(key);
            cache[instance._key] = instance;
            return instance;
        },

        dispose: function(key) {
            if(key) {
                cache[key].destroyMap();
                delete cache[key];
            } else {
                cache = null;
            }
        }
    };

    if(typeof(Array.prototype.each) === 'undefined') {
        Array.prototype.each = function(fn) {
            let arr = this, len = arr.length;
            for(let i=0; i<len; ++i) {
                try {
                    fn(arr[i]);
                } catch(e) { }
            }
        };
    }





    var index = {
        LoadingControl: loadingControl,
        MeasureControl: measureControl,
        MousePositionControl: positionControl,
        DefaultBaseLayer,
        LayerFactory,
        OSMLayerFactory,
        ESRIClusterFeatureLayer: featureLayer,
        ClusteredFeatureLayer,
        clusteredFeatures,
        geoJsonFeed,
        FeatureLayer,
        WMS,
        wms,
        WMST,
        wmst,
        WMTS,
        wmts,
        ESRITileLayer: esriTileLayer,
        OSM,
        MapInstance,
        MapFactory,
        ServiceTypes: types,
        PopupTemplate: featurePopupTemplate$1,
        StyleResolver: featureStyleResolver
    };

    return index;

})));
//# sourceMappingURL=geoplatform.mapcore.js.map
