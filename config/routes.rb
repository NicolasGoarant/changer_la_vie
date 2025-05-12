Rails.application.routes.draw do
  root "pages#home"
  
  get "/mission", to: "pages#mission"
  get "/contact", to: "pages#contact"
  
  resources :locations, only: [:index, :show]
  
  # API pour les localisations
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show]
    end
  end
end