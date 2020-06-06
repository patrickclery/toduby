# frozen_string_literal: true

class Todo < ApplicationRecord
  attribute :description
  attribute :completed_at
  attribute :priority
  attr_accessor :completed

  validates :description, presence: true
  validates :priority,
            presence:  true,
            inclusion: [*0..2, "0", "1", "2"]

# @param [String] is_complete "1" to mark as completed.
  def completed=(is_complete)
    self.completed_at = is_complete == "1" ? Time.now : nil
  end
end
