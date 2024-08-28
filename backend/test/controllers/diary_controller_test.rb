require "test_helper"

class DiaryControllerTest < ActionDispatch::IntegrationTest
  test "should get title:string" do
    get diary_title:string_url
    assert_response :success
  end

  test "should get content:text" do
    get diary_content:text_url
    assert_response :success
  end

  test "should get date:date" do
    get diary_date:date_url
    assert_response :success
  end

  test "should get user_id:interger" do
    get diary_user_id:interger_url
    assert_response :success
  end
end
