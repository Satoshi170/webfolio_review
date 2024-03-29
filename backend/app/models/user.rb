# frozen_string_literal: true

class User < ActiveRecord::Base
  has_one_attached :image
  has_many :articles, dependent: :delete_all
  has_many :goods, dependent: :delete_all
  has_many :liked_articles, through: :goods, source: :article
  has_many :comments, dependent: :delete_all

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  def image_url
    if image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
    end
  end

  enum role: { user: 0, guest: 1 }
  validates :name,
            presence: true,
            length: { maximum: 25 },
            on: [:create, :update]

  validates :password, :password_confirmation,
            length: { minimum: 6 },
            on: [:create, :update],
            allow_blank: true
  validates :image,
            blob: { content_type: ['image/png', 'image/jpeg'], size_range: 0..2.megabytes }
end
