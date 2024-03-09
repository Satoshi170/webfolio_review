require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe "POST /auth/sign_in" do
    let!(:user) { create(:user) }

    context "正しい資格情報を使用した場合" do
      it "ユーザーがサインインし、認証ヘッダーが返されること" do
        sign_in(email: user.email, password: user.password)
        expect(response).to have_http_status(:success)
        expect(response.headers).to include("access-token", "client", "expiry", "uid")
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "success" => true,
          "message" => "Signed in successfly",
        })
      end
    end

    context "間違った資格情報を使用した場合" do
      it "エラーメッセージが返されること" do
        invalid_user_params = { email: user.email, password: "incorrect_password" }
        sign_in(invalid_user_params)
        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "success" => false,
          "errors" => ["Invalid login credentials. Please try again."],
        })
      end
    end
  end

  describe "DELETE /auth/sign_out" do
    let!(:user) { create(:user, role: "user") }
    let!(:guest_user) { create(:user, role: "guest") }
    context "既にログイン状態の場合" do
      context "roleがuserの場合" do
        it "ログアウトが成功し削除はされないこと" do
          sign_in(email: user.email, password: user.password)
          auth_headers = response.headers.slice("access-token", "client", "expiry", "uid")
          expect do
            sign_out(auth_headers)
          end.to change { User.count }.by(0)
          expect(response).to have_http_status(:success)
          expect(response.body).to include('"success":true')
        end
      end

      context "roleがguestの場合" do
        context "articlesが存在する時" do
          let(:article) { create(:article, user: guest_user) }
          it "ログアウトに成功し削除はされないこと" do
            auth_headers = sign_in(email: user.email, password: user.password)
            expect do
              sign_out(auth_headers)
            end.to change { User.count }.by(0)
            expect(response).to have_http_status(:success)
            expect(response.body).to include('"success":true')
          end
        end

        context "goodsが存在する時" do
          let(:article) { create(:article, user: user) }
          let!(:good) { create(:good, user: guest_user, article: article) }
          it "ログアウトに成功し削除はされないこと" do
            auth_headers = sign_in(email: guest_user.email, password: guest_user.password)
            expect do
              sign_out(auth_headers)
            end.to change { User.count }.by(0)
            expect(response).to have_http_status(:success)
          end
        end

        context "articles,goodsが存在しない時" do
          it "ログアウトに成功しguest_userが削除される" do
            auth_headers = sign_in(email: guest_user.email, password: guest_user.password)
            expect do
              sign_out(auth_headers)
            end.to change { User.count }.by(-1)
            expect(response).to have_http_status(:success)
          end
        end
      end
    end

    context "ログインしていない場合" do
      it "ログアウトが失敗すること" do
        sign_out
        expect(response).to have_http_status(:not_found)
        expect(response.body).to include('"success":false')
      end
    end
  end

  describe "GET /auth/sessions" do
    let!(:user) { create(:user) }

    context "認証済みユーザーの場合" do
      it "成功のHTTPステータスとユーザー情報を返すこと" do
        auth_headers = sign_in({ email: user.email, password: user.password })
        get "/api/v1/auth/sessions", headers: auth_headers

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "is_login" => true,
          "data" => {
            "id" => user.id,
            "name" => user.name,
            "image" => user.image_url,
            "role" => "user",
          },
        })
      end
    end

    context "未認証ユーザーの場合" do
      it "失敗のHTTPステータスとエラーメッセージを返すこと" do
        get "/api/v1/auth/sessions"

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({ "is_login" => false })
      end
    end
  end
end
