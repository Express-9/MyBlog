$(document).ready(function () {
	$.get("/api/users",
		function (data) {
			var sel = $("#users_select");
			sel.append('<option value="">Choose a blog</option>');
			for (var i = 0; i < data.length; i++) {
				sel.append('<option value="' + data[i] + '">' + data[i] + '</option>');
			}
			sel.change(function(){
				window.location.href = /blogs/ + $("#users_select").val();
			});
		}, "json");
});
