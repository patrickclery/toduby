# frozen_string_literal: true

RSpec.describe Api::V1::TodosController, type: :controller do

  let(:json) { JSON.parse(request.body) }

  # Freeze time
  before { travel_to Time.local(2020, 5, 9) }
  after { travel_back }
  ############################################################################
  describe "GET #index" do
    # Don't eager load these
    subject(:request) { get :index }

    let!(:todo1) { create(:todo, id: 1, description: "Pickup laundry") }
    let!(:todo2) { create(:todo, id: 2, description: "Brush teeth") }
    let!(:todo3) { create(:todo, id: 3, description: "Feed cat") }
    let!(:todos) { [todo1, todo2, todo3] }

    it { should be_successful }
    it { expect(subject.media_type).to eq("application/json") }
    it { expect(Api::V1::TodoSerializer).to receive(:new).with(all(an_instance_of(Todo))); subject }
  end

  ############################################################################
  describe "POST #create" do
    # Don't eager load these
    subject(:request) { post :create, params: params }
    let(:params) do
      { description: "Run 5km", priority: "0" }
    end

    it { should be_successful }
    it { expect(subject.media_type).to eq("application/json") }
    it { expect { subject }.to change { Todo.count }.by(1) }
    it { expect(Api::V1::TodoSerializer).to receive(:new).with(an_instance_of(Todo)); subject }
  end

  ############################################################################
  describe "PUT #update" do

    subject(:request) { put :update, params: params }

    ##########################################################################
    describe "mark as complete" do
      let(:params) { { id: "4", completed: "1" } }
      let!(:todo_incomplete) do
        create :todo,
               id:           4,
               description:  "Go to the store",
               created_at:   DateTime.new(2020, 5, 4),
               priority:     2,
               updated_at:   DateTime.new(2020, 5, 4),
               completed_at: nil
      end
      let(:expected_response) do
        {
          "data": {
            "id":         "4",
            "attributes": {
              "description": "Go to the store",
              "completedAt": "2020-05-09",
              "createdAt":   "2020-05-04",
              "priority":    "2",
              "updatedAt":   "2020-05-09"
            },
            "type":       "todo"
          }
        }
      end

      it { should be_successful }
      it { expect(subject.media_type).to eq("application/json") }
      it { expect(json).to eq expected_response.with_indifferent_access }
      it { expect(Api::V1::TodoSerializer).to receive(:new).with(an_instance_of(Todo)); subject }
    end

    ##########################################################################
    describe "mark as incomplete" do
      let(:params) { { id: "5", completed: "0" } }
      let!(:todo_complete) do
        create :todo,
               id:           5,
               description:  "Walk the dog",
               created_at:   DateTime.new(2020, 5, 4),
               updated_at:   DateTime.new(2020, 5, 4),
               priority:     2,
               completed_at: DateTime.new(2020, 5, 4)
      end
      let(:expected_response) do
        {
          "data": {
            "id":         "5",
            "attributes": {
              "description": "Walk the dog",
              "completedAt": nil,
              "createdAt":   "2020-05-04",
              "priority":    "2",
              "updatedAt":   "2020-05-09"
            },
            "type":       "todo"
          }
        }
      end

      it { should be_successful }
      it { expect(subject.media_type).to eq("application/json") }
      it { expect(json).to eq expected_response.with_indifferent_access }
      it { expect(Api::V1::TodoSerializer).to receive(:new).with(an_instance_of(Todo)); subject }
    end
  end

  ############################################################################
  describe "DELETE #destroy" do
    let!(:todo_destroy) { create(:todo, id: 123) }
    subject(:request) { delete(:destroy, params: { id: "123" }) }

    it { should have_http_status(:no_content) }
    it { expect { subject }.to change { Todo.count }.by(-1) }
  end

end