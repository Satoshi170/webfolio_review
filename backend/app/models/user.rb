# frozen_string_literal: true

class User < ActiveRecord::Base
	has_one_attached :image
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  def image_url
    if image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
    else
      "#{Rails.application.routes.default_url_options[:protocol]}://#{Rails.application.routes.default_url_options[:host]}:#{Rails.application.routes.default_url_options[:port]}/images/default_user_image.png"
    end
  end

  validates :name,
            presence: { message: 'Name is required.' },
            length: { minimum: 1, maximum: 25, too_long: 'Name is too long.' },
            on: [:create, :update]

  validates :password, :password_confirmation,
            length: { minimum: 6, too_short: 'Password is too short.' },
            on: [:create, :update],
            allow_blank: true
end
