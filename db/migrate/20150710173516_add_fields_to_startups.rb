class AddFieldsToStartups < ActiveRecord::Migration
  def change
  	add_column :startups, :name, :string
  	add_column :startups, :website, :string
  	add_column :startups, :description, :string
  	add_attachment :startups, :image
  end
end
