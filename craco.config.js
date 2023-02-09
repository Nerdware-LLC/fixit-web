const path = require("path");

const REPO_ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = `${REPO_ROOT_DIR}/src`;

module.exports = {
  webpack: {
    alias: {
      "@ROOT": REPO_ROOT_DIR,
      "@": SRC_DIR,
      "@app": `${SRC_DIR}/app`,
      "@cache": `${SRC_DIR}/app/apolloCache`,
      "@components": `${SRC_DIR}/components`,
      "@config": `${SRC_DIR}/config`,
      "@graphql": `${SRC_DIR}/graphql`,
      "@hooks": `${SRC_DIR}/hooks`,
      "@images": `${SRC_DIR}/images`,
      "@layouts": `${SRC_DIR}/layouts`,
      "@navigation": `${SRC_DIR}/navigation`,
      "@pages": `${SRC_DIR}/pages`,
      "@services": `${SRC_DIR}/services`,
      "@tests": `${SRC_DIR}/__tests__`,
      "@types": `${SRC_DIR}/types`,
      "@utils": `${SRC_DIR}/utils`
    }
  }
};
