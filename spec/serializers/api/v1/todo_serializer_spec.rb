# frozen_string_literal: true

RSpec.describe Api::V1::TodoSerializer, type: :serializer do
  # Freeze time
  before { travel_to Time.local(2020, 5, 9) }
  after { travel_back }

  context "single todo" do
    # Pass it to the serializer and return a JSON hash
    subject(:json_attributes) { json_data["attributes"] }
    let(:json_data) { described_class.new(todo1).as_json["data"] }

    let!(:todo1) do
      create :todo,
             description:  "Pickup laundry",
             priority:     1,
             completed_at: DateTime.new(2020, 5, 2)
    end
    let(:attribute_keys) { %w[description completedAt createdAt priority updatedAt] }

    it { expect(subject.keys).to contain_exactly(*attribute_keys) }
    it { expect(subject["priority"]).to eq "1" }
    it { expect(subject["completedAt"]).to eq "2020-05-02" }
    it { expect(subject["createdAt"]).to eq "2020-05-09" }
    it { expect(subject["updatedAt"]).to eq "2020-05-09" }
  end

  context "collection" do
    # Pass it to the serializer and return a JSON hash
    subject(:json_data) { described_class.new(todos).as_json["data"] }
    let!(:todos) { create_list(:todo, 3) }

    it { should be_an(Array) }
  end

end