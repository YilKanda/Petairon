class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
    	t.integer :puntuation, default: 0
    	t.integer :mins
      t.integer :secs
    	t.string :mode
    	t.integer :id_user
    	t.string :levelgame

      t.timestamps null: false
    end
  end
end
