"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
     *      itemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      itemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
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
                    var m = "NGItemService.get() - Error fetching item: " + e.message;
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
                    var m = "NGItemService.save() - Error saving item: " + e.message;
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
                    var m = "NGItemService.remove() - Error deleting item: " + e.message;
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
            value: function patch(id, _patch) {
                var opts = {
                    method: "PATCH",
                    url: this.baseUrl + '/' + id,
                    data: _patch
                };
                var $http = angular.injector(['ng']).get('$http');
                if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");
                return $http(opts).then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    var m = "NGItemService.patch() - Error patching item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }, {
            key: "search",
            value: function search(arg) {

                var params = arg;

                if (arg && typeof arg.getQuery !== 'undefined') {
                    //if passed a Query object,
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
                    var m = "NGItemService.search() - Error searching items: " + e.message;
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

            var _this = _possibleConstructorReturn(this, (NGServiceService.__proto__ || Object.getPrototypeOf(NGServiceService)).call(this));

            _this.baseUrl = GeoPlatform.ualUrl + '/api/services';
            return _this;
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
                    var m = "NGServiceService.get() - Error describing service: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGServiceService;
    }(NGItemService);

    return NGServiceService;
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

            var _this2 = _possibleConstructorReturn(this, (NGLayerService.__proto__ || Object.getPrototypeOf(NGLayerService)).call(this));

            _this2.baseUrl = GeoPlatform.ualUrl + '/api/layers';
            return _this2;
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

            var _this3 = _possibleConstructorReturn(this, (NGMapService.__proto__ || Object.getPrototypeOf(NGMapService)).call(this));

            _this3.baseUrl = GeoPlatform.ualUrl + '/api/maps';
            return _this3;
        }

        return NGMapService;
    }(NGItemService);

    return NGMapService;
});