// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus"
import maplibregl from "maplibre-gl"

export default class extends Controller {
  connect() {
    console.log("🗺️ MapLibre connecté")

    this.map = new maplibregl.Map({
      container: this.element,
      style: "https://api.maptiler.com/maps/streets/style.json?key=eAYYn9DbCTTjSFCqV2Oz",

      center: [2.3522, 48.8566], // Paris
      zoom: 12
    })

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right')
    this.markers = {}
    this.loadLocations()
  }

  loadLocations() {
    fetch("/api/v1/locations")
      .then(response => {
        if (!response.ok) throw new Error("Réponse réseau incorrecte")
        return response.json()
      })
      .then(data => this.addMarkers(data))
      .catch(error => console.error("Erreur chargement lieux :", error))
  }

  addMarkers(locations) {
    locations.forEach(location => {
      const marker = new maplibregl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new maplibregl.Popup().setHTML(`
          <strong>${location.name}</strong><br>${location.address}
        `))
        .addTo(this.map)

      this.markers[location.id] = marker
    })
  }

  focusLocation(id) {
    const marker = this.markers[id]
    if (marker) {
      this.map.flyTo({ center: marker.getLngLat(), zoom: 15 })
      marker.getPopup().addTo(this.map)
    }
  }
}




