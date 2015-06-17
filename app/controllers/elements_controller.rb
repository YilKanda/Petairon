class ElementsController < ApplicationController
	def index
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table	
		@categories = ChemistryRails::ELEMENT_CATEGORIES #creo que esto no es necesario
	end

	def compounds
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

	def game
		@elements = Element.all	
		@matrix_elements = Element.matrix_periodic_table
		@random_elements = @elements.sample(@elements.length)
		
		respond_to do |format|
			format.html
    	format.json { render json: @random_elements }
		end
	end
end
