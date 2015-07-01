class User < ActiveRecord::Base
	validates :nick, uniqueness: true
	validates :nick, presence: true
	validates :name, presence: true
	validates :password, length: { minimum: 6 }, :on => :create

	attr_accessor :image
	mount_uploader :image, ImageUploader
	
	has_secure_password

	def user_registered? 
  		self.role == 'user_registered' 
	end

	def self.last_users_registered param
		users = User.order(created_at: :desc).limit(param)
	end
end
