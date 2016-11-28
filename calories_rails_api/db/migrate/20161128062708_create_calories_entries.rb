class CreateCaloriesEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :calories_entries do |t|
      t.datetime :date, null: false
      t.text :title, null: false
      t.integer :calories_amount, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
