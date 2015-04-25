require 'json'
post '/tweets' do 
	# puts params
	time_of_last = Time.at(params[:timeOfLastRequest].to_i / 1000)
	count =  Tweet.where("created_at > ?", time_of_last).length
	puts count
	{time: Time.now.to_f * 1000 ,count: count}.to_json
	
end