Rails.application.routes.draw do

  resources :calories_entries

  # Auth routes
  resources :registrations, only: [:create]
  resources :sessions, only: [:create] do
    delete :destroy, on: :collection
  end

end
