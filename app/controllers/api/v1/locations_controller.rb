
# app/controllers/api/v1/locations_controller.rb

module Api
  module V1
    class LocationsController < ApplicationController
      def index
        @locations = Location.all

        render json: @locations.as_json(only: [:id, :name, :address, :latitude, :longitude])
      end
    end
  end
end

  


