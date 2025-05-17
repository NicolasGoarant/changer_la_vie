class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :category
      t.text :description
      t.string :image_url
      t.string :action_url
      t.string :action_text

      t.timestamps
    end
  end
end
