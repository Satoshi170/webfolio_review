require 'rails_helper'

RSpec.describe "Api::V1::Portfolios::Comments", type: :request do
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }
  let(:portfolio) { create(:portfolio) }
  let(:auth_user1_headers) { sign_in({ email: user1.email, password: user1.password }) }
  let(:auth_user2_headers) { sign_in({ email: user2.email, password: user2.password }) }
  let(:valid_comment_params) do
    { content: "testContent", tag_ids: [1, 2] }
  end
  let(:invalid_comment_params) { valid_comment_params.merge(content: "") }

  describe "POST /comments" do
    context "headerが適切な場合" do
      context "有効なパラメータが指定された場合" do
        it "新たなcommnetの作成に成功する" do
          expect do
            post "/api/v1/portfolios/#{portfolio.id}/comments",
            params: { comment: valid_comment_params },
            headers: auth_user1_headers
          end.to change(Comment, :count).by(1)

          expect(response).to have_http_status(:created)
        end
      end

      context "無効なパラメータが指定された場合" do
        it "新たなcommnetの作成に失敗する" do
          expect do
            post "/api/v1/portfolios/#{portfolio.id}/comments",
            params: { comment: invalid_comment_params },
            headers: auth_user1_headers
          end.to change(Comment, :count).by(0)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "headerが不適切な場合" do
      it "新たなcommentの作成に失敗する" do
        expect do
          post "/api/v1/portfolios/#{portfolio.id}/comments",
          params: { comment: valid_comment_params }
        end.to change(Comment, :count).by(0)

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PATCH /comments/:id" do
    let!(:comment) { create(:comment, user: user1, portfolio: portfolio, tag_ids: [1]) }
    context "headerが適切な場合" do
      context "有効なパラメータが指定された場合" do
        it "commnetの更新に成功する" do
          patch "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
          params: { comment: valid_comment_params },
          headers: auth_user1_headers

          expect(response).to have_http_status(:success)
          comment.reload
          expect(comment.content).to eq(valid_comment_params[:content])
          expect(comment.tags.pluck(:id)).to eq(valid_comment_params[:tag_ids])
        end
      end

      context "無効なパラメータが指定された場合" do
        it "commentの更新に失敗する" do
          patch "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
          params: { comment: invalid_comment_params },
          headers: auth_user1_headers

          expect(response).to have_http_status(:unprocessable_entity)
          comment.reload
          expect(comment.content).not_to eq(valid_comment_params[:content])
          expect(comment.tags.pluck(:id)).not_to eq(valid_comment_params[:tag_ids])
        end
      end
    end

    context "headerが不適切な場合" do
      context "headerが無効の場合" do
        it "commentの更新に失敗する" do
          patch "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
          params: { comment: valid_comment_params }

          expect(response).to have_http_status(:unauthorized)
          comment.reload
          expect(comment.content).not_to eq(valid_comment_params[:content])
        end
      end

      context "headerがcomment.userのものと異なる時" do
        it "commentの更新に失敗する" do
          patch "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
          params: { comment: valid_comment_params },
          headers: auth_user2_headers

          expect(response).to have_http_status(:forbidden)
          comment.reload
          expect(comment.content).not_to eq(valid_comment_params[:content])
        end
      end
    end
  end

  describe "DELETE /comments/:id" do
    let!(:comment) { create(:comment, user: user1, portfolio: portfolio) }
    context "headerが適切な場合" do
      context "有効なパラメータが指定された場合" do
        it "commnetの削除に成功する" do
          expect do
            delete "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
            headers: auth_user1_headers
          end.to change(Comment, :count).by(-1)

          expect(response).to have_http_status(:success)
        end
      end

      context "無効なパラメータが指定された場合" do
        context "存在しないcomment.idに対してリクエストした時" do
          before do
            delete "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
            headers: auth_user1_headers
          end
          it "commentの削除に失敗する" do
            expect do
              delete "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
              headers: auth_user1_headers
            end.to change(Comment, :count).by(0)

            expect(response).to have_http_status(:not_found)
          end
        end
      end
    end

    context "headerが不適切な場合" do
      context "headerが無効の場合" do
        it "commentの削除に失敗する" do
          expect do
            delete "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}"
          end.to change(Comment, :count).by(0)

          expect(response).to have_http_status(:unauthorized)
        end
      end

      context "headerがcomment.userのものと異なる時" do
        it "commentの削除に失敗する" do
          expect do
            delete "/api/v1/portfolios/#{comment.portfolio_id}/comments/#{comment.id}",
            headers: auth_user2_headers
          end.to change(Comment, :count).by(0)

          expect(response).to have_http_status(:forbidden)
        end
      end
    end
  end
end
