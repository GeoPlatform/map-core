"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Defines the L.GeoPlatform namespace object for later usage
 * in containing the various Leaflet extensions GeoPlatform
 * makes available
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jQuery", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, L, GeoPlatform) {
            return root.MousePositionControl = factory(jQuery, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MousePositionControl = factory(require("jquery"), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.MousePositionControl = factory(jQuery, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, L /*eaflet*/, GeoPlatform) {

    //(function(jQuery, L/*eaflet*/, GeoPlatform) {

    if (!L) throw new Error("Missing Leaflet");

    //if GeoPlatform extensions to Leaflet don't exist
    // create the container
    if (!L.GeoPlatform) L.GeoPlatform = {};

    if (typeof Array.prototype.each === 'undefined') {
        Array.prototype.each = function (fn) {
            var arr = this,
                len = arr.length;
            for (var i = 0; i < len; ++i) {
                try {
                    fn(arr[i]);
                } catch (e) {}
            }
        };
    }

    // })(jQuery, L/*eaflet*/, GeoPlatform);

    return L.GeoPlatform;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "GeoPlatform"], function (Q, GeoPlatform) {
            return root.ItemService = factory(Q, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemService = factory(require('q'), require('GeoPlatform'));
    } else {
        GeoPlatform.ItemService = factory(Q, GeoPlatform);
    }
})(undefined || window, function (Q, GeoPlatform) {

    /**
     * ItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      GeoPlatform.ItemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      GeoPlatform.ItemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      GeoPlatform.ItemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      GeoPlatform.ItemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      GeoPlatform.ItemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     */
    var ItemService = function () {
        function ItemService() {
            _classCallCheck(this, ItemService);

            this.baseUrl = GeoPlatform.ualUrl + '/api/items';
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @return {Promise} resolving Item object or an error
         */


        _createClass(ItemService, [{
            key: "get",
            value: function get(id) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {string} id - identifier of item to delete
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }
        }, {
            key: "search",
            value: function search(arg) {

                return Q.reject(new Error("Must use a subclass of ItemService"));
            }
        }]);

        return ItemService;
    }();

    return ItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "ItemService"], function (jQuery, Q, GeoPlatform, ItemService) {
            return root.JQueryItemService = factory(jQuery, Q, GeoPlatform, ItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryItemService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('ItemService'));
    } else {
        GeoPlatform.JQueryItemService = factory(jQuery, Q, GeoPlatform, GeoPlatform.ItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, ItemService) {

    /**
     * JQuery ItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      GeoPlatform.ItemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      GeoPlatform.ItemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      GeoPlatform.ItemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      GeoPlatform.ItemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      GeoPlatform.ItemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     */
    var JQueryItemService = function (_ItemService) {
        _inherits(JQueryItemService, _ItemService);

        function JQueryItemService() {
            _classCallCheck(this, JQueryItemService);

            return _possibleConstructorReturn(this, (JQueryItemService.__proto__ || Object.getPrototypeOf(JQueryItemService)).call(this));
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @return {Promise} resolving Item object or an error
         */


        _createClass(JQueryItemService, [{
            key: "get",
            value: function get(id) {
                var d = Q.defer();
                var opts = {
                    method: "GET",
                    url: this.baseUrl + '/' + id,
                    dataType: 'json',
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ItemService.save() - Error fetching item: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj) {
                var d = Q.defer();
                var opts = {
                    method: "POST",
                    url: this.baseUrl,
                    dataType: 'json',
                    data: itemObj,
                    processData: false,
                    contentType: 'application/json',
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ItemService.save() - Error saving item: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                if (itemObj.id) {
                    opts.method = "PUT";
                    opts.url += '/' + itemObj.id;
                }
                jQuery.ajax(opts);
                return d.promise;
            }

            /**
             * @param {string} id - identifier of item to delete
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id) {
                var d = Q.defer();
                var opts = {
                    method: "DELETE",
                    url: this.baseUrl + '/' + id,
                    success: function success(data) {
                        d.resolve(true);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ItemService.save() - Error deleting item: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch2) {
                var d = Q.defer();
                var opts = {
                    method: "PATCH",
                    url: this.baseUrl + '/' + id,
                    dataType: 'json',
                    data: _patch2,
                    processData: false,
                    contentType: 'application/json',
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ItemService.save() - Error patching item: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }
        }, {
            key: "search",
            value: function search(arg) {

                var params = arg;

                if (arg && typeof arg.getQuery !== 'undefined') {
                    //if passed a GeoPlatform.Query object,
                    // convert to parameters object
                    params = arg.getQuery();
                }

                var d = Q.defer();
                var opts = {
                    method: "GET",
                    url: this.baseUrl,
                    dataType: 'json',
                    data: params || {},
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ItemService.search() - Error searching items: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }
        }]);

        return JQueryItemService;
    }(ItemService);

    return JQueryItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["Q", "angular", "GeoPlatform", "ItemService"], function (Q, angular, GeoPlatform, ItemService) {
            return root.NGItemService = factory(Q, angular, GeoPlatform, ItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGItemService = factory(require('Q'), require('angular'), require('GeoPlatform'), require('ItemService'));
    } else {
        GeoPlatform.NGItemService = factory(Q, angular, GeoPlatform, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, ItemService) {

    /**
     * NGItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      GeoPlatform.ItemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      GeoPlatform.ItemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      GeoPlatform.ItemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      GeoPlatform.ItemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      GeoPlatform.ItemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     */
    var NGItemService = function () {
        function NGItemService() {
            _classCallCheck(this, NGItemService);

            if (typeof angular === 'undefined') throw new Error("Angular not defined");
            this.baseUrl = GeoPlatform.ualUrl + '/api/items';
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @return {Promise} resolving Item object or an error
         */


        _createClass(NGItemService, [{
            key: "get",
            value: function get(id) {
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http.get(this.baseUrl + '/' + id).then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    var m = "GeoPlatform.NGItemService.get() - Error fetching item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj) {
                var opts = {
                    method: "POST",
                    url: this.baseUrl,
                    data: itemObj
                };
                if (itemObj.id) {
                    opts.method = "PUT";
                    opts.url += '/' + itemObj.id;
                }
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    var m = "GeoPlatform.NGItemService.save() - Error saving item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} id - identifier of item to delete
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id) {
                var opts = {
                    method: "DELETE",
                    url: this.baseUrl + '/' + id
                };
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).catch(function (e) {
                    var m = "GeoPlatform.NGItemService.remove() - Error deleting item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch3) {
                var opts = {
                    method: "PATCH",
                    url: this.baseUrl + '/' + id,
                    data: _patch3
                };
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    var m = "GeoPlatform.NGItemService.patch() - Error patching item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }, {
            key: "search",
            value: function search(arg) {

                var params = arg;

                if (arg && typeof arg.getQuery !== 'undefined') {
                    //if passed a GeoPlatform.Query object,
                    // convert to parameters object
                    params = arg.getQuery();
                }

                var opts = {
                    method: "GET",
                    url: this.baseUrl,
                    data: params || {}
                };
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    var m = "GeoPlatform.NGItemService.search() - Error searching items: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGItemService;
    }();

    return NGItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, L, GeoPlatform) {
            return root.ESRITileLayer = factory(jQuery, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ESRITileLayer = factory(require("jquery"), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.ESRITileLayer = factory(jQuery, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, L /*eaflet*/, GeoPlatform) {

    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    L.GeoPlatform.featurePopupTemplate = function (feature) {

        var props = Object.keys(feature.properties);

        var pFn = function pFn(list, names) {
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
            if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                for (var p in value) {
                    result += '<div>' + '<span class="label">' + prop + '.' + p + '</span>' + '<span class="value">' + value[p] + '</span>' + '</div>';
                }
            } else {
                result += '<div>' + '<span class="label">' + prop + '</span>' + '<span class="value">' + value + '</span>' + '</div>';
            }
        }
        result += '</div>';
        return result;
    };

    return L.GeoPlatform.featurePopupTemplate;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["GeoPlatform"], function (GeoPlatform) {
            return root.Query = factory(GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.Query = factory(require('GeoPlatform'));
    } else {
        GeoPlatform.Query = factory(GeoPlatform);
    }
})(undefined || window, function (GeoPlatform) {
    var Query = function () {
        function Query() {
            _classCallCheck(this, Query);

            //fields list sent to MDR in order to have these properties for display in search results
            this._fields = ['created', 'modified', 'publishers', 'themes', 'description', 'extent'];

            //facets list sent to MDR in order to get aggregation numbers
            this._facets = ['types', 'themes', 'publishers', 'serviceTypes', 'schemes', 'visibility', 'createdBy'];

            this.sortOptions = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

            //list of this.query variables for mapping to parameters
            this.parameters = {
                TYPES: 'type',
                THEMES_ID: 'theme.id',
                THEMES_LABEL: 'theme.label',
                THEMES_URI: 'theme.uri',
                PUBLISHERS: 'publisher.id',
                PUBLISHERS_LABEL: 'publisher.label',
                PUBLISHERS_URI: 'publisher.uri',
                CREATED_BY: 'createdBy',
                CONTRIBUTED_BY: 'contributedBy',
                CREATOR: 'creator.id',
                SVC_TYPES: 'serviceType.id',
                SCHEMES_ID: 'scheme.id',
                SCHEMES_LABEL: 'scheme.label',
                SCHEMES_URI: 'scheme.uri',
                VISIBILITY: 'visibility',
                QUERY: 'q',
                KEYWORDS: 'keyword',
                EXTENT: 'extent',
                MODIFIED_BEFORE: 'modified.max',
                MODIFIED_AFTER: 'modified.min',
                BEGINS: 'startDate.min',
                ENDS: 'endDate.max',
                RESOURCE_TYPE: 'resourceType'
            };

            this.query = this.defaultQuery = {
                start: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: this._fields,
                includeFacets: this._facets
            };
        }

        _createClass(Query, [{
            key: "getQuery",
            value: function getQuery() {
                var result = {};
                for (var prop in this.query) {
                    var value = this.query[prop];
                    if (typeof value.push !== 'undefined') {
                        value = value.join(',');
                    }
                    result[prop] = value;
                }
                return result;
            }
        }, {
            key: "parameter",
            value: function parameter(name, value) {
                this.setParameter(name, value);
                return this;
            }
        }, {
            key: "setParameter",
            value: function setParameter(name, value) {
                this.query[name] = value;
            }
        }, {
            key: "getParameter",
            value: function getParameter(key) {
                return this.getParameter(ke);
            }
        }, {
            key: "applyParameters",
            value: function applyParameters(obj) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        this.setParameter(p, obj[p]);
                    }
                }
            }
        }, {
            key: "q",
            value: function q(text) {
                this.setQ(text);
                return this;
            }

            /**
             * @param {string} text - free text query
             */

        }, {
            key: "setQ",
            value: function setQ(text) {
                this.setParameter(this.parameters.QUERY, text);
            }
        }, {
            key: "getQ",
            value: function getQ() {
                return this.getParameter(this.parameters.QUERY);
            }
        }, {
            key: "keywords",
            value: function keywords(text) {
                this.setQ(text);
                return this;
            }

            /**
             * @param {string} text - free text query
             */

        }, {
            key: "setKeywords",
            value: function setKeywords(text) {
                if (text && typeof text.push !== 'undefined') text = text.join(',');
                this.setParameter(this.parameters.KEYWORDS, text);
            }
        }, {
            key: "getKeywords",
            value: function getKeywords() {
                return this.getParameter(this.parameters.KEYWORDS);
            }
        }, {
            key: "types",
            value: function types(_types) {
                this.setTypes(_types);
                return this;
            }

            /**
             * @param {array[string]} types - name of class(es) to request
             */

        }, {
            key: "setTypes",
            value: function setTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(this.parameters.TYPES, types);
            }
        }, {
            key: "getTypes",
            value: function getTypes() {
                return this.getParameter(this.parameters.TYPES);
            }
        }, {
            key: "createdBy",
            value: function createdBy(user) {
                this.setCreatedBy(user);
                return this;
            }

            /**
             * @param {string} user - username
             * @param {boolean} fireUpdate -
             */

        }, {
            key: "setCreatedBy",
            value: function setCreatedBy(user) {
                this.setParameter(this.parameters.CREATED_BY, user);
            }
        }, {
            key: "getCreatedBy",
            value: function getCreatedBy() {
                return this.getParameter(this.parameters.CREATED_BY);
            }
        }, {
            key: "themes",
            value: function themes(_themes, key) {
                this.setThemes(_themes);
                return this;
            }

            /**
             * @param {array[string]} themes - themes to constrain by
             * @param {string} key - optional, theme property to use
             */

        }, {
            key: "setThemes",
            value: function setThemes(themes, key) {
                if (themes && themes.push === 'undefined') themes = [themes];
                var param = this.parameters.THEMES_ID;
                if (key && 'label' === key) param = this.parameters.THEMES_LABEL;else if (key && 'uri' === key) param = this.parameters.THEMES_URI;
                this.setParameter(param, themes);
            }
        }, {
            key: "getThemes",
            value: function getThemes() {
                return this.getParameter(this.parameters.THEMES);
            }
        }, {
            key: "publishers",
            value: function publishers(_publishers, key) {
                this.setPublishers(_publishers);
                return this;
            }

            /**
             * @param {array[string]} publishers - publishing orgs to constrain by
             * @param {string} key - optional, publisher property to use
             */

        }, {
            key: "setPublishers",
            value: function setPublishers(publishers, key) {
                if (publishers && publishers.push === 'undefined') publishers = [publishers];
                var param = this.parameters.PUBLISHERS_ID;
                if (key && 'label' === key) param = this.parameters.PUBLISHERS_LABEL;else if (key && 'uri' === key) param = this.parameters.PUBLISHERS_URI;
                this.setParameter(param, publishers);
            }
        }, {
            key: "getPublishers",
            value: function getPublishers() {
                return this.getParameter(this.parameters.PUBLISHERS);
            }
        }, {
            key: "serviceTypes",
            value: function serviceTypes(types) {
                this.setServiceTypes(types);
                return this;
            }

            /**
             * @param {array[string]} types - ids
             */

        }, {
            key: "setServiceTypes",
            value: function setServiceTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(this.parameters.SERVICE_TYPES, types);
            }
        }, {
            key: "getServiceTypes",
            value: function getServiceTypes() {
                return this.getParameter(this.parameters.SERVICE_TYPES);
            }
        }, {
            key: "schemes",
            value: function schemes(_schemes, key) {
                this.setSchemes(_schemes);
                return this;
            }

            /**
             * @param {array[string]} schemes - ids
             * @param {string} key - optional, scheme property to use
             */

        }, {
            key: "setSchemes",
            value: function setSchemes(schemes, key) {
                if (schemes && schemes.push === 'undefined') schemes = [schemes];
                var param = this.parameters.SCHEMES_ID;
                if (key && 'label' === key) param = this.parameters.SCHEMES_LABEL;else if (key && 'uri' === key) param = this.parameters.SCHEMES_URI;
                this.setParameter(param, schemes);
            }
        }, {
            key: "getSchemes",
            value: function getSchemes() {
                return this.getParameter(this.parameters.SCHEMES);
            }
        }, {
            key: "visibility",
            value: function visibility(vis) {
                this.setVisibility(vis);
                return this;
            }

            /**
             * @param {string} visibility - one of 'public' or 'private'
             * @param {boolean} fireUpdate
             */

        }, {
            key: "setVisibility",
            value: function setVisibility(visibility) {
                this.setParameter(this.parameters.VISIBILITY, visibility);
            }
        }, {
            key: "getVisibility",
            value: function getVisibility() {
                this.getParameter(this.parameters.VISIBILITY);
            }
        }, {
            key: "modified",
            value: function modified(date, beforeOrAfter) {
                this.setModified(date, beforeOrAfter);
                return this;
            }

            /**
             * @param {Date} date - date to compare against
             * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
             * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
             */

        }, {
            key: "setModified",
            value: function setModified(date, beforeOrAfter) {

                //if no date was supplied, consider it "unset" for both properties
                if (!date) {
                    this.setParameter(this.parameters.MODIFIED_BEFORE, null);
                    this.setParameter(this.parameters.MODIFIED_AFTER, null);
                    return;
                }

                var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
                var prop = dir ? this.parameters.MODIFIED_BEFORE : this.parameters.MODIFIED_AFTER; //property being set
                var oppProp = dir ? this.parameters.MODIFIED_AFTER : this.parameters.MODIFIED_BEFORE; //unset opposite property
                var arg = date && date.getTime ? date.getTime() : date;

                this.setParameter(oppProp, null);
                this.setParameter(prop, arg);
            }
        }, {
            key: "getModified",
            value: function getModified() {
                return this.getParameter(this.parameters.MODIFIED_BEFORE) || this.getParameter(this.parameters.MODIFIED_AFTER);
            }
        }, {
            key: "extent",
            value: function extent(bbox) {
                this.setExtent(bbox);
                return this;
            }

            /**
             * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
             */

        }, {
            key: "setExtent",
            value: function setExtent(bbox) {
                if (bbox && typeof bbox.toBboxString !== 'undefined') bbox = bbox.toBboxString();
                this.setParameter(this.parameters.EXTENT, bbox);
            }

            /**
             * @return {string} bbox string or null if not set
             */

        }, {
            key: "getExtent",
            value: function getExtent() {
                return this.getParameter(this.parameters.EXTENT);
            }
        }, {
            key: "begins",
            value: function begins(date) {
                this.setBegins(date);
                return this;
            }
        }, {
            key: "setBeginDate",
            value: function setBeginDate(date) {
                if (date && date instanceof Date) date = date.getTime();
                this.setParameter(this.parameters.BEGINS, date);
            }
        }, {
            key: "getBeginDate",
            value: function getBeginDate() {
                var date = this.getParameter(this.parameter.BEGINS);
                if (date) date = new Date(date);
                return date;
            }
        }, {
            key: "ends",
            value: function ends(date) {
                this.setEnds(date);
                return this;
            }
        }, {
            key: "setEndDate",
            value: function setEndDate(date) {
                if (date && date instanceof Date) date = date.getTime();
                this.setParameter(this.parameters.ENDS, date);
            }
        }, {
            key: "getEndDate",
            value: function getEndDate() {
                var date = this.getParameter(this.parameter.ENDS);
                if (date) date = new Date(date);
                return date;
            }
        }, {
            key: "between",
            value: function between(begin, end) {
                this.setBetween(begin, end);
                return this;
            }
        }, {
            key: "setBetween",
            value: function setBetween(begin, end) {
                this.begins(begin);
                this.ends(end);
            }
        }, {
            key: "resourceTypes",
            value: function resourceTypes(types) {
                this.setResourceTypes(types);
                return this;
            }
        }, {
            key: "setResourceTypes",
            value: function setResourceTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(this.parameters.RESOURCE_TYPE, types);
            }
        }, {
            key: "getResourceTypes",
            value: function getResourceTypes() {
                return this.getParameter(this.parameters.RESOURCE_TYPE);
            }
        }, {
            key: "facets",
            value: function facets(names) {
                this.setFacets(names);
                return this;
            }

            /*
             * @param {array[string]} names - names of facets
             */

        }, {
            key: "setFacets",
            value: function setFacets(names) {
                this.query.includeFacets = names;
            }
        }, {
            key: "getFacets",
            value: function getFacets() {
                return this.query.includeFacets;
            }
        }, {
            key: "fields",
            value: function fields(_fields) {
                this.setFields(_fields);
                return this;
            }

            /**
             * @param {array[string]} fields - list of field names to request for each search result
             */

        }, {
            key: "setFields",
            value: function setFields(fields) {
                if (fields && typeof fields.push === 'undefined') fields = [fields];
                this.query.fields = fields;
            }
        }, {
            key: "getFields",
            value: function getFields() {
                return this.query.fields;
            }

            /**
             * @param {int} start - beginning index of results to request
             */

        }, {
            key: "start",
            value: function start(_start) {
                this.setStart(_start);
                return this;
            }
        }, {
            key: "setStart",
            value: function setStart(start) {
                if (isNaN(start)) return;
                this.query.start = start;
            }
        }, {
            key: "getStart",
            value: function getStart() {
                return this.query.start;
            }

            /**
             * @param {int} page - page of results to fetch
             */

        }, {
            key: "page",
            value: function page(_page) {
                this.setPage(_page);
                return this;
            }
        }, {
            key: "setPage",
            value: function setPage(page) {
                if (isNaN(page)) return;
                this.query.start = page * this.query.size;
            }
        }, {
            key: "getPage",
            value: function getPage() {
                return this.query.start;
            }

            /**
             * @param {int} size - page size to request
             */

        }, {
            key: "pageSize",
            value: function pageSize(size) {
                this.setPageSize(size);
                return this;
            }
        }, {
            key: "setPageSize",
            value: function setPageSize(size) {
                if (isNaN(size)) return;
                this.query.size = size;

                //find out which page in the new scheme the current first-result of current page
                // will show up in, and set start so that it shows up with the new page size
                var page = Math.floor(this.query.start * 1 / this.query.size * 1);
                this.query.start = page * (this.query.size * 1);
            }
        }, {
            key: "getPageSize",
            value: function getPageSize() {
                return this.query.size;
            }

            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "sort",
            value: function sort(_sort, order) {
                this.setSort(_sort, order);
                return this;
            }

            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "setSort",
            value: function setSort(sort, order) {
                order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
                if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
                this.query.sort = sort;
            }
        }, {
            key: "getSort",
            value: function getSort() {
                return this.query.sort;
            }
        }, {
            key: "getSortField",
            value: function getSortField() {
                return this.query.sort.split(',')[0];
            }
        }, {
            key: "getSortOrder",
            value: function getSortOrder() {
                return this.query.sort.split(',')[1] === 'asc';
            }

            /**
             * @return {array} list of key-value pairs of sort options
             */

        }, {
            key: "getSortOptions",
            value: function getSortOptions() {
                return this.sortOptions.slice(0);
            }

            /**
             *
             */

        }, {
            key: "clear",
            value: function clear() {
                this.query = this.defaultQuery;
            }
        }]);

        return Query;
    }();

    // GeoPlatform.Query = Query;

    GeoPlatform.QueryFactory = function () {
        return new Query();
    };

    return Query;
});

/**
 *
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "L" /*eaflet*/, "GeoPlatform"], function (Q, L, GeoPlatform) {
            return root.FeatureStyleResolver = factory(Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.FeatureStyleResolver = factory(require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.FeatureStyleResolver = factory(Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (Q, L /*eaflet*/, GeoPlatform) {

    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    /**
     * Fetches style information from GeoPlatform UAL
     * @param {string} id - identifier of layer to resolve style for
     */
    L.GeoPlatform.FeatureStyleResolver = function (id) {
        var deferred = Q.defer();
        jQuery.ajax({
            url: GeoPlatform.ualUrl + '/api/layers/' + id + '/style',
            dataType: 'json',
            success: function success(data) {
                deferred.resolve(data);
            },
            error: function error(xhr, status, message) {
                var em = "L.GeoPlatform.FeatureStyleResolver() -\n                   Error loading style information for layer " + id + " : " + message;
                var error = new Error(em);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

    return L.GeoPlatform.FeatureStyleResolver;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryServiceService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryServiceService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryServiceService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    // ( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryServiceService = function (_JQueryItemService) {
        _inherits(JQueryServiceService, _JQueryItemService);

        function JQueryServiceService() {
            _classCallCheck(this, JQueryServiceService);

            var _this2 = _possibleConstructorReturn(this, (JQueryServiceService.__proto__ || Object.getPrototypeOf(JQueryServiceService)).call(this));

            _this2.baseUrl = GeoPlatform.ualUrl + '/api/services';
            return _this2;
        }

        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @return {Promise} resolving service metadata
         */


        _createClass(JQueryServiceService, [{
            key: "about",
            value: function about(service) {

                if (!service) {
                    var err = new Error("Must provide service to get metadata about");
                    return Q.reject(err);
                }

                var d = Q.defer();
                var opts = {
                    method: "POST",
                    url: this.baseUrl + '/about',
                    dataType: 'json',
                    data: service,
                    processData: false,
                    contentType: 'application/json',
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.ServiceService.about() -\n                        Error describing service: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }
        }]);

        return JQueryServiceService;
    }(JQueryItemService);

    return JQueryServiceService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGServiceService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGServiceService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGServiceService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.NGItemService
     */

    var NGServiceService = function (_NGItemService) {
        _inherits(NGServiceService, _NGItemService);

        function NGServiceService() {
            _classCallCheck(this, NGServiceService);

            var _this3 = _possibleConstructorReturn(this, (NGServiceService.__proto__ || Object.getPrototypeOf(NGServiceService)).call(this));

            _this3.baseUrl = GeoPlatform.ualUrl + '/api/services';
            return _this3;
        }

        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @return {Promise} resolving service metadata
         */


        _createClass(NGServiceService, [{
            key: "about",
            value: function about(service) {

                if (!service) {
                    var err = new Error("Must provide service to get metadata about");
                    return Q.reject(err);
                }

                var opts = {
                    method: "POST",
                    url: this.baseUrl + '/about',
                    data: service
                };

                var $http = angular.injector().get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).catch(function (e) {
                    var m = "GeoPlatform.NGServiceService.get() - Error describing service: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGServiceService;
    }(NGItemService);

    return NGServiceService;
});

/*
 * Fetches the set of supported Service types from UAL and
 * makes them available via GeoPlatform.ServiceTypes
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.ServiceTypes = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ServiceTypes = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.ServiceTypes = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    var ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
    var esriExpr = /Esri REST ([A-Za-z]+) Service/;
    var keyFn = function keyFn(expr, str) {
        var m = expr.exec(str);
        return m && m.length ? m[1] : null;
    };

    var types = {};

    var query = GeoPlatform.QueryFactory().types('dct:Standard').resourceTypes('ServiceType').pageSize(50);

    new JQueryItemService().search(query).then(function (data) {

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

    // GeoPlatform.ServiceTypes = types;

    // }) (jQuery, Q, GeoPlatform);

    return types;
});

/*
 * L.Control.Loading is a control that shows a loading indicator when tiles are
 * loading or when map-related AJAX requests are taking place.
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["L" /*eaflet*/], function (L) {
            return root.LoadingControl = factory(L);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.LoadingControl = factory(require('L'));
    } else {
        GeoPlatform.LoadingControl = factory(L /*eaflet*/);
    }
})(undefined || window, function (L /*eaflet*/) {

    //(function (L/*eaflet*/) {

    function defineLeafletLoading(L) {
        L.Control.Loading = L.Control.extend({
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
                L.setOptions(this, options);
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
                    container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
                }
                this._indicator = L.DomUtil.create('a', classes, container);
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
                    return L.Control.prototype.removeFrom.call(this, map);
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
                L.DomUtil.addClass(this._indicator, 'is-loading');

                // If zoomControl exists, make the zoom-out button not last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                    } else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.removeClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                    }
                }
            },

            _hideIndicator: function _hideIndicator() {
                // Hide loading indicator
                L.DomUtil.removeClass(this._indicator, 'is-loading');

                // If zoomControl exists, make the zoom-out button last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
                    } else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.addClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
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

        L.Map.addInitHook(function () {
            if (this.options.loadingControl) {
                this.loadingControl = new L.Control.Loading();
                this.addControl(this.loadingControl);
            }
        });

        L.Control.loading = function (options) {
            return new L.Control.Loading(options);
        };
    }

    if (typeof define === 'function' && define.amd) {
        // Try to add leaflet.loading to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineLeafletLoading(L);
        });
    } else {
        // Else use the global L
        defineLeafletLoading(L);
    }

    // }) (L/*eaflet*/);

    return L.Control.Loading;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["L" /*eaflet*/], function (L) {
            return root.MeasureControl = factory(L);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MeasureControl = factory(require('L'));
    } else {
        GeoPlatform.MeasureControl = factory(L /*eaflet*/);
    }
})(undefined || window, function (L /*eaflet*/) {

    //(function (L/*eaflet*/) {

    L.Control.Measure = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function onAdd(map) {
            var className = 'leaflet-control-zoom leaflet-bar leaflet-control',
                container = L.DomUtil.create('div', className);

            this._createButton('&#8674;', 'Measure', 'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom', container, this._toggleMeasure, this);

            return container;
        },

        _createButton: function _createButton(html, title, className, container, fn, context) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation).on(link, 'click', L.DomEvent.preventDefault).on(link, 'click', fn, context).on(link, 'dblclick', L.DomEvent.stopPropagation);

            return link;
        },

        _toggleMeasure: function _toggleMeasure() {
            this._measuring = !this._measuring;

            if (this._measuring) {
                L.DomUtil.addClass(this._container, 'leaflet-control-measure-on');
                this._startMeasuring();
            } else {
                L.DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
                this._stopMeasuring();
            }
        },

        _startMeasuring: function _startMeasuring() {
            this._oldCursor = this._map._container.style.cursor;
            this._map._container.style.cursor = 'crosshair';

            this._doubleClickZoom = this._map.doubleClickZoom.enabled();
            this._map.doubleClickZoom.disable();

            L.DomEvent.on(this._map, 'mousemove', this._mouseMove, this).on(this._map, 'click', this._mouseClick, this).on(this._map, 'dblclick', this._finishPath, this).on(document, 'keydown', this._onKeyDown, this);

            if (!this._layerPaint) {
                this._layerPaint = L.layerGroup().addTo(this._map);
            }

            if (!this._points) {
                this._points = [];
            }
        },

        _stopMeasuring: function _stopMeasuring() {
            this._map._container.style.cursor = this._oldCursor;

            L.DomEvent.off(document, 'keydown', this._onKeyDown, this).off(this._map, 'mousemove', this._mouseMove, this).off(this._map, 'click', this._mouseClick, this).off(this._map, 'dblclick', this._mouseClick, this);

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
                this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], {
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
                this._layerPaintPath = L.polyline([this._lastPoint], {
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

            this._lastCircle = new L.CircleMarker(e.latlng, {
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
            var icon = L.divIcon({
                className: 'leaflet-measure-tooltip',
                iconAnchor: [-5, -5]
            });
            this._tooltip = L.marker(position, {
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

    L.Map.mergeOptions({
        measureControl: false
    });

    L.Map.addInitHook(function () {
        if (this.options.measureControl) {
            this.measureControl = new L.Control.Measure();
            this.addControl(this.measureControl);
        }
    });

    L.control.measure = function (options) {
        return new L.Control.Measure(options);
    };

    // }) (L/*eaflet*/);

    return L.Control.Measure;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["L" /*eaflet*/], function (L) {
            return root.MousePositionControl = factory(L);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MousePositionControl = factory(require('L'));
    } else {
        GeoPlatform.MousePositionControl = factory(L /*eaflet*/);
    }
})(undefined || window, function (L /*eaflet*/) {

    //(function (L/*eaflet*/) {

    L.Control.MousePosition = L.Control.extend({
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
            this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
            L.DomEvent.disableClickPropagation(this._container);
            map.on('mousemove', this._onMouseMove, this);
            this._container.innerHTML = this.options.emptyString;
            return this._container;
        },

        onRemove: function onRemove(map) {
            map.off('mousemove', this._onMouseMove);
        },

        _onMouseMove: function _onMouseMove(e) {
            var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
            var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
            var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
            var prefixAndValue = this.options.prefix + ' ' + value;
            this._container.innerHTML = prefixAndValue;
        }

    });

    L.Map.mergeOptions({
        positionControl: false
    });

    L.Map.addInitHook(function () {
        if (this.options.positionControl) {
            this.positionControl = new L.Control.MousePosition();
            this.addControl(this.positionControl);
        }
    });

    L.control.mousePosition = function (options) {
        return new L.Control.MousePosition(options);
    };

    // }) (L/*eaflet*/);

    return L.Control.MousePosition;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.WMSLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.WMSLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.WMSLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    L.GeoPlatform.WMS = L.TileLayer.WMS.extend({

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
            L.TileLayer.WMS.prototype.onRemove.call(this, map);
        },

        getFeatureInfo: function getFeatureInfo(evt) {
            // Make an AJAX request to the server and hope for the best
            var url = this.getFeatureInfoUrl(evt.latlng),
                showResults = L.Util.bind(this.showGetFeatureInfo, this),
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

            // return this._url + L.Util.getParamString(params, this._url, true);
            var url = '/api/layers/' + this.wmsParams.wmvId + '/feature';
            return GeoPlatform.ualUrl + url + L.Util.getParamString(params, url, true);
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
            L.popup({ maxWidth: 800 }).setLatLng(latlng).setContent(content).openOn(this._map);
        }

    });

    L.GeoPlatform.wms = function (layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "L.GeoPlatform.wms() -\n                      Cannot create leaflet layer for GP Layer:\n                      layer has no service";
            throw new Error(msg);
        }

        var url = service.href;
        var format = layer.supportedFormats ? layer.supportedFormats[0] : "image/png";

        var opts = {
            layers: layer.layerName,
            transparent: true,
            format: format,
            wmvId: layer.id
        };
        if (GeoPlatform.leafletPane) opts.pane = GeoPlatform.leafletPane;

        return new L.GeoPlatform.WMS(url, opts);
    };

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMS;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.WMTSLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.WMTSLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.WMTSLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    /*
     * inspired by and uses code from https://github.com/mylen/leaflet.TileLayer.WMTS
     */
    L.GeoPlatform.WMTS = L.TileLayer.extend({

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
            var wmtsParams = L.extend({}, this.defaultWmtsParams);
            var tileSize = options.tileSize || this.options.tileSize;
            if (options.detectRetina && L.Browser.retina) {
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
            L.setOptions(this, options);
        },

        onAdd: function onAdd(map) {
            this._crs = this.options.crs || map.options.crs;
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function getTileUrl(coords) {
            // (Point, Number) -> String
            var tileSize = this.options.tileSize;
            var nwPoint = coords.multiplyBy(tileSize);
            nwPoint.x += 1;
            nwPoint.y -= 1;
            var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
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

            var o = { s: this._getSubdomain(coords) };
            if (isTileMatrixTemplated > 0) o.TileMatrix = ident;
            if (isTileRowTemplated > 0) o.TileRow = tilerow;
            if (isTileColTemplated > 0) o.TileCol = tilecol;

            url = L.Util.template(url, o);

            var qsi = url.indexOf("?");
            if (qsi < 0 || isTileMatrixTemplated < qsi && isTileRowTemplated < qsi || isTileColTemplated < qsi) {
                //if the TM,TR,TC variables are templated but not as querystring parameters
                // (ie, no '?' present or those params are before the '?'),
                // then the URL must not be OGC WMTS, so no need for WMTS parameters

            } else {
                url = url + L.Util.getParamString(this.wmtsParams, url);
                if (isTileMatrixTemplated < 0) url += "&TileMatrix=" + ident; //tileMatrixSet
                if (isTileRowTemplated < 0) url += "&TileRow=" + tilerow;
                if (isTileColTemplated < 0) url += "&TileCol=" + tilecol;
            }

            return url;
        },

        setParams: function setParams(params, noRedraw) {
            L.extend(this.wmtsParams, params);
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
                    topLeftCorner: new L.LatLng(20037508.3428, -20037508.3428)
                };
            }
            return matrixIds3857;
        }
    });

    L.GeoPlatform.wmts = function (layer) {

        var url = layer.services && layer.services.length ? layer.services[0].href : null;

        var options = {
            layer: layer.layerName,
            style: 'default',
            tileMatrixSet: "default",
            format: "image/png"
        };
        if (GeoPlatform.leafletPane) options.pane = GeoPlatform.leafletPane;

        var distro = (layer.distributions || []).find(function (dist) {
            return dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
        });
        if (distro) {
            url = distro.href;
            options.format = distro.mediaType;

            var params = distro.parameters || [];
            params.each(function (param) {
                var value = param.defaultValue || param.values && param.values.length && param.values[0];
                if (value !== null && value !== undefined) {
                    url = url.replace('{' + param.name + '}', value);
                }
            });
        }

        if (!url) throw new Error("Unable to get URL for layer " + layer.id);

        return new L.GeoPlatform.WMTS(url, options);
    };

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMTS;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.WMSTLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.WMSTLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.WMSTLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    L.GeoPlatform.WMST = L.TimeDimension.Layer.WMS.extend({

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

    L.GeoPlatform.wmst = function (gpLayer) {

        var service = gpLayer.services[0];
        var url = service.href;

        var opts = {
            layers: gpLayer.layerName,
            transparent: true,
            format: "image/png",
            wmvId: gpLayer.layerId
        };
        if (GeoPlatform.leafletPane) opts.pane = GeoPlatform.leafletPane;

        var leafletLayer = new L.TileLayer.CustomWMS(url, opts);

        var proxyUrl = GeoPlatform.ualUrl + '/api/services/' + service.id + '/proxy/capabilities';

        var tdOpts = {};

        if (gpLayer.temporal) {

            var d1 = gpLayer.temporal.startDate ? new Date(gpLayer.temporal.startDate) : new Date();
            var d2 = gpLayer.temporal.endDate ? new Date(gpLayer.temporal.endDate) : new Date();

            tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
        }

        return new L.GeoPlatform.WMST(leafletLayer, {
            timeDimension: L.timeDimension(tdOpts),
            proxy: proxyUrl
        });
    };

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMST;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.ESRITileLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ESRITileLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.ESRITileLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    L.TileLayer.ESRI = L.TileLayer.extend({

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

            var esriParams = L.extend({}, this.defaultESRIParams),
                tileSize = options.tileSize || this.options.tileSize;

            var dim = void 0;
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

        onAdd: function onAdd(map) {
            this._crs = this.options.crs || map.options.crs;
            this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
            L.TileLayer.prototype.onAdd.call(this, map);
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
                url = L.Util.template(this._url, { s: this._getSubdomain(tilePoint) });

            var params = L.extend({}, this.esriParams);
            params.layers = "show:" + params.layers;

            //convert to esri-special SR for spherical mercator
            if (params.bboxsr === 'EPSG:3857') params.bboxsr = '102100';
            if (params.imagesr === 'EPSG:3857') params.imagesr = '102100';

            return url + L.Util.getParamString(params, url, true) + '&BBOX=' + bbox;
        },

        setParams: function setParams(params, noRedraw) {
            L.extend(this.esriParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        }
    });

    L.tileLayer.esri = function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    };

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.TileLayer.ESRI;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.FeatureLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.FeatureLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.FeatureLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    /**
     * Feature Layer
     * Provides custom style loading and point-ilization as well
     * as adding visibility and opacity manipulation methods
     * @extends L.esri.FeatureLayer
     */
    L.GeoPlatform.FeatureLayer = L.esri.FeatureLayer.extend({

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
                var icon = L.icon({
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width * 0.5, height * 0.5],
                    popupAnchor: [0, -11]
                });
                marker = L.marker(latlng, {
                    icon: icon,
                    pane: GeoPlatform.leafletPane
                });
            } else {
                style.radius = style.radius || style['stroke-width'] || 4;
                style.weight = style.weight || style['stroke-width'] || 2;
                style.color = style.color || style.stroke || '#03f';
                style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                style.fillColor = style.color || style.fill;
                style.renderer = this.options.renderer; //important for pane!
                marker = L.circleMarker(latlng, style);
            }

            var popupTemplate = this.options.popupTemplate || L.GeoPlatform.featurePopupTemplate;
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
            layer.bindPopup(L.GeoPlatform.featurePopupTemplate(feature));
        },

        initialize: function initialize(options) {
            var _this4 = this;

            var self = this;
            options = options || {};

            if (GeoPlatform.leafletPane) options.pane = GeoPlatform.leafletPane;

            var getGPStyle = function getGPStyle() {
                return _this4._gpStyle;
            };
            options.style = options.style || getGPStyle();

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            var svgOpts = {};
            if (GeoPlatform.leafletPane) svgOpts.pane = GeoPlatform.leafletPane;
            var renderer = L.SVG && L.svg(svgOpts) || L.Canvas && L.canvas();
            options.renderer = renderer;

            options.pointToLayer = L.bind(this.pointToLayerFn, this);
            options.onEachFeature = L.bind(this.eachFeatureFn, this);

            // options.fields = ['FID', 'type', 'title', 'geometry'];

            L.esri.FeatureLayer.prototype.initialize.call(this, options);

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
            var _this5 = this;

            var self = this;

            if (this.options.styleLoader) {
                this.options.styleLoader(gpLayerId).then(function (json) {

                    if (!json) return;

                    var style = null;

                    if (json && json.styles) {

                        var styleFn = L.Util.bind(function (feature) {

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
                        _this5.options.style = styleFn;
                        _this5.setStyle(styleFn);
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
                        _this5._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for (var _id in _this5._layers) {
                            _this5._layers[_id].setStyle(obj);
                        }
                    }
                }).catch(function (e) {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }

    });

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.FeatureLayer;
});

/* jshint ignore:start */

/* esri-leaflet-cluster - v2.0.0 - Thu Aug 18 2016 17:12:43 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) : typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) : factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Cluster = global.L.esri.Cluster || {}), global.L, global.L.esri);
})(undefined || window, function (exports, L, esriLeaflet) {
    'use strict';

    L = 'default' in L ? L['default'] : L;

    var version = "2.0.0";

    var FeatureLayer = esriLeaflet.FeatureManager.extend({

        statics: {
            EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
            CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
        },

        /**
         * Constructor
         */

        initialize: function initialize(options) {
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

        onAdd: function onAdd(map) {
            esriLeaflet.FeatureManager.prototype.onAdd.call(this, map);
            this._map.addLayer(this.cluster);

            // NOTE !!!!!!!
            // Using this type of layer requires map.maxZoom to be set during map creation!
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        },

        onRemove: function onRemove(map) {
            esriLeaflet.FeatureManager.prototype.onRemove.call(this, map);
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
        return new FeatureLayer(options);
    }

    exports.FeatureLayer = FeatureLayer;
    exports.featureLayer = featureLayer;
    exports['default'] = featureLayer;
    exports.VERSION = version;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform"], function (jQuery, Q, L, GeoPlatform) {
            return root.ClusteredFeatureLayer = factory(jQuery, Q, L, GeoPlatform);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ClusteredFeatureLayer = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'));
    } else {
        GeoPlatform.ClusteredFeatureLayer = factory(jQuery, Q, L /*eaflet*/, GeoPlatform);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform) {

    // (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if (!L) {
        throw new Error("Missing Leaflet");
    }
    if (!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    /**
     * Clustered Feature Layer
     * Provides custom style loading and point-ilization as well
     * as adding visibility and opacity manipulation methods
     * @extends L.esri.ClusterFeatureLayer
     */
    L.GeoPlatform.ClusteredFeatureLayer = L.esri.Cluster.FeatureLayer.extend({

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
                var icon = L.icon({
                    iconUrl: style.content, //base64 encoded string
                    iconSize: [width, height],
                    iconAnchor: [width * 0.5, height * 0.5],
                    popupAnchor: [0, -11]
                });
                marker = L.marker(latlng, {
                    icon: icon,
                    pane: GeoPlatform.leafletPane
                });
            } else {
                marker = L.circleMarker(latlng, style);
            }

            var popupTemplate = this.options.popupTemplate || L.GeoPlatform.featurePopupTemplate;
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
            layer.bindPopup(L.GeoPlatform.featurePopupTemplate(feature));
        },

        initialize: function initialize(options) {
            var _this6 = this;

            var self = this;

            options = options || {};

            if (GeoPlatform.leafletPane) options.pane = GeoPlatform.leafletPane;

            options.pointToLayer = L.bind(this.pointToLayerFn, this);
            options.onEachFeature = L.bind(this.eachFeatureFn, this);
            // options.fields = ['FID', 'type', 'title', 'geometry'];

            //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
            // This needs to be increased to ensure all markers can be clicked
            // when spiderfied (some get stuck under the spider legs)
            options.spiderfyDistanceMultiplier = 2;

            var getGPStyle = function getGPStyle() {
                return _this6._gpStyle;
            };
            options.style = options.style || getGPStyle;
            if (options.styleResolver) {
                this.styleResolver = options.styleResolver;
            }

            //in order to put features-based layers into same pane as tile layers,
            // must specify renderer and set desired pane on that
            var svgOpts = {};
            if (GeoPlatform.leafletPane) svgOpts.pane = GeoPlatform.leafletPane;
            var renderer = L.SVG && L.svg(svgOpts) || L.Canvas && L.canvas();
            options.renderer = renderer;

            L.esri.Cluster.FeatureLayer.prototype.initialize.call(this, options);

            this.on('load', function () {
                if (typeof this.options.zIndex !== 'undefined') this.setZIndex(this.options.zIndex);
            });
        },

        onAdd: function onAdd(map) {
            L.esri.Cluster.FeatureLayer.prototype.onAdd.call(this, map);

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
                for (var _id2 in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[_id2];
                    if (layer._icon) {
                        jQuery(layer._icon).toggleClass('invisible');
                    }
                }
            }

            //non-clustered features
            if (this._layers) {
                for (var _id3 in this._layers) {
                    this._layers[_id3].toggleVisibility();
                }
            }
        },

        setVisibility: function setVisibility(bool) {

            //clustered features
            if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for (var _id4 in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[_id4];
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
                for (var _id5 in this._layers) {
                    this._layers[_id5].setVisibility(bool);
                }
            }
        },

        setOpacity: function setOpacity(opacity) {

            //clustered features
            if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
                for (var _id6 in this.cluster._featureGroup._layers) {
                    var layer = this.cluster._featureGroup._layers[_id6];
                    if (layer._icon) {
                        jQuery(layer._icon).css({ opacity: opacity });
                    }
                }
            }

            //non-clustered features
            if (this._layers) {
                for (var _id7 in this._layers) {
                    var _layer = this._layers[_id7];
                    if (_layer.setOpacity) _layer.setOpacity(opacity);
                }
            }
        },

        setStyle: function setStyle(style) {
            this.eachFeature(function (layer) {
                this.setFeatureStyle(layer.feature.id, style);
            }, this);
        },

        loadStyle: function loadStyle(gpLayerId) {
            var _this7 = this;

            if (this.options.styleLoader) {
                this.options.styleLoader(gpLayerId).then(function (json) {

                    if (!json) return;

                    var style = null;

                    if (json && json.styles) {

                        var styleFn = L.Util.bind(function (feature) {

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
                        _this7.options.style = styleFn;
                        setTimeout(function (layer, style) {
                            layer.setStyle(style);
                        }, 1000, _this7, styleFn);
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
                        _this7._gpStyle = style;

                        //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                        // non-clustered features.
                        // this.setStyle(obj);
                        //So instead, we manually set it on all features of the layer (that aren't clustered)
                        for (var _id8 in _this7._layers) {
                            _this7._layers[_id8].setStyle(obj);
                        }
                    }
                }).catch(function (e) {
                    console.log("Error fetching feature layer style");
                    console.log(e);
                });
            }
        }
    });

    L.GeoPlatform.clusteredFeatures = function (layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "L.GeoPlatform.clusteredFeatures() -\n                      Cannot create leaflet layer for GP Layer:\n                      layer has no service";
            throw new Error(msg);
        }

        var url = service.href,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;

        return new L.GeoPlatform.ClusteredFeatureLayer({
            url: url + '/' + layer.layerName,
            styleLoader: L.GeoPlatform.FeatureStyleResolver,
            layerId: layer.id,
            pane: GeoPlatform.leafletPane
        });
    };

    L.GeoPlatform.geoJsonFeed = function (layer) {

        var service = layer.services && layer.services.length ? layer.services[0] : null;
        if (!service) {
            var msg = "L.GeoPlatform.geoJsonFeed() -\n                      Cannot create leaflet layer for GP Layer:\n                      layer has no service";
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
                        var em = "L.GeoPlatform.geoJsonFeed() -\n                            Error loading style information for layer " + layerId + " : " + message;
                        var error = new Error(em);
                        deferred.reject(error);
                    }
                });
                return deferred.promise; //uses jQuery promise
            };
        };

        return new L.GeoPlatform.ClusteredFeatureLayer({
            url: layerUrl,
            isModern: true, //force to use GeoJSON
            layerId: layer.id, //used by style loader
            styleLoader: styleLoaderFactory(styleUrl),
            pane: GeoPlatform.leafletPane
        });
    };

    // })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.ClusteredFeatureLayer;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryLayerService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryLayerService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryLayerService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryLayerService = function (_JQueryItemService2) {
        _inherits(JQueryLayerService, _JQueryItemService2);

        function JQueryLayerService() {
            _classCallCheck(this, JQueryLayerService);

            var _this8 = _possibleConstructorReturn(this, (JQueryLayerService.__proto__ || Object.getPrototypeOf(JQueryLayerService)).call(this));

            _this8.baseUrl = GeoPlatform.ualUrl + '/api/layers';
            return _this8;
        }

        /**
         * @return {Promise} resolving style JSON object
         */


        _createClass(JQueryLayerService, [{
            key: "style",
            value: function style() {
                var d = Q.defer();
                var opts = {
                    method: "GET",
                    url: this.baseUrl + '/' + id + '/style',
                    dataType: 'json',
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.LayerService.style() - Error fetching item style: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }

            /**
             * @param {Object} options identifying extent, x, y
             * @return {Promise} resolving feature JSON object
             */

        }, {
            key: "describe",
            value: function describe(options) {

                if (!options) {
                    var err = new Error("Must provide describe options");
                    return Q.reject(err);
                }

                var keys = ['bbox', 'height', 'width', 'x', 'y'];
                var missing = keys.find(function (key) {
                    return !options[key];
                });
                if (missing) {
                    return Q.reject(new Error("Must specify " + missing + " in describe options"));
                }

                var params = {
                    srs: 'EPSG:4326',
                    bbox: options.bbox,
                    height: options.height,
                    width: options.width,
                    info_format: 'text/xml',
                    x: options.x,
                    y: options.y,
                    i: options.x, //WMS 1.3.0
                    j: options.y //WMS 1.3.0
                };

                var d = Q.defer();
                var opts = {
                    method: "GET",
                    url: this.baseUrl + '/' + id + '/describe',
                    dataType: 'json',
                    data: params,
                    success: function success(data) {
                        d.resolve(data);
                    },
                    error: function error(xhr, status, message) {
                        var m = "GeoPlatform.LayerService.describe() -\n                        Error describing layer feature: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    }
                };
                jQuery.ajax(opts);
                return d.promise;
            }
        }]);

        return JQueryLayerService;
    }(JQueryItemService);

    return JQueryLayerService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGLayerService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGLayerService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGLayerService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.NGItemService
     */

    var NGLayerService = function (_NGItemService2) {
        _inherits(NGLayerService, _NGItemService2);

        function NGLayerService() {
            _classCallCheck(this, NGLayerService);

            var _this9 = _possibleConstructorReturn(this, (NGLayerService.__proto__ || Object.getPrototypeOf(NGLayerService)).call(this));

            _this9.baseUrl = GeoPlatform.ualUrl + '/api/layers';
            return _this9;
        }

        /**
         * @return {Promise} resolving style JSON object
         */


        _createClass(NGLayerService, [{
            key: "style",
            value: function style() {
                var url = this.baseUrl + '/' + id + '/style';
                var $http = angular.injector().get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http.get(url).catch(function (e) {
                    var m = "GeoPlatform.NGLayerService.style() - Error getting layer style: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} options identifying extent, x, y
             * @return {Promise} resolving feature JSON object
             */

        }, {
            key: "describe",
            value: function describe(options) {

                if (!options) {
                    var err = new Error("Must provide describe options");
                    return Q.reject(err);
                }

                var keys = ['bbox', 'height', 'width', 'x', 'y'];
                var missing = keys.find(function (key) {
                    return !options[key];
                });
                if (missing) {
                    return Q.reject(new Error("Must specify " + missing + " in describe options"));
                }

                var params = {
                    srs: 'EPSG:4326',
                    bbox: options.bbox,
                    height: options.height,
                    width: options.width,
                    info_format: 'text/xml',
                    x: options.x,
                    y: options.y,
                    i: options.x, //WMS 1.3.0
                    j: options.y //WMS 1.3.0
                };

                var opts = {
                    method: "GET",
                    url: this.baseUrl + '/' + id + '/describe',
                    data: params
                };
                var $http = angular.injector().get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).catch(function (e) {
                    var m = "GeoPlatform.NGLayerService.get() - Error describing layer feature: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGLayerService;
    }(NGItemService);

    return NGLayerService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform", "JQueryLayerService"], function (jQuery, Q, L, GeoPlatform, JQueryLayerService) {
            return root.LayerFactory = factory(jQuery, Q, L, GeoPlatform, JQueryLayerService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.LayerFactory = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'), require('JQueryLayerService'));
    } else {
        GeoPlatform.LayerFactory = factory(jQuery, Q, L /*eaflet*/, GeoPlatform, GeoPlatform.JQueryLayerService);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform, JQueryLayerService) {

    // (function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    GeoPlatform.isOSM = function (layer) {
        return layer && layer.resourceTypes && layer.resourceTypes.length && ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
    };

    /**
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    GeoPlatform.osm = function () {
        var query = GeoPlatform.QueryFactory().fields('*').resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        return new JQueryLayerService().search(query).then(function (response) {
            return response.results.length ? response.results[0] : null;
        }).catch(function (e) {
            return Q.reject(e);
        });
    };

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @return {Promise} resolving GeoPlatform Layer object
     */
    GeoPlatform.defaultBaseLayer = function () {
        if (GeoPlatform.defaultBaseLayer) {
            return new JQueryLayerService().get(GeoPlatform.defaultBaseLayer).catch(function (e) {
                return Q.resolve(GeoPlatform.osm());
            });
        } else {
            return GeoPlatform.osm();
        }
    };

    /**
     * @param {Object} layer - GeoPlatform Layer
     * @return {L.TileLayer}
     */
    L.GeoPlatform.osm = function (layer) {
        return new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 1, maxZoom: 19,
            attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
    };

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {L.Layer} Leaflet layer instance
     */
    L.GeoPlatform.LayerFactory = function (layer) {

        if (!layer) {
            throw new Error("\n                L.GeoPlatform.LayerFactory() -\n                Invalid argument: must provide a layer object\n            ");
        }

        //OSM layers have no "services" so we have to treat them differently
        if (GeoPlatform.isOSM(layer)) {
            return L.GeoPlatform.osm(layer);
        }

        if (!layer.services || !layer.services.length) {
            throw new Error("\n                L.GeoPlatform.LayerFactory() -\n                Cannot create Leaflet layer for GP Layer " + layer.id + ",\n                layer has no services defined!\n            ");
        }

        var service = layer.services[0],
            url = service.href,
            typeUri = service.serviceType.uri,
            srs = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null,
            opts = {};

        switch (typeUri) {

            case GeoPlatform.ServiceTypes.ESRI_MAP_SERVER.uri:
                opts = {
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                };
                if (srs) opts.srs = srs;
                if (GeoPlatform.leafletPane) opts.pane = GeoPlatform.leafletPane;
                return L.tileLayer.esri(url, opts);

            case GeoPlatform.ServiceTypes.ESRI_FEATURE_SERVER.uri:
                return L.GeoPlatform.clusteredFeatures(layer);

            case GeoPlatform.ServiceTypes.ESRI_TILE_SERVER.uri:
                opts = { url: url, useCors: true };
                if (GeoPlatform.leafletPane) opts.pane = GeoPlatform.leafletPane;
                return L.esri.tiledMapLayer(opts);

            case GeoPlatform.ServiceTypes.FEED.uri:
                return L.GeoPlatform.geoJsonFeed(layer);

            case GeoPlatform.ServiceTypes.WMS.uri:
                return L.GeoPlatform.wms(layer);

            case GeoPlatform.ServiceTypes.WMST.uri:
                return L.GeoPlatform.wmst(layer);

            case GeoPlatform.ServiceTypes.WMTS.uri:
                return L.GeoPlatform.wmts(layer);

            case GeoPlatform.ServiceTypes.WFS.uri:

            case GeoPlatform.ServiceTypes.WCS.uri:

                return null;

            default:
                return null;
        }
    };

    // })(jQuery, Q, L/*eaflet*/, GeoPlatform);

    return L.GeoPlatform.LayerFactory;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryMapService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryMapService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryMapService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryMapService = function (_JQueryItemService3) {
        _inherits(JQueryMapService, _JQueryItemService3);

        function JQueryMapService() {
            _classCallCheck(this, JQueryMapService);

            var _this10 = _possibleConstructorReturn(this, (JQueryMapService.__proto__ || Object.getPrototypeOf(JQueryMapService)).call(this));

            _this10.baseUrl = GeoPlatform.ualUrl + '/api/maps';
            return _this10;
        }

        return JQueryMapService;
    }(JQueryItemService);

    return JQueryMapService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGMapService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGMapService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGMapService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.NGItemService
     */

    var NGMapService = function (_NGItemService3) {
        _inherits(NGMapService, _NGItemService3);

        function NGMapService() {
            _classCallCheck(this, NGMapService);

            var _this11 = _possibleConstructorReturn(this, (NGMapService.__proto__ || Object.getPrototypeOf(NGMapService)).call(this));

            _this11.baseUrl = GeoPlatform.ualUrl + '/api/maps';
            return _this11;
        }

        return NGMapService;
    }(NGItemService);

    return NGMapService;
});

// /**
//  *
//  */
// (function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L" /*eaflet*/, "GeoPlatform", "JQueryMapService"], function (jQuery, Q, L, GeoPlatform, JQueryMapService) {
            return root.MapInstance = factory(jQuery, Q, L, GeoPlatform, JQueryMapService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MapInstance = factory(require("jquery"), require('q'), require('L'), require('GeoPlatform'), require('JQueryMapService'));
    } else {
        GeoPlatform.MapInstance = factory(jQuery, Q, L /*eaflet*/, GeoPlatform, GeoPlatform.JQueryMapService);
    }
})(undefined || window, function (jQuery, Q, L /*eaflet*/, GeoPlatform, JQueryMapService) {

    "use strict";

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

        function MapInstance() {
            _classCallCheck(this, MapInstance);

            var _this12 = _possibleConstructorReturn(this, (MapInstance.__proto__ || Object.getPrototypeOf(MapInstance)).call(this));

            _this12.service = new JQueryMapService();

            //generate random key (see factory below)
            _this12._key = Math.ceil(Math.random() * 9999);

            //registry id of current map if available
            _this12._mapId = null,

            //definition of map (ie, from server)
            _this12._mapDef = _this12.initializeMapDefinition(),

            //primary map instance (ie, leaflet)
            _this12._mapInstance = null,

            //default map extent (if map doesn't have one for being saved)
            _this12._defaultExtent = null,

            //current base layer object and leaflet instance
            _this12._baseLayerDef = null, _this12._baseLayer = null,

            //set definitions of layer states (including layer info) on map
            _this12._layerStates = [],

            //map layer def ids with leaflet instances
            _this12._layerCache = {},

            //errors generated by layers loading
            _this12._layerErrors = [],

            //layer used to store features on map
            _this12._featureLayer = null, _this12._featureLayerVisible = true,

            //set of registered map tools
            _this12._tools = [],

            //state management
            _this12.state = { dirty: false };

            _this12._geoJsonLayerOpts = {
                style: function style(feature) {
                    if (feature.properties.style) return feature.properties.style;
                },
                onEachFeature: function onEachFeature(feature, layer) {

                    var style = { weight: 2, color: '#03f', opacity: 0.9, radius: 4, fillColor: '#03f', fillOpacity: 0.5 };
                    if (~feature.geometry.type.indexOf('Point')) {
                        style.fillOpacity = 0.9;
                    }

                    var props = feature.properties = feature.properties || {};
                    feature.properties.id = Math.floor(Math.random() * 999999);
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

                    return L.circleMarker(latlng, style);
                }
            };

            return _this12;
        }

        _createClass(MapInstance, [{
            key: "getKey",
            value: function getKey() {
                return this._key;
            }

            /**
             * Override default (JQuery-based) map service used by this instance
             * @param {ItemService} mapService - service to use to CRUD map objects
             */

        }, {
            key: "setService",
            value: function setService(mapService) {
                this.service = mapService;
            }

            //-----------------

        }, {
            key: "getLayerStateIndex",
            value: function getLayerStateIndex(layerId) {
                return this._layerStates.indexOfObj(layerId, function (id, state) {
                    return state.layer.id === id;
                });
            }
        }, {
            key: "getLayerState",
            value: function getLayerState(layerId) {
                var index = this.getLayerStateIndex(layerId);
                return index >= 0 ? _layerStates[index] : null;
            }
            //-----------------


        }, {
            key: "initializeMapDefinition",
            value: function initializeMapDefinition() {
                return {
                    type: "Map",
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

                var finder = function finder(l) {
                    return l.id === id;
                };

                if (!this._layerErrors.find(finder)) {

                    // console.log("Logging error for layer "  + id);
                    var obj = {
                        id: id,
                        message: "Layer failed to completely load. " + "It may be inaccessible or misconfigured."
                    };
                    this._layerErrors.push(obj);

                    var url = error.tile.src;
                    var params = { id: id };
                    url.substring(url.indexOf("?") + 1, url.length).split('&').each(function (param) {
                        var p = param.split('=');
                        params[p[0]] = p[1];
                    });

                    // LayerService.validate(params, {}, function(res) {
                    //     //no error here, maybe service is flaky...
                    // }, function(res) {
                    //     // console.log("Updating error for " + id + " with message");
                    //     var def = _layerStates.find(finder);
                    //     obj.message = "Layer '" + def.label + "' failed to completely load. " +
                    //             "It may be inaccessible or misconfigured. Reported cause: " + res.data;
                    //     notify('wmv:error', obj);
                    //
                    // });
                }
            }

            /*
             * method for adding feature layers to the map
             * when these layers may be layer groups.
             * finds leaf node layers and adds them to the
             * map's feature group
             */

        }, {
            key: "addFeatureLayer",
            value: function (_addFeatureLayer) {
                function addFeatureLayer(_x) {
                    return _addFeatureLayer.apply(this, arguments);
                }

                addFeatureLayer.toString = function () {
                    return _addFeatureLayer.toString();
                };

                return addFeatureLayer;
            }(function (layer) {
                if (!layer.feature && layer instanceof L.LayerGroup) {
                    layer.eachLayer(addFeatureLayer);
                } else {
                    this._featureLayer.addLayer(layer);
                }
            })

            //toggle visibility of parent feature layer

        }, {
            key: "setFeatureLayerVisibility",
            value: function (_setFeatureLayerVisibility) {
                function setFeatureLayerVisibility(_x2, _x3) {
                    return _setFeatureLayerVisibility.apply(this, arguments);
                }

                setFeatureLayerVisibility.toString = function () {
                    return _setFeatureLayerVisibility.toString();
                };

                return setFeatureLayerVisibility;
            }(function (layer, visibility) {
                if (!layer) return;

                if (layer.getLayers) {
                    layer.getLayers().each(function (child) {
                        setFeatureLayerVisibility(child, visibility);
                    });
                } else {
                    var container = layer._container || layer._path;
                    if (container) container.style.display = visibility ? '' : 'none';
                }
            })

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
                if (this._defaultExtent) {
                    this._mapInstance.fitBounds([[this._defaultExtent.miny, this._defaultExtent.minx], [this._defaultExtent.maxy, this._defaultExtent.maxx]]);
                } else {
                    this._mapInstance.setView([38, -96], 5);
                }
                this.touch('map:view:changed');
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
                var _this13 = this;

                var promise = null;
                if (!layer) {
                    promise = GeoPlatform.osm();
                } else promise = Q.resolve(layer);

                promise.then(function (layer) {

                    var leafletLayer = L.GeoPlatform.LayerFactory(layer);
                    if (!leafletLayer) return;

                    _this13._mapInstance.addLayer(leafletLayer);
                    leafletLayer.setZIndex(0); //set at bottom

                    var oldBaseLayer = _this13._baseLayer;
                    if (oldBaseLayer) {
                        _this13._mapInstance.removeLayer(oldBaseLayer);
                    }

                    //remember new base layer
                    _this13._baseLayer = leafletLayer;
                    _this13._baseLayerDef = layer;
                    _this13.touch('baselayer:changed', layer);
                }).catch(function (e) {
                    console.log("MapInstance.setBaseLayer() - Error getting base layer for map : " + e.message);
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
                var _this14 = this;

                layers.each(function (obj, index) {

                    var layer = null,
                        state = null;

                    if (obj.id) {
                        //is a layer
                        layer = obj;
                    } else if (obj.layer) {
                        //is layer state
                        layer = obj.layer; // containing a layer
                        state = obj;
                    }

                    if (!layer) return; //layer info is missing, skip it

                    //DT-442 prevent adding layer that already exists on map
                    if (_this14._layerCache[layer.id]) return;

                    if (!state) state = { opacity: 1, visibility: true, layer: JSON.parse(JSON.stringify(layer)) };

                    var leafletLayer = L.GeoPlatform.LayerFactory(layer);
                    if (leafletLayer) {

                        //listen for layer errors so we can inform the user
                        // that a layer hasn't been loaded in a useful way
                        leafletLayer.on('tileerror', _this14.handleLayerError);

                        var z = layers.length - index;
                        state.zIndex = z;
                        // console.log("Setting z of " + z + " on " + layer.label);

                        _this14._layerCache[layer.id] = leafletLayer;
                        _this14._mapInstance.addLayer(leafletLayer);
                        if (leafletLayer.setZIndex) leafletLayer.setZIndex(z);
                        _this14._layerStates.push(state); //put it in at top of list

                        // if layer is initially "off" or...
                        // if layer is initially not 100% opaque
                        if (!state.visibility || state.opacity < 1) {
                            // initialize layer visibility and opacity async, or else
                            // some of the layers won't get properly initialized
                            setTimeout(function (layer, state) {
                                _this14.setLayerVisibility(layer, state.visibility);
                                _this14.setLayerOpacity(layer, state.opacity);
                                //TODO notify of change
                            }, 500, leafletLayer, state);
                        }
                    }
                });

                this.touch('layers:changed');
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
                    if (visible) el.removeClass("invisible");else el.addClass('invisible');
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
                var _this15 = this;

                // var type = json.type;
                // var coordinates = json.coordinates;

                if (!this._featureLayer) {

                    // _featureLayer = L.geoJson([], _geoJsonLayerOpts).addTo(_mapInstance);
                    this._featureLayer = L.featureGroup().addTo(this._mapInstance);
                }

                // _featureLayer.addData(json);
                var opts = jQuery.extend({}, this._geoJsonLayerOpts);
                L.geoJson(json, opts).eachLayer(function (l) {
                    return _this15.addFeatureLayer(l);
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
                var _this16 = this;

                //find existing layer for this feature
                var layer = this.getFeatureLayer(featureJson.properties.id);
                if (layer) {

                    //remove existing
                    this._featureLayer.removeLayer(layer);

                    //add replacement
                    L.geoJson(featureJson, this._geoJsonLayerOpts).eachLayer(function (l) {
                        return _this16.addFeatureLayer(l);
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
                    var extent = layer.getBounds();
                    this._mapInstance.fitBounds(extent);
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
                var _this17 = this;

                var metadata = md || {};
                metadata.resourceTypes = metadata.resourceTypes || [];

                //add GeoPlatformMap resource type if not already present
                var gpMapType = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
                if (metadata.resourceTypes.indexOf(gpMapType) < 0) metadata.resourceTypes.push(gpMapType);

                var content = this.getMapResourceContent(metadata);

                var d = Q.defer();

                //ensure the two name properties line up
                if (content.title && content.title !== content.label) {
                    content.label = content.title;
                } else if (content.label && !content.title) {
                    content.title = content.label;
                }

                // console.log("Updating: " + JSON.stringify(map));
                this.service.save(content).then(function (result) {

                    //track new map's info so we can update it with next save
                    if (!_this17._mapId) _this17._mapId = result.id;

                    _this17._mapDef = result;
                    _this17._defaultExtent = result.extent;
                    _this17.clean();
                    d.resolve(result);
                }).catch(function (error) {
                    d.reject(error);
                });

                return d.promise;
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
                return this.service.get(mapId);
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
                var _this18 = this;

                return this.fetchMap(mapId).then(function (map) {

                    if (!map) {
                        throw new Error("The requested map came back null");
                    } else if (typeof map === 'string') {
                        throw new Error("The requested map came back as a string");
                    } else if (map.message) {
                        throw new Error("There was an error loading the requested map: " + map.message);
                    }

                    //loading a map by its ID, so we need to increment it's view count
                    if ('development' !== GeoPlatform.env) {

                        setTimeout(function (map) {
                            //update view count
                            var views = map.statistics ? map.statistics.numViews || 0 : 0;
                            var patch = [{ op: 'replace', path: '/statistics/numViews', value: views + 1 }];
                            _this18.service.patch(map.id, patch).then(function (updated) {
                                map.statistics = updated.statistics;
                            }).catch(function (e) {
                                console.log("Error updating view count for map: " + e);
                            });
                        }, 1000, map);
                    }

                    //load the map into the viewer
                    _this18.loadMapFromObj(map);

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
                var _this19 = this;

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
                if (map.extent.minx < -180.0) map.extent.minx = -179.0;
                if (map.extent.maxx > 180.0) map.extent.maxx = 179.0;
                if (map.extent.miny < -90.0) map.extent.miny = -89.0;
                if (map.extent.maxy > 90.0) map.extent.maxy = 89.0;

                //set extent from loaded map
                this._defaultExtent = map.extent;
                var extent = map.extent;

                //remove existing layers
                this._mapInstance.eachLayer(function (l) {
                    _this19._mapInstance.removeLayer(l);
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

    L.GeoPlatform.MapFactory = function (key) {
        this.keys = this.keys || {};
        if (key && this.keys[key]) return this.keys[key];
        var instance = new MapInstance();
        this.keys[instance._key] = instance;
        return instance;
    };

    return MapInstance;
}); //(jQuery, Q, L/*eaflet*/, GeoPlatform);