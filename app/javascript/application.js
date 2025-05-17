// app/javascript/application.js

import { Application } from "@hotwired/stimulus"
import MapController from "./controllers/map_controller"

// Démarrage Stimulus
window.Stimulus = Application.start()
Stimulus.register("map", MapController)

// Import MapLibre GL et son CSS
import 'maplibre-gl/dist/maplibre-gl.css'

// Pas besoin d'icônes à gérer comme avec Leaflet
// Pas besoin de rendre MapLibre global : le controller s’en charge


