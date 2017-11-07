export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getListFromObject = (listObject = {}, search = '', searchablePropertyNames = []) => {
	const keys = Object.keys(listObject);
	return keys.map(key => { 
		return Object.assign({}, listObject[key], {id: key});
	}).filter(item => {
		if (search.length > 0) {
			return isObjectContainsKeyword(item, search, searchablePropertyNames);				
		} else return true;
	});
}

export const getListFromArray = (listArray = [], search = '', searchablePropertyNames = []) => {
	return listArray.filter(item => {
		if (search.length > 0) {
			return isObjectContainsKeyword(item, search, searchablePropertyNames);	
		} else return true;
	});
}

export const isObjectContainsKeyword = (object = {}, keyword = '', searchablePropertyNames = []) => {
	keyword = keyword.toLowerCase();
	return searchablePropertyNames.reduce((result, key) => object[key] && object[key].toLowerCase().includes(keyword) ? true : result, false);
}

