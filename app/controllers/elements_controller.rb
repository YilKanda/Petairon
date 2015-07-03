class ElementsController < ApplicationController
	def home	
	end

	def index
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table	
		@categories = ChemistryRails::ELEMENT_CATEGORIES #creo que esto no es necesario
	end

	def compounds
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table
	end

	def game
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table
	end
	
	def property
		@elements = Element.all
		render json: @elements
	end

	def element_valencies
		@valencies = Element.order_valencies_in_a_string
		render json: @valencies
	end

	def molecule
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table
		@formula = ChemistryRails::Formula.new(params[:molecule]) 
		@formula_elements = @formula.elements
		@molecular_weight = Element.calculate_weight(@formula_elements)
		render 'compounds'
	end

end
