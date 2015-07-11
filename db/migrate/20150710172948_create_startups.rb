class CreateStartups < ActiveRecord::Migration
  def change
    create_table :startups do |t|
    	t.attachment :video
      t.timestamps null: false
    end
  end
end
