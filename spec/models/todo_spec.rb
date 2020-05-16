# frozen_string_literal: true

RSpec.describe Todo, type: :model do

  let!(:todo1) { create(:todo, description: "Pickup laundry") }

  context "schema" do
    it { should have_db_column(:description).of_type(:text).with_options(null: false) }
    it { should have_db_column(:completed_at).of_type(:datetime).with_options(null: true) }
  end

  context "validations" do
    it { should validate_presence_of(:description) }
  end
end