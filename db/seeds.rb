require 'smarter_csv'
require 'chemistry_rails'

elements = []
array_elements = []
gem_elements = ChemistryRails::ELEMENTS
array_valencies = []
array_compound = []

  SmarterCSV.process('public/bd.csv') do |array|
    array_elements << array[0]
  end

  SmarterCSV.process('public/valencies.csv') do |array|
    array_valencies << array[0]
  end

  SmarterCSV.process('public/compounds.csv') do |array|
    puts array
    array_compound << array[0]
  end

amount_of_elements = array_elements.length - 1 
  (0..amount_of_elements).each do |i|
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
      category: gem_elements[i+1][:category]
    ) 
  end
      
# H-valencies
valencies = []
      valencies << [:v_4, Valency.create(valence: -4)] 
      valencies << [:v_3, Valency.create(valence: -3)] 
      valencies << [:v_2, Valency.create(valence: -2)] 
      valencies << [:v_1, Valency.create(valence: -1)] 
      valencies << [:v0, Valency.create(valence: 0)]
      valencies << [:v1, Valency.create(valence: 1)]
      valencies << [:v2, Valency.create(valence: 2)]
      valencies << [:v3, Valency.create(valence: 3)]
      valencies << [:v4, Valency.create(valence: 4)]
      valencies << [:v5, Valency.create(valence: 5)]
      valencies << [:v6, Valency.create(valence: 6)]
      valencies << [:v7, Valency.create(valence: 7)]
      valencies << [:v8, Valency.create(valence: 8)]

valencies.each do |valency|
  (0..amount_of_elements).each do |i|     
    if array_valencies[i][valency[0]] == 1
      elements[i].valencies << valency[1]
    end
  end
end



puts "Seed complete!"


