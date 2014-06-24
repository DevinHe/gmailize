Selectize.define('gmailize', function(options) {
	var EMAIL_REGEX = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	this.require('remove_button');

	if (this.settings.mode === 'single') {
		return;
	}

	options = $.extend({		
		invalidEmailClassName: 'gmailize-invalid',
		validate: function(email) {
			return email.match(EMAIL_REGEX);
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