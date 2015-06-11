class ElementsController < ApplicationController
	def index
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table	
		@categories = ChemistryRails::ELEMENT_CATEGORIES
	end

	def property
		@elements = Element.all
		render json: @elements
	end

	def element_valencies
		@valencies = Element.order_valencies
		render json: @valencies
	end

end
