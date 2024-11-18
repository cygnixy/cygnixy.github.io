module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        paths: {
            src: 'src',
            dist: 'dist',
            includes: '<%= paths.src %>/_includes',
        },

        marked: {
            all: {
                options: {
                    gfm: true,
                    highlight: true, // Use highlight.js for syntax highlighting
                    tables: true,
                    breaks: false,
                    sanitize: false,
                    smartypants: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src %>/markdown',
                        src: '**/*.md',
                        dest: '<%= paths.src %>/_includes',
                        ext: '.md.html',
                    },
                ],
            },
        },


        includes: {
            files: {
                cwd: '<%= paths.src %>',
                src: ['**/*.html', '!_includes/**'],
                dest: '<%= paths.dist %>',
                flatten: false,
                options: {
                    includePath: '<%= paths.includes %>',
                    silent: true,
                    banner: ''
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dist %>',
                        src: ['**/*.html'],
                        dest: '<%= paths.dist %>',
                    },
                ],
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
                files: ['<%= paths.src %>/**/*.html'],
                tasks: ['includes', 'htmlmin']
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

    grunt.registerTask('default', ['marked', 'includes', 'htmlmin', 'uglify', 'imagemin']);
};
