# frozen_string_literal: true

RSpec.describe Api::V1::TodoSerializer, type: :serializer do

  context "single todo" do
    let!(:todo1) { create(:todo, description: "Pickup laundry") }

    # Pass it to the serializer and return a JSON hash
    subject(:json_data) { described_class.new(todo1).as_json["data"] }

    describe "attributes" do
      subject { json_data["attributes"] }
      it { expect(subject.keys).to contain_exactly("description", "completedAt", "createdAt", "updatedAt") }
    end
  end

  context "collection" do
    # Pass it to the serializer and return a JSON hash
    subject(:json_data) { described_class.new(todos).as_json["data"] }
    let!(:todos) { create_list(:todo, 3) }

    it { should be_an(Array) }
  end

end