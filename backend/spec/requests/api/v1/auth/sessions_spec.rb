require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let!(:user) { create(:user) }

  describe "POST /auth/sign_in" do
    context "正しい資格情報を使用した場合" do
      it "ユーザーがサインインし、認証ヘッダーが返されること" do
        sign_in(email: user.email, password: user.password)
        expect(response).to have_http_status(:success)
        expect(response.headers).to include("access-token", "client", "expiry", "uid")
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "data" => {
            "name" => user.name,
            "image" => user.image,
          },
        })
      end
    end

    context "間違った資格情報を使用した場合" do
      it "エラーメッセージが返されること" do
        invalid_user_params = { email: user.email, password: "incorrect_password" }
        sign_in(invalid_user_params)
        puts response.body
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
    context "既にログイン状態の場合" do
      it "ログアウトが成功すること" do
        sign_in(email: user.email, password: user.password)
        auth_headers = response.headers.slice("access-token", "client", "expiry", "uid")
        sign_out(auth_headers)
        expect(response).to have_http_status(:success)
        expect(response.body).to include('"success":true')
      end
    end

    context "ログインしていない場合" do
      it "ログアウトが失敗すること" do
        sign_out
        expect(response).to have_http_status(:not_found)
        expect(response.body).to include('"success":false')
      end
    end
    # TODO:ログイン状態でないとアクセスできないエンドポイントを実装したときにコメントアウトを外す
    # context "ログアウトに成功したとき" do
    #   before do
    #     sign_in(email: user.email, password: user.password)
    #     @auth_headers = response.headers.slice("access-token", "client", "expiry", "uid")
    #     sign_out(@auth_headers)
    #   end

    #   it "認証トークンが無効になり、アクセスが拒否されること" do
    #     get "/api/v1/some_endpoint", headers: @auth_headers
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
  end

  describe "GET /auth/sessions" do
    context "認証済みユーザーの場合" do
      it "成功のHTTPステータスとユーザー情報を返すこと" do
        auth_headers = sign_in({ email: user.email, password: user.password })
        get "/api/v1/auth/sessions", headers: auth_headers

        expect(response).to have_http_status(:success)

        expect(response.body).to include('"is_login":true')
        expect(response.body).to include(user.id.to_s)
      end
    end

    context "未認証ユーザーの場合" do
      it "失敗のHTTPステータスとエラーメッセージを返すこと" do
        get "/api/v1/auth/sessions"

        expect(response).to have_http_status(:success)

        expect(response.body).to include('"is_login":false')
      end
    end
  end
end
