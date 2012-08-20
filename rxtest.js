var startCountdown = function(limit){
	var countdown = Rx.Observable.create(function(observer){
		var i = limit;
		setInterval(function(){
			observer.onNext(i);
			
			if(--i == 0){
				observer.onCompleted();
				clearInterval();
			}
				
		}, 1000);	

		return function(){};
	})
	.select(function(value){
		if(value == limit)
			console.log('initiating countdown');
		else if(value == 5)
			console.log('Start engines');
		return value;
	});

	var observer = Rx.Observer.create(
			function(nextValue){
				console.log(nextValue);
			},
			function(error){

			},
			function(){
				console.log('Launch');
			}
		);

	var s = countdown.subscribe(observer);
}

var LoginView = Backbone.View.extend({
	events:{
		'submit #loginForm': 'login',
		'keyup #passwordTxt': 'passwordChanged'
	},

	login: function(e){
		alert('welcome');
	},

	passwordChanged: function(e){
		var length = e.target.value.length;

		var color = length > 6 ? '#00FF00' : '#FF0000';
		e.target.style.backgroundColor = color;
	}
});

var ReactiveLoginView = Backbone.ReactiveView.extend({
	initialize: function(options){
		this.observableEvent('#loginForm', 'submit', this.login);
		
		var keyupObservable = 
			this.observableEvent('#passwordTxt', 'keyup', this.getPasswordLength);

		var getColor = keyupObservable.select(this.getColor);

		getColor.subscribe(this.setElementColor);
	},

	login: function(e){
		e.preventDefault();
		alert('welcome');
	},

	getPasswordLength: function(e){
		return e.target.value.length;
	},

	getColor: function(passwordLength){
		return passwordLength > 6 ? '#00FF00' : '#FF0000';
	},

	setElementColor: function(color){
		$('#passwordTxt').css('background-color', color);
	}
});

var setPasswordColor = function(){
	var passwordTxt = document.getElementById('passwordTxt');

	var keyup = Rx.Observable.fromDomEvent(passwordTxt, 'keyup');

	var getColor = keyup.select(function(e){
		return e.target.value.length;
	}).select(function(length){
		return length > 6 ? '#00FF00' : '#FF0000';
	});

	getColor.subscribe(function(color){
		passwordTxt.style.backgroundColor = color;
	});
}

$(function(){
	startCountdown(10);

	//setPasswordColor();

	//var loginView = new LoginView({el: $('#content')});
	var reactiveLoginView = new ReactiveLoginView({el: $('#content')});
});