const { argv } = require('yargs');

const getNewVersionName = (versionName) => {
  const { major, minor } = argv;
  let newVersionName = null;

  if (major) {
    let version = +versionName.substr(0, versionName.indexOf('.'));
    version++;
    newVersionName = version + versionName.substr(versionName.indexOf('.'));
  } else if (minor) {
    const firstPointIndex = versionName.indexOf('.');
    const versionNameWithoutFirstPoint = versionName.substr(firstPointIndex + 1);
    let version = +versionName.substr(
      firstPointIndex + 1,
      versionNameWithoutFirstPoint.indexOf('.')
    );
    version++;
    newVersionName =
      versionName.substr(0, versionName.indexOf('.') + 1) +
      version +
      versionName.substr(versionName.lastIndexOf('.'));
  } else {
    let version = +versionName.substr(versionName.lastIndexOf('.') + 1);
    version++;
    newVersionName = versionName.substr(0, versionName.lastIndexOf('.') + 1) + version;
  }

  return newVersionName;
};

module.exports.getNewVersionName = getNewVersionName;
