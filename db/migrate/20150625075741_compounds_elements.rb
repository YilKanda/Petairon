class CompoundsElements < ActiveRecord::Migration
  def change
  	create_table :compounds_elements, id: false do |t|
      t.belongs_to :compound, index: true
      t.belongs_to :element, index: true
    end
  end
end
