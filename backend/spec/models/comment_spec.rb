require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "validation" do
    describe "content" do
      it "contentが存在する必要がある" do
        comment = Comment.new(content: nil)
        expect(comment).not_to be_valid
        expect(comment.errors[:content]).to include("can't be blank")
      end

      it "contentの長さは255文字以内である必要がある" do
        comment = Comment.new(content: 'a' * 256)
        expect(comment).not_to be_valid
        expect(comment.errors[:content]).to include("is too long (maximum is 255 characters)")
      end
    end
  end
end
