# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name,
            presence: { message: 'Name is required.' },
            length: { minimum: 1, maximum: 25, too_long: 'Name is too long.' },
            on: [:create, :update]

  validates :password, :password_confirmation,
            length: { minimum: 6, too_short: 'Password is too short.' },
            on: [:create, :update],
            allow_blank: true
end
