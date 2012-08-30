
describe('ReactiveModel', function() {
  var Person;
  Person = Backbone.ReactiveModel.extend({
    defaults: {
      name: '',
      age: 0
    },
    validate: function(changedAttributes) {
      if (changedAttributes.age < 0) return 'invalid age';
    }
  });
  describe('observableEvent', function() {
    it('subscribing to change observable returned by observableEvent, should call observer onNext callback', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change');
      expected = 'john';
      actual = '';
      onChangeObservable.subscribe(function(model) {
        return actual = model.get('name');
      });
      person.set('name', expected);
      return expect(expected).toBe(actual);
    });
    return it('subscribing to change:propertyName observable returned by observableEvent, should call observer onNext callback', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change:age');
      expected = 23;
      actual = '';
      onChangeObservable.subscribe(function(model) {
        return actual = model.get('age');
      });
      person.set('age', expected);
      return expect(expected).toBe(actual);
    });
  });
  describe('observableChange', function() {
    it('creating observable for change event, should fire onNext on observer when name property changes', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableChange();
      expected = 'john';
      actual = '';
      onChangeObservable.subscribe(function(model) {
        return actual = model.get('name');
      });
      person.set('name', expected);
      return expect(expected).toBe(actual);
    });
    return it('creating observable for custom property change event, should fire onNext on observer when name property changes', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableChange('age');
      expected = 23;
      actual = 0;
      onChangeObservable.subscribe(function(model) {
        return actual = model.get('age');
      });
      person.set('age', expected);
      return expect(expected).toBe(actual);
    });
  });
  return describe('error handling', function() {
    it('subscribing to change:propertyName observable returned by observableEvent, should call observer onError if model is set to invalid state', function() {
      var errorFired, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change:age');
      errorFired = false;
      onChangeObservable.subscribe(function(model) {}, function(errorData) {
        return errorFired = true;
      });
      person.set('age', -1);
      return expect(errorFired).toBeTruthy();
    });
    it('subscribing to change observable returned by observableEvent, should call observer onError if model is set to invalid state', function() {
      var errorFired, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change');
      errorFired = false;
      onChangeObservable.subscribe(function(model) {}, function(errorData) {
        return errorFired = true;
      });
      person.set('age', -1);
      return expect(errorFired).toBeTruthy();
    });
    it('subscribing to change observable returned by observableEvent, should call observer onError if model is set to invalid state', function() {
      var errorFired, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableChange();
      errorFired = false;
      onChangeObservable.subscribe(function(model) {}, function(errorData) {
        return errorFired = true;
      });
      person.set('age', -1);
      return expect(errorFired).toBeTruthy();
    });
    return describe('observableError', function() {
      it('creating observable for error event, should fire onNext when model validation fails', function() {
        var errorFired, onErrorObservable, person;
        person = new Person;
        onErrorObservable = person.observableError();
        errorFired = false;
        onErrorObservable.subscribe(function(data) {
          return errorFired = true;
        });
        person.set('age', -1);
        return expect(errorFired).toBeTruthy();
      });
      return it('creating observable for error event, should fire onNext when model validation fails', function() {
        var actualError, expectedError, onErrorObservable, person;
        person = new Person;
        onErrorObservable = person.observableError();
        expectedError = 'invalid age';
        actualError = '';
        onErrorObservable.subscribe(function(data) {
          return actualError = data.error;
        });
        person.set('age', -1);
        return expect(actualError).toEqual(expectedError);
      });
    });
  });
});
