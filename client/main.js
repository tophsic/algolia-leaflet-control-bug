import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import places from 'places.js'

import './main.html'

Template.main.onRendered(function () {
  var map = L.map('map-example-container', {
    scrollWheelZoom: false,
    zoomControl: false
  });

  var osmLayer = new L.TileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 13,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }
  );

  var markers = [];

  map.setView(new L.LatLng(0, 0), 1);
  map.addLayer(osmLayer);

  L.Control.Search = L.Control.extend({
    options: {
      position: 'topleft',
    },
    onAdd() {
      this.container = L.DomUtil.create('div', 'leaflet-bar leaflet-control')

      this.input = L.DomUtil.create('input', 'leaflet-algolia-input', this.container)
      this.input.spellCheck = false
      this.input.placeholder = 'Localiser sur la carte'

      const placesAutocomplete = places({
        container: this.input,
      })

      var marker
      placesAutocomplete.on('change', event => {
        console.log('change')
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker(event.suggestion.latlng);
        marker.addTo(map);
      })
      placesAutocomplete.on('clear', event => {
        console.log('clear')
        map.removeLayer(marker);
      })

      return this.container
    },
  })
  L.control.center = function(opts) {
    return new L.Control.Search(opts);
  }
  L.control.center().addTo(map);
})
