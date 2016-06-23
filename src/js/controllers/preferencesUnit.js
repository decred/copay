'use strict';

angular.module('copayApp.controllers').controller('preferencesUnitController', function($scope, $log, configService, go, walletService, profileService) {

  var config = configService.getSync();

  $scope.currentUnit = config.wallet.settings.unitCode;

  $scope.unitList = [
    {
      name: 'bits (100,000,000 dbits = 1DCR)',
      shortName: 'dbits',
      value: 1,
      decimals: 0,
      code: 'dbit',
    },
    {
      name: 'DCR',
      shortName: 'DCR',
      value: 100000000,
      decimals: 8,
      code: 'dcr',
    }
  ];

  $scope.save = function(newUnit) {
    var opts = {
      wallet: {
        settings: {
          unitName: newUnit.shortName,
          unitToSatoshi: newUnit.value,
          unitDecimals: newUnit.decimals,
          unitCode: newUnit.code,
        }
      }
    };

    configService.set(opts, function(err) {
      if (err) $log.warn(err);

      go.preferencesGlobal();
      $scope.$emit('Local/UnitSettingUpdated');

      walletService.updateRemotePreferences(profileService.getClients(), {}, function() {
        $log.debug('Remote preferences saved');
      });
    });
  };
});
