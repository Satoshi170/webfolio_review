FactoryBot.define do
  factory :user do
    name { "testname" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { "password" }
  end
end
