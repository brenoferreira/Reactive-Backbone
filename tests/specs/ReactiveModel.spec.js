
describe('ReactiveModel', function() {
  var Person;
  Person = Backbone.ReactiveModel.extend({
    defaults: {
      name: '',
      age: 0
    }
  });
  describe('observableEvent', function() {
    it('subscribing to change observable returned by observableEvent, should call observer onNext callback', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change');
      actual = 'john';
      expected = '';
      onChangeObservable.subscribe(function(e) {
        return expected = e.get('name');
      });
      person.set('name', actual);
      return expect(expected).toBe(actual);
    });
    return it('subscribing to change:propertyName observable returned by observableEvent, should call observer onNext callback', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableEvent('change:age');
      actual = 23;
      expected = '';
      onChangeObservable.subscribe(function(e) {
        return expected = e.get('age');
      });
      person.set('age', actual);
      return expect(expected).toBe(actual);
    });
  });
  return describe('observableChange', function() {
    return it('observable subscribe should call observer onNext callback', function() {
      var actual, expected, onChangeObservable, person;
      person = new Person;
      onChangeObservable = person.observableChange();
      actual = 'john';
      expected = '';
      onChangeObservable.subscribe(function(e) {
        return expected = e.get('name');
      });
      person.set('name', actual);
      return expect(expected).toBe(actual);
    });
  });
});
