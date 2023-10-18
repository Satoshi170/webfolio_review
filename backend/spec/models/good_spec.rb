require 'rails_helper'

RSpec.describe Good, type: :model do
  let(:user) { create(:user) }
  let(:portfolio) { create(:portfolio, user: user) }
  let!(:good1) { create(:good, user: user, portfolio: portfolio) }

  describe "validation" do
    it "user_idとportfolio_idの組み合わせが一意である" do
      duplicate_good = Good.new(user_id: user.id, portfolio_id: portfolio.id)
      expect(duplicate_good).not_to be_valid
      expect(duplicate_good.errors.full_messages).to include("User has already been taken")
    end
  end
end
