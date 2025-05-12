import '@hotwired/turbo-rails'
import { Application } from '@hotwired/stimulus'
import MapController from './map_controller'
import 'leaflet/dist/leaflet.css';
const application = Application.start()
application.register('map', MapController)
