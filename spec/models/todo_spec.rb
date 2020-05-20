# frozen_string_literal: true

RSpec.describe Todo, type: :model do

  let!(:todo1) { create(:todo, description: "Pickup laundry") }

  context "schema" do
    it { should have_db_column(:completed_at).of_type(:datetime).with_options(null: true) }
    it { should have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { should have_db_column(:description).of_type(:text).with_options(null: false) }
    it { should have_db_column(:priority).of_type(:integer).with_options(null: false) }
    it { should have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
  end

  context "validations" do
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:priority) }
    it { should allow_value(0, 1, 2).for(:priority) }
  end

  describe "#completed=" do
    # Freeze time
    before do
      travel_to Time.local(2020, 5, 9)
    end
    after do
      travel_back
    end

    # Check that changing completed sets it to the current date
    it { expect { subject.completed = "1" }.to change { subject.completed_at&.strftime("%Y-%m-%d") }.from(nil).to("2020-05-09") }
    it { expect { subject.completed = "0" }.not_to change { subject.completed_at }.from(nil) }
  end
end