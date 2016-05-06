(function( $ ) {
  $.fn.squarespaceMap = function(options) {
    var defaults = $.extend({
      storesURL: '/stores',
      storeSelector: '.eventlist-meta-address-maplink',
      zoom: 15,
      squarespaceContainer: '#main',
      locatedMessage: 'You are here'
  	}, options);

    var $element = $(this),
        map,
        marker = [],
        pos,
        allMarkers = [],
        currentLocation,
        count,
        computedMarkers = [];

    var init = function() {

      // Stop plugin initialization if element does not esxist on page
      if ($element.length === 0) {
        return;
      }

      map = new google.maps.Map(document.getElementById($element.attr('id')), mapOptions);

      // Add places search input to map
      addSearchInput();

      // Configure map options
      var mapOptions = {
        zoom: defaults.zoom
      };

      $.ajax({
        url: defaults.storesURL,
        crossDomain: true,
        dataType: 'html',
        success: function(data) {

          $($element).after('<div class="debug"></div>');
          var div = $('.debug');
          div.hide();

          // Filter html by container
          div.html($(data).filter(defaults.squarespaceContainer).html());
          var storesLocation = $('.debug .eventlist-meta-address-maplink');

          // Hack for detecting asynchronous fetch end
          count = storesLocation.length;

          // begin synchronous each()
          storesLocation.each(function(index, val) {
            var value = val.href;
            var match = value.match(/q=([^&]*)/);
            var decodedValue = decodeURIComponent(match);

            // Convert address to coordinates
            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+match[0]+'&sensor=false', null, function(data) {
              var p = data.results[0].geometry.location;
              var latlng = new google.maps.LatLng(p.lat, p.lng);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });

              marker.info = new google.maps.InfoWindow({
                content: data.results[0].formatted_address + ' <a href="https://www.google.pt/maps/dir/Current+Location/'+ data.results[0].formatted_address + '" target="blank">Get me there</a>'
              });

              google.maps.event.addListener(marker, 'click', function() {
                marker.info.open(map, marker);
              });

              allMarkers.push(marker);
              count--;

              if(count === 0) {
                getCurrebtLocation();
              }
              return marker;
           });
          });
          // End synchronous each()
        }
      });
    };

    var getCurrebtLocation = function() {

      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

          infowindow = new google.maps.InfoWindow({
            map: map,
            position: pos,
            content: defaults.locatedMessage
          });

          currentLocation = pos;
          detectNearestMarker(pos);

        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

      $('#searchMap').show();
    };

    var handleNoGeolocation = function(errorFlag) {
      var options = {
        map: map
      };

      var bounds = new google.maps.LatLngBounds();
      $.each(allMarkers, function() {
        var boundMarker = new google.maps.LatLng(this.position.lat(), this.position.lng());
        bounds.extend(boundMarker);
      });

      map.fitBounds(bounds);
    };

    var detectNearestMarker = function(pos) {
      var closest;
      $.each(allMarkers,function(){
        var markerLatLng = new google.maps.LatLng(this.position.lat(), this.position.lng());
        var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng,pos);
        computedMarkers.push({
          marker:this,
          distance:distance
        });

        if(!closest || closest.distance > distance){
          closest = {
            marker:this,
            distance:distance
          };
        }
      });


      if(closest){
        // Trigger InfoWindow open
        google.maps.event.trigger(closest.marker, 'click');

        // Construct new map bounds
        var boundPos = new google.maps.LatLng(pos.lat(), pos.lng());
        var boundMarker = new google.maps.LatLng(closest.marker.position.lat(), closest.marker.position.lng());
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(boundPos);
        bounds.extend(boundMarker);

        // Set map zoom to fit bounds
        map.fitBounds(bounds);
      }
    };

    var addSearchInput = function() {
      $($element).before('<input type="text" id="searchMap" placeholder="Search for specific area"/>');
      var input = document.getElementById('searchMap');
      var searchBox = new google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];

      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };

    return init();

  };

}(jQuery));
