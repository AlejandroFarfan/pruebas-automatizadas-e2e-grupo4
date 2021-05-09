if ENV["ADB_DEVICE_ARG"].nil?
  require 'kraken-mobile/steps/web/kraken_steps'

  Then(/^I click on element with xpath "([^\"]*)"$/) do |selector|
    @driver.find_element(:xpath, selector).click
    sleep 2
  end

  Then(/^I check for "([^\"]*)" to exist in tag selector$/) do |selector|
    $xpath= "//li[contains(@class, 'ember-power-select-option') and text() = '"+selector+"']"
    puts @driver.find_element(:xpath, $xpath)
  end
end
