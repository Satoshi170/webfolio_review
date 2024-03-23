FactoryBot.define do
  factory :user do
    name { Faker::Internet.username(specifier: 1..25) }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 6) }
  end
end
