# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    description { Faker::Lorem.sentence }
  end
end
