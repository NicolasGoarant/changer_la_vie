# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts "🔄 Nettoyage des anciens lieux..."
Location.destroy_all

puts "🌱 Création de lieux à Nancy..."

Location.create!(
  name: "Banque Alimentaire de Nancy",
  address: "10 Rue de la Solidarité, 54000 Nancy",
  latitude: 48.6921,
  longitude: 6.1844
)

Location.create!(
  name: "Maison des Associations de Nancy",
  address: "1 Rue du Colonel Clarenthal, 54000 Nancy",
  latitude: 48.6928,
  longitude: 6.1753
)

Location.create!(
  name: "Centre de Don du Sang Nancy",
  address: "2 Rue Lionnois, 54000 Nancy",
  latitude: 48.6847,
  longitude: 6.1691
)

Location.create!(
  name: "Jardin Partagé Stanislas",
  address: "Allée du Parc, 54000 Nancy",
  latitude: 48.6903,
  longitude: 6.1849
)

Location.create!(
  name: "Épicerie Solidaire Étudiante",
  address: "8 Rue du Cardinal Tisserant, 54000 Nancy",
  latitude: 48.6714,
  longitude: 6.1572
)

puts "✅ #{Location.count} lieux créés."
