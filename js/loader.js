$(document).ready(function() {
	var date = new Date();
	var last = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
	var filter = last.getFullYear()+"-"+(last.getMonth()+1)+"-"+last.getDate();  

	var lastRequest = 0;

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.message == "load" && Date.now() - lastRequest > 1000*60) {
			lastRequest = Date.now();

			chrome.storage.local.get("options", function(options) {
				var url = "https://api.github.com/search/repositories?q=";

				if (options.options != null)
					url += options.options.keyword+"+language:"+options.options.language;
				
				url += "+stars:>=20+created:>"+filter+"&sort=stars&order=desc&per_page=50";

				$.get(url, function(data) {
					var add = [];
					var items = data.items;
					shuffle(items);

					for (i=0; (add.length < 6 && i < items.length);  i++)
						if (items[i].description != null && items[i].language != null)
							add.push(items[i])

					chrome.storage.local.set({"data": add});
				});
			});
		}
	});

	function shuffle(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}
});