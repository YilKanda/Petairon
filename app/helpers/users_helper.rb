module UsersHelper
	def getUser(session, email)
		User.find_by_email(params[session][email])
	end
end
