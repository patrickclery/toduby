RSpec.describe "Ability to create and display a todo item", type: :feature do

  it "creates and displays a todo item" do
    pending
    visit "/"

    expect(page).to have_content("New Todo")

    fill_in "Description", with: "Pickup groceries"

    click "Submit"

    expect(page).to have_content("Pickup groceries")
    expect(page).to have_content(/success/i)
  end

end