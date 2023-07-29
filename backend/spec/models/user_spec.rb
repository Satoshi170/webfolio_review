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

  describe "validation" do
    it 'nameが存在する必要がある' do
      user = User.new(name: nil)
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include('Name is required.')
    end

    it 'nameの長さは25文字以内である必要がある' do
      user = User.new(name: 'a' * 26)
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include('Name is too long.')
    end

    it 'passwordの長さは6文字以上である必要がある' do
      user = User.new(password: '12345')
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include('Password is too short.')
    end
  end
end
