# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  def home
    @locations = Location.all
    
    # Filtre par catégorie
    if params[:category].present? && params[:category] != 'all'
      @locations = @locations.where(category: params[:category])
    end
    
    # Recherche par nom ou adresse
    if params[:query].present?
      query = "%#{params[:query].downcase}%"
      @locations = @locations.where("LOWER(name) LIKE ? OR LOWER(address) LIKE ?", query, query)
    end
  end
end