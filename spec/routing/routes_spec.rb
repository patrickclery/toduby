# frozen_string_literal: true

RSpec.describe "Rails routes", type: :routing do

  # Reading
  it { expect(get("/api/v1/todos")).to route_to(controller: "api/v1/todos", action: "index") }
  it { expect(post("/api/v1/todos")).to route_to({ controller: "api/v1/todos", action: "create" }) }
end
