// app/javascript/controllers/map_controller.js
import { Controller } from '@hotwired/stimulus'
import L from 'leaflet'

export default class extends Controller {
  static targets = ['container']
  
  connect() {
    this.initializeMap()
    this.fetchLocations()
  }
  
  initializeMap() {
    this.map = L.map(this.containerTarget).setView([48.8566, 2.3522], 12)
    
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
      maxZoom: 20
    }).addTo(this.map)
  }
  
  fetchLocations() {
    fetch('/api/v1/locations')
      .then(response => response.json())
      .then(data => {
        this.addMarkersToMap(data)
      })
  }
  
  addMarkersToMap(locations) {
    locations.forEach(location => {
      const lat = parseFloat(location.latitude)
      const lng = parseFloat(location.longitude)
      
      const marker = this.createMarker(lat, lng, location.category)
      marker.addTo(this.map)
      
      marker.bindPopup(this.createPopupContent(location))
    })
  }
  
  createMarker(lat, lng, category) {
    const markerColors = {
      'charity': '#4F46E5',
      'education': '#F59E0B',
      'health': '#EF4444',
      'entrepreneurship': '#4F46E5',
      'community': '#F59E0B'
    }
    
    const color = markerColors[category] || '#6B7280'
    
    const icon = L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div style="
          position: relative;
          width: 30px;
          height: 44px;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            background-color: ${color};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            border: 2px solid white;
          "></div>
        </div>
      `,
      iconSize: [30, 44],
      iconAnchor: [15, 44],
      popupAnchor: [0, -44]
    })
    
    return L.marker([lat, lng], { icon })
  }
  
  createPopupContent(location) {
    return `
      <div class='text-center'>
        <h3 class='font-semibold'>${location.name}</h3>
        <p class='text-xs'>${location.address}</p>
      </div>
    `
  }
}