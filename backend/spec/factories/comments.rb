FactoryBot.define do
  factory :comment do
    user { nil }
    portfolio { nil }
    content { "MyString" }
  end
end
