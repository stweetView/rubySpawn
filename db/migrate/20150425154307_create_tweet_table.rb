class CreateTweetTable < ActiveRecord::Migration
  def change
  	create_table :tweets do |t|
  		t.text :user_name
  		t.text :text
  		t.text :profile_image_url
  		t.timestamps null: false
  	end
  end
end
