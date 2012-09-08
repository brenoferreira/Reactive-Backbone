describe 'ReactiveCollection', ->
    Person = Backbone.ReactiveModel.extend
        defaults:
            name: ''
            age: 0

    People = Backbone.ReactiveCollection.extend
        model: Person

    describe 'observableAdd', ->
        it 'subscribing to observableAdd, should fire observer onNext when item is added to collection', ->
            people = new People()

            person = new Person
                name: 'John',
                age: 23

            observableAdd = people.observableAdd();

            wasItemAdded = false
            observableAdd.subscribe ->
                wasItemAdded = true

            people.add person

            expect(wasItemAdded).toBeTruthy()

        it 'subscribing to observableEvent, passing add as argument, should fire observer onNext when item is added to collection', ->
            people = new People()

            person = new Person
                name: 'John',
                age: 23

            observableAdd = people.observableEvent('add');

            wasItemAdded = false
            observableAdd.subscribe ->
                wasItemAdded = true

            people.add person

            expect(wasItemAdded).toBeTruthy()