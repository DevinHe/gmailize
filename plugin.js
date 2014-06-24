Selectize.define('gmailize', function(options) {
	this.require('remove_button');

	if (this.settings.mode === 'single') {
		return;
	}

	options = $.extend({		
		invalidEmailClassName: 'gmailize-invalid',
		validate: function(email) {
			return true;
		}
	}, options);	

	var self = this;

	this.addItem = (function() {					
		var original = self.addItem;
		return function() {			
			original.apply(this, arguments);
			var value = arguments[0];
			if (!options.validate(value)) {
				var $item = self.getItem(value);
				$item.addClass(options.invalidEmailClassName);
			}		
		};
	})();
});