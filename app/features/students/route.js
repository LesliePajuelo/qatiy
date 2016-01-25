import Ember from 'ember';
import cleanURI from '../clean/util';
import getOrCreateUser from '../get-or-create-user/util';
const {get} = Ember;

export default Ember.Route.extend({
	model(param) {
		return this.store.query('student', {orderBy: 'titleURL',equalTo: param.titleURL });
	},
	   actions:{
		   delete(post){
			   student.deleteRecord();
			   student.save();
			   this.transitionTo('index');
		   },
	   save(student){
		   let titleURL = cleanURI(student.get('title'));
		   student.set('titleURL',titleURL);
		   student.save();
		   this.transitionTo('index');
	   },
	   createComment(author, body,student){
		   let user = null;
		   let comment = this.store.createRecord('comment', {
			   body: body
		   });
		   let uid = author.get('uid');
		   user = getOrCreateUser(uid,
				   get(this,'session.currentUser.username'), 
				   get(this,'session.currentUser.profileImageURL'), 
				   this.store);

		   user.then((userData)=>{
			   userData.get('comments').addObject(comment);
			   student.get('comments').addObject(comment);
			   return comment.save().then(()=>{
										console.log('comment saved succesfully');
										return post.save();
									})
									.catch((error)=>{
										console.log(`comment:  ${error}`);
										comment.rollbackAttributes();
									})
									.then(()=>{
										console.log('post saved successfuly');
										return userData.save();
									})
									.catch((error)=>{
										console.log(`student:  ${error}`);
										student.rollbackAttributes();
								    })
									.then(()=>{
										console.log('user saved successfuly');
									})
									.catch((error)=>{
										console.log(`user:  ${error}`);
										user.rollbackAttributes();
								    });


		   });

	   }
   }
});
