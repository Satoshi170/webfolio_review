include FactoryBot::Syntax::Methods

users = create_list(:user, 10)

articles = Array.new(50) do
  create(:article, user: users.sample)
end

comments = Array.new(100) do
  create(:comment, user: users.sample, article: articles.sample)
end

users.each do |user|
  good_articles = articles.sample(rand(50))
  good_articles.each do |article|
    create(:good, user: user, article: article)
  end
end
