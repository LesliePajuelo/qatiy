import Ember from 'ember';
const {get} = Ember;

export default Ember.Route.extend({
	beforeModel(){
		return get(this,'session').fetch().catch(function(){});
	},
	actions:{
		login(){
			get(this,'session').open('firebase', { provider: 'github'}).then(function(data) {
							console.log(data);
			      });
		},
		logout(){
			get(this,'session').close();
		}	   
	}
});
