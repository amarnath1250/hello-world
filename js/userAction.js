var searchUser = debounce(showUsers,300);
var searchInputBox = document.getElementById('search-text');
var searchContainerDiv = document.getElementById('search-result-container');
var clearButton = document.querySelector('.clear-text');
searchContainerDiv.addEventListener('mousemove', (event) => {
	if(event.isTrusted && !searchContainerDiv.classList.contains('mouseActive')){
		searchContainerDiv.classList.add('mouseActive');
		var allUserClass = document.querySelectorAll('.user');
		allUserClass.forEach((value,index) => {value.classList.remove('selected');});	
	}
});
searchInputBox.addEventListener("keyup", (event) => {
	if(!(event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40 || event.which == 13)) {
		searchUser();
	}
});
searchInputBox.addEventListener("keydown", (event) => {  
    if(event.which == 38 || event.which == 40){
    	event.preventDefault();
    	var allUserClass = document.querySelectorAll('.user');
		var selectedIndex = -1;
		allUserClass.forEach((value,index) => {
			if(value.classList.contains('selected')){
				selectedIndex = index;
				value.classList.remove('selected');
			}
		});
		if(searchContainerDiv.classList.contains('mouseActive')){
			searchContainerDiv.classList.remove('mouseActive');	
		}
		var searchContainerOffset = document.getElementById('search-result-container').getBoundingClientRect();
		var searchContainerTop = searchContainerOffset.top;
		var searchContainerHeight = searchContainerOffset.height;
		var searchContainerBottom = searchContainerTop + searchContainerHeight;
		if(event.which == 38){
	    	if(selectedIndex-1 < 0){
	    		allUserClass[allUserClass.length-1].classList.add('selected');	
	    	}else{
	    		allUserClass[selectedIndex-1].classList.add('selected');
	    	}
    		var selectedUserOffset = document.querySelector('.user.selected').getBoundingClientRect();
			var selectedUserTop = selectedUserOffset.top;
			var selectedUserHeight = selectedUserOffset.height;
			var selectedUserBottom = selectedUserTop + selectedUserHeight;
			if(selectedUserTop<searchContainerTop || selectedUserBottom>searchContainerBottom){
				var selectedUser = document.querySelector('.user.selected');
				selectedUser.scrollIntoView({behavior: "smooth", block: "end"});
			}
	    }else if(event.which == 40){
	    	if(selectedIndex+1 == allUserClass.length){
	    		allUserClass[0].classList.add('selected');	
	    	}else{
	    		allUserClass[selectedIndex+1].classList.add('selected');
	    	}
    		var selectedUserOffset = document.querySelector('.user.selected').getBoundingClientRect();
			var selectedUserTop = selectedUserOffset.top;
			var selectedUserHeight = selectedUserOffset.height;
			var selectedUserBottom = selectedUserTop + selectedUserHeight;
			if(selectedUserTop<searchContainerTop || selectedUserBottom>searchContainerBottom){
				var selectedUser = document.querySelector('.user.selected');
				selectedUser.scrollIntoView({behavior: "smooth", block: "start"});
			}
	    }
    }
    if(event.which == 13 && document.querySelector('.user.selected .userId')){
    	var selectedId = document.querySelector('.user.selected .userId').textContent;
    	document.getElementById('search-text').value = selectedId;
    	document.getElementById('search-text').blur();
    	searchContainerDiv.innerHTML = '';
    	searchContainerDiv.classList.add('hide');
    }   
});
clearButton.addEventListener('click',(event) => {
	event.preventDefault();
	document.getElementById('search-text').value = '';
	document.getElementById('search-text').focus();
	searchContainerDiv.innerHTML = '';
	searchContainerDiv.classList.add('hide');
	clearButton.classList.add('hide');
});