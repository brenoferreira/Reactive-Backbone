(function(){
    var Observable = Rx.Observable;

    Observable.fromDomEvent = function(selector, event) {
        return Observable.create(function(observer){
            var element = document.querySelector(selector);

            if(element){
                element.addEventListener(event, function(){
                    observer.onNext.apply(observer, arguments);
                });

                return function(){};
            }
            else{
                observer.onError('Element ' + selector + ' does not exist');
                return function(){};
            }
        });
    };

    var ReactiveModel = Backbone.ReactiveModel = function(options){
        Backbone.Model.apply(this, [options]);
    };

    _.extend(ReactiveModel.prototype, Backbone.Model.prototype, {
        observableEvent: function(event) {
            var _this = this;
            return Observable.create(function(observer){
                _this.on(event, function(){
                    observer.onNext.apply(observer, arguments);
                });

                _this.on('error', function(model, error){
                    observer.onError({model: model, error: error});
                });

                return function(){};
            });
        },

        observableChange: function(propertyName){
            if(!propertyName)
                return this.observableEvent('change');
            else
                return this.observableEvent('change:' + propertyName)
        },

        observableError: function(){
            var _this = this;
            return Observable.create(function(observer){
                _this.on('error', function(model, error){
                    observer.onNext({model: model, error: error});
                });

                return function(){};
            });
        }
    });

    ReactiveModel.extend = Backbone.Model.extend

})(this);