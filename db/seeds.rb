require 'smarter_csv'
require 'chemistry_rails'

elements = []
array_elements = []
  gem_elements = ChemistryRails::ELEMENTS
  SmarterCSV.process('public/bd.csv') do |array|
    array_elements << array[0]

end

  (0..117).each do |i|
    elements << Element.create( short_name: array_elements[i][:short_name], 
      long_name: gem_elements[i+1][:long],
      mass: gem_elements[i+1][:mass],
      period: array_elements[i][:period], 
      group: array_elements[i][:group], 
      electron_affinity: array_elements[i][:electron_affinity],
      abundance: array_elements[i][:abundance],
      radium: array_elements[i][:radium],
      electron_configuration: array_elements[i][:electron_configuration], 
      ionization_energy: array_elements[i][:ionization_energy], 
      boiling_point: array_elements[i][:boiling_point], 
      melting_point: array_elements[i][:melting_point], 
      electronegativity: array_elements[i][:electronegativity],
      atomic_number: array_elements[i][:atomic_number],
      category: ChemistryRails::ELEMENT_CATEGORIES[gem_elements[i+1][:category]]
    ) 
  end
      
# H-valencies
      v1 = Valency.create valence: -4 
      v2 = Valency.create valence: -3 
      v3 = Valency.create valence: -2 
      v4 = Valency.create valence: -1 
      v5 = Valency.create valence: 0 
      v6 = Valency.create valence: 1 
      v7 = Valency.create valence: 2 
      v8 = Valency.create valence: 3
      v9 = Valency.create valence: 4
      v10 = Valency.create valence: 5 
      v11 = Valency.create valence: 6
      v12 = Valency.create valence: 7
      v13 = Valency.create valence: 8   

elements[0].valencies << v4
elements[0].valencies << v6

puts "Seed complete!"
