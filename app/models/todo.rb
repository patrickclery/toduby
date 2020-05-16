# frozen_string_literal: true

class Todo < ApplicationRecord
  attribute :description

  validates :description, presence: true
end
