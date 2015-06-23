class CreateCompounds < ActiveRecord::Migration
  def change
    create_table :compounds do |t|

      t.timestamps null: false
    end
  end
end
