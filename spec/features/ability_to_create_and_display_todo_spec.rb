# frozen_string_literal: true

RSpec.describe "Ability to create, display, and delete a todo item", type: :feature, js: true do

  # Freeze time
  before do
    travel_to Time.local(2020, 5, 9)
  end
  after do
    travel_back
  end

  let!(:todo1) { create(:todo, description: "Pickup laundry", created_at: "2020-03-03") }
  let!(:todo2) { create(:todo, description: "Brush teeth", created_at: "2020-03-03") }
  let!(:todo3) { create(:todo, description: "Feed cat", created_at: "2020-03-03") }

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

    within("tr", text: "Run 5km") do
      # Mark it off as completed
      page.find("input[type='checkbox']").check
      # When it's completed, we will see the date filled-in (as of today)
      expect(page).to have_content("2020-05-09")
      # Delete it
      click_button "Delete"
    end
    expect(page).to have_content(/removed/i)
    expect(page).not_to have_css("td", text: "Run 5km")
  end
end
