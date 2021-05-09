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

  Then(/^I clear input field having css selector "([^\"]*)"$/) do |selector|
    @driver.find_element(:css, selector).clear
    @driver.find_element(:css, selector).send_keys ""
    sleep 2
  end

  Then(/^I navigate to page "([^\"]*)" and slug "([^\"]*)"$/) do |tagWebSite, tagSlug|
    $url = tagWebSite + tagSlug
    puts $url
    @driver.navigate.to $url
    sleep 2
  end

  Then(/^I store a variable with the current tagName$/) do
    $tagName=  @driver.find_element(:css, "input[name='name']").attribute("value")
    File.write('./.deletedTag.txt', $tagName)
    puts($tagName) 
  end

  Then(/^I check deltedTag is not Listed$/) do
    $tagName = IO.read("./.deletedTag.txt")
    File.delete('./.deletedTag.txt')
    $isTagPresent = @driver.find_elements(:xpath, "//h3[contains(@class, 'gh-tag-list-name') and text()='"+$tagName+"']").length()>0
    raise 'ERROR: tag was not deleted' if $isTagPresent == true
  end

  Then(/^I check "([^\"]*)" is listed$/) do |selector|
    $isTagPresent = @driver.find_elements(:xpath, "//h3[contains(@class, 'gh-tag-list-name') and text()='"+selector+"']").length()>0
    raise 'ERROR: tag is not present' if $isTagPresent == false
  end

  # ------Posts additional steps

  Then(/^I should not see text "([^\"]*)" in posts section$/) do |text|
    @driver.find_elements(:xpath, "//h3[contains(@class, 'gh-content-entry-title') and text()='"+text+"']").length()<1
  end

  Then(/^I should see text "([^\"]*)" in posts section$/) do |text|
    @driver.find_elements(:xpath, "//h3[contains(@class, 'gh-content-entry-title') and text()='"+text+"']").length()>0
  end

  Then(/^I clear post input field having css selector "([^\"]*)"$/) do |selector|
    @driver.find_element(:css, selector).clear
    sleep 2
  end

  Then(/^I check that post with title "([^\"]*)" is published$/) do |text|
    @driver.find_elements(:xpath, "//h2[contains(@class, 'post-card-title') and text()='"+text+"']").length()>0
  end

  Then(/^I check that post with title "([^\"]*)" is not published$/) do |text|
    @driver.find_elements(:xpath, "//h2[contains(@class, 'post-card-title') and text()='"+text+"']").length()<1
  end

  Then(
    /^I count elements having css selector "([^\"]*)" and store count in variable$/
  ) do |selector|
    $count_variable = @driver.find_elements(:css, selector).length()
    File.write('./.count.txt', $count_variable)
    puts $count_variable
  end

  Then(
    /^I compare elements having css selector "([^\"]*)" with stored variable minus 1$/
  ) do |selector|
    $count_variable = @driver.find_elements(:css, selector).length()
    $old_count_variable = IO.read("./.count.txt")
    puts $count_variable
    $compareResult = $count_variable == ($old_count_variable.to_i - 1)

    raise 'ERROR: Values are not equal' if $compareResult == false
  end
end
