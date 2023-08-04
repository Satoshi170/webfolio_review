module UserUrlHelper
  def default_user_image_url
    protocol = Rails.application.routes.default_url_options[:protocol]
    host = Rails.application.routes.default_url_options[:host]
    port = Rails.application.routes.default_url_options[:port]

    "#{protocol}://#{host}:#{port}/images/default_user_image.png"
  end
end
