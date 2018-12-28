var date = new Date();
date.setDate(date.getDate() - 45);
var dateFilter = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();  

chrome.runtime.onInstalled.addListener(function() {
	fetch();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	fetch();
});

var fetch = function() {
	chrome.storage.sync.get({keyword: "", language: ""}, function(data) {
		var url = "https://api.github.com/search/repositories?q="+data.keyword;

		if (data.language != "")
			url += "+language:" + data.language;
		
		url += "+stars:>=10+created:>" + dateFilter + "&sort=stars&order=desc&per_page=125";

		$.get(url, function(data) {
			var add = [];

			data.items.forEach(function(item) {
				if (item.description != null && item.language != null)
					add.push({name: item.name, url: item.html_url, owner: item.owner.login,
						description: item.description,
					  	language: item.language, stars: item.stargazers_count,
					  	issues: item.open_issues_count})
			});
				
			chrome.storage.local.set({"data": add});
		});
	});
};
