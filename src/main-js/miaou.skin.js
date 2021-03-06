
miaou(function(skin){

	// finds the value of the property for the rule(s) matching the
	//  passed regex.
	// If there's a captured group in the regex, an array is returned (the submatch
	//  is used as a number for sorting the elements)
	skin.getCssValue = function(regex, property){
		var matches = [];
		for (var is=0; is<document.styleSheets.length; is++) {
			var sheet = document.styleSheets[is];
			var rules = sheet.rules || sheet.cssRules;
			for (var ir=rules.length; ir-->0;) {
				var	rule = rules[ir];
				if (!rule.selectorText) continue;
				var match = rule.selectorText.match(regex);
				if (!match) continue;
				var bg = rule.style.getPropertyValue(property);
				if (match.length===1) return bg;
				matches.push({ num:+match[1], bg:bg });
			}
		}
		return matches
		.sort(function(a, b){ return a.num-b.num })
		.map(function(a){ return a.bg });
	}

	skin.wzincolors = {
		conv:  skin.getCssValue(/^\.wzin-conv-(\d+)$/, "background-color"),
		edit:  skin.getCssValue(/^\.wzin-edit$/, "background-color"),
		reply: skin.getCssValue(/^\.wzin-reply$/, "background-color"),
		link:  skin.getCssValue(/^\.wzin-link$/, "background-color")
	}
	
	skin.stringToColour = function(str){
		if (!str) return "#888";
		var	i,
			hash = 0;
		for (i=0; i<str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (i=0; i<3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}


	$('.Miaou-logo').on('load', function(){
		$('path', this.getSVGDocument()).css('stroke', skin.getCssValue(/^\.Miaou-logo$/, 'color'));
	});

});
