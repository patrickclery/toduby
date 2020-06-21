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
FactoryBot.define do
  factory :todo do
    description { Faker::Lorem.sentence }
    priority { rand(0..2) }
  end
end
