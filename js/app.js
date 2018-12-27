$(document).ready(function() {

	chrome.storage.sync.get({animation: "true", lastFetch: 0}, function(data) {
		if (data.animation == "true")
			particlesJS.load('particles-js', '../particles.json');
		
		if (Date.now() - data.lastFetch > 1000*60*10) {
			chrome.runtime.sendMessage({message: "fetch"});
			chrome.storage.sync.set({lastFetch: Date.now()});
		}
	});

	chrome.storage.local.get("data", function(data) {
		if (data.data != null) {
			for (i=0; (i < data.data.length && i < 6); i++) {
				var rand = Math.floor(Math.random() * data.data.length);
				$(".repositories").append('<div class="repo">'+
									'<h3><a href="'+data.data[rand].url+'">'+data.data[rand].owner+"/<b>"+truncate(data.data[rand].name, 25)+'</b></a></h3>'+
									'<div class="description">'+truncate(data.data[rand].description, 250)+'</div>'+
									'<div class="extras">'+
										'<div class="extra"><i class="fas fa-code"></i> '+data.data[rand].language+'</div>'+
										'<div class="extra"><i class="fas fa-star"></i> '+data.data[rand].stars+'</div>'+
										'<div class="extra">'+data.data[rand].issues+' issues need help</div>'+
									'</div>'+
								  '</div>');
			}
		}
	});

	function truncate(w, size){
		var truncated = w.substring(0, size);
		if (w.length > size)
			truncated += "&hellip;";
	    return truncated;
	};
});