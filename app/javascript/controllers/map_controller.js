import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Map controller connected");
    this.markers = {}; // Pour stocker les marqueurs
    this.initMap();
    
    // Récupérer l'ID du lieu mis en évidence, s'il existe
    this.highlightId = new URLSearchParams(window.location.search).get('highlight_id');
  }
  
  initMap() {
    if (window.L === undefined) {
      console.error("Leaflet n'est pas chargé");
      return;
    }
    
    try {
      // Initialiser la carte avec un style clair
      this.map = L.map(this.element).setView([48.8566, 2.3522], 13);
      
      // Utiliser CartoDB Light pour un style plus propre
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(this.map);
      
      // Ajouter des contrôles de zoom en bas à droite
      L.control.zoom({
        position: 'bottomright'
      }).addTo(this.map);
      
      // Forcer le recalcul de la taille
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
      
      // Charger les localisations
      this.loadLocations();
    } catch (error) {
      console.error("Erreur d'initialisation de la carte:", error);
    }
  }
  
  loadLocations() {
    fetch('/api/v1/locations')
      .then(response => response.json())
      .then(data => {
        console.log("Locations chargées:", data);
        this.addMarkersToMap(data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des locations:", error);
      });
  }
  
  addMarkersToMap(locations) {
    if (!locations || !locations.length) {
      console.log("Aucune location à afficher");
      return;
    }
    
    // Créer un groupe pour les marqueurs pour pouvoir ajuster la vue
    const markerGroup = L.featureGroup();
    
    locations.forEach(location => {
      try {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Coordonnées invalides pour ${location.name}`);
          return;
        }
        
        // Créer un marqueur personnalisé vert
        const greenIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #10b981; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  <i class="fas fa-map-marker-alt"></i>
                 </div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });
        
        const marker = L.marker([lat, lng], { icon: greenIcon });
        
        // Créer une popup stylisée
        marker.bindPopup(`
          <div style="min-width: 220px; padding: 12px;">
            <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 16px; font-weight: 600;">${location.name}</h3>
            <p style="color: #666; font-size: 14px; margin-bottom: 8px; font-style: italic;">${location.address}</p>
            ${location.description ? `<p style="font-size: 14px; margin-bottom: 12px; line-height: 1.4;">${location.description.substring(0, 100)}${location.description.length > 100 ? '...' : ''}</p>` : ''}
            <div style="text-align: center;">
              <a href="?highlight_id=${location.id}#location-${location.id}" style="display: inline-block; padding: 8px 16px; background-color: #10b981; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500;">Découvrir</a>
            </div>
          </div>
        `);
        
        // Ajouter le marqueur à la carte
        marker.addTo(this.map);
        
        // Ajouter au groupe de marqueurs
        markerGroup.addLayer(marker);
        
        // Stocker le marqueur avec l'ID du lieu
        this.markers[location.id] = marker;
        
        // Si ce lieu doit être mis en évidence, ouvrir sa popup et centrer la carte dessus
        if (this.highlightId && this.highlightId == location.id) {
          setTimeout(() => {
            this.map.setView([lat, lng], 15);
            marker.openPopup();
            
            // Faire défiler jusqu'à la carte si nécessaire
            this.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      } catch (error) {
        console.error(`Erreur avec la location ${location.name}:`, error);
      }
    });
    
    // Ajuster la vue de la carte pour montrer tous les marqueurs si aucun n'est mis en évidence
    if (!this.highlightId && markerGroup.getLayers().length > 0) {
      try {
        this.map.fitBounds(markerGroup.getBounds().pad(0.1));
      } catch (e) {
        console.warn("Impossible d'ajuster la vue de la carte:", e);
      }
    }
  }
  
  // Méthode pour centrer la carte sur un marqueur spécifique
  focusLocation(id) {
    const marker = this.markers[id];
    if (marker) {
      this.map.flyTo(marker.getLatLng(), 15, {
        duration: 1,
        easeLinearity: 0.5
      });
      marker.openPopup();
    }
  }
}




