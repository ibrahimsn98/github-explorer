$(document).ready(function() {
	var date = new Date();
	var last = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
	var filter = last.getFullYear()+"-"+(last.getMonth()+1)+"-"+last.getDate();  

	var lastRequest = 0;
	var scheduled = false;

	chrome.runtime.onInstalled.addListener(function() {
		fetchData();
	});

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (Date.now() - lastRequest > 10000) {
			fetchData();
			lastRequest = Date.now();
		} else if (!scheduled) {
			scheduled = true;
			setTimeout(function() {
				fetchData();
				scheduled = false;
			}, 10000 - (Date.now() - lastRequest));
			lastRequest = Date.now();
		}
	});

	function fetchData() {
		chrome.storage.sync.get({keyword: "", language: ""}, function(data) {
			var url = "https://api.github.com/search/repositories?q="+data.keyword;

			if (data.language != "")
				url += "+language:"+data.language;
			
			url += "+stars:>=20+created:>"+filter+"&sort=stars&order=desc&per_page=70";

			$.get(url, function(data) {
				var add = [];
				var items = shuffle(data.items);

				for (i=0; (add.length < 6 && i < items.length);  i++)
					if (items[i].description != null && items[i].language != null)
						add.push(items[i])

				chrome.storage.local.set({"data": add});
			});
		});
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
});