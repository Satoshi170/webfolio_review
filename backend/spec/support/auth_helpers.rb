module AuthHelpers
  def sign_in(params)
    post "/api/v1/auth/sign_in",
      params: params.to_json,
      headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
    response.headers.slice('client', 'uid', 'token-type', 'access-token')
  end

  def sign_out(headers = {})
    delete "/api/v1/auth/sign_out", headers: headers
  end
end
