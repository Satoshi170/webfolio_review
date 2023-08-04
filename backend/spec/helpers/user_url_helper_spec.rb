require "rails_helper"

RSpec.describe UserUrlHelper, type: :helper do
  describe "default_user_image_url" do
    it "デフォルトのユーザー画像のURLを返すこと" do
    expected_url = "http://backend:3000/images/default_user_image.png"
    expect(helper.default_user_image_url).to eq(expected_url)
    end
  end
end
