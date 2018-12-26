$(document).ready(function() {

	chrome.storage.sync.get({keyword: "", language: "", animation: "true"}, function(data) {
		$(".keyword").val(data.keyword);
		$(".language").val(data.language);
		$(".animation").val(data.animation)
	});

	var saving = false;

	$(".save").click(function() {
		if(!saving) {
			var keyword = $(".keyword").val();
			var language = $(".language").val();
			var animation = $(".animation").val();

			saving = true;
			$(this).text("Saving..");

			chrome.storage.sync.set({keyword: keyword, language: language, animation: animation}, function() {
				$(".save").text("Saved!");
				setTimeout(function() {
					saving = false;
					$(".save").text("Save");
				}, 750);
			});
		}
	});
});