# frozen_string_literal: true

module Api
  module V1
    class TodoSerializer < ApplicationSerializer
      attribute :description
      # Seems to be a bug with fast_jsonapi that it's returning the priority
      # JSON as an int not string
      attribute :priority do |obj|
        obj.priority.to_s
      end

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

