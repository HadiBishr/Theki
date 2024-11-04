const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "react-refresh/runtime": path.resolve(__dirname, "node_modules/react-refresh/runtime.js")
        },
        configure: (webpackConfig) => {
            webpackConfig.resolve.symlinks = false; // Prevent symlink issues
            return webpackConfig;
        }
    },
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")]
        }
    }
};


// // craco.config.js
// module.exports = {
//     style: {
//         postcss: {
//             plugins: [
//                 require('tailwindcss'),
//                 require('autoprefixer'),
//             ],
//         },
//     },
// }