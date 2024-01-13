class TagResource
  include Alba::Resource

  root_key :tag

  attributes :id, :name
end
