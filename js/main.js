notes = [] ,
    $addnote=$('.header'),
    addNoteForm = $addnote.find('form'),
    //doubt?
    $notes=$('.note-container'),
    notesContainer=$notes,
    note_title=addNoteForm.find('.note-title'),
    note_content=addNoteForm.find('.note-content');

var generateid = function (separator) {
    /// <summary>
    ///    Creates a unique id for identification purposes.
    /// </summary>
    /// <param name="separator" type="String" optional="true">
    /// The optional separator for grouping the generated segmants: default "-".    
    /// </param>

    var delim = separator || "-";

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return ('a'+S4() + S4());
};

function appendSingleNote(data) {
	var content = data.content, title = data.title;

	var html = '<div class="note" id="' + (data.id) + '">' +
        '<img src="images/cross.png" class="cross" id="'+(data.id)+'_button">'+
                    '<p class="note-title">' + title + '</p>' +
                    '<p class="note-content">' + 
                        content +
                    '</p>' +
                '</div>';

    notesContainer.append(html);
}

//{title: 'adasd', content: 'asda'}
function storeNote(data) {

	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));

	appendSingleNote(data);
}


function init() {
	if(!!window.localStorage.getItem('notes')) {
		notes = JSON.parse(window.localStorage.getItem('notes'));
	} else {
		notes = [];
	}

	var i;
	for (i = 0; i < notes.length; i++) {
		appendSingleNote(notes[i]);
	}
}

$(".note-container").on("click", '.cross',function(){
    //id of the cross button
    var id='#'+this.id;
    
    //remove id from cache
    var idx;
    for(var i=0;i<notes.length;i++){
        if((notes[i].id+"_button")==this.id)
            idx=i;
    }
    notes.splice(idx,1);
    window.localStorage.setItem('notes',JSON.stringify(notes));
    
    //remove the complete div tag
    $(String(id)).parent().remove();
});


addNoteForm.on('submit', function(e){
    e.preventDefault();
	
	var data = {title: note_title.val(), content: note_content.val(),id:generateid()};
	storeNote(data);

});

init();


