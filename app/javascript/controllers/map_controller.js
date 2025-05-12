import { Controller } from "@hotwired/stimulus"
import L from "leaflet"

export default class extends Controller {
  static targets = ["container"]

  connect() {
    // Créer la carte dans l'élément conteneur
    this.map = L.map(this.element).setView([48.8566, 2.3522], 12);
    
    // Ajouter une couche de carte Google Maps-style
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
    }).addTo(this.map);
    
    // Charger les localisations
    this.loadLocations();
    
    // Stocker les marqueurs
    this.markers = {};
  }
  
  loadLocations() {
    fetch('/api/v1/locations')
      .then(response => response.json())
      .then(data => {
        this.addMarkersToMap(data);
      })
      .catch(error => {
        console.error("Erreur de chargement des localisations:", error);
      });
  }
  
  addMarkersToMap(locations) {
    locations.forEach(location => {
      const marker = this.createMarker(location);
      this.markers[location.id] = marker;
      marker.addTo(this.map);
    });
  }
  
  createMarker(location) {
    const lat = parseFloat(location.latitude);
    const lng = parseFloat(location.longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      console.warn(`Coordonnées invalides pour ${location.name}`);
      return null;
    }
    
    const categoryColors = {
      'charity': '#4F46E5',
      'education': '#F59E0B',
      'health': '#EF4444',
      'entrepreneurship': '#10B981',
      'community': '#8B5CF6'
    };
    
    const color = categoryColors[location.category] || '#6B7280';
    
    const icon = L.divIcon({
      className: `marker-${location.category}`,
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
    });
    
    const marker = L.marker([lat, lng], { icon });
    
    // Créer une popup avec du contenu HTML
    const popupContent = `
      <div class="text-center p-2">
        <h3 class="font-semibold text-base">${location.name}</h3>
        <p class="text-xs text-gray-500">${location.address}</p>
        <a href="/locations/${location.id}" class="text-xs text-blue-600 hover:underline">Voir détails</a>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    return marker;
  }
  
  // Méthode pour centrer la carte sur un emplacement spécifique
  focusLocation(locationId) {
    const marker = this.markers[locationId];
    if (marker) {
      this.map.setView(marker.getLatLng(), 15);
      marker.openPopup();
    }
  }
}