class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :priority
      t.belongs_to :board, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
