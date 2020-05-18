# frozen_string_literal: true

class Todo < ApplicationRecord
  attribute :description
  attribute :completed_at
  attr_accessor :completed

  validates :description, presence: true

  # @param [String] is_complete "1" to mark as completed.
  def completed=(is_complete)
    self.completed_at = is_complete == "1" ? Time.now : nil
  end
end
