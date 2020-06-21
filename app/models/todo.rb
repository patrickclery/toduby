# frozen_string_literal: true

# == Schema Information
#
# Table name: todos
#
#  id           :bigint           not null, primary key
#  description  :text             not null
#  completed_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  priority     :integer          default("0"), not null
#
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
