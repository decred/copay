'use strict';

angular.module('copayApp.services').factory('configService', function(storageService, lodash, $log) {
  var root = {};

  var defaultConfig = {
    // wallet limits
    limits: {
      totalCopayers: 6,
      mPlusN: 100,
    },

    // Bitcore wallet service URL
    bws: {
        url: 'https://bws.decred.org/bws/api',
    },

    // wallet default config
    wallet: {
      requiredCopayers: 2,
      totalCopayers: 3,
      spendUnconfirmed: true,
      reconnectDelay: 5000,
      idleDurationMin: 4,
      settings: {
        unitName: 'DCR',
        unitToSatoshi: 100000000,
        unitDecimals: 8,
        unitCode: 'dcr',
        //alternativeName: 'US Dollar',
        //alternativeIsoCode: 'USD',
      }
    },

    // External services
    glidera: {
      enabled: false,
      dcrdtestnet: true
    },

    // Not sure what we should do with this long-term, but for now,
    // just point to something local.  No way to get rates for dcr at
    // the moment anyway.
    coinbase: {
      enabled: true,
      testnet: false
    },
    rates: {
      url: '',
    },

    release: {
      url: 'https://api.github.com/repos/bitpay/copay/releases/latest'
    },

    pushNotifications: {
      enabled: true,
      config: {
        android: {
          senderID: '1036948132229',
          icon: 'push',
          iconColor: '#2F4053'
        },
        ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true',
        },
        windows: {},
      }
    },
  };

  var configCache = null;


  root.getSync = function() {
    if (!configCache)
      throw new Error('configService#getSync called when cache is not initialized');

    return configCache;
  };

  root.get = function(cb) {

    storageService.getConfig(function(err, localConfig) {
      if (localConfig) {
        configCache = JSON.parse(localConfig);

        //these ifs are to avoid migration problems
        if (!configCache.bws) {
          configCache.bws = defaultConfig.bws;
        }
        if (!configCache.wallet) {
          configCache.wallet = defaultConfig.wallet;
        }
        if (!configCache.wallet.settings.unitCode) {
          configCache.wallet.settings.unitCode = defaultConfig.wallet.settings.unitCode;
        }
        if (!configCache.glidera) {
          configCache.glidera = defaultConfig.glidera;
        }
        if (!configCache.coinbase) {
          configCache.coinbase = defaultConfig.coinbase;
        }
        if (!configCache.pushNotifications) {
          configCache.pushNotifications = defaultConfig.pushNotifications;
        }

      } else {
        configCache = lodash.clone(defaultConfig);
      };

      // Glidera
      // Disabled for testnet
      configCache.glidera.testnet = false;

      // Coinbase
      // Disabled for testnet
      configCache.coinbase.testnet = false;

      $log.debug('Preferences read:', configCache)
      return cb(err, configCache);
    });
  };

  root.set = function(newOpts, cb) {
    var config = lodash.cloneDeep(defaultConfig);
    storageService.getConfig(function(err, oldOpts) {
      oldOpts = oldOpts || {};

      if (lodash.isString(oldOpts)) {
        oldOpts = JSON.parse(oldOpts);
      }
      if (lodash.isString(config)) {
        config = JSON.parse(config);
      }
      if (lodash.isString(newOpts)) {
        newOpts = JSON.parse(newOpts);
      }

      lodash.merge(config, oldOpts, newOpts);
      configCache = config;

      storageService.storeConfig(JSON.stringify(config), cb);
    });
  };

  root.reset = function(cb) {
    configCache = lodash.clone(defaultConfig);
    storageService.removeConfig(cb);
  };

  root.getDefaults = function() {
    return lodash.clone(defaultConfig);
  };


  return root;
});
