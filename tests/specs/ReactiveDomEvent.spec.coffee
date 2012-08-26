describe 'Rx-fromDomEvent', ->
    it 'should create observable for button click event', ->
        setFixtures '<button id="button1" />'

        clickObservable = Rx.Observable.fromDomEvent '#button1', 'click'

        wasClickCalled = false
        clickObservable.subscribe ->
            wasClickCalled = true

        $('#button1').click();

        expect(wasClickCalled).toBeTruthy();

    it 'should throw exception when element does not exist', ->
        setFixtures '<button id="button1" />'

        clickObservable = Rx.Observable.fromDomEvent '#button2', 'click'

        errorHappend = false
        clickObservable.subscribe ->
            ,
            (error) -> 
                errorHappend = true

        $('#button1').click();

        expect(errorHappend).toBeTruthy();

    it 'should throw valid exception message', ->
        setFixtures '<button id="button1" />'

        clickObservable = Rx.Observable.fromDomEvent '#button2', 'click'

        errorMessage = false
        clickObservable.subscribe ->
            ,
            (error) -> 
                errorMessage = error

        $('#button1').click();

        expect(errorMessage).toBe 'Element #button2 does not exist'