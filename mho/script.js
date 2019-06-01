var map;
function GetMap() {
  map = new Microsoft.Maps.Map('#myMap', {
    center: new Microsoft.Maps.Location(34.402706, -119.738869),
    zoom: 14
  });
  Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
    directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
    directionsManager.showInputPanel('directionsInputContainer');
    var wp = new Microsoft.Maps.Directions.Waypoint({ address: 'Douglas Family Preserve', location: new Microsoft.Maps.Location(34.402706, -119.738869) });
    var wp2 = new Microsoft.Maps.Directions.Waypoint({ address: 'Isla Vista' });
    directionsManager.addWaypoint(wp2);
    directionsManager.addWaypoint(wp);
  });
  Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
    var options = {
      maxResults: 4,
      map: map
    };
    var manager = new Microsoft.Maps.AutosuggestManager(options);
    manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
  });

  Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function () {
    var loc = new Microsoft.Maps.Location(34.402706, -119.738869);
    var path = Microsoft.Maps.SpatialMath.getRegularPolygon(loc, 200, 36,  Microsoft.Maps.SpatialMath.Meters);
    var poly = new Microsoft.Maps.Polygon(path);
    map.entities.push(poly);
    var pin = new Microsoft.Maps.Pushpin(loc, null);
    map.entities.push(pin);
    map.setView({ center: loc, zoom: 17 });
  });

  //Define a custom overlay class that inherts from the CustomOverlay class.
  PanningOverlay.prototype = new Microsoft.Maps.CustomOverlay({ beneathLabels: false });
  //Define a constructor for the custom overlay class.
  function PanningOverlay() {
    this.panUpBtn = document.createElement('input');
    this.panUpBtn.type = 'button';
    this.panUpBtn.value = '^';
    this.panUpBtn.onclick = function () {
      panMap('up');
    };
    this.panDownBtn = document.createElement('input');
    this.panDownBtn.type = 'button';
    this.panDownBtn.value = ' v';
    this.panDownBtn.onclick = function () {
      panMap('down');
    };
    this.panLeftBtn = document.createElement('input');
    this.panLeftBtn.type = 'button';
    this.panLeftBtn.value = '<';
    this.panLeftBtn.onclick = function () {
      panMap('left');
    };
    this.panRightBtn = document.createElement('input');
    this.panRightBtn.type = 'button';
    this.panRightBtn.value = '>';
    this.panRightBtn.onclick = function () {
      panMap('right');
    };
  }
  //Implement the onAdd method to set up DOM elements, and use setHtmlElement to bind it with the overlay.
  PanningOverlay.prototype.onAdd = function () {
    //Create a div that will hold pan buttons.
    var container = document.createElement('div');
    container.appendChild(this.panUpBtn);
    container.appendChild(this.panDownBtn);
    container.appendChild(this.panLeftBtn);
    container.appendChild(this.panRightBtn);
    container.style.position = 'absolute';
    container.style.top = '10px';
    container.style.left = '10px';
    this.setHtmlElement(container);
  };
  //Implement the new custom overlay class.
  var overlay = new PanningOverlay();
  //Add the custom overlay to the map.
  map.layers.insert(overlay);
}
function selectedSuggestion(suggestionResult) {
  map.entities.clear();
  map.setView({ bounds: suggestionResult.bestView });
  var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
  map.entities.push(pushpin);
  document.getElementById('printoutPanel').innerHTML =
    'Suggestion: ' + suggestionResult.formattedSuggestion +
    '<br> Lat: ' + suggestionResult.location.latitude +
    '<br> Lon: ' + suggestionResult.location.longitude;
}
function panMap(dir) {
  var dx = 0, dy = 0;
  switch (dir) {
    case 'up':
      dy = 30;
      break;
    case 'down':
      dy = -30;
      break;
    case 'left':
      dx = 30;
      break;
    case 'right':
      dx = -30;
      break;
  }
  map.setView({ center: map.getCenter(), centerOffset: new Microsoft.Maps.Point(dx, dy) })
}




(function ($) {
  "use strict"; // Start of use strict



  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

})(jQuery); // End of use strict
