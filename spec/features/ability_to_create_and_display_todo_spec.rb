# frozen_string_literal: true

RSpec.describe "Ability to create, display, and delete a todo item",
               type:  :feature,
               js:    true,
               billy: true do


  let!(:user) { create(:user, id: 1) }
  before(:each) do
    @user ||= User.find(1)
    login_as(@user)
  end

  let(:json) { JSON.parse(request.body) }

  let!(:json_stub) do
    [
      { "id":         "1",
        "type":       "todo",
        "attributes": { "description": "Brush teeth",
                        "priority":    "0",
                        "completedAt": nil,
                        "createdAt":   "2020-03-03",
                        "updatedAt":   "2020-03-03" }
      },
      { "id":         "2",
        "type":       "todo",
        "attributes": { "description": "Feed cat",
                        "priority":    "1",
                        "completedAt": nil,
                        "createdAt":   "2020-03-03",
                        "updatedAt":   "2020-03-03" }
      },
      { "id":         "3",
        "type":       "todo",
        "attributes": { "description": "Pickup laundry",
                        "priority":    "0",
                        "completedAt": "2020-05-09",
                        "createdAt":   "2020-03-03",
                        "updatedAt":   "2020-03-03" } }
    ]
  end

  it "creates and displays a todo item" do
    allow_any_instance_of(DefaultController).to receive(:test_with_billy?).and_return(true)
    stub = proxy.stub("http://billy.local/api/v1/todos/")
                .and_return(json: { data: json_stub.to_json })
    # Single-page app, so everything resides at / or in the API /api/v1
    visit "/"

    expect(page).to have_content("Add a new task")
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
