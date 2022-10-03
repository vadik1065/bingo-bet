fs = require('fs');

module.exports = async function() {
  async function postProcessFile() {
    return new Promise(resolve => {  
      // const json = JSON.stringify({ version: Date.now() });
      
      // fs.writeFile('./build/app-version.json', json, 'utf8', function(error) {
      //   if (error) throw error;
      //   console.log('app-version is created');

      //   fs.copyFile('./.htaccess', './build/.htaccess', function(err) {
      //     if (err) throw err;
      //     console.log('htaccess is created');
      //     resolve();
      //   });
      // });

      const packageJson = require('./package.json');
      const versionBody = JSON.stringify({ version: packageJson.version });

      fs.writeFile('./build/app-version.json', versionBody, 'utf8', function(error) {
        if (error) throw error;
        console.log('app-version is created');

        fs.copyFile('./.htaccess', './build/.htaccess', function(err) {
          if (err) throw err;
          console.log('htaccess is created');
          resolve();
        });
      });
    });
  }

  await postProcessFile();
};
