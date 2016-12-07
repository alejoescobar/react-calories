Rails.application.routes.draw do

  # Admin routes
  namespace :admin do
    resources :users do
      resources :calories_entries
    end
  end

  resources :calories_entries

  # Auth routes
  resources :registrations, only: [:create, :update]
  resources :sessions, only: [:create] do
    delete :destroy, on: :collection
  end

end
