require 'rails_helper'

RSpec.describe "Api::V1::Portfolios::Goods", type: :request do
  let(:user) { create(:user) }
  let(:portfolio) { create(:portfolio) }
  let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

  describe "POST /goods" do
    context "有効なパラメータが指定された場合" do
      it "新たなgoodの作成に成功する" do
        expect do
          post "/api/v1/portfolios/#{portfolio.id}/goods", headers: auth_headers
        end.to change(Good, :count).by(1)

        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).to eq("success")
      end
    end

    context "無効なパラメータが指定された場合" do
      context "すでに作成済みの場合" do
        let!(:good) { create(:good, user: user, portfolio: portfolio) }
        it "作成に失敗する" do
          expect do
            post "/api/v1/portfolios/#{portfolio.id}/goods", headers: auth_headers
          end.to change(Good, :count).by(0)

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["status"]).to eq("error")
        end
      end

      context "存在しないportfolio.idに対してリクエストを送った場合" do
        it "作成に失敗する" do
          expect do
            post "/api/v1/portfolios/#{portfolio.id + 1}/goods", headers: auth_headers
          end.to change(Good, :count).by(0)

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["status"]).to eq("error")
        end
      end
    end
  end

  describe "DELETE /goods" do
    let!(:good) { create(:good, user: user, portfolio: portfolio) }
    context "有効なパラメータが指定された場合" do
      it "削除に成功する" do
        expect do
          delete "/api/v1/portfolios/#{portfolio.id}/goods", headers: auth_headers
        end.to change(Good, :count).by(-1)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["status"]).to eq("success")
      end
    end
    context "無効なパラメータが指定された場合" do
      context "すでに削除済みの場合" do
        before do
          delete "/api/v1/portfolios/#{portfolio.id}/goods", headers: auth_headers
        end

        it "削除に失敗する" do
          expect do
            delete "/api/v1/portfolios/#{portfolio.id}/goods", headers: auth_headers
          end.to change(Good, :count).by(0)
          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)["status"]).to eq("error")
        end
      end

      context "存在しないportfolio.idに対してリクエストを送った場合" do
        it "削除に失敗する" do
          expect do
            delete "/api/v1/portfolios/#{portfolio.id + 1}/goods", headers: auth_headers
          end.to change(Good, :count).by(0)
          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)["status"]).to eq("error")
        end
      end
    end
  end
end
