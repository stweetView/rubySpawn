require 'json'
post '/tweets' do 
	puts params
	Tweet.all.count.to_json
	
end