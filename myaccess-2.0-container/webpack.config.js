const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "myaccess20Container",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

   // For remotes (please adjust)
   name: "jairojobsContainer",
   filename: "remoteEntry.js",
   exposes: {
      //  './Component': './/src/app/app.component.ts',
   },        
   
   // For hosts (please adjust)
   remotes: {
       "myAccessAccount": "http://localhost:3002/remoteEntry.js",
      //  searchResultApp: "http://localhost:3003/remoteEntry.js",
      //  jobDetailApp: "http://localhost:3004/remoteEntry.js",
      //  jairojobsCompanyList: "http://localhost:3005/remoteEntry.js",
      //  companyDetails: "http://localhost:3006/remoteEntry.js",
       // "navigation": "http://localhost:3000/remoteEntry.js",
   },
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
