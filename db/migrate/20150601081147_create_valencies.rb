class CreateValencies < ActiveRecord::Migration
  def change
    create_table :valencies do |t|
    	t.integer :valence

      t.timestamps null: false
    end
  end
end
