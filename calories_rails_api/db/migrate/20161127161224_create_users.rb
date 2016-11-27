class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, default: ''
      t.string :password_digest, null: false
      t.string :auth_token, null: false
      t.integer :role, null: false, default: 0
      t.integer :daily_calories_goal, null: false

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :auth_token, unique: true
  end
end
