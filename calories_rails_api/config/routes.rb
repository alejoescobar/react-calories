Rails.application.routes.draw do

  resources :users, only: [:create]
  resources :registrations, only: [:create]
  resources :sessions, only: [:create] do
    delete :destroy, on: :collection
  end

end
