class ElementsController < ApplicationController
	def index
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table	
	end

	def property
		@elements = Element.all
		render json: @elements
	end

end
