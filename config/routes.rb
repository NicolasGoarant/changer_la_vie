# config/routes.rb
Rails.application.routes.draw do
  # Route racine
  root "pages#home"
  
  # Pages statiques
  get "/a-propos", to: "pages#mission", as: :mission
  get "/contact", to: "pages#contact", as: :contact
  
  # Ressources
  resources :locations, only: [:index, :show]
  
  # API
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show]
    end
  end
end

