# frozen_string_literal: true

RSpec.describe Api::V1::TodosController, type: :controller do
  ############################################################################
  describe "GET #index" do
    # Don't eager load these
    subject(:request) { get :index }
    let(:json) { JSON.parse(request.body) }

    let!(:todo1) { create(:todo, id: 1, description: "Pickup laundry") }
    let!(:todo2) { create(:todo, id: 2, description: "Brush teeth") }
    let!(:todo3) { create(:todo, id: 3, description: "Feed cat") }
    let!(:todos) { [todo1, todo2, todo3] }

    it { should be_successful }
    it { expect(subject.media_type).to eq("application/json") }
    it { expect(json.keys).to contain_exactly("data") }
    # These tests are already covered by the serializer specs
    it { expect(Api::V1::TodoSerializer).to receive(:new).with(todos); subject }
    it { expect(json["data"]).to be_an(Array) }
  end

  ############################################################################
  describe "POST #create" do
    # Don't eager load these
    subject(:request) { post :create, params: { description: "Run 5km" } }
    # Stub out the service object and serializer since these are thoroughly tested in isolation.
    before(:each) do
      allow(an_instance_of(Api::V1::TodoSerializer)).to receive(:any).and_return(expected_json)
    end
    let(:expected_json) do
      {
        "description": "Run 5km",
        "createdAt":   "2020-05-09",
        "updatedAt":   "2020-05-09",
        "completedAt": nil
      }
    end


    it { should be_successful }
    it { expect(subject.media_type).to eq("application/json") }
    it { expect { subject }.to change { Todo.count }.by(1) }
  end
end