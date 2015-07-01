class Element < ActiveRecord::Base
	has_and_belongs_to_many :valencies
	has_and_belongs_to_many :compounds

	#Function to convert all the valencies of an element in a string
	def self.order_valencies_in_a_string
		elements = Element.all
		valencies_array = []
		valencies_string = ''
		elements.each do |element|
			valencies_array << element_valencies(element) 
		end	
		valencies_array
	end

	def self.element_valencies(element)
		valencies = element.valencies
		valencies_string = ''
		valencies.each do |valency|
			valencies_string = valencies_string + create_valencies_string(valency, valencies)
		end
		return valencies_string
	end

	def self.create_valencies_string(valency, valencies)
		if last_valency(valency, valencies)
			valencies_string = valency.valence.to_s + ','
		else
			valencies_string = valency.valence.to_s
		end
		return valencies_string
	end

	def self.last_valency(valency, valencies)
		last_valency_index = valencies.length - 1
		valency.valence != valencies[last_valency_index].valence
	end


	#functions to calculate the molecular weight from a formula
	def self.calculate_weight(atoms_composition_object)
		array_atoms = []
		elements = ChemistryRails::ELEMENTS
		if atoms_composition_object == {}
			array_atoms = [nil]
		else 
			atoms_composition_object.each_key do |key|
				atom = find_atom_in_formula(elements, key)
				array_atoms << atom
			end
		end
		check_formula(array_atoms, atoms_composition_object, elements)
	end

	def self.find_atom_in_formula(elements, key)
		atom = elements.find do |element| 
			if element
				element[:short] == key
			end
		end
		return atom
	end

	def self.check_formula(array_atoms, atoms_composition_object, elements)
		if incorrect_formula(array_atoms)
			return 'Incorrect Simbols. Try again!'
		else
			mass = calculate_mass(atoms_composition_object, elements)
			return 'Molecular weight: ' + mass.to_f.round(4).to_s + ' g/mol'	
		end		
	end

	def self.calculate_mass(atoms_composition_object, elements)
			mass = 0
			atoms_composition_object.each_key do |key|
				atom = find_atom_in_formula(elements, key)

				atom_mass = atom[:mass]
				atoms_number = atoms_composition_object[key]
				mass += atom_mass * atoms_number
			end
			return mass
	end

	def self.incorrect_formula(atoms)
		atoms.include? nil
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
