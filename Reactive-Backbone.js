(function(){
    var ReactiveView = Backbone.ReactiveView = function(options){
        Backbone.View.apply(this, [options]);
    };

    _.extend(ReactiveView.prototype, Backbone.View.prototype, {
        observableEvent: function(element, event, callback) {
            var el = document.querySelector(element);
            var eventObservable =  Rx.Observable.fromDomEvent(el, event);

            eventObservable.subscribe(function(){
                callback.apply(this, arguments);
            });

            return eventObservable;
        }
    });

    ReactiveView.extend = Backbone.View.extend
})(this);