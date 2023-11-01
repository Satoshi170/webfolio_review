class Api::V1::Auth::GuestSessionsController < Api::V1::Auth::RegistrationsController
  skip_before_action :validate_sign_up_params

  def create
    unique_identifier = SecureRandom.urlsafe_base64
    @resource = User.create!(name: "guestUser", email: "guest_#{unique_identifier}@example.com",
                             password: SecureRandom.urlsafe_base64, role: :guest)
    sign_in(@resource)
    @client_id = SecureRandom.urlsafe_base64(nil, false)
    @token = @resource.create_token
    @resource.save
    update_auth_header
    render_create_success
  end
end
