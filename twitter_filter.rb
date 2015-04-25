require 'rubygems'
require 'tweetstream'
require 'dotenv'
Dotenv.load

puts ENV["twitter_api_key"]

# require File.join(File.dirname(__FILE__), 'tweet_store')

# USERNAME = "my_username"  # Replace with your Twitter user
# PASSWORD = "my_password"  # and your Twitter password
# STORE = TweetStore.new


TweetStream.configure do |config|
  config.consumer_key       = 'abcdefghijklmnopqrstuvwxyz'
  config.consumer_secret    = '0123456789'
  config.oauth_token        = 'abcdefghijklmnopqrstuvwxyz'
  config.oauth_token_secret = '0123456789'
  config.auth_method        = :oauth
end

# TweetStream::Client.new(USERNAME, PASSWORD).track('#ruby') do |status|
#   # Ignore replies. Probably not relevant in your own filter app, but we want
#   # to filter out funny tweets that stand on their own, not responses.
#   if status.text !~ /^@\w+/
#     # Yes, we could just store the Status object as-is, since it's actually just a
#     # subclass of Hash. But Twitter results include lots of fields that we don't
#     # care about, so let's keep it simple and efficient for the web app.
#     # STORE.push(
#     #   'id' => status[:id],
#     #   'text' => status.text,
#     #   'username' => status.user.screen_name,
#     #   'userid' => status.user[:id],
#     #   'name' => status.user.name,
#     #   'profile_image_url' => status.user.profile_image_url,
#     #   'received_at' => Time.new.to_i
#     # )
#     puts "Got tweet #{status}"
#   end
# end