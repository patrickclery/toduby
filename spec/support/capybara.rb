# frozen_string_literal: true

require "capybara/rails"
require "capybara/rspec"
require "selenium-webdriver"
require "webdrivers"

# Setup Capybara to use Billy
Capybara.default_driver        = :selenium_headless_chrome
Capybara.default_max_wait_time = 5
Capybara.server                = :puma, { Silent: true }

Capybara::Screenshot.register_driver(:selenium_chrome_headless_billy) do |driver, path|
  driver.browser.save_screenshot(path)
end