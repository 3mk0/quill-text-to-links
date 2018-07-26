Quill.register('modules/textToLinks', TextToLinks)

var quill = new Quill('#editor', {
	theme: 'snow',
	modules: {
	   textToLinks: {} 
	}
});
