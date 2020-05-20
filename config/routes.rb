# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: "default#index"
  get '/welcome', to: "default#welcome"

  namespace :api do
    namespace :v1 do
      resources :todos
    end
  end
end
