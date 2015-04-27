require ::File.expand_path('../config/environment',  __FILE__)
require 'rubygems'
require 'tweetstream'
require 'dotenv'
require 'pg'
require 'active_record'
require 'logger'
require 'pusher'
Dotenv.load

TweetStream.configure do |config|
  config.consumer_key       = ENV["twitter_api_key"]
  config.consumer_secret    = ENV["twitter_api_secret"]
  config.oauth_token        = ENV["twitter_access_token"]
  config.oauth_token_secret = ENV["twitter_access_token_secret"]
  config.auth_method        = :oauth
end

Pusher.url = "http://#{ENV['pusher_key']}:#{ENV['pusher_secret']}@api.pusherapp.com/apps/#{ENV['pusher_app_id']}"

def push_event(event, status)
  Pusher['rubySpawn_channel'].trigger(event, {
    message: '#{status.text}'
  })

  puts "Pushed event for #{status.text}"
end

TweetStream::Client.new.track('#ruby', '#deathstar') do |status|

  if(status.text.downcase!.include?("ruby"))
    push_event('ruby_event', status)
  end

  if(status.text.downcase!.include?("deathstar"))
    push_event('deathstar_event', status)
  end

end


