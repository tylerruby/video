class ApplicationController < ActionController::Base
  def default_url_options
    if Rails.env.production?
      {:host => "gentle-river-1982.herokuapp.com"}
    else  
      {}
    end
  end

  protect_from_forgery with: :exception
end