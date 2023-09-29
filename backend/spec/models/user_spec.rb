require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validation" do
    it 'nameが存在する必要がある' do
      user = User.new(name: nil)
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'nameの長さは25文字以内である必要がある' do
      user = User.new(name: 'a' * 26)
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("is too long (maximum is 25 characters)")
    end

    it 'passwordの長さは6文字以上である必要がある' do
      user = User.new(name: "testuser", email: "test@example.com", password: "12345",
                      password_confirmation: "12345")
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end
  end
end
