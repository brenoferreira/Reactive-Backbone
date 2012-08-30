describe 'ReactiveModel', ->
    Person = Backbone.ReactiveModel.extend
        defaults:
            name: ''
            age: 0

        validate: (changedAttributes) ->
            if(changedAttributes.age < 0)
                return 'invalid age'

    describe 'observableEvent', ->
        it 'subscribing to change observable returned by observableEvent, should call observer onNext callback', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change'

            expected = 'john'
            actual = ''
            onChangeObservable.subscribe (model) ->
                actual = model.get 'name'

            person.set 'name', expected

            expect(expected).toBe actual

        it 'subscribing to change:propertyName observable returned by observableEvent, should call observer onNext callback', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change:age'

            expected = 23
            actual = ''
            onChangeObservable.subscribe (model) ->
                actual = model.get 'age'

            person.set 'age', expected

            expect(expected).toBe actual

    describe 'observableChange', ->
        it 'creating observable for change event, should fire onNext on observer when name property changes', ->
            person = new Person
            onChangeObservable = person.observableChange()

            expected = 'john'
            actual = ''
            onChangeObservable.subscribe (model) ->
                actual = model.get 'name'

            person.set 'name', expected

            expect(expected).toBe actual

        it 'creating observable for custom property change event, should fire onNext on observer when name property changes', ->
            person = new Person
            onChangeObservable = person.observableChange('age')

            expected = 23
            actual = 0
            onChangeObservable.subscribe (model) ->
                actual = model.get 'age'

            person.set 'age', expected

            expect(expected).toBe actual

    describe 'error handling', ->
        it 'subscribing to change:propertyName observable returned by observableEvent, should call observer onError if model is set to invalid state', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change:age'

            errorFired = false
            onChangeObservable.subscribe (model) -> 
                ,
                (errorData) ->
                    errorFired = true

            person.set 'age', -1

            expect(errorFired).toBeTruthy()

        it 'subscribing to change observable returned by observableEvent, should call observer onError if model is set to invalid state', ->
            person = new Person
            onChangeObservable = person.observableEvent 'change'

            errorFired = false
            onChangeObservable.subscribe (model) -> 
                ,
                (errorData) ->
                    errorFired = true

            person.set 'age', -1

            expect(errorFired).toBeTruthy()

        it 'subscribing to change observable returned by observableEvent, should call observer onError if model is set to invalid state', ->
            person = new Person
            onChangeObservable = person.observableChange()

            errorFired = false
            onChangeObservable.subscribe (model) -> 
                ,
                (errorData) ->
                    errorFired = true

            person.set 'age', -1

            expect(errorFired).toBeTruthy()

        describe 'observableError', ->
            it 'creating observable for error event, should fire onNext when model validation fails', ->
                person = new Person

                onErrorObservable = person.observableError()

                errorFired = false
                onErrorObservable.subscribe (data) ->
                    errorFired = true

                person.set 'age', -1

                expect(errorFired).toBeTruthy()

            it 'creating observable for error event, should fire onNext when model validation fails', ->
                person = new Person

                onErrorObservable = person.observableError()

                expectedError = 'invalid age'
                actualError = ''
                onErrorObservable.subscribe (data) ->
                    actualError = data.error

                person.set 'age', -1    

                expect(actualError).toEqual expectedError