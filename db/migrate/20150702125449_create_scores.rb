class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
    	t.float :puntuation, default: 0
    	t.string :time
    	t.string :mode
    	t.integer :id_user
    	t.string :levelgame

      t.timestamps null: false
    end
  end
end
