// DOM elements
const button = document.getElementById('new_note_button');
const main_list = document.getElementById('notes_container');
const input_button = document.getElementById('enter_button');
const submit_edit_button = document.getElementById('edit_button_submit');
const close_button = document.getElementById('close_button');
const delete_button = document.getElementById('delete_button');
const close_icon = document.getElementById('close_icon');
const close_edit_icon = document.getElementById('close_edit_icon');
const edit_button = document.getElementById('edit_button');

const edit_box = document.getElementById('edit_box');

let title_input = document.getElementById('title_input');
let note_input = document.getElementById('note_input');

let title_edit_input = document.getElementById('title_input_edit');
let note_edit_input = document.getElementById('note_input_edit');

let note_selected;


// Creates a list of the notes text/title from the local storage 
const note_list = JSON.parse(localStorage.getItem("notes_text")) || [];
const title_list = JSON.parse(localStorage.getItem("notes_title")) || [];


function createNote (text, title) {

    // Creating notes elements
    let li = document.createElement('li');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    let icon_1 = document.createElement('ion-icon');
    let icon_2 = document.createElement('ion-icon');
    let div = document.createElement('div');

    // Adding text to the elements
    p.innerText = text;
    h1.innerText = title;
    icon_1.setAttribute('class', 'item_close_button');
    icon_1.setAttribute('name', 'create-outline');
    icon_2.setAttribute('class', 'item_close_button');
    icon_2.setAttribute('name', 'close-circle-outline');
    div.setAttribute('class', 'icon_div');

    // Appending elements to the 'main_list'
    div.append(icon_1)
    div.append(icon_2)
    li.append(div)
    li.append(h1);
    li.append(p);
    main_list.insertBefore(li, main_list.firstElementChild);

    // Adds an ID to the new note
    var id = 'item' + (note_list.length)
    li.setAttribute('id', id);

    // Adds the note text to the 'note_list' and to the local storage
    note_list.unshift(text);
    title_list.unshift(title)
    localStorage.setItem("notes_text", JSON.stringify(note_list));
    localStorage.setItem("notes_title", JSON.stringify(title_list));



    // Edit button
    icon_1.addEventListener('click', function (){
        editNote(document.getElementById(id))
    })

    // Delete button
    icon_2.addEventListener('click', function () {
        removeNote(document.getElementById(id))
    })

}


function createNote2 (text, title, index) {

    // Creating notes elements
    let li = document.createElement('li');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    let icon_1 = document.createElement('ion-icon');
    let icon_2 = document.createElement('ion-icon');
    let div = document.createElement('div');

    // Adding text to the elements
    p.innerText = text;
    h1.innerText = title;
    icon_1.setAttribute('class', 'item_close_button');
    icon_1.setAttribute('name', 'create-outline');
    icon_2.setAttribute('class', 'item_close_button');
    icon_2.setAttribute('name', 'close-circle-outline');
    div.setAttribute('class', 'icon_div');

    // Appending elements to the 'main_list'
    div.append(icon_1)
    div.append(icon_2)
    li.append(div)
    li.append(h1);
    li.append(p);
    main_list.append(li);

    // Adds an ID to the new note
    var id = 'item' + index
    li.setAttribute('id', id);

    
    // Edit button
    icon_1.addEventListener('click', function (){
        editNote(document.getElementById(id))
    })

    // Delete button
    icon_2.addEventListener('click', function () {
        removeNote(document.getElementById(id))
    })

}

function displayInput () {
    var input_box = document.getElementById('input_box')

    input_box.style.visibility = 'Visible'
}


function newNote () {  
    var input_box = document.getElementById('input_box')

    var title = title_input.value;
    var text = note_input.value;

    // Prevents user from creating a blank note
    if ( title == '') {
        alert('Cannot have an empty title, please try again.')
        displayInput()

    } else if ( text == '' ) {
        alert('Cannot have an empty note, please try again.')
        displayInput()

    } else {
        createNote(text, title);
    
    };

    title_input.value = ''
    note_input.value = ''
    input_box.style.visibility = 'Hidden'

}


