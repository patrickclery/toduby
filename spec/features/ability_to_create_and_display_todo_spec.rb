# frozen_string_literal: true

RSpec.describe "Ability to create and display a todo item", type: :feature, js: true do

  let!(:todo1) { create(:todo, id: 1, description: "Pickup laundry") }
  let!(:todo2) { create(:todo, id: 2, description: "Brush teeth") }
  let!(:todo3) { create(:todo, id: 3, description: "Feed cat") }

  it "creates and displays a todo item" do
    # Single-page app, so everything resides at / or in the API /api/v1
    visit "/"

    expect(page).to have_content("Pickup laundry")
    expect(page).to have_content("Brush teeth")
    expect(page).to have_content("Feed cat")
    expect(page).to have_content("Total of 3 items.")

    # On the same page, we can create a new Todo
    expect(page).to have_content("New Todo")

    fill_in "formDescription", with: "Run 5km"

    click_button "Submit"

    # Async javascript calls the API, creates a new Todo, then React adds it to the list
    expect(page).to have_content(/success/i)
    expect(page).to have_content("Run 5km")
  end
end
