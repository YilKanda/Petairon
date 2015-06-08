class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
    	t.string :short_name
        t.string :long_name
        t.float :mass
    	t.integer :period
    	t.integer :group
    	t.float :boiling_point
    	t.float :melting_point
    	t.float :ionization_energy
    	t.float :electronegativity
    	t.float :electron_affinity
    	t.float :abundance
    	t.float :radium
    	t.string :electron_configuration
        t.integer :atomic_number
        t.string :category

      t.timestamps null: false
    end
  end
end
