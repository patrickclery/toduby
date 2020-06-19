# frozen_string_literal: true

RSpec.describe "Ability to create, display, and delete a todo item", type: :feature, js: true, skip: true do
  let(:json) { JSON.parse(request.body) }

  # Freeze time
  before { travel_to Time.local(2020, 5, 9) }
  after { travel_back }

  let!(:todo1) { create(:todo, description: "Pickup laundry", created_at: DateTime.new(2020, 3, 3)) }
  let!(:todo2) { create(:todo, description: "Brush teeth", created_at: DateTime.new(2020, 3, 3)) }
  let!(:todo3) { create(:todo, description: "Feed cat", created_at: DateTime.new(2020, 3, 3)) }

  it "creates and displays a todo item" do
    # Single-page app, so everything resides at / or in the API /api/v1
    visit "/"

    expect(page).to have_content("Pickup laundry")
    expect(page).to have_content("Brush teeth")
    expect(page).to have_content("Feed cat")
    # On the same page, we can create a new Todo
    expect(page).to have_content("Add a new task")

    fill_in "description", with: "Run 5km"
    page.find("#formPriority").select "Med"

    click_button "Add"
    # Async javascript calls the API, creates a new Todo, then React adds it to the list
    expect(page).to have_content(/success/i)
    expect(page).to have_content("Run 5km")
    expect(page).to have_content("Med")

    # Hover over the element so the button appears
    within("tr", text: "Run 5km") do
      page.find("div[editext='view']").hover
      # Click the pencil button
      page.find("button[editext='edit-button']").click
      # Change the description
      page.find("input[editext='input']").fill_in with: "Run 10km"
      # Click save
      page.find("button[editext='save-button']").click
      # Change the priority
      page.find("select").select "High"
    end

    # Hover over the element so the button appears
    within("tr", text: "Run 10km") do
      # Mark it off as completed
      page.find("input[type='checkbox']").check
      # Delete it
      click_button "Delete"
    end

    expect(page).to have_content(/removed/i)
    expect(page).not_to have_css("tr>td", text: "Run 10km")
  end
end
