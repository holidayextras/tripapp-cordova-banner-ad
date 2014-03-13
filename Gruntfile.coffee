config = (grunt) ->

  uglify:
    options:
      mangle: true
      compress: true
      report: 'min'
    js:
      files:
        "hxmobapp.smartbanner.min.js": ["hxmobapp.smartbanner.js"]

module.exports = (grunt) ->
  grunt.initConfig(config(grunt))
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['uglify'])

