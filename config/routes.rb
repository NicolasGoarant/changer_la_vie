# config/routes.rb
Rails.application.routes.draw do
  get "pages/home"
  root "pages#home"

  # API si tu en as une :
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show]
    end
  end
end

