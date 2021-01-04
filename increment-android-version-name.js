const fs = require('fs');
const path = require('path');

const { getNewVersionName } = require('./version-helpers');

const incrementAndroidVersionName = (manifestFilePath) => {
  fs.readFile(manifestFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log('err while reading file: ', err);
      return;
    }

    const VERSION_CODE_LITERAL = 'android:versionName=';
    const subStringLength = data.indexOf(VERSION_CODE_LITERAL) + VERSION_CODE_LITERAL.length;
    const firstPart = data.substr(subStringLength);
    const versionName = firstPart.substr(
      firstPart.indexOf('"') + 1,
      firstPart.substr(1).indexOf('"')
    );
    const newVersionName = getNewVersionName(versionName);

    const result =
      data.substr(0, subStringLength) +
      `"${newVersionName}"` +
      data.substr(subStringLength + versionName.length + 2);

    fs.writeFile(manifestFilePath, result, (err) => {
      if (err) {
        console.log('err while writing file: ', err);
      }
    });
  });
};

const init = async () => {
  const mainManifestPath = path.join(__dirname, '../android/app/src/main/AndroidManifest.xml');
  const devManifestPath = path.join(__dirname, '../android/app/src/dev/AndroidManifest.xml');
  const stgManifestPath = path.join(__dirname, '../android/app/src/stg/AndroidManifest.xml');
  const prodManifestPath = path.join(__dirname, '../android/app/src/prod/AndroidManifest.xml');

  [mainManifestPath, devManifestPath, stgManifestPath, prodManifestPath].forEach((path) =>
    incrementAndroidVersionName(path)
  );
};

init();
