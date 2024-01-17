require "net/http"
require "nokogiri"

class Api::V1::MetaDataController < ApplicationController
  def show
    url = meta_data_params[:url]
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)

    if response.is_a?(Net::HTTPSuccess)
      doc = Nokogiri::HTML(response.body)

      title = doc.at('meta[name="title"]')&.attribute('content')&.value || doc.title
      description = doc.at('meta[name="description"]')&.attribute('content')&.value
      image = doc.at('meta[property="og:image"]')&.attribute('content')&.value

      render json: { url: url, title: title, description: description, image: image }
    else
      render json: { error: 'Unable to fetch data' }, status: :bad_request
    end
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private

  def meta_data_params
    params.require(:meta_data).permit(:url)
  end
end
