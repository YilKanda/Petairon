class ElementsController < ApplicationController
	def index
		@elements = Element.all	
		
		#@elements_alkali_metals	
	end
end
