/* This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use. */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('leaflet'), require('q'), require('geoplatform.client'), require('jquery'), require('esri-leaflet'), require('leaflet.markercluster')) :
    typeof define === 'function' && define.amd ? define(['leaflet', 'q', 'geoplatform.client', 'jquery', 'esri-leaflet', 'leaflet.markercluster'], factory) :
    (global.GeoPlatformMapCore = factory(global.L,global.Q,global.GeoPlatformClient,global.jQuery,global.L.esri,global.L.markerCluster));
}(this, (function (L$1,Q,GeoPlatformClient,jQuery,esri,leaflet_markercluster) { 'use strict';

    Q = Q && Q.hasOwnProperty('default') ? Q['default'] : Q;
    var GeoPlatformClient__default = 'default' in GeoPlatformClient ? GeoPlatformClient['default'] : GeoPlatformClient;
    jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

    var loadingControl = L$1.Control.extend({
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

        initialize: function initialize(options) {
            L$1.setOptions(this, options);
            this._dataLoaders = {};

            // Try to set the zoom control this control is attached to from the
            // options
            if (this.options.zoomControl !== null) {
                this.zoomControl = this.options.zoomControl;
            }
        },

        onAdd: function onAdd(map) {
            if (this.options.spinjs && typeof Spinner !== 'function') {
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
            } else {
                // Otherwise, create a container for the indicator
                container = L$1.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
            }
            this._indicator = L$1.DomUtil.create('a', classes, container);
            if (this.options.spinjs) {
                this._spinner = new Spinner(this.options.spin).spin();
                this._indicator.appendChild(this._spinner.el);
            }
            return container;
        },

        onRemove: function onRemove(map) {
            this._removeLayerListeners(map);
            this._removeMapListeners(map);
        },

        removeFrom: function removeFrom(map) {
            if (this.zoomControl && !this.options.separate) {
                // Override Control.removeFrom() to avoid clobbering the entire
                // _container, which is the same as zoomControl's
                this._container.removeChild(this._indicator);
                this._map = null;
                this.onRemove(map);
                return this;
            } else {
                // If this control is separate from the zoomControl, call the
                // parent method so we don't leave behind an empty container
                return L$1.Control.prototype.removeFrom.call(this, map);
            }
        },

        addLoader: function addLoader(id) {
            this._dataLoaders[id] = true;
            this.updateIndicator();
        },

        removeLoader: function removeLoader(id) {
            delete this._dataLoaders[id];
            this.updateIndicator();
        },

        updateIndicator: function updateIndicator() {
            if (this.isLoading()) {
                this._showIndicator();
            } else {
                this._hideIndicator();
            }
        },

        isLoading: function isLoading() {
            return this._countLoaders() > 0;
        },

        _countLoaders: function _countLoaders() {
            var size = 0,
                key;
            for (key in this._dataLoaders) {
                if (this._dataLoaders.hasOwnProperty(key)) size++;
            }
            return size;
        },

        _showIndicator: function _showIndicator() {
            // Show loading indicator
            L$1.DomUtil.addClass(this._indicator, 'is-loading');

            // If zoomControl exists, make the zoom-out button not last
            if (!this.options.separate) {
                if (this.zoomControl instanceof L$1.Control.Zoom) {
                    L$1.DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                } else if (typeof L$1.Control.Zoomslider === 'function' && this.zoomControl instanceof L$1.Control.Zoomslider) {
                    L$1.DomUtil.removeClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                }
            }
        },

        _hideIndicator: function _hideIndicator() {
            // Hide loading indicator
            L$1.DomUtil.removeClass(this._indicator, 'is-loading');

            // If zoomControl exists, make the zoom-out button last
            if (!this.options.separate) {
                if (this.zoomControl instanceof L$1.Control.Zoom) {
                    L$1.DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                } else if (typeof L$1.Control.Zoomslider === 'function' && this.zoomControl instanceof L$1.Control.Zoomslider) {
                    L$1.DomUtil.addClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                }
            }
        },

        _handleLoading: function _handleLoading(e) {
            this.addLoader(this.getEventId(e));
        },

        _handleLoad: function _handleLoad(e) {
            this.removeLoader(this.getEventId(e));
        },

        getEventId: function getEventId(e) {
            if (e.id) {
                return e.id;
            } else if (e.layer) {
                return e.layer._leaflet_id;
            }
            return e.target._leaflet_id;
        },

        _layerAdd: function _layerAdd(e) {
            if (!e.layer || !e.layer.on) return;
            try {
                e.layer.on({
                    loading: this._handleLoading,
                    load: this._handleLoad
                }, this);
            } catch (exception) {
                console.warn('L.Control.Loading: Tried and failed to add ' + ' event handlers to layer', e.layer);
                console.warn('L.Control.Loading: Full details', exception);
            }
        },

        _addLayerListeners: function _addLayerListeners(map) {
            // Add listeners for begin and end of load to any layers already on the
            // map
            map.eachLayer(function (layer) {
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

        _removeLayerListeners: function _removeLayerListeners(map) {
            // Remove listeners for begin and end of load from all layers
            map.eachLayer(function (layer) {
                if (!layer.off) return;
                layer.off({
                    loading: this._handleLoading,
                    load: this._handleLoad
                }, this);
            }, this);

            // Remove layeradd listener from map
            map.off('layeradd', this._layerAdd, this);
        },

        _addMapListeners: function _addMapListeners(map) {
            // Add listeners to the map for (custom) dataloading and dataload
            // events, eg, for AJAX calls that affect the map but will not be
            // reflected in the above layer events.
            map.on({
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad
            }, this);
        },

        _removeMapListeners: function _removeMapListeners(map) {
            map.off({
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad
            }, this);
        }
    });

    L$1.Control.Loading = loadingControl;
    L$1.Control.loading = function (options) {
        return new L$1.Control.Loading(options);
    };
    L$1.Map.addInitHook(function () {
        if (this.options.loadingControl) {
            this.loadingControl = new loadingControl();
            this.addControl(this.loadingControl);
        }
    });

    var measureControl = L$1.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function onAdd(map) {
            var className = 'leaflet-control-zoom leaflet-bar leaflet-control',
                container = L$1.DomUtil.create('div', className);

            this._createButton('&#8674;', 'Measure', 'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom', container, this._toggleMeasure, this);

            return container;
        },

        _createButton: function _createButton(html, title, className, container, fn, context) {
            var link = L$1.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L$1.DomEvent.on(link, 'click', L$1.DomEvent.stopPropagation).on(link, 'click', L$1.DomEvent.preventDefault).on(link, 'click', fn, context).on(link, 'dblclick', L$1.DomEvent.stopPropagation);

            return link;
        },

        _toggleMeasure: function _toggleMeasure() {
            this._measuring = !this._measuring;

            if (this._measuring) {
                L$1.DomUtil.addClass(this._container, 'leaflet-control-measure-on');
                this._startMeasuring();
            } else {
                L$1.DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
                this._stopMeasuring();
            }
        },

        _startMeasuring: function _startMeasuring() {
            this._oldCursor = this._map._container.style.cursor;
            this._map._container.style.cursor = 'crosshair';

            this._doubleClickZoom = this._map.doubleClickZoom.enabled();
            this._map.doubleClickZoom.disable();

            L$1.DomEvent.on(this._map, 'mousemove', this._mouseMove, this).on(this._map, 'click', this._mouseClick, this).on(this._map, 'dblclick', this._finishPath, this).on(document, 'keydown', this._onKeyDown, this);

            if (!this._layerPaint) {
                this._layerPaint = L$1.layerGroup().addTo(this._map);
            }

            if (!this._points) {
                this._points = [];
            }
        },

        _stopMeasuring: function _stopMeasuring() {
            this._map._container.style.cursor = this._oldCursor;

            L$1.DomEvent.off(document, 'keydown', this._onKeyDown, this).off(this._map, 'mousemove', this._mouseMove, this).off(this._map, 'click', this._mouseClick, this).off(this._map, 'dblclick', this._mouseClick, this);

            if (this._doubleClickZoom) {
                this._map.doubleClickZoom.enable();
            }

            if (this._layerPaint) {
                this._layerPaint.clearLayers();
            }

            this._restartPath();
        },

        _mouseMove: function _mouseMove(e) {
            if (!e.latlng || !this._lastPoint) {
                return;
            }

            if (!this._layerPaintPathTemp) {
                this._layerPaintPathTemp = L$1.polyline([this._lastPoint, e.latlng], {
                    color: 'black',
                    weight: 1.5,
                    clickable: false,
                    dashArray: '6,3'
                }).addTo(this._layerPaint);
            } else {
                this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
            }

            if (this._tooltip) {
                if (!this._distance) {
                    this._distance = 0;
                }

                this._updateTooltipPosition(e.latlng);

                var distance = e.latlng.distanceTo(this._lastPoint);
                this._updateTooltipDistance(this._distance + distance, distance);
            }
        },

        _mouseClick: function _mouseClick(e) {
            // Skip if no coordinates
            if (!e.latlng) {
                return;
            }

            // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
            if (this._lastPoint && this._tooltip) {
                if (!this._distance) {
                    this._distance = 0;
                }

                this._updateTooltipPosition(e.latlng);

                var distance = e.latlng.distanceTo(this._lastPoint);
                this._updateTooltipDistance(this._distance + distance, distance);

                this._distance += distance;
            }
            this._createTooltip(e.latlng);

            // If this is already the second click, add the location to the fix path (create one first if we don't have one)
            if (this._lastPoint && !this._layerPaintPath) {
                this._layerPaintPath = L$1.polyline([this._lastPoint], {
                    color: 'black',
                    weight: 2,
                    clickable: false
                }).addTo(this._layerPaint);
            }

            if (this._layerPaintPath) {
                this._layerPaintPath.addLatLng(e.latlng);
            }

            // Upate the end marker to the current location
            if (this._lastCircle) {
                this._layerPaint.removeLayer(this._lastCircle);
            }

            this._lastCircle = new L$1.CircleMarker(e.latlng, {
                color: 'black',
                opacity: 1,
                weight: 1,
                fill: true,
                fillOpacity: 1,
                radius: 2,
                clickable: this._lastCircle ? true : false
            }).addTo(this._layerPaint);

            this._lastCircle.on('click', function () {
                this._finishPath();
            }, this);

            // Save current location as last location
            this._lastPoint = e.latlng;
        },

        _finishPath: function _finishPath() {
            // Remove the last end marker as well as the last (moving tooltip)
            if (this._lastCircle) {
                this._layerPaint.removeLayer(this._lastCircle);
            }
            if (this._tooltip) {
                this._layerPaint.removeLayer(this._tooltip);
            }
            if (this._layerPaint && this._layerPaintPathTemp) {
                this._layerPaint.removeLayer(this._layerPaintPathTemp);
            }

            // Reset everything
            this._restartPath();
        },

        _restartPath: function _restartPath() {
            this._distance = 0;
            this._tooltip = undefined;
            this._lastCircle = undefined;
            this._lastPoint = undefined;
            this._layerPaintPath = undefined;
            this._layerPaintPathTemp = undefined;
        },

        _createTooltip: function _createTooltip(position) {
            var icon = L$1.divIcon({
                className: 'leaflet-measure-tooltip',
                iconAnchor: [-5, -5]
            });
            this._tooltip = L$1.marker(position, {
                icon: icon,
                clickable: false
            }).addTo(this._layerPaint);
        },

        _updateTooltipPosition: function _updateTooltipPosition(position) {
            this._tooltip.setLatLng(position);
        },

        _updateTooltipDistance: function _updateTooltipDistance(total, difference) {
            var totalRound = this._round(total),
                differenceRound = this._round(difference);

            var text = '<div class="leaflet-measure-tooltip-total">' + totalRound + ' nm</div>';
            if (differenceRound > 0 && totalRound != differenceRound) {
                text += '<div class="leaflet-measure-tooltip-difference">(+' + differenceRound + ' nm)</div>';
            }

            this._tooltip._icon.innerHTML = text;
        },

        _round: function _round(val) {
            return Math.round(val / 1852 * 10) / 10;
        },

        _onKeyDown: function _onKeyDown(e) {
            if (e.keyCode == 27) {
                // If not in path exit measuring mode, else just finish path
                if (!this._lastPoint) {
                    this._toggleMeasure();
                } else {
                    this._finishPath();
                }
            }
        }
    });

    L$1.Control.Measure = measureControl;
    L$1.control.measure = function (options) {
        return new L$1.Control.Measure(options);
    };

    L$1.Map.mergeOptions({
        measureControl: false
    });

    L$1.Map.addInitHook(function () {
        if (this.options.measureControl) {
            this.measureControl = new measureControl();
            this.addControl(this.measureControl);
        }
    });

    var positionControl = L$1.Control.extend({
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

      onAdd: function onAdd(map) {
        this._container = L$1.DomUtil.create('div', 'leaflet-control-mouseposition');
        L$1.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;
        return this._container;
      },

      onRemove: function onRemove(map) {
        map.off('mousemove', this._onMouseMove);
      },

      _onMouseMove: function _onMouseMove(e) {
        var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L$1.Util.formatNum(e.latlng.lng, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L$1.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
      }

    });

    L$1.Control.MousePosition = positionControl;
    L$1.control.mousePosition = function (options) {
      return new L$1.Control.MousePosition(options);
    };

    L$1.Map.mergeOptions({
      positionControl: false
    });

    L$1.Map.addInitHook(function () {
      if (this.options.positionControl) {
        this.positionControl = new positionControl();
        this.addControl(this.positionControl);
      }
    });

    var QueryFactory = GeoPlatformClient__default.QueryFactory;
    var LayerService = GeoPlatformClient__default.LayerService;
    var HttpClient = GeoPlatformClient__default.JQueryHttpClient;
    var Config = GeoPlatformClient__default.Config;

    /**
     * @param {LayerService} layerService - optional, GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    var OSM = {

        /**
         * @param {Object} layer - GeoPlatform Layer object
         * @return {boolean} true if is an OSM layer
         */
        test: function test(layer) {
            return layer && layer.resourceTypes && layer.resourceTypes.length && ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        },

        get: function get(layerService) {
            var query = QueryFactory().fields('*').resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
            if (!layerService) layerService = new LayerService(Config.ualUrl, new HttpClient());
            return layerService.search(query).then(function (response) {
                return response.results.length ? response.results[0] : null;
            }).catch(function (e) {
                return Q.reject(e);
            });
        }

    };

    var url = GeoPlatformClient__default.Config.ualUrl;
    var baseLayerId = GeoPlatformClient__default.Config.defaultBaseLayerId;
    var LayerService$1 = GeoPlatformClient__default.LayerService;
    var HttpClient$1 = GeoPlatformClient__default.JQueryHttpClient;

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @param {LayerService} layerService - GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving GeoPlatform Layer object
     */
    function DefaultBaseLayer (layerService) {
        if (!GeoPlatformClient__default.Config.defaultBaseLayerId) return OSM.get();

        if (!layerService) layerService = new LayerService$1(url, new HttpClient$1());
        return layerService.get(baseLayerId).catch(function (e) {
            return Q.resolve(OSM.get());
        });
    }

    var ItemService = GeoPlatformClient__default.ItemService;
    var HttpClient$2 = GeoPlatformClient__default.JQueryHttpClient;
    var QueryFactory$1 = GeoPlatformClient__default.QueryFactory;
    var Config$1 = GeoPlatformClient__default.Config;

    var ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
    var esriExpr = /Esri REST ([A-Za-z]+) Service/;
    var keyFn = function keyFn(expr, str) {
        var m = expr.exec(str);
        return m && m.length ? m[1] : null;
    };

    var types = {

        ESRI_FEATURE_SERVER: {
            "id": "48980c5bad0c8d4666b393874eb5279a",
            "uri": "http://www.geoplatform.gov/spec/esri-feature-rest",
            "type": "dct:Standard",
            "description": "Esri ArcGIS Feature Server REST API",
            "label": "Esri REST Feature Service"
        },

        ESRI_IMAGE_SERVER: {
            "id": "bcdf764e52064c84323f3f1baea7e245",
            "uri": "http://www.geoplatform.gov/spec/esri-image-rest",
            "type": "dct:Standard",
            "description": "Esri ArcGIS Image Server REST API",
            "label": "Esri REST Image Service"
        },

        ESRI_MAP_SERVER: {
            "id": "370cf6ca5d91c07b63329b8384fe76c7",
            "uri": "http://www.geoplatform.gov/spec/esri-map-rest",
            "type": "dct:Standard",
            "description": "Esri ArcGIS Map Server REST API",
            "label": "Esri REST Map Service"
        },

        ESRI_TILE_SERVER: {
            "id": "c75570ff2523b1a1631afe7ddac27beb",
            "uri": "http://www.geoplatform.gov/spec/esri-tile-rest",
            "type": "dct:Standard",
            "description": "Esri ArcGIS Tile Server REST API",
            "label": "Esri REST Tile Service"
        },

        KML: {
            "id": "c0b39ca2049ba2184472ff27408ffd7e",
            "uri": "http://opengis.net/spec/kml",
            "type": "dct:Standard",
            "description": "OGC Keyhole Markup Language (KML)",
            "label": "OGC Keyhole Markup Language (KML)"
        },

        CSW: {
            "id": "60de6a422475493b7901ae453d6f4562",
            "uri": "http://opengis.net/spec/csw",
            "type": "dct:Standard",
            "description": "OGC Web Catalog Service (CSW)",
            "label": "OGC Web Catalog Service (CSW)"
        },

        WCS: {
            "id": "a7e5a2d81a83d4eae9bf9138f24d0a32",
            "uri": "http://opengis.net/spec/wcs",
            "type": "dct:Standard",
            "description": "OGC Web Coverage Service (WCS)",
            "label": "OGC Web Coverage Service (WCS)"
        },

        WFS: {
            "id": "e70e43ed52f83634285a09e959734bff",
            "uri": "http://opengis.net/spec/wfs",
            "type": "dct:Standard",
            "description": "OGC Web Feature Service (WFS)",
            "label": "OGC Web Feature Service (WFS)"
        },

        WMS: {
            "id": "abed5a00c536fb2d7019092c37ed634c",
            "uri": "http://opengis.net/spec/wms",
            "type": "dct:Standard",
            "description": "OGC Web Map Service (WMS)",
            "label": "OGC Web Map Service (WMS)"
        },

        WMTS: {
            "id": "757858ae77cf8c602b39294c27632dd7",
            "uri": "http://opengis.net/spec/wmts",
            "type": "dct:Standard",
            "description": "OGC Web Map Tile Service (WMTS)",
            "label": "OGC Web Map Tile Service (WMTS)"
        },

        WMST: {
            "id": "faae5bff49b1144d500380cbc055c1e5",
            "uri": "http://www.geoplatform.gov/spec/ogc-wms-t",
            "type": "dct:Standard",
            "description": "OGC WMS support for temporal according to OGC Best Practice guidance",
            "label": "OGC WMS-T Service"
        },

        FEED: {
            "id": "8edc61870e534a1f23dc967753da3b72",
            "uri": "http://www.geoplatform.gov/spec/feed",
            "type": "dct:Standard",
            "description": "GeoPlatform GeoJSON Feed Service converts an Atom/RSS feed (including GeoRSS and CAP extensions) to GeoJSON",
            "label": "GeoPlatform GeoJSON Feed Service"
        },

        //
        //method to allow refreshing list later
        refresh: updateList
    };

    function updateList() {

        var url = Config$1.ualUrl;
        if (!url) {
            console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
        } else {

            var query = QueryFactory$1().types('dct:Standard').resourceTypes('ServiceType').pageSize(50);

            new ItemService(url, new HttpClient$2()).search(query).then(function (data) {

                for (var i = 0; i < data.results.length; ++i) {

                    var type = data.results[i],
                        key = null,
                        label = type.label;

                    if (~label.indexOf("WMS-T")) {
                        key = 'WMST';
                        type.supported = true;
                    } else if (~label.indexOf('OGC')) {
                        key = keyFn(ogcExpr, label);
                        type.supported = 'WMS' === key || 'WMTS' === key;
                    } else if (~label.indexOf('Esri')) {
                        key = keyFn(esriExpr, label);
                        type.supported = true;
                        key = 'ESRI_' + key.toUpperCase() + '_SERVER';
                    } else if (~label.indexOf("Feed")) {
                        key = "FEED";
                        type.supported = true;
                    } else {
                        key = label;
                    }

                    types[key] = type;
                }
                // console.log(types);
            }).catch(function (error) {
                console.log("Error loading supported service types: " + error.message);
            });
        }
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    function featurePopupTemplate(feature) {

        var props = Object.keys(feature.properties);

        var pFn = function pFn(list, names) {
            if (!list || !list.find) return null;
            var match = list.find(function (name) {
                var lc = name.toLowerCase();
                return names.indexOf(lc) >= 0;
            });
            return match;
        };

        var titleProp = pFn(props, ['title', 'name', 'label']);
        var title = titleProp ? feature.properties[titleProp] : "Untitled";

        var descProp = pFn(props, ['description', 'summary', 'descript']);
        var description = descProp ? feature.properties[descProp] : "No description provided";

        var result = '<div class="feature-popup">' + '<h5>' + title + '</h5>' + '<p>' + description + '</p>';

        if (feature.properties.modified) {
            var modified = new Date(feature.properties.modified);
            result += '<div><span class="label">Updated</span><span class="value">' + modified.toDateString() + '</span></div>';
        }

        if (feature.properties['cap:effective']) {
            var date = new Date(feature.properties['cap:effective']);
            result += '<div>' + '<span class="label">Effective</span>' + '<span class="value">' + date.toDateString() + ' ' + date.toTimeString() + '</span>' + '</div>';
        }
        if (feature.properties['cap:expires']) {
            var _date = new Date(feature.properties['cap:expires']);
            result += '<div>' + '<span class="label">Expires</span>' + '<span class="value">' + _date.toDateString() + ' ' + _date.toTimeString() + '</span>' + '</div>';
        }

        var linkProp = pFn(props, ['landingpage', 'link', 'website']);
        if (linkProp) {
            result += '<br>';
            result += '<a href="' + feature.properties[linkProp] + '" target="_blank">link</a>';
        }

        result += '<hr>';

        for (var prop in feature.properties) {
            if (titleProp === prop || descProp === prop || linkProp === prop || 'modified' === prop) continue;
            var value = feature.properties[prop];
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                for (var p in value) {
                    result += '<div>' + '<span class="label">' + prop + '.' + p + '</span>' + '<span class="value">' + value[p] + '</span>' + '</div>';
                }
            } else {
                result += '<div>' + '<span class="label">' + prop + '</span>' + '<span class="value">' + value + '</span>' + '</div>';
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
    var FeatureLayer = esri.FeatureLayer.extend({

        _gpStyle: { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

        /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
        pointToLayerFn: function pointToLayerFn(feature, latlng) {

            // console.log("Feature: " + feature.id);

            var style = feature && feature.properties ? feature.properties.style : null;
            if (!style && typeof this.options.style === 'function') {
                // console.log("Using local style function");
                try {
                    style = this.options.style(feature);
                } catch (e) {
                    console.log("error using style function in ClusteredFeatureLayer: " + e.message);
                }
            }

            style = style || this.options.style || {};

            var marker = null;
            if (style.shape === 'image') {
                var width = style.width || 16;
                var height = style.height || 16;
                var icon = L$1.icon({
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width * 0.5, height * 0.5],
                    popupAnchor: [0, -11]
                });
                var mopts = { icon: icon };
                if (GeoPlatformClient.Config.leafletPane) mopts.pane = GeoPlatformClient.Config.leafletPane;
                marker = L$1.marker(latlng, mopts);
            } else {
                style.radius = style.radius || style['stroke-width'] || 4;
                style.weight = style.weight || style['stroke-width'] || 2;
                style.color = style.color || style.stroke || '#03f';
                style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                style.fillColor = style.color || style.fill;
                style.renderer = this.options.renderer; //important for pane!
                marker = L$1.circleMarker(latlng, style);
            }

            var popupTemplate = this.options.popupTemplate || featurePopupTemplate;
            marker.bindPopup(popupTemplate(feature));
            return marker;
        },

        /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
        eachFeatureFn: function eachFeatureFn(feature, layer) {
            if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
                return;
            }
            layer.bindPopup(featurePopupTemplate(feature));
        },

        initialize: function initialize(options) {
            var _this = this;
            options = options || {};

            if (GeoPlatformClient.Config.leafletPane) options.pane = GeoPlatformClient.Config.leafletPane;

            var getGPStyle = function getGPStyle() {
                return _this._gpStyle;
            };
            options.style = options.style || getGPStyle();

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            var svgOpts = {};
            if (GeoPlatformClient.Config.leafletPane) svgOpts.pane = GeoPlatformClient.Config.leafletPane;
            var renderer = L$1.SVG && L$1.svg(svgOpts) || L$1.Canvas && L$1.canvas();
            options.renderer = renderer;

            options.pointToLayer = L$1.bind(this.pointToLayerFn, this);
            options.onEachFeature = L$1.bind(this.eachFeatureFn, this);

            // options.fields = ['FID', 'type', 'title', 'geometry'];

            FeatureLayer.prototype.initialize.call(this, options);

            this.on('load', function () {
                if (typeof this.options.zIndex !== 'undefined') this.setZIndex(this.options.zIndex);
            });
        },

        setZIndex: function setZIndex(index) {
            this.options.zIndex = index;
            for (var id in this._layers) {
                this._layers[id].setZIndex(index);
            }
        },

        toggleVisibility: function toggleVisibility() {
            for (var id in this._layers) {
                var layer = this._layers[id];
                if (layer.toggleVisibility) this._layers[id].toggleVisibility();
            }
        },

        setOpacity: function setOpacity(opacity) {
            for (var id in this._layers) {
                var layer = this._layers[id];
                if (layer.setOpacity) layer.setOpacity(opacity);
            }
        },

        loadStyle: function loadStyle(gpLayerId) {
            var _this2 = this;

            if (this.options.styleLoader) {
                this.options.styleLoader(gpLayerId).then(function (json) {

                    if (!json) return;

                    var style = null;

                    if (json && json.styles) {

                        var styleFn = L$1.Util.bind(function (feature) {

                            var property = this.property || this.field1;
                            var v = feature[property] || (feature.properties ? feature.properties[property] : null);
                            var style = null;
                            if (this.styles) {
                                var wrapper = this.styles.find(function (sw) {
                                    return sw.value === v;
                                });
                                if (wrapper) {
                                    style = wrapper.style;
                                    style.radius = style.radius || style['stroke-width'] || 4;
                                    style.weight = style.weight || style['stroke-width'] || 2;
                                    style.color = style.color || style.stroke || '#03f';
                                    style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                                    style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                                    style.fillColor = style.color || style.fill;
                                }
                            }
                            // console.log("Using style: " + JSON.stringify(style));
                            return style;
                        }, json);
                        _this2.options.style = styleFn;
                        _this2.setStyle(styleFn);
                        return;
                    } else if (json && typeof json.push !== 'undefined') {
                        //multiple styles returned
                        style = json[0]; //use first for now
                    } else if (json) {
                        style = json;
                    } else {
                        return; //unrecognizable style
                    }

                    if (style.shape) {
                        var obj = jQuery.extend({}, style);
                        obj.style = style;
                        _this2._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for (var id in _this2._layers) {
                            _this2._layers[id].setStyle(obj);
                        }
                    }
                }).catch(function (e) {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }

    });

    var FeatureLayer$1 = esri.FeatureManager.extend({

      statics: {
        EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
        CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
      },

      /**
       * Constructor
       */

      initialize: function initialize(options) {
        esri.FeatureManager.prototype.initialize.call(this, options);

        options = L$1.setOptions(this, options);

        this._layers = {};
        this._leafletIds = {};

        this.cluster = new L.markerClusterGroup(options);
        this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');

        this.cluster.addEventParent(this);
      },

      /**
       * Layer Interface
       */

      onAdd: function onAdd(map) {
        esri.FeatureManager.prototype.onAdd.call(this, map);
        this._map.addLayer(this.cluster);

        // NOTE !!!!!!!
        // Using this type of layer requires map.maxZoom to be set during map creation!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      },

      onRemove: function onRemove(map) {
        esri.FeatureManager.prototype.onRemove.call(this, map);
        this._map.removeLayer(this.cluster);
      },

      /**
       * Feature Management Methods
       */

      createLayers: function createLayers(features) {
        var markers = [];

        for (var i = features.length - 1; i >= 0; i--) {
          var geojson = features[i];
          var layer = this._layers[geojson.id];

          if (!layer) {
            var newLayer = L$1.GeoJSON.geometryToLayer(geojson, this.options);
            newLayer.feature = L$1.GeoJSON.asFeature(geojson);
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
            if (!this.options.timeField || this.options.timeField && this._featureWithinTimeRange(geojson)) {
              markers.push(newLayer);
            }
          }
        }

        if (markers.length) {
          this.cluster.addLayers(markers);
        }
      },

      addLayers: function addLayers(ids) {
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

      removeLayers: function removeLayers(ids, permanent) {
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

      resetStyle: function resetStyle(id) {
        var layer = this._layers[id];

        if (layer) {
          layer.options = layer.defaultOptions;
          this.setFeatureStyle(layer.feature.id, this.options.style);
        }

        return this;
      },

      setStyle: function setStyle(style) {
        this.eachFeature(function (layer) {
          this.setFeatureStyle(layer.feature.id, style);
        }, this);
        return this;
      },

      setFeatureStyle: function setFeatureStyle(id, style) {
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

      eachFeature: function eachFeature(fn, context) {
        for (var i in this._layers) {
          fn.call(context, this._layers[i]);
        }
        return this;
      },

      getFeature: function getFeature(id) {
        return this._layers[id];
      }
    });

    function featureLayer(options) {
      return new FeatureLayer$1(options);
    }

    /**
     * Fetches style information from GeoPlatform UAL
     * @param {string} id - identifier of layer to resolve style for
     */
    function featureStyleResolver(id) {
        var deferred = Q.defer();
        jQuery.ajax({
            url: GeoPlatformClient.Config.ualUrl + '/api/layers/' + id + '/style',
            dataType: 'json',
            success: function success(data) {
                deferred.resolve(data);
            },
            error: function error(xhr, status, message) {
                var em = 'FeatureStyleResolver() -\n               Error loading style information for layer ' + id + ' : ' + message;
                var error = new Error(em);
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
    var ClusteredFeatureLayer = FeatureLayer$1.extend({

        _gpStyle: { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

        /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
        pointToLayerFn: function pointToLayerFn(feature, latlng) {

            var style = feature && feature.properties ? feature.properties.style : null;
            if (!style && typeof this.options.style === 'function') {
                // console.log("Using local style function");
                try {
                    style = this.options.style(feature);
                } catch (e) {
                    console.log("error using style function in ClusteredFeatureLayer: " + e.message);
                }
            }

            style = style || this.options.style || {};
            style.radius = style['stroke-width'] || style.radius || 4;
            style.weight = style['stroke-width'] || style.weight || 2;
            style.color = style.stroke || style.color || '#03f';
            style.opacity = style['stroke-opacity'] || style.opacity || 0.9;
            style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
            style.fillColor = style.fill || style.color || '#03f';
            style.renderer = this.options.renderer; //important for pane!

            var marker = null;
            if (style.shape === 'image') {
                var width = style.width || 16;
                var height = style.height || 16;
                var icon = L$1.icon({
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width * 0.5, height * 0.5],
                    popupAnchor: [0, -11]
                });
                var mopts = { icon: icon };
                if (GeoPlatformClient.Config.leafletPane) mopts.pane = GeoPlatformClient.Config.leafletPane;
                marker = L$1.marker(latlng, mopts);
            } else {
                marker = L$1.circleMarker(latlng, style);
            }

            var popupTemplate = this.options.popupTemplate || featurePopupTemplate;
            marker.bindPopup(popupTemplate(feature));

            return marker;
        },

        /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
        eachFeatureFn: function eachFeatureFn(feature, layer) {
            if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
                return;
            }
            layer.bindPopup(featurePopupTemplate(feature));
        },

        initialize: function initialize(options) {
            var _this = this;

            options = options || {};

            if (GeoPlatformClient.Config.leafletPane) options.pane = GeoPlatformClient.Config.leafletPane;

            options.pointToLayer = L$1.bind(this.pointToLayerFn, this);
            options.onEachFeature = L$1.bind(this.eachFeatureFn, this);
            // options.fields = ['FID', 'type', 'title', 'geometry'];

            //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
            // This needs to be increased to ensure all markers can be clicked
            // when spiderfied (some get stuck under the spider legs)
            options.spiderfyDistanceMultiplier = 2;

            var getGPStyle = function getGPStyle() {
                return _this._gpStyle;
            };
            options.style = options.style || getGPStyle;
            if (options.styleResolver) {
                this.styleResolver = options.styleResolver;
            }

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            var svgOpts = {};
            if (GeoPlatformClient.Config.leafletPane) svgOpts.pane = GeoPlatformClient.Config.leafletPane;
            var renderer = L$1.SVG && L$1.svg(svgOpts) || L$1.Canvas && L$1.canvas();
            options.renderer = renderer;

            FeatureLayer$1.prototype.initialize.call(this, options);

            this.on('load', function () {
                if (typeof this.options.zIndex !== 'undefined') this.setZIndex(this.options.zIndex);
            });
        },

        onAdd: function onAdd(map) {
            FeatureLayer$1.prototype.onAdd.call(this, map);

            if (this.options.layerId) {
                this.loadStyle(this.options.layerId);
            }
        },

        setZIndex: function setZIndex(index) {
            this.options.zIndex = index;
            for (var id in this._layers) {
                this._layers[id].setZIndex(index);
            }
        },

        toggleVisibility: function toggleVisibility() {

            //clustered features
            if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for (var id in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[id];
                    if (layer._icon) {
                        jQuery(layer._icon).toggleClass('invisible');
                    }
                }
            }

            //non-clustered features
            if (this._layers) {
                for (var _id in this._layers) {
                    this._layers[_id].toggleVisibility();
                }
            }
        },

        setVisibility: function setVisibility(bool) {

            //clustered features
            if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for (var id in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[id];
                    if (layer._icon) {
                        //probably is a more efficient way to do this,
                        // but this works currently.
                        // TODO look at using
                        //  markerCluster.refreshIconOptions({className:'invisible'});
                        var icon = jQuery(layer._icon);
                        if (bool) icon.removeClass('invisible');else icon.addClass('invisible');
                    }
                }
            }

            //non-clustered features
            if (this._layers) {
                for (var _id2 in this._layers) {
                    var _layer = this._layers[_id2];
                    if (_layer.setVisibility) _layer.setVisibility(bool);else if (_layer.setStyle) _layer.setStyle({ display: bool ? '' : 'none' });
                }
            }
        },

        setOpacity: function setOpacity(opacity) {

            //clustered features
            if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for (var id in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[id];
                    if (layer._icon) {
                        jQuery(layer._icon).css({ opacity: opacity });
                    }
                }
            }

            //non-clustered features
            if (this._layers) {
                for (var _id3 in this._layers) {
                    var _layer2 = this._layers[_id3];
                    if (_layer2.setOpacity) _layer2.setOpacity(opacity);
                }
            }
        },

        setStyle: function setStyle(style) {
            this.eachFeature(function (layer) {
                this.setFeatureStyle(layer.feature.id, style);
            }, this);
        },

        loadStyle: function loadStyle(gpLayerId) {
            var _this2 = this;

            if (this.options.styleLoader) {
                this.options.styleLoader(gpLayerId).then(function (json) {

                    if (!json) return;

                    var style = null;

                    if (json && json.styles) {

                        var styleFn = L$1.Util.bind(function (feature) {

                            var property = this.property || this.field1;
                            var v = feature[property] || (feature.properties ? feature.properties[property] : null);
                            var style = null;
                            if (this.styles) {
                                var wrapper = this.styles.find(function (sw) {
                                    return sw.value === v;
                                });
                                if (wrapper) {
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
                        _this2.options.style = styleFn;
                        setTimeout(function (layer, style) {
                            layer.setStyle(style);
                        }, 1000, _this2, styleFn);
                        return;
                    } else if (json && typeof json.push !== 'undefined') {
                        //multiple styles returned
                        style = json[0]; //use first for now
                    } else if (json) {
                        style = json;
                    } else {
                        return; //unrecognizable style
                    }

                    if (style.shape) {
                        var obj = jQuery.extend({}, style);
                        obj.style = style;
                        _this2._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for (var id in _this2._layers) {
                            _this2._layers[id].setStyle(obj);
                        }
                    }
                }).catch(function (e) {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }
    });

    function clusteredFeatures(layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "clusteredFeatures() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
            throw new Error(msg);
        }

        var url = service.href,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;

        var opts = {
            url: url + '/' + layer.layerName,
            styleLoader: featureStyleResolver,
            layerId: layer.id
        };
        if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;
        return new ClusteredFeatureLayer(opts);
    }

    function geoJsonFeed(layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "geoJsonFeed() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
            throw new Error(msg);
        }

        var url = service.href,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;

        var layerUrl = url + (url[url.length - 1] === '/' ? '' : '/') + layer.id + '/FeatureServer/' + layer.layerName;

        var styleUrl = url.replace('feeds', 'styles') + (url[url.length - 1] === '/' ? '' : '/') + layer.id;

        var styleLoaderFactory = function styleLoaderFactory(url) {
            return function (layerId) {
                var deferred = Q.defer();
                jQuery.ajax(url, {
                    dataType: 'json',
                    success: function success(data) {
                        deferred.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var em = "geoJsonFeed() -\n                        Error loading style information for layer " + layerId + " : " + message;
                        var error = new Error(em);
                        deferred.reject(error);
                    }
                });
                return deferred.promise; //uses jQuery promise
            };
        };

        var opts = {
            url: layerUrl,
            isModern: true, //force to use GeoJSON
            layerId: layer.id, //used by style loader
            styleLoader: styleLoaderFactory(styleUrl)
        };
        if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;
        return new ClusteredFeatureLayer(opts);
    }

    var WMS = L$1.TileLayer.WMS.extend({

        enableGetFeatureInfo: function enableGetFeatureInfo() {
            this._map.on('click', this.getFeatureInfo, this);
            this._enabled = true;
        },

        disableGetFeatureInfo: function disableGetFeatureInfo() {
            this._map.off('click', this.getFeatureInfo, this);
            this._enabled = false;
        },

        isGetFeatureInfoEnabled: function isGetFeatureInfoEnabled() {
            return this._enabled;
        },

        onRemove: function onRemove(map) {

            //if GFI is enabled, disable it before removing
            if (this.isGetFeatureInfoEnabled()) this.disableGetFeatureInfo();

            // Triggered when the layer is removed from a map.
            //   Unregister a click listener, then do all the upstream WMS things
            L$1.TileLayer.WMS.prototype.onRemove.call(this, map);
        },

        getFeatureInfo: function getFeatureInfo(evt) {
            // Make an AJAX request to the server and hope for the best
            var url = this.getFeatureInfoUrl(evt.latlng),
                showResults = L$1.Util.bind(this.showGetFeatureInfo, this),
                parseGetFeatureInfo = this.parseGetFeatureInfo;
            jQuery.ajax({
                url: url,
                success: function success(data, status, xhr) {
                    // var err = typeof data === 'string' ? null : data;
                    if (typeof data !== 'string') data = parseGetFeatureInfo(data);
                    showResults(null, evt.latlng, data);
                },
                error: function error(xhr, status, _error) {
                    showResults(_error);
                }
            });
        },

        getFeatureInfoUrl: function getFeatureInfoUrl(latlng) {
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
                j: point.y //1.3.0
            };

            // return this._url + Util.getParamString(params, this._url, true);
            var url = '/api/layers/' + this.wmsParams.wmvId + '/feature';
            return GeoPlatformClient.Config.ualUrl + url + L$1.Util.getParamString(params, url, true);
        },

        parseGetFeatureInfo: function parseGetFeatureInfo(content) {
            var fields = [];
            for (var field in content) {
                fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
            }
            if (fields.length == 0) fields.push('<em>No data available</em>');
            return '<div>' + fields.join(' ') + '</div>';
        },

        showGetFeatureInfo: function showGetFeatureInfo(err, latlng, content) {
            if (err) {
                console.log(err);return;
            } // do nothing if there's an error

            // Otherwise show the content in a popup, or something.
            L$1.popup({ maxWidth: 800 }).setLatLng(latlng).setContent(content).openOn(this._map);
        }

    });

    function wms(layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "wms() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
            throw new Error(msg);
        }

        var url = service.href;
        var formats = layer.supportedFormats || [];
        var format = formats.length ? formats[0] : "image/png";

        var version = '1.1.1';
        if (service.api && service.api.length) {
            var is130 = service.api.filter(function (api) {
                return api.accessURL.indexOf('wms/1.3.0') > 0;
            }).length > 0;
            if (is130) version = '1.3.0';
        }

        var opts = {
            layers: layer.layerName,
            transparent: true,
            format: format,
            wmvId: layer.id,
            version: version
        };
        if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;

        return new WMS(url, opts);
    }

    function tdPolyFill(options) {
        return new WMST(options);
    }

    var TimeDimension = L$1.TimeDimension;
    var timeDimension = L$1.timeDimension || tdPolyFill;

    var WMST = (TimeDimension && TimeDimension.Layer || L$1.TileLayer).WMS.extend({

        //override default parser to query all Layers (whether queryable or not)
        _parseTimeDimensionFromCapabilities: function _parseTimeDimensionFromCapabilities(xml) {
            var layers = xml.querySelectorAll('Layer');
            var layerName = this._baseLayer.wmsParams.layers;
            var layer = null;
            var times = null;

            layers.forEach(function (current) {
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
        _getTimesFromLayerCapabilities: function _getTimesFromLayerCapabilities(layer) {
            var times = null;
            var dimensions = layer.querySelectorAll("Dimension[name='time']");
            if (dimensions && dimensions.length && dimensions[0].textContent.length) {
                times = dimensions[0].textContent.trim();
            }
            if (!times || !times.length) {
                var extents = layer.querySelectorAll("Extent[name='time']");
                if (extents && extents.length && extents[0].textContent.length) {
                    times = extents[0].textContent.trim();
                }
            }
            if (times && ~times.indexOf("current")) {
                times = times.replace('current', new Date().toISOString());
            }
            return times;
        }

    });

    function wmst(gpLayer) {

        var service = gpLayer.services[0];
        var url = service.href;

        var opts = {
            layers: gpLayer.layerName,
            transparent: true,
            format: "image/png",
            wmvId: gpLayer.layerId
        };
        if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;

        var leafletLayer = new L$1.TileLayer.CustomWMS(url, opts);

        var proxyUrl = GeoPlatformClient.Config.ualUrl + '/api/services/' + service.id + '/proxy/capabilities';

        var tdOpts = {};

        if (gpLayer.temporal) {

            var d1 = gpLayer.temporal.startDate ? new Date(gpLayer.temporal.startDate) : new Date();
            var d2 = gpLayer.temporal.endDate ? new Date(gpLayer.temporal.endDate) : new Date();

            tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
        }

        return new WMST(leafletLayer, {
            timeDimension: timeDimension(tdOpts),
            proxy: proxyUrl
        });
    }

    L$1.TileLayer.WMST = WMST;
    L$1.tileLayer.wmst = wmst;

    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {

                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
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

    var paramRe = /\{ *([\w_-]+) *\}/g;

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
    var WMTS = L$1.TileLayer.extend({

        defaultWmtsParams: {

            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            layers: '',
            styles: '',
            tileMatrixSet: '',
            format: 'image/png'
        },

        initialize: function initialize(url, options) {
            // (String, Object)
            this._url = url;
            var wmtsParams = L$1.extend({}, this.defaultWmtsParams);
            var tileSize = options.tileSize || this.options.tileSize;
            if (options.detectRetina && L$1.Browser.retina) {
                wmtsParams.width = wmtsParams.height = tileSize * 2;
            } else {
                wmtsParams.width = wmtsParams.height = tileSize;
            }
            for (var i in options) {
                // all keys that are not TileLayer options go to WMTS params
                if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
                    wmtsParams[i] = options[i];
                }
            }
            this.wmtsParams = wmtsParams;
            this.matrixIds = options.matrixIds || this.getDefaultMatrix();
            L$1.setOptions(this, options);
        },

        onAdd: function onAdd(map) {
            this._crs = this.options.crs || map.options.crs;
            L$1.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function getTileUrl(coords) {
            // (Point, Number) -> String
            var tileSize = this.options.tileSize;
            var nwPoint = coords.multiplyBy(tileSize);
            nwPoint.x += 1;
            nwPoint.y -= 1;
            var sePoint = nwPoint.add(new L$1.Point(tileSize, tileSize));
            var zoom = this._tileZoom;
            var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
            var se = this._crs.project(this._map.unproject(sePoint, zoom));
            var tilewidth = se.x - nw.x;
            //zoom = this._map.getZoom();
            var ident = this.matrixIds[zoom].identifier;
            var tileMatrix = this.wmtsParams.tileMatrixSet + ":" + ident;
            var X0 = this.matrixIds[zoom].topLeftCorner.lng;
            var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
            var tilecol = Math.floor((nw.x - X0) / tilewidth);
            var tilerow = -Math.floor((nw.y - Y0) / tilewidth);

            var url = this._url;
            var isTileMatrixTemplated = url.indexOf('{TileMatrix}');
            var isTileRowTemplated = url.indexOf('{TileRow}');
            var isTileColTemplated = url.indexOf('{TileCol}');

            var o = Object.assign({ s: this._getSubdomain(coords) }, this.wmtsParams);
            if (isTileMatrixTemplated > 0) o.TileMatrix = ident;
            if (isTileRowTemplated > 0) o.TileRow = tilerow;
            if (isTileColTemplated > 0) o.TileCol = tilecol;
            for (var k in o) {
                o[k.toLowerCase()] = o[k];
            }
            // url = Util.template(url.toLowerCase(), o);
            url = template(url, o);

            var qsi = url.indexOf("?");
            if (qsi < 0 || isTileMatrixTemplated < qsi && isTileRowTemplated < qsi || isTileColTemplated < qsi) {
                //if the TM,TR,TC variables are templated but not as querystring parameters
                // (ie, no '?' present or those params are before the '?'),
                // then the URL must not be OGC WMTS, so no need for WMTS parameters

            } else {
                url = url + L$1.Util.getParamString(this.wmtsParams, url);
                if (isTileMatrixTemplated < 0) url += "&TileMatrix=" + ident; //tileMatrixSet
                if (isTileRowTemplated < 0) url += "&TileRow=" + tilerow;
                if (isTileColTemplated < 0) url += "&TileCol=" + tilecol;
            }

            return url;
        },

        setParams: function setParams(params, noRedraw) {
            L$1.extend(this.wmtsParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        },

        getDefaultMatrix: function getDefaultMatrix() {
            /**
             * the matrix3857 represents the projection
             * for in the IGN WMTS for the google coordinates.
             */
            var matrixIds3857 = new Array(22);
            for (var i = 0; i < 22; i++) {
                matrixIds3857[i] = {
                    identifier: "" + i,
                    topLeftCorner: new L$1.LatLng(20037508.3428, -20037508.3428)
                };
            }
            return matrixIds3857;
        }
    });

    function wmts(layer) {

        var url = layer.services && layer.services.length ? layer.services[0].href : null;

        var options = {
            layer: layer.layerName,
            style: 'default',
            tileMatrixSet: "default",
            format: "image/png"
        };
        if (GeoPlatformClient.Config.leafletPane) options.pane = GeoPlatformClient.Config.leafletPane;

        var distro = (layer.distributions || []).find(function (dist) {
            //ensure dist isn't 'null'
            return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
        });
        if (distro) {
            url = distro.href;
            options.format = distro.mediaType;

            var params = distro.parameters || [];
            params.each(function (param) {

                //ignore wmts specific parameters, WMTS layer will populate those values
                // based upon map state.
                var plc = param.name.toLowerCase();
                if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc) return;

                //for all other parameters, try to fill in default or initial values
                var value = param.defaultValue || param.values && param.values.length && param.values[0];
                if (value !== null && value !== undefined) {
                    url = url.replace('{' + param.name + '}', value);
                }
            });
        } else {
            throw new Error("WTMS Layer - layer " + layer.id + " has no distribution(s) usable to make WMTS requests");
        }

        if (!url) throw new Error("WTMS Layer - unable to determine WMTS URL for layer " + layer.id);

        return new WMTS(url, options);
    }

    L$1.TileLayer.WMTS = WMTS;
    L$1.tileLayer.wmts = wmts;

    var esriTileLayer = L$1.TileLayer.extend({

        defaultESRIParams: {
            layers: '', //=show:0,1,2
            transparent: true,
            format: 'png32',
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            f: 'image'
            // imagesr:      '4326'
        },

        initialize: function initialize(url, options) {
            // (String, Object)

            if (url.indexOf("/export") < 0) {
                var qidx = url.indexOf("?");
                if (qidx > 0) {
                    url = url.substring(0, qidx) + '/export' + url.substring(qidx);
                } else {
                    url += '/export';
                }
            }
            this._url = url;

            var esriParams = L$1.extend({}, this.defaultESRIParams),
                tileSize = options.tileSize || this.options.tileSize;

            var dim = void 0;
            if (options.detectRetina && L$1.Browser.retina) {
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

            L$1.setOptions(this, options);
        },

        onAdd: function onAdd(map) {
            this._crs = this.options.crs || map.options.crs;
            this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
            L$1.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function getTileUrl(tilePoint) {
            // (Point, Number) -> String

            var map = this._map,
                tileSize = this.options.tileSize,
                nwPoint = tilePoint.multiplyBy(tileSize),
                sePoint = nwPoint.add([tileSize, tileSize]),
                nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
                se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
                bbox = [nw.x, se.y, se.x, nw.y].join(','),
                url = L$1.Util.template(this._url, { s: this._getSubdomain(tilePoint) });

            var params = L$1.extend({}, this.esriParams);
            params.layers = "show:" + params.layers;

            //convert to esri-special SR for spherical mercator
            if (params.bboxsr === 'EPSG:3857') params.bboxsr = '102100';
            if (params.imagesr === 'EPSG:3857') params.imagesr = '102100';

            return url + L$1.Util.getParamString(params, url, true) + '&BBOX=' + bbox;
        },

        setParams: function setParams(params, noRedraw) {
            L$1.extend(this.esriParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        }
    });

    L$1.TileLayer.ESRI = esriTileLayer;
    L$1.tileLayer.esri = function (url, options) {
        return new L$1.TileLayer.ESRI(url, options);
    };

    /**
     * @param {Object} layer - GeoPlatform Layer
     * @return {L.TileLayer}
     */
    function OSMLayerFactory(layer) {

        return new L$1.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 1, maxZoom: 19,
            attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
    }

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {L.Layer} Leaflet layer instance
     */
    var LayerFactory = function LayerFactory(layer) {

        if (!layer) {
            throw new Error("\n            L.GeoPlatform.LayerFactory() -\n            Invalid argument: must provide a layer object\n        ");
        }

        //OSM layers have no "services" so we have to treat them differently
        if (OSM.test(layer)) {
            return OSMLayerFactory();
        }

        if (!layer.services || !layer.services.length) {
            throw new Error("\n            L.GeoPlatform.LayerFactory() -\n            Cannot create Leaflet layer for GP Layer " + layer.id + ",\n            layer has no services defined!\n        ");
        }

        var service = layer.services[0],
            url = service.href,
            typeUri = service.serviceType ? service.serviceType.uri : null,
            srs = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null,
            opts = {};

        if (typeUri === null) {
            console.log("LayerFactory() - Could not create Leaflet layer for " + "GeoPlatform Layer with Service of unspecified service type");
            return null;
        }

        if (types.ESRI_MAP_SERVER && types.ESRI_MAP_SERVER.uri === typeUri) {
            opts = {
                layers: layer.layerName,
                transparent: true,
                format: format || "png32"
            };
            if (srs) opts.srs = srs;
            if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;
            return new esriTileLayer(url, opts);
        } else if (types.ESRI_FEATURE_SERVER && types.ESRI_FEATURE_SERVER.uri === typeUri) {
            return clusteredFeatures(layer);
        } else if (types.ESRI_TILE_SERVER && types.ESRI_TILE_SERVER.uri === typeUri) {
            opts = { url: url, useCors: true };
            if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;
            return esri.tiledMapLayer(opts);
        } else if (types.ESRI_IMAGE_SERVER && types.ESRI_IMAGE_SERVER.uri === typeUri) {
            opts = { url: url, useCors: true };
            if (GeoPlatformClient.Config.leafletPane) opts.pane = GeoPlatformClient.Config.leafletPane;
            return esri.imageMapLayer(opts);
        } else if (types.FEED && types.FEED.uri === typeUri) {
            return geoJsonFeed(layer);
        } else if (types.WMS && types.WMS.uri === typeUri) {
            return wms(layer);
        } else if (types.WMST && types.WMST.uri === typeUri) {
            return wmst(layer);
        } else if (types.WMTS && types.WMTS.uri === typeUri) {
            return wmts(layer);
        } else {
            console.log("LayerFactory() - Could not create Leaflet layer for " + "GeoPlatform Layer with service type: " + typeUri);
            return null;
        }
    };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var ItemTypes = GeoPlatformClient__default.ItemTypes;
    var ServiceFactory = GeoPlatformClient__default.ServiceFactory;
    var HttpClient$3 = GeoPlatformClient__default.JQueryHttpClient;
    var Config$2 = GeoPlatformClient__default.Config;

    var Listener = function () {
        function Listener() {
            _classCallCheck(this, Listener);

            //listeners to be unregistered upon destroy
            this._listeners = {};
        }

        _createClass(Listener, [{
            key: "on",
            value: function on(type, listener) {
                if (!this._listeners[type]) this._listeners[type] = [];
                this._listeners[type].push(listener);
            }
        }, {
            key: "off",
            value: function off(type, listener) {
                if (!type) this._listeners = {};
                if (!this._listeners[type]) return;
                if (!listener) this._listeners[type] = [];else {
                    var idx = this._listeners[type].indexOf(listener);
                    if (idx >= 0) this._listeners[type].splice(idx, 1);
                }
            }
        }, {
            key: "notify",
            value: function notify(type) {
                if (!this._listeners[type]) return;
                var args = Array.prototype.slice.call(arguments, 1);
                this._listeners[type].each(function (l) {
                    l.apply(null, args);
                });
            }
        }]);

        return Listener;
    }();

    var MapInstance = function (_Listener) {
        _inherits(MapInstance, _Listener);

        function MapInstance(key) {
            _classCallCheck(this, MapInstance);

            var _this = _possibleConstructorReturn(this, (MapInstance.__proto__ || Object.getPrototypeOf(MapInstance)).call(this));

            _this.setHttpClient(new HttpClient$3());
            _this.setServiceFactory(ServiceFactory);

            //generate random key (see factory below)
            _this._key = key || Math.ceil(Math.random() * 9999);

            //registry id of current map if available
            _this._mapId = null, _this._mapDef = _this.initializeMapDefinition(), _this._mapInstance = null, _this._defaultExtent = null, _this._baseLayerDef = null, _this._baseLayer = null, _this._layerStates = [], _this._layerCache = {}, _this._layerErrors = [], _this._layerErrorHandler = function (e) {
                console.log("MapInstance.defaultLayerErrorHandler() - " + e.id + " : " + e.message);
            }, _this._featureLayer = null, _this._featureLayerVisible = true, _this._tools = [], _this.state = { dirty: false }; // jshint ignore:line


            _this._geoJsonLayerOpts = {
                style: function style(feature) {
                    if (feature.properties.style) return feature.properties.style;
                },
                onEachFeature: function onEachFeature(feature, layer) {

                    var style = { weight: 2, color: '#03f', opacity: 0.9, radius: 4, fillColor: '#03f', fillOpacity: 0.5 };
                    if (~feature.geometry.type.indexOf('Point')) {
                        style.fillOpacity = 0.9;
                    }

                    var props = feature.properties = feature.properties || {};
                    if (feature.properties.id === undefined || feature.properties.id === null) feature.properties.id = Math.floor(Math.random() * 999999);
                    feature.properties.label = props.label || props.title || props.name || "Untitled " + feature.geometry.type + " Feature";
                    feature.properties.description = props.description || props.desc || "This feature needs a description!";
                    feature.properties.style = props.style || style;

                    layer.bindTooltip(props.label);
                    /*
                    toggle: setLabelNoHide(bool)
                    it may only exist on markers!
                    */
                },
                pointToLayer: function pointToLayer(feature, latlng) {

                    var style = feature.properties.style || {};
                    style.radius = style.radius || 4;
                    style.weight = style.weight || 2;
                    style.color = style.color || '#03f';
                    style.opacity = style.opacity || 0.9;
                    style.fillOpacity = style.opacity;
                    style.fillColor = style.color;

                    if (!L) {
                        throw new Error("Leaflet is not available");
                    }
                    return L$1.circleMarker(latlng, style);
                }
            };

            return _this;
        }

        _createClass(MapInstance, [{
            key: "dispose",
            value: function dispose() {
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
                this._layerErrors = null;
                this._featureLayer = null;
                this._featureLayerVisible = true;
                this._tools = null;
                this.state = null;
                this._geoJsonLayerOpts = null;
            }
        }, {
            key: "getKey",
            value: function getKey() {
                return this._key;
            }

            /**
             * Override default (JQuery-based) map service used by this instance
             * @param {ItemService} mapService - service to use to CRUD map objects
             * @deprecated use setServiceFactory instead
             */

        }, {
            key: "setService",
            value: function setService(mapService) {}
            // this.mapService = mapService;


            /**
             * @param {ServiceFactory} factory - GeoPlatform ServiceFactory to instantiate services for maps and layers
             */

        }, {
            key: "setServiceFactory",
            value: function setServiceFactory(factory) {
                this.svcCache = {}; //wipe out cached services
                this.serviceFactory = factory;
            }

            /**
             * @param {HttpClient} httpClient - HttpClient impl to use with the new factory
             */

        }, {
            key: "setHttpClient",
            value: function setHttpClient(httpClient) {
                this.svcCache = {}; //wipe out cached services
                this.httpClient = httpClient;
            }

            /**
             * @param {string} type - GeoPlatform Object model type to support ("Map", "Layer", etc)
             * @return {ItemService} item service implementation for the requested type
             */

        }, {
            key: "getService",
            value: function getService(type) {
                if (!this.svcCache[type]) this.svcCache[type] = this.serviceFactory(type, Config$2.ualUrl, this.httpClient);
                return this.svcCache[type];
            }

            /**
             * @param {Function} fn - callback when an error is encountered
             */

        }, {
            key: "setErrorHandler",
            value: function setErrorHandler(fn) {
                this._layerErrorHandler = fn;
            }

            //-----------------

        }, {
            key: "getLayerStateIndex",
            value: function getLayerStateIndex(layerId) {
                if (!layerId) return -1;
                for (var i = 0; i < this._layerStates.length; ++i) {
                    if (this._layerStates[i].layer && layerId === this._layerStates[i].layer.id) {
                        return i;
                    }
                }
                return -1;
                // return this._layerStates.indexOfObj(layerId, (id, state) => state.layer.id === id );
            }
        }, {
            key: "getLayerState",
            value: function getLayerState(layerId) {
                var index = this.getLayerStateIndex(layerId);
                return index >= 0 ? this._layerStates[index] : null;
            }
            //-----------------


        }, {
            key: "initializeMapDefinition",
            value: function initializeMapDefinition() {
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

        }, {
            key: "getMapResourceContent",
            value: function getMapResourceContent(metadata) {

                metadata = metadata || {};

                //map layers
                metadata.layers = this._layerStates.slice(0);
                // ... UAL should support accepting just an id here, so we'll do just that
                metadata.baseLayer = this._baseLayerDef;

                metadata.annotations = this._featureLayer ? { title: "Map Features", geoJSON: this._featureLayer.toGeoJSON() } : null;

                //geographic extent
                var extent = this._mapInstance.getBounds();
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

        }, {
            key: "getDrawControlToolbar",
            value: function getDrawControlToolbar() {
                if (!this._mapInstance.drawControl) return null;
                var toolbars = this._mapInstance.drawControl._toolbars;
                var toolbar = null;
                for (var key in toolbars) {
                    if (toolbars.hasOwnProperty(key)) {
                        if (toolbars[key]._modes) {
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

        }, {
            key: "handleLayerError",
            value: function handleLayerError(error) {
                // console.log("MapInstance.handleLayerError() - " +
                //     "Layer's tile failed to load: " + error.tile.src);
                var layer = error.target;
                for (var id in this._layerCache) {
                    if (this._layerCache[id] === layer) {
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

        }, {
            key: "processLayerError",
            value: function processLayerError(error, id) {
                var _this2 = this;

                var finder = function finder(l) {
                    return l.id === id || l.layer && l.layer.id === id;
                };

                if (!this._layerErrors.find(finder)) {

                    var obj = this.logLayerError(id, "Layer failed to completely load. " + "It may be inaccessible or misconfigured.");

                    var url = error.tile.src;
                    var params = { id: id };
                    url.substring(url.indexOf("?") + 1, url.length).split('&').each(function (param) {
                        var p = param.split('=');
                        params[p[0]] = p[1];
                    });

                    var layerService = this.getService(ItemTypes.LAYER);
                    if (layerService) {
                        layerService.validate(id, params).catch(function (e) {
                            var def = _this2._layerStates.find(finder);
                            if (def) {
                                obj.message = "Layer '" + def.layer.label + "' failed to completely load. " + "Reported cause: " + e.message;
                            }
                            _this2.notify('layer:error', obj);
                        });
                    }
                }
            }

            /**
             * @param {string} layerId - identifier of layer generating the error
             * @param {string} errorMsg - message of the error
             */

        }, {
            key: "logLayerError",
            value: function logLayerError(layerId, errorMsg) {
                // console.log("MapInstance.logLayerError() - layer "  + id +
                //     " generated error '" + errorMsg + "'");
                var err = { id: layerId, message: errorMsg };
                this._layerErrors.push(err);
                if (this._layerErrorHandler) {
                    this._layerErrorHandler(err);
                }
                return err;
            }

            /* -- State Management of internal model -- */

        }, {
            key: "touch",
            value: function touch(event) {
                this.state.dirty = true;
                if (event) {
                    if (arguments.length > 1) {
                        this.notify.apply(this, Array.prototype.slice.call(arguments));
                    } else this.notify(event);
                    // console.log("Dirtying map for " + event);
                }
                // else console.log("Dirtying map");
            }
        }, {
            key: "clean",
            value: function clean() {
                // console.log("Cleaning map");
                this.state.dirty = false;
            }
            /* --------------------------------------- */

            /* ==============================================
                Map manipulation operations
               ============================================== */

        }, {
            key: "setMap",
            value: function setMap(map) {
                this._mapInstance = map;
            }

            /**
             * @return {L.Map} map instance
             */

        }, {
            key: "getMap",
            value: function getMap() {
                return this._mapInstance;
            }

            /** @return {object} definition of map */

        }, {
            key: "getMapDefinition",
            value: function getMapDefinition() {
                return this._mapDef;
            }

            /** @return {string} identifier of map */

        }, {
            key: "getMapId",
            value: function getMapId() {
                return this._mapId;
            }

            /**
             * Focuses the map on the specified lat/lng coordinate
             * @param lat number
             * @param lng number
             * @param zoom number (optional)
             */

        }, {
            key: "setView",
            value: function setView(lat, lng, zoom) {
                var z = zoom;
                if (typeof z === 'undefined') z = this._mapInstance.getZoom();
                this._mapInstance.setView([lat, lng], z);
                this.touch('map:view:changed');
            }

            /**
             * Retrieve the current center of the map
             * @return [lat,lng]
             */

        }, {
            key: "getView",
            value: function getView() {
                var latLng = this._mapInstance.getCenter();
                return [latLng.lat, latLng.lng];
            }

            /**
             * @return integer current zoom level of the map
             */

        }, {
            key: "getZoom",
            value: function getZoom() {
                return this._mapInstance.getZoom();
            }

            /**
             * Zoom to the map's default extent
             * If the map is saved, this will be the saved viewport
             * otherwise, it will be CONUS
             */

        }, {
            key: "zoomToDefault",
            value: function zoomToDefault() {
                if (!this._mapInstance) return;
                if (this._defaultExtent) {
                    this._mapInstance.fitBounds([[this._defaultExtent.miny, this._defaultExtent.minx], [this._defaultExtent.maxy, this._defaultExtent.maxx]]);
                } else {
                    console.log("MapInstance.zoomToDefault() - No default extent specified");
                    this._mapInstance.setView([38, -96], 5);
                }
                try {
                    this.touch('map:view:changed');
                } catch (e) {}
            }

            /**
             * @param {Object} extent - either a GP extent object or Leaflet LatLngBounds object
             */

        }, {
            key: "setExtent",
            value: function setExtent(extent) {
                if (!extent) return;
                if (typeof extent.minx !== 'undefined' && typeof extent.miny !== 'undefined' && typeof extent.maxx !== 'undefined' && typeof extent.maxy !== 'undefined') {
                    //GP model extent
                    this._mapInstance.fitBounds([[extent.miny, extent.minx], [extent.maxy, extent.maxx]]);
                } else if (typeof extent.getWest !== 'undefined') {
                    //L.LatLngBounds
                    this._mapInstance.fitBounds(extent);
                } else {}
            }

            /* ==============================================
                Layer operations
               ============================================== */

            /**
             * @param layer Leaflet Layer instance or object definition
             */

        }, {
            key: "setBaseLayer",
            value: function setBaseLayer(layer) {
                var _this3 = this;

                var promise = null;
                if (!layer) {
                    promise = OSM.get();
                } else promise = Q.resolve(layer);

                promise.then(function (layer) {

                    var leafletLayer = LayerFactory(layer);
                    if (!leafletLayer) return;

                    _this3._mapInstance.addLayer(leafletLayer);
                    leafletLayer.setZIndex(0); //set at bottom

                    var oldBaseLayer = _this3._baseLayer;
                    if (oldBaseLayer) {
                        _this3._mapInstance.removeLayer(oldBaseLayer);
                    }

                    //remember new base layer
                    _this3._baseLayer = leafletLayer;
                    _this3._baseLayerDef = layer;

                    //will notify listeners
                    _this3.touch('baselayer:changed', layer, leafletLayer);
                    // this.notify('baselayer:changed', layer, leafletLayer);
                }).catch(function (e) {
                    console.log("MapInstance.setBaseLayer() - Error getting base layer for map : " + e.message);
                    _this3.logLayerError(layer.id, e.message);
                });
            }

            /**
             * @return array of base layers definitions that can be used
             */
            // getBaseLayerOptions () {
            //     return this._baseLayerOptions;
            // },

        }, {
            key: "getBaseLayer",
            value: function getBaseLayer() {
                return this._baseLayerDef;
            }

            /**
             * @return {array[object]} list of layer states containing layer information
             */

        }, {
            key: "getLayers",
            value: function getLayers() {
                return this._layerStates;
            }
        }, {
            key: "getLayerErrors",
            value: function getLayerErrors() {
                return this._layerErrors;
            }
        }, {
            key: "clearLayerErrors",
            value: function clearLayerErrors() {
                this._layerErrors = [];
                this.notify('layer:error');
            }
        }, {
            key: "clearOverlays",
            value: function clearOverlays() {
                for (var i = this._layerStates.length - 1; i >= 0; --i) {
                    var state = this._layerStates[i];
                    var layerInstance = this._layerCache[state.layer.id];
                    if (layerInstance) {
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

        }, {
            key: "addLayers",
            value: function addLayers(layers) {
                var _this4 = this;

                if (!layers) return;
                if (typeof layers.push === 'undefined') {
                    layers = [layers];
                }

                layers.forEach(function (obj, index) {

                    var layer = null,
                        state = null;

                    if (obj.type && obj.type === ItemTypes.LAYER) {
                        //is a layer
                        layer = obj;
                    } else if (obj.layer) {
                        //is layer state
                        layer = obj.layer; // containing a layer
                        state = obj;
                    }

                    if (!layer) {
                        console.log("Warning: MapInstance.addLayers() - layer (" + index + ") is not a Layer or a Layer state. Ignoring...");
                        return; //layer info is missing, skip it
                    }

                    //DT-442 prevent adding layer that already exists on map
                    if (_this4._layerCache[layer.id]) return;

                    if (!state) {
                        try {
                            //wrapped in try{}catch because layer may contain circular reference
                            // which will cause error when used by JSON methods
                            var layerCopy = JSON.parse(JSON.stringify(layer));
                            state = {
                                opacity: 1,
                                visibility: true,
                                layer: layerCopy
                            };
                        } catch (e) {
                            throw new Error("Unable to add layer to map because of " + e.message);
                        }
                    }

                    var z = layers.length - index;
                    state.zIndex = z;

                    _this4.addLayerWithState(layer, state);
                });

                this.touch('layers:changed');
            }

            /**
             * @param {Object} layer - GeoPlatform Layer instance
             * @param {Object} state - GeoPlatform Layer State
             */

        }, {
            key: "addLayerWithState",
            value: function addLayerWithState(layer, state) {
                var _this5 = this;

                var leafletLayer = null;
                try {
                    if (!layer || !state) throw new Error("Invalid argument, missing layer and or state");

                    leafletLayer = LayerFactory(layer);

                    if (!leafletLayer) throw new Error("Layer factory returned nothing");
                } catch (e) {
                    this.logLayerError(layer.id, 'MapInstance.addLayerWithState() - ' + 'Could not create Leaflet layer because ' + e.message);
                }

                if (!leafletLayer) return;

                //cache leaflet object first
                this._layerCache[layer.id] = leafletLayer;

                //listen for layer errors so we can inform the user
                // that a layer hasn't been loaded in a useful way
                leafletLayer.on('tileerror', function (e) {
                    _this5.handleLayerError(e);
                });

                this._mapInstance.addLayer(leafletLayer);

                if (!isNaN(state.zIndex) && leafletLayer.setZIndex) leafletLayer.setZIndex(state.zIndex);

                this._layerStates.push(state);

                this.notify('layer:added', layer, leafletLayer);

                // if layer is initially "off" or...
                // if layer is initially not 100% opaque
                if (!state.visibility || state.opacity < 1) {
                    // initialize layer visibility and opacity async, or else
                    // some of the layers won't get properly initialized
                    setTimeout(function (layer, state) {
                        _this5.setLayerVisibility(layer, state.visibility);
                        _this5.setLayerOpacity(layer, state.opacity);
                        //TODO notify of change

                        //DT-2102 timeout needs to be large enough or else
                        // feature layers won't get opacity updated on map load
                    }, 2000, leafletLayer, state);
                }
            }

            /**
             * @param {integer} from - position of layer being moved
             * @param {integer} to - desired position to move layer to
             */

        }, {
            key: "moveLayer",
            value: function moveLayer(from, to) {

                if (isNaN(from)) return;

                //end of list
                if (isNaN(to)) to = this._layerStates.length - 1;

                var copy = this._layerStates.splice(from, 1)[0]; //grab layer being moved
                this._layerStates.splice(to, 0, copy);

                for (var z = 1, i = this._layerStates.length - 1; i >= 0; --i, ++z) {
                    var layerState = this._layerStates[i];
                    var layerInstance = this._layerCache[layerState.layer.id];
                    if (layerInstance) {
                        layerInstance.setZIndex(z);
                        layerState.zIndex = z;
                    }
                }

                this.touch('layers:changed', this.getLayers());
            }

            /**
             *
             */

        }, {
            key: "removeLayer",
            value: function removeLayer(id) {

                var layerInstance = this._layerCache[id];
                if (layerInstance) {

                    //remove layer from tracked defs array
                    var index = this.getLayerStateIndex(id);
                    console.log("MapInstance.removeLayer(" + id + ")");
                    if (index >= 0 && index < this._layerStates.length) this._layerStates.splice(index, 1);

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

        }, {
            key: "toggleLayerVisibility",
            value: function toggleLayerVisibility(id) {
                var layerInstance = this._layerCache[id];
                if (layerInstance) {
                    var _state = this.getLayerState(id);
                    _state.visibility = !_state.visibility;

                    if (layerInstance._currentImage) {
                        //ESRI Image Service layers have an IMG element
                        // that gets modified and replaced every map event (zoom/pan)
                        // so we can't just toggle classes like on other layers.
                        //Instead, we need to use the ESRI setOpacity method to toggle
                        // but need to update layer state as well.
                        layerInstance.setOpacity(_state.visibility ? 1 : 0);
                        _state.opacity = layerInstance.getOpacity();
                        return;
                    }

                    this.setLayerVisibility(layerInstance, _state.visibility);
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

        }, {
            key: "setLayerVisibility",
            value: function setLayerVisibility(layerInstance, visible) {

                if (layerInstance.setVisibility) {
                    //using custom method provided in src/layer/module.js
                    layerInstance.setVisibility(visible);
                } else if (layerInstance._container) {
                    //otherwise, using jquery on dom directly
                    var el = jQuery(layerInstance._container);
                    // if(visible) el.removeClass("invisible");
                    // else el.addClass('invisible');
                    el.css({ 'display': visible ? '' : 'none' });
                }

                this.touch('map:layer:changed');
            }

            /**
             *
             */

        }, {
            key: "updateLayerOpacity",
            value: function updateLayerOpacity(id, opacity) {

                var layerInstance = this._layerCache[id];

                //if layer id is for base layer...
                if (!layerInstance && this._baseLayerDef.id === id) {
                    layerInstance = this._baseLayer;
                }

                //adjust rendered leaflet layer
                opacity = this.setLayerOpacity(layerInstance, opacity);

                // if overlay layer, update state value
                var state = this.getLayerState(id);
                if (state) state.opacity = opacity;
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

        }, {
            key: "setLayerOpacity",
            value: function setLayerOpacity(layerInstance, opacity) {
                if (layerInstance && layerInstance.setOpacity) {
                    if (opacity > 1.0) opacity = opacity / 100.0;
                    layerInstance.setOpacity(opacity);
                    this.touch('map:layer:changed');
                }
                return opacity;
            }

            /**
             * @param {Object} GeoPlatform Layer instance
             * @return {L.Layer} Leaflet layer instance representing that layer or null
             */

        }, {
            key: "getLeafletLayerFor",
            value: function getLeafletLayerFor(gpLayer) {
                if (!gpLayer) return null;
                var leafletLayer = this._layerCache[gpLayer.id];
                return leafletLayer || null;
            }

            /**
             *
             */

        }, {
            key: "toggleGetFeatureInfo",
            value: function toggleGetFeatureInfo(layerId) {
                var layerInstance = this._layerCache[layerId];
                if (layerInstance) {
                    if (typeof layerInstance.enableGetFeatureInfo !== 'undefined') {
                        if (layerInstance.isGetFeatureInfoEnabled()) {
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

        }, {
            key: "getFeatures",
            value: function getFeatures() {
                if (this._featureLayer) {
                    return this._featureLayer.toGeoJSON().features;
                }
                return [];
            }

            /**
             * @param json geojson object or array of geojson objects
             */

        }, {
            key: "addFeatures",
            value: function addFeatures(json) {

                if (!json) return;

                if (typeof json.push !== 'undefined') {
                    //array of features
                    for (var i = 0; i < json.length; ++i) {
                        this.addFeature(json[i], false);
                    }this.touch('features:changed');
                } else if (json.features) {
                    this.addFeatures(json.features);
                } else {
                    //single feature
                    this.addFeature(json, true);
                }
            }

            /**
             * @param json geojson object
             */

        }, {
            key: "addFeature",
            value: function addFeature(json, fireEvent) {
                var _this6 = this;

                // var type = json.type;
                // var coordinates = json.coordinates;

                if (!L) {
                    throw new Error("Leaflet is not available");
                }

                if (!this._featureLayer) {

                    // _featureLayer = geoJson([], _geoJsonLayerOpts).addTo(_mapInstance);
                    this._featureLayer = L$1.featureGroup().addTo(this._mapInstance);
                }

                // _featureLayer.addData(json);
                var opts = jQuery.extend({}, this._geoJsonLayerOpts);
                L$1.geoJson(json, opts).eachLayer(function (l) {
                    return _this6.addFeatureLayer(l);
                });

                if (typeof fireEvent === 'undefined' || fireEvent === true) this.touch('features:changed');else this.touch();

                // console.log(JSON.stringify(_featureLayer.toGeoJSON()));
            }

            /**
             * @param featureJson object defining a GeoJSON feature
             */

        }, {
            key: "updateFeature",
            value: function updateFeature(featureJson) {
                var layer = this.getFeatureLayer(featureJson.properties.id);
                if (layer) {

                    layer.feature = featureJson;

                    //update style
                    layer.setStyle(featureJson.properties.style);

                    //rebind label in case that changed
                    var label = featureJson.properties.label || "Untitled " + featureJson.geometry.type + " Feature";
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

        }, {
            key: "replaceFeature",
            value: function replaceFeature(featureJson) {
                var _this7 = this;

                if (!L) {
                    throw new Error("Leaflet is not available");
                }

                //find existing layer for this feature
                var layer = this.getFeatureLayer(featureJson.properties.id);
                if (layer) {

                    //remove existing
                    this._featureLayer.removeLayer(layer);

                    //add replacement
                    L$1.geoJson(featureJson, this._geoJsonLayerOpts).eachLayer(function (l) {
                        return _this7.addFeatureLayer(l);
                    });

                    this.touch("map:feature:changed");
                }
            }

            /**
             * @param featureId identifier of feature to focus the map on
             */

        }, {
            key: "focusFeature",
            value: function focusFeature(featureId) {
                var layer = this.getFeatureLayer(featureId);
                if (layer) {
                    if (typeof layer.getBounds !== 'undefined') {
                        var extent = layer.getBounds();
                        this._mapInstance.fitBounds(extent);
                    } else if (typeof layer.getLatLng !== 'undefined') {
                        var latLng = layer.getLatLng();
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

        }, {
            key: "removeFeature",
            value: function removeFeature(featureId) {
                var layer = this.getFeatureLayer(featureId);
                if (layer && this._featureLayer) {
                    this._featureLayer.removeLayer(layer);
                    this.touch('features:changed');
                }
            }

            /**
             *
             */

        }, {
            key: "removeFeatures",
            value: function removeFeatures() {
                if (this._featureLayer) {
                    this._featureLayer.clearLayers();
                    this.touch("features:changed");
                }
            }

            /**
             *
             */

        }, {
            key: "getFeatureLayer",
            value: function getFeatureLayer(featureId) {
                if (!this._featureLayer) return null;

                var features = this._featureLayer.getLayers();
                for (var i = 0; i < features.length; ++i) {
                    if (features[i].feature.properties.id === featureId) {
                        return features[i];
                    }
                }
                return null;
            }
        }, {
            key: "toggleFeaturesLayer",
            value: function toggleFeaturesLayer() {
                if (!this._featureLayer) return false; //ignore if not rendered yet

                this._featureLayerVisible = !this._featureLayerVisible;
                this.setFeatureLayerVisibility(this._featureLayer, this._featureLayerVisible);
                return this._featureLayerVisible;
            }

            /**
             * @param {L.Feature} feature - Leaflet feature instance
             * @param {boolean} visibility - flag
             */

        }, {
            key: "setFeatureVisibility",
            value: function setFeatureVisibility(feature, visibility) {
                this.setFeatureLayerVisibility(feature, visibility);
            }
        }, {
            key: "getFeaturesLayerVisibility",
            value: function getFeaturesLayerVisibility() {
                return this._featureLayerVisible;
            }

            /*
             * method for adding feature layers to the map
             * when these layers may be layer groups.
             * finds leaf node layers and adds them to the
             * map's feature group
             */

        }, {
            key: "addFeatureLayer",
            value: function addFeatureLayer(layer) {
                this._addFeatureLayer(layer);
                this.touch("features:changed");
            }

            /**
             * Internal method, use 'addFeatureLayer' instead
             * @param {Object} layer
             */

        }, {
            key: "_addFeatureLayer",
            value: function _addFeatureLayer(layer) {
                var _this8 = this;

                if (!L) {
                    throw new Error("Leaflet is not available");
                }
                if (!layer.feature && layer instanceof L$1.LayerGroup) {
                    layer.eachLayer(function (child) {
                        _this8._addFeatureLayer(child);
                    });
                } else {
                    this._featureLayer.addLayer(layer);
                }
            }

            //toggle visibility of parent feature layer

        }, {
            key: "setFeatureLayerVisibility",
            value: function setFeatureLayerVisibility(layer, visibility) {
                var _this9 = this;

                if (!layer) return;
                this._featureLayerVisible = visibility;

                if (layer.getLayers) {
                    layer.getLayers().each(function (child) {
                        _this9.setFeatureLayerVisibility(child, visibility);
                    });
                } else {
                    var container = layer._container || layer._path;
                    if (container) container.style.display = visibility ? '' : 'none';
                }
            }

            /* ==============================================
               Map lifecycle operations
               ============================================== */

            /**
             * @param {Object} metadata
             * @return {Promise} resolving persisted map
             */

        }, {
            key: "save",
            value: function save(metadata) {
                return this.saveMap(metadata);
            }

            /**
             * @param md object containing metadata properties for map
             */

        }, {
            key: "saveMap",
            value: function saveMap(md) {
                var _this10 = this;

                var metadata = md || {};

                //add GeoPlatformMap resource type if not already present
                var gpMapType = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
                metadata.resourceTypes = metadata.resourceTypes || [];
                if (metadata.resourceTypes.indexOf(gpMapType) < 0) metadata.resourceTypes.push(gpMapType);

                var content = this.getMapResourceContent(metadata);

                //ensure the two name properties line up
                if (content.title && content.title !== content.label) {
                    content.label = content.title;
                } else if (content.label && !content.title) {
                    content.title = content.label;
                }

                // console.log("Updating: " + JSON.stringify(map));
                return this.getService(ItemTypes.MAP).save(content).then(function (result) {

                    //track new map's info so we can update it with next save
                    if (!_this10._mapId) _this10._mapId = result.id;

                    _this10._mapDef = result;
                    _this10._defaultExtent = result.extent;
                    _this10.clean();
                    return result;
                }).catch(function (err) {
                    var e = new Error("MapInstance.saveMap() - " + "The requested map could not be saved because: " + err.message);
                    return Q.reject(e);
                });
            }

            /**
             * Retrieve a map's descriptor from the registry
             * @param {string} mapId identifier of map
             * @return {Promise} resolving the map object
             */

        }, {
            key: "fetchMap",
            value: function fetchMap(mapId) {
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

        }, {
            key: "loadMap",
            value: function loadMap(mapId) {
                var _this11 = this;

                return this.fetchMap(mapId).then(function (map) {

                    if (!map) {
                        throw new Error("The requested map came back null");
                    } else if (typeof map === 'string') {
                        throw new Error("The requested map came back as a string");
                    } else if (map.message) {
                        throw new Error("There was an error loading the requested map: " + map.message);
                    }

                    //loading a map by its ID, so we need to increment it's view count
                    if ('development' !== Config$2.env) {

                        setTimeout(function (map) {
                            //update view count
                            var views = map.statistics ? map.statistics.numViews || 0 : 0;
                            var patch = [{ op: 'replace', path: '/statistics/numViews', value: views + 1 }];
                            _this11.getService(ItemTypes.MAP).patch(map.id, patch)
                            // this.mapService.patch(map.id, patch)
                            .then(function (updated) {
                                map.statistics = updated.statistics;
                            }).catch(function (e) {
                                console.log("Error updating view count for map: " + e);
                            });
                        }, 1000, map);
                    }

                    //load the map into the viewer
                    _this11.loadMapFromObj(map);

                    return map;
                }).catch(function (err) {
                    var e = new Error("MapInstance.loadMap() - " + "The requested map could not be loaded because " + err.message);
                    return Q.reject(e);
                });
            }

            /**
             * Load a map from its descriptor as the current
             * map managed by this service
             * @param map object
             */

        }, {
            key: "loadMapFromObj",
            value: function loadMapFromObj(map) {
                var _this12 = this;

                // console.log("Loading Map Object");
                // console.log(map);

                this._mapId = map.id;
                this._mapDef = map;

                map.extent = map.extent || {};
                var west = isNaN(map.extent.minx) ? -179.0 : map.extent.minx * 1.0;
                var east = isNaN(map.extent.maxx) ? 179.0 : map.extent.maxx * 1.0;
                var south = isNaN(map.extent.miny) ? -89.0 : map.extent.miny * 1.0;
                var north = isNaN(map.extent.maxy) ? 89.0 : map.extent.maxy * 1.0;

                //ensure x,y is ordered correctly
                var t = void 0;
                if (west > east) {
                    t = Math.min(west, east);
                    east = map.extent.maxx = Math.max(west, east);
                    west = map.extent.minx = t;
                }
                if (south > north) {
                    t = Math.min(south, north);
                    north = map.extent.maxy = Math.max(south, north);
                    south = map.extent.miny = t;
                }

                //prevent out-of-bounds extents
                if (west < -180.0) west = -179.0;
                if (east > 180.0) east = 179.0;
                if (south < -90.0) south = -89.0;
                if (north > 90.0) north = 89.0;

                //set extent from loaded map
                this._defaultExtent = map.extent;
                var extent = map.extent;

                //remove existing layers
                this._mapInstance.eachLayer(function (l) {
                    _this12._mapInstance.removeLayer(l);
                });
                this._layerCache = {};
                this._layerStates = [];

                //set new base layer
                this.setBaseLayer(map.baseLayer);

                //add layers from loaded map
                this.addLayers(map.layers);

                //add features
                if (map.annotations && map.annotations.geoJSON) {
                    var fc = map.annotations.geoJSON;
                    if (fc.features) this.addFeatures(fc.features);else this.addFeatures([fc]);
                }

                this._mapInstance.fitBounds([[extent.miny, extent.minx], [extent.maxy, extent.maxx]]);

                this.clean();
                this.notify('map:loaded', map);
            }

            /**
             *
             */

        }, {
            key: "destroyMap",
            value: function destroyMap() {
                // console.log("Destroying Map");
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

        }, {
            key: "setAsNewMap",
            value: function setAsNewMap(mapToUse) {
                this._mapId = null;
                this._mapDef = mapToUse || this.initializeMapDefinition();
            }

            /* ==============================================
                Tool operations
               ============================================== */

        }, {
            key: "registerTool",
            value: function registerTool(id, tool) {
                this._tools[id] = tool;
            }
        }, {
            key: "unregisterTool",
            value: function unregisterTool(id) {
                this._tools[id] = null;
            }
        }, {
            key: "enableTool",
            value: function enableTool(id, finish) {
                if (!this._tools[id]) return false;
                this._tools[id].activate(function () {
                    this.notify('tool:disabled', id);
                });
                this.notify('tool:enabled', id);
            }

            /* ----------- MISC ------------ */

            //https://github.com/gsklee/ngStorage

        }, {
            key: "cacheMap",
            value: function cacheMap() {

                if (state.dirty) {
                    var map = this.getMapResourceContent();
                    //use exploded layer info
                    map.layers = this._layerStates.slice(0);
                    // $sessionStorage.map = map;
                }
            }
        }, {
            key: "restoreMap",
            value: function restoreMap() {}
            // if($sessionStorage.map) {
            //     console.log("Restoring cached map");
            //     let map = $sessionStorage.map;
            //     // console.log(JSON.stringify(map));
            //     $sessionStorage.map = null;
            //     this.loadMapFromObj(map);
            // }

            /* ---------------------------- */

        }]);

        return MapInstance;
    }(Listener);

    var cache = {};

    var MapFactory = {

        get: function get(key) {
            if (key && cache[key]) return cache[key];

            var instance = new MapInstance(key);
            cache[instance._key] = instance;
            return instance;
        },

        dispose: function dispose(key) {
            if (key) {
                cache[key].destroyMap();
                delete cache[key];
            } else {
                cache = null;
            }
        }
    };

    if (typeof Array.prototype.each === 'undefined') {
        Array.prototype.each = function (fn) {
            var arr = this,
                len = arr.length;
            for (var i = 0; i < len; ++i) {
                try {
                    fn(arr[i]);
                } catch (e) {
                    throw e;
                }
            }
        };
    }

    var index = {
        LoadingControl: loadingControl,
        MeasureControl: measureControl,
        MousePositionControl: positionControl,
        DefaultBaseLayer: DefaultBaseLayer,
        LayerFactory: LayerFactory,
        OSMLayerFactory: OSMLayerFactory,
        ESRIClusterFeatureLayer: featureLayer,
        ClusteredFeatureLayer: ClusteredFeatureLayer,
        clusteredFeatures: clusteredFeatures,
        geoJsonFeed: geoJsonFeed,
        FeatureLayer: FeatureLayer,
        WMS: WMS,
        wms: wms,
        WMST: WMST,
        wmst: wmst,
        WMTS: WMTS,
        wmts: wmts,
        ESRITileLayer: esriTileLayer,
        OSM: OSM,
        MapInstance: MapInstance,
        MapFactory: MapFactory,
        ServiceTypes: types,
        PopupTemplate: featurePopupTemplate,
        StyleResolver: featureStyleResolver
    };

    return index;

})));
//# sourceMappingURL=geoplatform.mapcore.js.map
