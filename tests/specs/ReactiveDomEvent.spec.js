
describe('Rx-fromDomEvent', function() {
  it('should create observable for button click event', function() {
    var clickObservable, wasClickCalled;
    setFixtures('<button id="button1" />');
    clickObservable = Rx.Observable.fromDomEvent('#button1', 'click');
    wasClickCalled = false;
    clickObservable.subscribe(function() {
      return wasClickCalled = true;
    });
    $('#button1').click();
    return expect(wasClickCalled).toBeTruthy();
  });
  it('should throw exception when element does not exist', function() {
    var clickObservable, errorHappend;
    setFixtures('<button id="button1" />');
    clickObservable = Rx.Observable.fromDomEvent('#button2', 'click');
    errorHappend = false;
    clickObservable.subscribe(function() {}, function(error) {
      return errorHappend = true;
    });
    $('#button1').click();
    return expect(errorHappend).toBeTruthy();
  });
  return it('should throw valid exception message', function() {
    var clickObservable, errorMessage;
    setFixtures('<button id="button1" />');
    clickObservable = Rx.Observable.fromDomEvent('#button2', 'click');
    errorMessage = false;
    clickObservable.subscribe(function() {}, function(error) {
      return errorMessage = error;
    });
    $('#button1').click();
    return expect(errorMessage).toBe('Element #button2 does not exist');
  });
});
