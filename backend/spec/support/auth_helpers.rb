module AuthHelpers
  def sign_in(params)
    post "/api/v1/auth/sign_in", params: params
  end

  def sign_out(headers = {})
    delete "/api/v1/auth/sign_out", headers: headers
  end
end
