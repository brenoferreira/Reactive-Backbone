describe 'ReactiveModel', ->
    Person = Backbone.ReactiveModel.extend
        defaults:
            name: ''
            age: 0

    describe 'observableEvent', ->
        it 'subscribing to change observable returned by observableEvent, should call observer onNext callback', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change'

            actual = 'john'
            expected = ''
            onChangeObservable.subscribe (e) ->
                expected = e.get 'name'

            person.set 'name', actual

            expect(expected).toBe actual

        it 'subscribing to change:propertyName observable returned by observableEvent, should call observer onNext callback', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change:age'

            actual = 23
            expected = ''
            onChangeObservable.subscribe (e) ->
                expected = e.get 'age'

            person.set 'age', actual

            expect(expected).toBe actual

    describe 'observableChange', ->
        it 'observable subscribe should call observer onNext callback', ->
            person = new Person
            onChangeObservable = person.observableChange()

            actual = 'john'
            expected = ''
            onChangeObservable.subscribe (e) ->
                expected = e.get 'name'

            person.set 'name', actual

            expect(expected).toBe actual