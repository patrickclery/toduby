# frozen_string_literal: true

Rails.application.routes.draw do
  get "/", to: "default#index"

  namespace :api do
    namespace :v1 do
      resources :todos
    end
  end
end
