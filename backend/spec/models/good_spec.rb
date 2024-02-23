require 'rails_helper'

RSpec.describe Good, type: :model do
  let(:user) { create(:user) }
  let(:article) { create(:article, user: user) }
  let!(:good1) { create(:good, user: user, article: article) }

  describe "validation" do
    it "user_idとarticle_idの組み合わせが一意である" do
      duplicate_good = Good.new(user_id: user.id, article_id: article.id)
      expect(duplicate_good).not_to be_valid
      expect(duplicate_good.errors.full_messages).to include("User has already been taken")
    end
  end
end
