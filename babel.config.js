
module.exports = {
    presets: [
        ['@babel/preset-env',
            {
                "modules": "auto"
            },
        ],
        ['@babel/preset-react', {runtime: 'automatic'}],
        ["@babel/preset-typescript"]
    ],
    plugins: [
        ["module-name-mapper", {
            "moduleNameMapper": {
                "^src/(.*)": "<pkgDir>/src/$1",
                "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
                "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
                "^module_name_(.*)": "<rootDir>/substituted_module_$1.js",
                "underscore": "lodash",
                '^axios$': require.resolve('axios'),
                "^firebase/app$":
                    "<rootDir>/node_modules/firebase/app/package.json",
                "^firebase/auth$":
                    "<rootDir>/node_modules/firebase/auth/package.json",
                "^firebase/database$":
                    "<rootDir>/node_modules/firebase/database/package.json",
            }
        }],
        "babel-plugin-transform-scss",
    ],
}