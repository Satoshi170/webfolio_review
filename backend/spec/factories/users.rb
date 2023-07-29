FactoryBot.define do
  factory :user do
    name { "testname" }
    email { "test@example.com" }
    password { "password" }
    image { "testimage" }
  end
end
