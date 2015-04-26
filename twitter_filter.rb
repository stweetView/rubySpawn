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

TweetStream::Client.new.track('#ruby') do |status|
  # Ignore replies. Probably not relevant in your own filter app, but we want
  # to filter out funny tweets that stand on their own, not responses.
  if status.text !~ /^@\w+/
    # Yes, we could just store the Status object as-is, since it's actually just a
    # subclass of Hash. But Twitter results include lots of fields that we don't
    # care about, so let's keep it simple and efficient for the web app.
    # STORE.push(
    #   'id' => status[:id],
    #   'text' => status.text,
    #   'username' => status.user.screen_name,
    #   'userid' => status.user[:id],
    #   'name' => status.user.name,
    #   'profile_image_url' => status.user.profile_image_url,
    #   'received_at' => Time.new.to_i
    # )

    Pusher['ruby_channel'].trigger('tweet_event', {
      message: '#{status.text}'
    })

    puts "Got tweet #{status.text}"

  end
end
