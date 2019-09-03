//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov',
    env: 'development' //to prevent bumping map's numViews
});

/*
 * Optionally, refresh list of service types after configuring API endpoint above
 * or continue to use default list provided in library
 */
//geoplatform.mapcore.ServiceTypes.refresh();


const TYPE_MAP = geoplatform.client.ItemTypes.MAP;

let NGHttpClient = geoplatform.client.angularjs.NGHttpClient;


//define the application's angular module and make sure to include the $httpProvider
// in the config function
angular.module('loadNG', [])
.config(function myAppConfig ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.directive( 'loadMap', ['$http', function($http) {
    return {
        scope: {},
        restrict: "A",
        link: function($scope, $element, $attrs) {

            let mapOptions = {
                center: [38, -96],
                zoom: 5,
                minZoom: 2,
                maxZoom: 21,
                maxBounds: [[-90,-180],[90,180]],
                tap: true,
                touchZoom:true,
                loadingControl: true
            };

            let leafletMap = L.map( $element[0], mapOptions);
            let mapInstance = geoplatform.mapcore.MapFactory.get();
            mapInstance.setMap(leafletMap);

            //use Angular-based service instead of default (JQuery)
            mapInstance.setHttpClient( new NGHttpClient({$http:$http}) );

            //just for example purposes, find the first map available
            let query = geoplatform.client.QueryFactory().keywords('WMV');

            let service = mapInstance.getService(TYPE_MAP);
            service.search(query).then( response => {
                if(response.results.length) {

                    //Note: search results do not contain resolved
                    // references to properties such as layers and
                    // layer services, so we need to specifically
                    // fetch the individual map to load it.
                    // Can either use MapService.get(id) and
                    // then MapInstance.loadMapFromObj(map) or
                    // just use MapInstance.loadMap(id);
                    let map = response.results[0];
                    return mapInstance.loadMap(map.id);
                }
            })
            .catch(e => { console.log(e.message); });
        }
    }
}]);
