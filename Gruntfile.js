module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-simple-mocha");

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ["./server.js", "/test/*.js"]
    },

    simplemocha: {
      src: ["test/*.js"]
    }
  });

  grunt.registerTask("test", ["jshint", "simplemocha"]);
  grunt.registerTask("default", ["test"]);
};
