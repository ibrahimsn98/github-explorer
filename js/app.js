$(document).ready(function() {
	chrome.storage.local.get("data", function(repos) {
		if (repos.data != null) {
			repos.data.forEach(function(repo) {
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

		chrome.runtime.sendMessage({message: "load"});
	});

	chrome.storage.local.get("options", function(options) {
		if (options.options != null) {
			$(".keyword").val(options.options.keyword);
			$(".language").val(options.options.language);
		}
	});

	$(".keyword").change(function() { updateOptions();});
	$(".language").change(function() { updateOptions(); });
	$(".options-toggle").click(function() { $(".popup").fadeToggle(); })

	function updateOptions() {
		var keyword = $(".keyword").val();
		var language = $(".language").val();
		chrome.storage.local.set({"options": {"keyword": keyword, "language": language}});
	}
});