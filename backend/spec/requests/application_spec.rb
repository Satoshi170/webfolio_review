require 'rails_helper'

RSpec.describe "Application", type: :request do
  describe "record_not_found" do
    it "存在しないidに対してshowリクエストを送ったときrecord_not_foundが呼び出される" do
      get "/api/v1/portfolios/1"

      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response).to eq({
        "status" => "error",
        "message" => "Record not found",
      })
    end
  end
end
