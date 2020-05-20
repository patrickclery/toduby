# frozen_string_literal: true

RSpec.describe "Rails routes", type: :routing do

  # Default route
  it { expect(get("/")).to route_to(controller: "default", action: "index") }

  # Reading
  it { expect(get("/api/v1/todos")).to route_to(controller: "api/v1/todos", action: "index") }
  it { expect(post("/api/v1/todos")).to route_to({ controller: "api/v1/todos", action: "create" }) }
  it { expect(delete("/api/v1/todos/1")).to route_to({ controller: "api/v1/todos", action: "destroy", id: "1" }) }
end
