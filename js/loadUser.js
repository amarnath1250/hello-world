class User {
  	constructor(){
	    this.usersArray = [];
	    this.userFetchPromise = null;
	    this.displayUsers();
  	}
	loadUsers(){
		if (!this.userFetchPromise) {
	      	this.userFetchPromise = new Promise(async resolve => {
		        const userFetchPromise = await fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c');
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