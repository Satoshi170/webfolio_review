require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }

  describe "#for_api" do
    it "API向けのユーザー情報を正確に返すこと" do
      result = user.for_api
      expect(result.keys).to match_array(["id", "name", "image"])
      expect(result["id"]).to eq(user.id)
      expect(result["name"]).to eq(user.name)
      expect(result["image"]).to eq(user.image)
    end
  end
end
