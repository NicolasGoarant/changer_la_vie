# Créer des localisations initiales
locations_data = [
  {
    name: 'Les Restos du Cœur',
    description: 'Distribution alimentaire et aide aux personnes en difficulté.',
    address: '18 Rue Auguste Daix, 94260 Fresnes',
    category: 'charity',
    latitude: '48.7589',
    longitude: '2.3195',
    image_url: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    action_text: "S'engager",
    action_url: '/contact?org=restos-du-coeur',
    contact_phone: '01 23 45 67 89',
    opening_hours: 'Lun-Sam: 9h-17h'
  },
  {
    name: 'Centre d\'Apprentissage des Langues',
    description: 'Cours de langues étrangères pour tous niveaux et tous âges.',
    address: '5 Rue de la République, 75001 Paris',
    category: 'education',
    latitude: '48.8566',
    longitude: '2.3522',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    action_text: "S'inscrire",
    action_url: '/contact?org=centre-langues',
    contact_phone: '01 45 67 89 10',
    opening_hours: 'Lun-Ven: 9h-20h, Sam: 10h-18h'
  },
  {
    name: 'Centre de Don du Sang',
    description: 'Donnez votre sang et sauvez des vies. Ouvert du lundi au samedi.',
    address: '10 Rue du Docteur Roux, 75015 Paris',
    category: 'health',
    latitude: '48.8417',
    longitude: '2.3100',
    image_url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    action_text: 'Prendre RDV',
    action_url: '/contact?org=don-sang',
    contact_phone: '01 56 78 90 12',
    opening_hours: 'Lun-Sam: 8h-16h'
  }
  # Vous pouvez ajouter d'autres localisations ici
]

locations_data.each do |location_data|
  Location.create!(location_data)
end
