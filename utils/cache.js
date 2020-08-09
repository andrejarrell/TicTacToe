let _ = require('lodash');

class Cache {
    contructor() { }

    get(prop) {
        return _.get(this, prop);
    }

    set(prop, val) {
        _.set(this, prop, val);
    }

    delete(prop) {
        _.set(this, prop, null);
    }

    all() {
        return this;
    }

    exists() {
        return this ? true : false;
    }
}

module.exports = new Cache;