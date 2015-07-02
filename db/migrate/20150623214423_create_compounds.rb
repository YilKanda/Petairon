class CreateCompounds < ActiveRecord::Migration
  def change
    create_table :compounds do |t|
    	t.string :symbol
    	t.string :name

      t.timestamps null: false
    end
  end
end
