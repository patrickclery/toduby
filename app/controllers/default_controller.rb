# frozen_string_literal: true

class DefaultController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    render component: "App",
           props:     { apiUri: "/api/v1" },
           layout:    "application",
           prerender: false
  end
end
