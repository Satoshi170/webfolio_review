FactoryBot.define do
  factory :user do
    name { "testname" }
    email { "test@example.com" }
    password { "password" }

    after(:build) do |user|
      user.image.attach(
        io: File.open(Rails.root.join('public', 'images', 'default_user_image.png')),
        filename: 'default_user_image.png',
        content_type: 'image/png'
      )
    end
  end
end
