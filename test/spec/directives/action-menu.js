'use strict';

describe('Directive: actionMenu', function () {

  beforeEach(module('lorryApp'));

  var parentScope, scope,
    compile,
    element;

  beforeEach(inject(function($compile, $rootScope){
    parentScope = $rootScope.$new();
    scope = $rootScope.$new();
    compile = $compile;
  }));

  beforeEach(function () {
    var serviceDefDisplay = compile('<service-definition-display service-definition=""></service-definition-display>')(parentScope);
    parentScope.$digest();
    spyOn(serviceDefDisplay.isolateScope(), 'serviceName').and.returnValue('someService');
    spyOn(serviceDefDisplay.isolateScope(), 'hasLines').and.returnValue(true);
    spyOn(serviceDefDisplay.isolateScope(), 'classes');

    element = angular.element('<action-menu enabled="true"></action-menu>');
    serviceDefDisplay.append(element);

    element = compile(element)(serviceDefDisplay.isolateScope());
    scope = element.scope();
    scope.$digest();
  });

  describe('scope.deleteServiceDefinition', function () {

    it('is triggered when the delete icon is clicked', function () {
      spyOn(scope, 'deleteServiceDefinition');
      var deleteIcon = element.find('.icon-x')[0];
      angular.element(deleteIcon).triggerHandler('click');
      expect(scope.deleteServiceDefinition).toHaveBeenCalled();
    });

    describe('when any of the services are not in edit mode', function () {
      it('calls deleteService on the parent with the name of the service definition to be deleted', function () {
        var p = jasmine.createSpyObj('$parent', ['deleteService', 'inEditMode']);
        scope.$parent = p;
        scope.deleteServiceDefinition();
        expect(p.deleteService).toHaveBeenCalledWith('someService');
      });
    });

    describe('when any of the services are in edit mode', function () {
      it('does not call deleteService on parent', function () {
        var p = jasmine.createSpyObj('$parent', ['deleteService']);
        p.inEditMode = function () { return true };
        scope.$parent = p;
        scope.deleteServiceDefinition();
        expect(p.deleteService).not.toHaveBeenCalled();
      });
    });

  });

  describe('scope.editServiceDefinition', function () {

    it('is triggered when the edit icon is clicked', function () {
      spyOn(scope, 'editServiceDefinition');
      var editIcon = element.find('.icon-pencil')[0];
      angular.element(editIcon).triggerHandler('click');
      expect(scope.editServiceDefinition).toHaveBeenCalled();
    });

    describe('when any of the services are not in edit mode', function () {
      it('calls editService on the parent with the name of the service definition to be edited', function () {
        var p = jasmine.createSpyObj('$parent', ['editService', 'inEditMode']);
        scope.$parent = p;
        scope.editServiceDefinition();
        expect(p.editService).toHaveBeenCalledWith('someService');
      });
    });

    describe('when any of the services are in edit mode', function () {
      it('does not call editService on the parent', function () {
        var p = jasmine.createSpyObj('$parent', ['editService']);
        p.inEditMode = function () { return true };
        scope.$parent = p;
        scope.editServiceDefinition();
        expect(p.editService).not.toHaveBeenCalled();
      });
    });

  });

});