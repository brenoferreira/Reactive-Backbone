(function(){
	var Observable = Rx.Observable;

	Observable.fromDomEvent = function(element, event) {
		return Observable.create(function(observer){
			element.addEventListener(event, function(e){
				observer.onNext(e);
			});

			return function(){};
		});
	};
})(this);