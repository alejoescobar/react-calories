Rails.application.routes.draw do

  resources :users, only: [:create]
  resources :registrations, only: [:create]

end
