# frozen_string_literal: true

module Api
  module V1
    class TodoSerializer < ApplicationSerializer
      attribute :description
      attribute :completed_at do |obj|
        # Returns nil or the date
        obj&.completed_at&.strftime("%Y-%m-%d")
      end
      attribute :created_at do |obj|
        obj.created_at.strftime("%Y-%m-%d")
      end
      attribute :updated_at do |obj|
        obj.updated_at.strftime("%Y-%m-%d")
      end
    end
  end
end

