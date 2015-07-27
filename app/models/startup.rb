class Startup < ActiveRecord::Base

	has_attached_file :video, :styles => {
    :medium => { :geometry => "640x480", :format => 'mp4' },
    :thumb => { :geometry => "100x100#", :format => 'jpg', :time => 10 }
  }, :processors => [:transcoder]
	validates_attachment_content_type :video, :content_type => /\Avideo\/.*\Z/
	validates_presence_of :video

	has_attached_file :image, :styles => { 
	:medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
	validates_presence_of :image

	belongs_to :user

end
