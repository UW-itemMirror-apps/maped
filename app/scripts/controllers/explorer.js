/*ItemMirror's explorer.js is actually Mytodo's>main.js */
'use strict';

/**
 * @ngdoc function
 * @name itemMirrorAngularDemoApp.controller:ExplorerCtrl
 * @description
 * # ExplorerCtrl
 * Controller of the itemMirrorAngularDemoApp
 */
angular.module('itemMirrorAngularDemoApp')
  .controller('ExplorerCtrl', function ($scope, itemMirror) {

    // starts everything up after dropbox loads
  	var init = itemMirror.initialize;
  	init.then(function() {
      $scope.mirror = itemMirror;
      $scope.associations = itemMirror.associations;
      $scope.associations.sort(_localItemCompare);
      $scope.selectedAssoc = null;

      // This needs to be called after the service updates the associations.
      // Angular doesn't watch the scope of the service's associations, so any
      // updates don't get propogated to the front end.
      function assocScopeUpdate() {
        $scope.associations = itemMirror.associations;
        $scope.associations.sort(_localItemCompare);
        $scope.selectedAssoc = null;
       }

       function _localItemCompare(a,b){
        if (a.order>b.order) return 1;
        else if (a.order<b.order) return -1;
        else return 0;
           }

      $scope.deleteAssoc = function(guid) {
        itemMirror.deleteAssociation(guid).
        then(assocScopeUpdate);
      };

      $scope.navigate = function(guid) {
        itemMirror.navigateMirror(guid).
        then(assocScopeUpdate);
      };

      $scope.previous = function() {
        itemMirror.previous().
        then(assocScopeUpdate);
      };

      $scope.save = function() {
        itemMirror.save().
        then(assocScopeUpdate);
      };

      $scope.refresh = function() {
        itemMirror.refresh().
        then(assocScopeUpdate);
      };


      $scope.sortableOptions = {
        stop: function(e, ui) {
          var reorderLog = $scope.associations.map(function(assoc){
            return assoc.localItem
          }).join(', ');
          var i=1;

          $scope.associations.forEach(function (assoc){
            assoc.order =i;
            i = i + 1;
          });
          $scope.save();
        }
      };

      // Only one association is ever selected at a time. It has the boolean
      // selected property, to allow for unique styling
      $scope.select = function(assoc) {
        if ($scope.selectedAssoc) {
          $scope.selectedAssoc.selected = false;
        }
        $scope.selectedAssoc = assoc;
        $scope.selectedAssoc.selected = true;
      };

      // Phantom Creation Section

      // This is used to intially set the values, and reset them after we create a phantom.
      // We don't want the same information stuck in those boxes after creating them
      function resetPhantomRequest() {
        $scope.phantomRequest.displayText = '';
        $scope.phantomRequest.displayText = 'Year: \nPosition: \nProject Name: \nOrganization: \nDescription: \n';
        $scope.phantomRequest.itemURI = '';
        $scope.phantomRequest.localItemRequested = false;
      }

      $scope.phantomRequest = {};
      resetPhantomRequest();

      $scope.createPhantom = function() {
        debugger;
        itemMirror.createAssociation($scope.phantomRequest).
        then( function() {
          switchToAssocEditor();
          assocScopeUpdate();
          resetPhantomRequest();
        });
      };

      // Folder Creation Section, nearly the exact same as the phanbom request,
      // with a few minor differences
      function resetFolderRequest() {
        $scope.folderRequest.displayText = '';
        $scope.folderRequest.localItem = '';
        $scope.folderRequest.isGroupingItem = true;
      }

      $scope.folderRequest = {};
      resetFolderRequest();

      $scope.createFolder = function() {
        itemMirror.createAssociation($scope.folderRequest).
        then( function() {
          switchToAssocEditor();
          assocScopeUpdate();
          resetFolderRequest();
        });
      };


      // default section for our editing panel
      function switchToAssocEditor() {
        $scope.editSection = 'assoc-editor';
      }

      switchToAssocEditor();

      // Function used to show display text succinctly
      $scope.matchFirstLn = function(str) {
        var first = /.*/;
        return first.exec(str)[0];
      };
      $scope.matchSecondLn = function(str) {
        var second = str.split("\n");
        return second;
        
      };

    });
  });

angular.module('itemMirrorAngularDemoApp').filter('yearfilter',function(){
    var clearYearRepeated = function(items){
      var filtered = [];
      var yearHashCheck = {};
      items.forEach(function(item){
        if(yearHashCheck[item.year]){
          item.year = '';
        }
        else{
          yearHashCheck[item.year] = true;
        }
        filtered.push(item);
      });
      return filtered.reverse();
    };
  return clearYearRepeated;

  });


