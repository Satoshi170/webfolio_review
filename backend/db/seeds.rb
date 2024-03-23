Tag.create(name: "bug report")
Tag.create(name: "suggestion")

env_seed_file = Rails.root.join("db", "seeds", "#{Rails.env.downcase}.rb")

if File.exist?(env_seed_file)
  load(env_seed_file)
end
