class PagesController < ApplicationController
  def home
    @locations = Location.all
    
    if params[:category].present?
      @locations = @locations.where(category: params[:category])
    end
    
    if params[:search].present?
      search_term = "%#{params[:search].downcase}%"
      @locations = @locations.where("LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(address) LIKE ?", 
                                   search_term, search_term, search_term)
    end
  end
  
  def mission
  end
  
  def contact
  end
end