Rails.application.routes.draw do


  # Admin routes
  namespace :admin do
    resources :users
  end

  resources :calories_entries

  # Auth routes
  resources :registrations, only: [:create]
  resources :sessions, only: [:create] do
    delete :destroy, on: :collection
  end

end
