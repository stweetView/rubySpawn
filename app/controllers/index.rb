require 'json'
get '/' do
	erb :index

end

get '/help' do
  json({ThisIsAKey: "Piet wins"})
end
