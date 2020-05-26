# frozen_string_literal: true

require "capybara/rails"
require "capybara/rspec"
require "selenium-webdriver"
require "webdrivers"
require "rspec/rails"

RSpec.configure do |config|
  config.order = :random
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.use_transactional_fixtures           = true
  config.example_status_persistence_file_path = ".rspec_status"
  # Disable RSpec exposing methods globally on `Module` and `main`
  config.disable_monkey_patching!

  config.around(:each, billy: true) do |example|
    # Change the javascript driver to billy for feature tests
    Capybara.javascript_driver = :selenium_chrome_headless_billy
    example.run
    Capybara.javascript_driver = :selenium_headless_chrome

  end
end

Billy.configure do |c|
  c.cache = true
  c.cache_request_body_methods
  c.cache_request_headers             = false
  c.ignore_cache_port                 = true # defaults to true
  c.non_successful_cache_disabled     = false
  c.non_whitelisted_requests_disabled = false
  c.persist_cache                     = true
  c.record_requests                   = true
  c.record_stub_requests              = true
end

# Shared contexts and behaviors
Dir['./spec/{contexts,behaviors}/**.rb'].each do |f|
  require f.sub(%r|\./spec/|, '')
end

RSpec.configure do |config|
  config.include ActiveSupport::Testing::TimeHelpers
end

