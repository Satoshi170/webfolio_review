FactoryBot.define do
  factory :portfolio do
    title { "testTitle" }
    content { "testContent" }
    user
  end
end