function editNote (target_input) {
    // Target element
    var target = target_input

    // Edit box inputs
    var title_edit_input = document.getElementById('title_input_edit')
    var note_edit_input = document.getElementById('note_input_edit')

    // Gets the text out of the elements
    var title = target.children[1].innerText
    var note = target.children[2].innerText

    // Sets the value of the box to be the same as the selected note
    title_edit_input.value = title
    note_edit_input.value = note

    // Displays the edit box
    document.getElementById('edit_box').style.visibility = 'Visible'

    note_selected = target;

}


function submitEdit (target_input) {
    // Target element
    var target = target_input

    // Edit box inputs
    var title_edit_input = document.getElementById('title_input_edit')
    var note_edit_input = document.getElementById('note_input_edit')

    // Gets the text out of the elements, before edit
    var old_title = target.children[1].innerText
    var old_note = target.children[2].innerText

    // Gets the new text
    var new_title = title_edit_input.value
    var new_note = note_edit_input.value

    // Removes the old text elements
    target.children[1].remove()
    target.children[1].remove()

    // Creates new text elements
    let h1 = document.createElement('h1');
    let p = document.createElement('p');

    // Adding text to the 'p' and 'h1' element
    h1.innerText = new_title;
    p.innerText = new_note;


    // Adds the elements to the note
    target.append(h1)
    target.append(p)


    // Gets the index of the targets text in the storage arrays
    var title_index = title_list.indexOf(old_title)
    var note_index = note_list.indexOf(old_note)

    // Replaces the items in the list with the update text
    title_list[title_index] = new_title
    note_list[note_index] = new_note

    // Resets the local storage to update the note 
    localStorage.setItem("notes_text", JSON.stringify(note_list));
    localStorage.setItem("notes_title", JSON.stringify(title_list));

}


function loadNote2 () {
    console.log(note_list)
    console.log(title_list)
    const length = note_list.length 

    var j = 0;

    for (i=0; i<length; i++) {
        createNote2(note_list[i], title_list[i], i)


        console.log(`A new note was created!\nText: '${note_list[i]}'\nTitle: '${title_list[i]}'`)
    }
}

function removeNote (target_input) {
    var target = target_input

    // Gets the text out of the elements
    var title = target.children[1].innerText
    var note = target.children[2].innerText

    // Gets the index of the targets text in the storage arrays
    var title_index = title_list.indexOf(title)
    var note_index = note_list.indexOf(note)

    // Removes the target from the arrays using the index's
    title_list.splice(title_index, 1)
    note_list.splice(note_index, 1)

    // Resets the local storage to remove the target 
    localStorage.setItem("notes_text", JSON.stringify(note_list));
    localStorage.setItem("notes_title", JSON.stringify(title_list));

    // Removes the element from the screen
    target.remove()
}


// 'click' event on the 'new_note_button'
button.addEventListener('click', function () {displayInput(); var confirm_box = document.getElementById('confirm_box'); confirm_box.style.visibility = 'Hidden'});

// 'click' event for the 'create note' button when making a new note
input_button.addEventListener('click', newNote)

// 'click' event for the 'close_icon' to close the note creator
close_icon.addEventListener('click', function () {input_box.style.visibility = 'Hidden'; title_input.value = ''; note_input.value = '';})

// 'click' event for the 'close_icon' to close the note editor
close_edit_icon.addEventListener('click', function () {edit_box.style.visibility = 'Hidden'; title_edit_input.value = ''; note_edit_input.value = ''})

// 'click' event to submit an edit on the selected note
submit_edit_button.addEventListener('click', function () {submitEdit(note_selected); document.getElementById('edit_box').style.visibility = 'Hidden';})

//loadNotes()


loadNote2()