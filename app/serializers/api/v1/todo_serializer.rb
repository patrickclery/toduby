# frozen_string_literal: true

module Api
  module V1
    class TodoSerializer < ApplicationSerializer
      attribute :description
      attribute :completed_at
      attribute :created_at
      attribute :updated_at
    end
  end
end

