class Element < ActiveRecord::Base
	has_and_belongs_to_many :valencies

	def self.order_valencies
		elements = Element.all
		valencies_array = []
		valencies_string = ''
		elements.each do |element|
			valencies = element.valencies
			last_valency_index = valencies.length - 1
			valencies.each do |valency|
				if valency.valence != valencies[last_valency_index].valence
					valencies_string = valencies_string + valency.valence.to_s + ','
				else
					valencies_string = valencies_string + valency.valence.to_s
				end
			end
			valencies_array << valencies_string
			valencies_string = ''
		end	
		valencies_array
	end

	def self.matrix_periodic_table
		return [
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,6,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,6,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,5,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,5,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
	end

end
