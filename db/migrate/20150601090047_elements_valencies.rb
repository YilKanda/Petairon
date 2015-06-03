class ElementsValencies < ActiveRecord::Migration
  def change
    create_table :elements_valencies, id: false do |t|
      t.belongs_to :element, index: true
      t.belongs_to :valency, index: true
    end
  end
end
