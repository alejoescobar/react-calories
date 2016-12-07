ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Ensure that node server is running react app
  Dir.chdir("../calories_react_client") do
    system "PORT=4000 REACT_APP_TEST=true npm start | cat > /dev/null 2>&1 &"
  end

  Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end

  Capybara.server_port = 5000
  Capybara.app_host = 'http://localhost:4000'

  class ActionDispatch::IntegrationTest
    include Capybara::DSL

    # Add support for JavaScript in our tests. We can now write:
    #
    #    test "does something", js: true do
    #       assert true
    #    end
    #
    # Notice the 'js: true' option.
    class << self
      def test(name, options={}, &block)
        super name do
          if options[:js]
            Capybara.current_driver = Capybara.javascript_driver
          end
          self.instance_eval &block
          if options[:js]
            Capybara.use_default_driver
          end
        end
      end
    end

    def teardown
      super
      Capybara.reset_sessions!
    end

    def login(user)
      visit '/login'
      wait = Wait.new
      wait.until { assert page.has_content? 'Login' }
      within 'form' do
        fill_in 'Email', with: user.email
        fill_in 'Password', with: '12345678'
        click_button 'Login'
      end

      wait.until { assert page.has_content? 'Listing Calories' }
    end

  end

  at_exit do
    system 'lsof -t -i tcp:4000 | xargs kill'
  end

end
