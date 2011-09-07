require 'rubygems'
require 'sinatra/base'
require 'json'

class MyApp < Sinatra::Base
    get '/' do
      log("Hello from firephp")
      info("This is a information")
      warn("This is a warning")
      error("This is an error")

      'Hello world!'
    end

    before do
      @firephp = []
    end

    after do 
      headers collect_headers
    end

    def log(message)
      log_item("LOG", message)
    end

    def warn(message)
      log_item("WARN", message)
    end

    def error(message)
      log_item("ERROR", message)
    end

    def info(message)
      log_item("INFO", message)
    end

    def log_item(type, message)
        msg = {}
        msg[:type]   = type
        msg[:object] = message
        @firephp.push msg
    end      

    def collect_headers
        headers = {}
        headers["X-Wf-Protocol-1"] = "http://meta.wildfirehq.org/Protocol/JsonStream/0.2"
        headers["X-Wf-1-Plugin-1"] = "http://meta.firephp.org/Wildfire/Plugin/FirePHP/Library-FirePHPCore/0.3"
        headers["X-Wf-1-Structure-1"] = "http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1"
    
        count = 1
        @firephp.each do |o|
          next if !(o[:type] =~ /^(LOG|INFO|WARN|ERROR)$/)
          msg = "[#{{ "Type" => o[:type] }.to_json},#{o[:object].to_json}]"
          headers["X-Wf-1-1-1-#{count}"] = "#{msg.length}|#{msg}|"
          count+=1
        end
        headers
    end
end