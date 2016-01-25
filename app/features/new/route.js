import Ember from 'ember';
import cleanURI from '../clean/util';
import getOrCreateUser from '../get-or-create-user/util';

const {get, set } = Ember;

export default Ember.Route.extend({
	actions: {
		save(title,body){
			let user = null;
			let titleURL= cleanURI(title);
			let uid = get(this,'session.uid');
			let date = new Date();
			let student = this.store.createRecord('student',{
				name: title,
			  github: body,
			  cohort: '50',
			  remotePrep: 'titleURL',
			  fulcrum: 'many',
			  interview: 'yes',
			  date: date,
			});

			user = getOrCreateUser(uid,get(this,'session.currentUser.username'), 
								   get(this,'session.currentUser.profileImageURL'), 
								   this.store);
			user.then((userData)=>{
				userData.get('posts').addObject(student);
				post.save().then(()=> {
					return userData.save();
				});

			});

			set(this, 'title','');
			set(this, 'body','');
			this.transitionTo('index');
		}
	}
});
