class AddReferencesToUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :diaries, :user_id
    add_reference :diaries, :user
  end
end
