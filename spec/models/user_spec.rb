# frozen_string_literal: true

RSpec.describe User, type: :model do

  context "associations" do
    it { should have_many(:todos) }
  end

end