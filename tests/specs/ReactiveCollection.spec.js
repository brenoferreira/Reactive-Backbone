
describe('ReactiveCollection', function() {
  var People, Person;
  Person = Backbone.ReactiveModel.extend({
    defaults: {
      name: '',
      age: 0
    }
  });
  People = Backbone.ReactiveCollection.extend({
    model: Person
  });
  return describe('observableAdd', function() {
    it('subscribing to observableAdd, should fire observer onNext when item is added to collection', function() {
      var observableAdd, people, person, wasItemAdded;
      people = new People();
      person = new Person({
        name: 'John',
        age: 23
      });
      observableAdd = people.observableAdd();
      wasItemAdded = false;
      observableAdd.subscribe(function() {
        return wasItemAdded = true;
      });
      people.add(person);
      return expect(wasItemAdded).toBeTruthy();
    });
    return it('subscribing to observableEvent, passing add as argument, should fire observer onNext when item is added to collection', function() {
      var observableAdd, people, person, wasItemAdded;
      people = new People();
      person = new Person({
        name: 'John',
        age: 23
      });
      observableAdd = people.observableEvent('add');
      wasItemAdded = false;
      observableAdd.subscribe(function() {
        return wasItemAdded = true;
      });
      people.add(person);
      return expect(wasItemAdded).toBeTruthy();
    });
  });
});
