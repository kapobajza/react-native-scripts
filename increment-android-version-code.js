const fs = require('fs');
const path = require('path');

const incrementAndroidVersionCode = (manifestFilePath) => {
  fs.readFile(manifestFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log('err while reading file: ', err);
      return;
    }

    const VERSION_CODE_LITERAL = 'android:versionCode=';
    const subStringLength = data.indexOf(VERSION_CODE_LITERAL) + VERSION_CODE_LITERAL.length;
    const versionCodePart = data.substr(subStringLength + 1);
    const versionCodeStr = versionCodePart.substr(0, versionCodePart.indexOf('"'));
    let versionCode = +versionCodeStr;
    versionCode++;

    const result =
      data.substr(0, subStringLength) +
      `"${versionCode}"` +
      data.substr(subStringLength + versionCodeStr.length + 2);

    fs.writeFile(manifestFilePath, result, (err) => {
      if (err) {
        console.log('err while writing to file: ', err);
      }
    });
  });
};

const init = () => {
  const mainManifestPath = path.join(__dirname, '../android/app/src/main/AndroidManifest.xml');
  const devManifestPath = path.join(__dirname, '../android/app/src/dev/AndroidManifest.xml');
  const stgManifestPath = path.join(__dirname, '../android/app/src/stg/AndroidManifest.xml');
  const prodManifestPath = path.join(__dirname, '../android/app/src/prod/AndroidManifest.xml');

  [mainManifestPath, devManifestPath, stgManifestPath, prodManifestPath].forEach((path) =>
    incrementAndroidVersionCode(path)
  );
};

init();
