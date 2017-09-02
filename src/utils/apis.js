const yaml = require('js-yaml');
const fs = require('fs');

const config = yaml.safeLoad(fs.readFileSync('../config/base_url.yml', 'utf8'));

const base_url = config[process.env.BASE_URL] || config.local;

export default Apis;