require 'rails_helper'

RSpec.describe "Api::V1::Auth::GuestSessions", type: :request do
  describe "POST /auth/guest/sign_in" do
    it "アカウントが作成され認証ヘッダーが返却されること" do
      expect do
        post "/api/v1/auth/guest/sign_in"
      end.to change { User.count }.by(1)

      expect(response).to have_http_status(:success)
      expect(response.headers).to include("access-token", "client", "expiry", "uid")
    end
  end
end
