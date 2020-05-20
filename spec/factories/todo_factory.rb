# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    description { Faker::Lorem.sentence }
    priority { rand(0..2) }
    user
  end
end
