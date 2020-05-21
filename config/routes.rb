# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "default#index"
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :todos
    end
  end
end
