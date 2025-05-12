class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.text :description
      t.string :address
      t.string :category
      t.string :latitude
      t.string :longitude
      t.string :image_url
      t.string :action_text
      t.string :action_url
      t.string :contact_phone
      t.string :opening_hours

      t.timestamps
    end
  end
end
