module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/patreon.html': 'src/patreon.html'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/build.js': ['src/scripts/*.js']
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/images/'
                }]
            }
        },

        watch: {
            html: {
                files: ['src/**/*.html'],
                tasks: ['htmlmin']
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['uglify']
            },
            images: {
                files: ['src/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['imagemin']
            }
        }
    });

    grunt.registerTask('default', ['htmlmin', 'uglify', 'imagemin']);
};
