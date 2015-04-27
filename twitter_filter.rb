require ::File.expand_path('../config/environment',  __FILE__)
require 'rubygems'
require 'tweetstream'
require 'dotenv'
require 'pg'
require 'active_record'
require 'logger'
require 'pusher'
require 'json'
Dotenv.load

TweetStream.configure do |config|
  config.consumer_key       = ENV["twitter_api_key"]
  config.consumer_secret    = ENV["twitter_api_secret"]
  config.oauth_token        = ENV["twitter_access_token"]
  config.oauth_token_secret = ENV["twitter_access_token_secret"]
  config.auth_method        = :oauth
end

Pusher.url = "http://#{ENV['pusher_key']}:#{ENV['pusher_secret']}@api.pusherapp.com/apps/#{ENV['pusher_app_id']}"

TweetStream::Client.new.track('lol') do |status|

  if !status.geo.nil?
    Pusher['tweets_channel'].trigger('tweet_event', status.geo)
    p status.geo.coords
    p status.text
  end

end


