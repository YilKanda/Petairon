class ElementsController < ApplicationController
	def index
		@elements = Element.all	
		@matrix_elements = [
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,5,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,5,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

			respond_to do |format|
				format.html
				format.json{ render json: @elements}
			end

		
		#@elements_alkali_metals	
	end

	def property(property)
		@elements = Element.all
		@properties = @elements.property
		render json: @properties
	end
end
