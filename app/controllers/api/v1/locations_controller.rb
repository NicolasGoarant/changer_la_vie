class Api::V1::LocationsController < ApplicationController
  def index
    @locations = Location.all
    
    if params[:category].present? && params[:category] != "all"
      @locations = @locations.where(category: params[:category])
    end
    
    if params[:search].present?
      search_term = "%#{params[:search].downcase}%"
      @locations = @locations.where("lower(name) LIKE ? OR lower(description) LIKE ? OR lower(address) LIKE ?", 
                                   search_term, search_term, search_term)
    end
    
    render json: @locations
  end

  def show
    @location = Location.find(params[:id])
    render json: @location
  end
end
