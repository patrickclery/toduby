# frozen_string_literal: true

module Api
  module V1
    class ApplicationSerializer
      include FastJsonapi::ObjectSerializer
      set_key_transform :camel_lower
    end
  end
end

