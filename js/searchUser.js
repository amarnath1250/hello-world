var showUsers = () => {
	var inputValue = document.getElementById('search-text').value;
	var targetDiv = document.getElementById('search-result-container');
	var clearButton = document.querySelector('.clear-text');
	var templateString = '';
	targetDiv.innerHTML = '';
	if(inputValue == ''){
		targetDiv.classList.add('hide');
		clearButton.classList.add('hide');
		return;	
	}
	clearButton.classList.remove('hide');
	targetDiv.classList.remove('hide');
	user.usersArray.forEach((value,index) => {
		var found = false;
		var foundInItem = false;
		var id = value.id;
		var name = value.name;
		var items = value.items;
		var address = value.address;
		var pincode = value.pincode;
		inputValue = inputValue.replace(/\./g,'\\\.');
		var reg = new RegExp(inputValue, 'gi');
		id = id.replace(reg, (str) => { return '<span>'+str+'</span>'});
		name = name.replace(reg, (str) => {return '<span>'+str+'</span>'});
		address = address.replace(reg, (str) => {return '<span>'+str+'</span>'});
		pincode = pincode.replace(reg, (str) => {return '<span>'+str+'</span>'});
		if(id.indexOf('<span>') > -1 || name.indexOf('<span>') > -1 || address.indexOf('<span>') > -1 || pincode.indexOf('<span>') > -1){
			found = true;
		}
		items.forEach((item,i) => {
			var item = item.toLowerCase();
			var lowerCaseInput = inputValue.toLowerCase();
			if(item.indexOf(lowerCaseInput) > -1){
				foundInItem = true;
			}
		});
		if(found || foundInItem){
			if(foundInItem){
				templateString += `<div class="user"><div class="userId">${id}</div><div class="name">${name}</div><div class="item"><ul><li><span class="liText">"${inputValue}" found in items</span></li></ul></div><div class="address">${address}</div><div class="pin">${pincode}</div></div>`
			}else{
				templateString += `<div class="user"><div class="userId">${id}</div><div class="name">${name}</div><div class="address">${address}</div><div class="pin">${pincode}</div></div>`	
			}
		}
	});
	if(templateString == ''){
		templateString += `<div class="no-records"><div class="text">No User Found</div></div>`
	}
	targetDiv.innerHTML = templateString;
	targetDiv.scrollTop = 0;
	var allUserClass = document.querySelectorAll('.user');
	allUserClass.forEach((value,index) => {
		value.addEventListener('mouseover', (event) => {
			if(event.isTrusted && targetDiv.classList.contains('mouseActive')){
				value.classList.add('selected');
			}
		});
		value.addEventListener('mouseout', (event) => {
			if(event.isTrusted && targetDiv.classList.contains('mouseActive')){
				value.classList.remove('selected');
			}
		});
		value.addEventListener('click', (event) => {
			var selectedId = document.querySelector('.user.selected .userId').textContent;
	    	document.getElementById('search-text').value = selectedId;
	    	document.getElementById('search-text').blur();
	    	searchContainerDiv.innerHTML = '';
	    	searchContainerDiv.classList.add('hide');
		});
	});
}
var debounce = (fn,delay) => {
	var timer;
	return () => {
		clearTimeout(timer);
		timer = setTimeout((event) => {fn.apply()},delay);
	}
}