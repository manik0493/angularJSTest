module.exports = function() {
    var root='./src'
    var config = {
        temp:'./.tmp/',
        /**
         * File Paths
         */
        //all js to vet
        alljs : [
            root+'/**/*.js',
            './*.js'
        ],
        less:root + '/styles/styles.less'
    };
    return config;
};