Tripapp Cordova Smart Banner (v1.0.0)
============================

Smart Banners are used iOS 6+ to promote apps on the App Store from a website. This jQuery plugin
brings this feature to older iOS versions and Android devices.

## Usage ##
    <html>
      <head>
        <title>Holiday Extras Mobile App Smart Banner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="hxmobapp.smartbanner.css" type="text/css" media="screen">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
        <script src="hxmobapp.smartbanner.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            $.smartbanner({
                force: 'ios',
                daysHidden: 14, // Days hidden after banner closed.
                daysReminder: 30 // Days hidden after the view button pressed.
            });
          });
        </script>
      </head>
      <body>
        <h1>Page Content</h1>
      </body>
    </html>


## Making changes ##

Please do **not** make changes that aren't put in as a pull request to this repository first. If there's somthing you want changed, either raise a Jira to get it changed, or put in a pull request to this repository yourself.
