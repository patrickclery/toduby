# frozen_string_literal: true

RSpec.describe Api::V1::TodoSerializer, type: :serializer do

  context "single todo" do
    # Pass it to the serializer and return a JSON hash
    subject(:json_attributes) { json_data["attributes"] }
    let(:json_data) { described_class.new(todo1).as_json["data"] }

    let!(:todo1) do
      create :todo,
             description:  "Pickup laundry",
             completed_at: DateTime.new(2020, 5, 2)
    end

    it { expect(subject.keys).to contain_exactly("description", "completedAt", "createdAt", "updatedAt") }
    it { expect(subject["completedAt"]).to eq "2020-05-02" }
  end

  context "collection" do
    # Pass it to the serializer and return a JSON hash
    subject(:json_data) { described_class.new(todos).as_json["data"] }
    let!(:todos) { create_list(:todo, 3) }

    it { should be_an(Array) }
  end

end