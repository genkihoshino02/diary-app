class ChangeColumnsOfDiaries < ActiveRecord::Migration[6.1]
  def change
    change_column :diaries, :title, :string, :null=>false
    change_column :diaries, :title, :string, :limit=>50
    change_column :diaries, :content, :string, :null=>false 
    change_column :diaries, :content, :string, :limit=>1024
  end
end
