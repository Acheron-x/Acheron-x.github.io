source "https://rubygems.org"

# Comment out the Jekyll gem since GitHub Pages will provide it
# gem "jekyll", "~> 4.4.1"

# Comment out or remove the minima theme if you want to create your own
# gem "minima", "~> 2.5"

# Uncomment this line for GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Keep your Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem 'jemoji'
end

# Keep platform-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]