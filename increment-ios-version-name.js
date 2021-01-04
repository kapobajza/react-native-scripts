const fs = require('fs');
const path = require('path');

const { getNewVersionName } = require('./version-helpers');

const incrementIOSVersionName = () => {
  const infoPlistFilePath = path.join(__dirname, '../ios/ShoppieGo/Info.plist');

  fs.readFile(infoPlistFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log('err while reading file: ', err);
      return;
    }

    const CF_BUNDLE_VERSION_LITERAL = '<key>CFBundleShortVersionString</key>';
    const STRING_TAG_OPENING_LITERAL = '<string>';
    const STRING_TAG_CLOSING_LITERAL = '</string>';
    const dataSplit = data.split(CF_BUNDLE_VERSION_LITERAL);
    const splittedString = dataSplit[1];
    const versionName = splittedString.substr(
      splittedString.indexOf(STRING_TAG_OPENING_LITERAL) + STRING_TAG_OPENING_LITERAL.length,
      splittedString.indexOf(STRING_TAG_CLOSING_LITERAL) - STRING_TAG_CLOSING_LITERAL.length - 1
    );
    const newVersionName = getNewVersionName(versionName);

    const getBundleVersionTag = (versionName) =>
      `${STRING_TAG_OPENING_LITERAL}${versionName}${STRING_TAG_CLOSING_LITERAL}`;

    const result =
      `${dataSplit[0]}${CF_BUNDLE_VERSION_LITERAL}\n\t` +
      `${getBundleVersionTag(newVersionName)}` +
      dataSplit[1].replace(getBundleVersionTag(versionName) + '\n\t', '');

    fs.writeFile(infoPlistFilePath, result, (err) => {
      if (err) {
        console.log('err while writing file: ', err);
      }
    });
  });
};

const init = async () => {
  incrementIOSVersionName();
};

init();
