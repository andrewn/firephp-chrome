
FirePHP-chrome is an extension for Google Chrome to allow the Chrome console to display FirePHP messages. 

For more details of FirePHP: 
  http://www.firephp.org/

How to install
--------------
This extension uses Chrome's "experimental extensions" so you'll need to enable these in your browser first:
1. Type "chrome://flags/" into Chrome's title bar
2. Find "Experimental Extension APIs" in the list
3. Click "Enable"
4. Restart Chrome

There are 2 ways to install the extension. 

### Using CRX file:
1. Click on this link: 
   https://github.com/andrewn/firephp-chrome/raw/master/dist/firephp-0.2.0.crx
2. Chrome will warm you about extensions and apps, click "Continue"
3. Chrome will ask you if you want to "Install FirePHP-chrome", click "Install"

### From source (if you want to develop the extension):
1. Download or clone the source
2. Open the extensions page via Window -> Extensions
3. Click on "Load unpacked extension"
4. Navigate to the "src/" directory and "Select"

How to use
----------
To use this extension, navigate to the page you want to inspect and:
1. Open the Developer Tools (Wrench -> Tools -> Developer Tools)
2. Click on the "Console" tab
3. Refresh the page

You should now see any FirePHP messages sent from the server in the console output.

Supported types
---------------
WARN, LOG, INFO, ERROR, EXCEPTION are the currently supported types.

How it works
------------
A page with the Developer Tools panel open will have a FirePHP request header appended.

The response headers are parsed in a background page, and sent through to a script running on the original page that outputs them to the console.

Adding new types
----------------
See the 'actionsToOutputMap' in src/js/bridge.js which is a map of action types "log", "info", "exception" to functions that format and output the info into the page. Add your type here and send me a pull request.

Testing
-------
There's a ruby-based test service that sends headers for each of the supported types. If you add a new type, it would be good if you could change the service to output the correct headers too as this makes testing easier.

Running the test service:
 $ cd test-service
 $ bundle install
 $ bundle exec rackup
 [2011-10-29 14:40:28] INFO  WEBrick 1.3.1
 [2011-10-29 14:40:28] INFO  ruby 1.8.7 (2010-01-10) [universal-darwin11.0]
 [2011-10-29 14:40:28] INFO  WEBrick::HTTPServer#start: pid=14191 port=9292

You can now visit the test server at http://localhost:9292/

It displays a list of the items being logged and viewing the console should show the same messages in the output.

TODO:
----
- support more logging types (from here: http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/)
- remove test service and use developer comapnion examples
- autoupdating