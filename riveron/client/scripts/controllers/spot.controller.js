
angular.module('RiverOn').controller('SpotController', function($scope, $reactive, $stateParams, $window){
	$reactive(this).attach($scope);
	var self = this;	
	// helpers
	self.helpers({
		spot: function(){
			return Spots.findOne($stateParams.spotId);
		}	
	});

	self.back = function(){
		$window.history.back();
	};

	self.toggleChanged = function(){
		var user = Meteor.user();

		// update with new push value (can put object here later)
		user.profile.myspots[self.spot.name].pushEnabled = self.pushEnabled;

		// update user doc in db
		Users.update(Meteor.userId(), {$set: {profile: user.profile}});
	}

	// get initial switch state
	var user = Users.findOne(Meteor.userId());
	self.pushEnabled = user.profile.myspots[self.spot.name].pushEnabled;

});