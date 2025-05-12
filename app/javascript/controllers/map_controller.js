import { Controller } from "@hotwired/stimulus"

// Nous n'importons pas Leaflet car il est disponible globalement via le CDN
export default class extends Controller {
  connect() {
    // Vérifier que L est disponible (chargé par CDN)
    if (typeof L === 'undefined') {
      console.error('Leaflet n\'est pas chargé. Vérifiez que le CDN est accessible.');
      return;
    }
    
    this.map = L.map(this.element).setView([48.8566, 2.3522], 12);
    
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
    }).addTo(this.map);
    
    // Le reste de votre code...
    this.loadLocations();
    this.markers = {};
  }
  
  // Reste de vos méthodes...
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
  
  // Autres méthodes...
}