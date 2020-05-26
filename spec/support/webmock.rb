# frozen_string_literal: true

require "billy/capybara/rspec"
require "capybara/rspec"
require "capybara/rspec"
require "hashdiff" # Fix for webmock
require "table_print"
require "webmock/rspec"

WebMock.enable!
WebMock.disable_net_connect!


