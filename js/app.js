$(document).ready(function() {
	chrome.storage.local.get("data", function(repos) {
		if (repos.data != null) bindData(repos.data);
		chrome.runtime.sendMessage({message: "load"});
	});

	chrome.storage.sync.get({animation: "true"}, function(data) {
		if (data.animation == "true") particlesJS.load('particles-js', '../particles.json');
	});

	function bindData(data) {
		data.forEach(function(repo) {
			var content = '<div class="repo">'+
							'<h3><a href="'+repo.html_url+'">'+repo.owner.login+"/<b>"+repo.name+'</b></a></h3>'+
							'<div class="description">'+repo.description+'</div>'+
							'<div class="extras">'+
								'<div class="extra"><i class="fas fa-code"></i> '+repo.language+'</div>'+
								'<div class="extra"><i class="fas fa-star"></i> '+repo.stargazers_count+'</div>'+
								'<div class="extra">'+repo.open_issues_count+' issues need help</div>'+
							'</div>'+
						  '</div>';

			$(".repositories").append(content);
		});
	}
});