const yaml = require('js-yaml');
const fs   = require('fs');

// Read in config.json
const config = require("../config.json");
var dc = {}

// manipulate docker-compose.yml
try {
    dc = yaml.safeLoad(fs.readFileSync('./docker-compose.yml', 'utf8'));
  } catch (e) {
    console.log(e);
}

if (Object.keys(dc.services) != config.name) {
    oldName = Object.keys(dc.services)[0]
    dc.services[config.name] = dc.services[oldName]
    delete dc.services[oldName]
}

dc.services[config.name].image = config.name
dc.services[config.name].ports = [config.port.toString()+':'+config.port.toString()]

fs.writeFile('./docker-compose.yml', yaml.safeDump(dc), (err) => {
    if (err) {
        console.log(err);
    }
});

// manipulate package.json
var package = require("../package.json");

package.name = config.name
package.scripts.serve = "serve dist -p "+config.port;

fs.writeFile('./package.json', JSON.stringify(package, null, 2), (err) => {
    if (err) {
        console.log(err);
    }
});

console.log("Configurator script finished.")