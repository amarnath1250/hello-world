class User {
  	constructor(){
	    this.usersArray = [];
	    this.userFetchPromise = null;
	    this.displayUsers();
  	}
	loadUsers(){
		if (!this.userFetchPromise) {
	      	this.userFetchPromise = new Promise(async resolve => {
		        const userFetchPromise = await fetch('./user.json');
		        this.usersArray = (await userFetchPromise.json());
		        resolve();
	      	});
      	}
      	return this.userFetchPromise;
  	}
  	async displayUsers(){
    	await this.loadUsers();
    };
}
window.user = new User();