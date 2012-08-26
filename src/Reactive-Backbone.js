(function(){
    var Observable = Rx.Observable;

    Observable.fromDomEvent = function(selector, event) {
        return Observable.create(function(observer){
            var element = document.querySelector(selector);

            if(element){
                element.addEventListener(event, function(e){
                    observer.onNext(e);
                });

                return function(){};
            }
            else{
                observer.onError('Element ' + selector + ' does not exist');
                return function(){};
            }
        });
    };

    var ReactiveView = Backbone.ReactiveView = function(options){
        Backbone.View.apply(this, [options]);
    };

    _.extend(ReactiveView.prototype, Backbone.View.prototype, {
        observableEvent: function(element, event) {
            var el = document.querySelector(element);
            var eventObservable =  Observable.fromDomEvent(el, event);

            eventObservable.subscribe(function(){
                callback.apply(this, arguments);
            });

            return eventObservable;
        }
    });

    ReactiveView.extend = Backbone.View.extend
})(this);