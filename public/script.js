const notesOp = document.getElementById("notesOp")
const noteScreen = document.getElementById("noteScreen")
const close = document.querySelectorAll(".close")
const noteList = document.getElementById("noteList")
const noteRows = document.getElementById("noteRows")
const dialogs = document.querySelectorAll("dialog")
const noteFormScreen = document.getElementById("noteFormScreen")
const goBack = document.getElementById("goBack")
const addNoteBtn = document.getElementById("addNoteBtn")




notesOp.addEventListener("click",()=>{
    noteScreen.showModal();
    fetchNotes();
})



close.forEach(btn => {
    btn.addEventListener("click",() => {
        dialogs.forEach(dialog => dialog.close())
    })
});

function showNoteForm(){
    noteList.style.display = "none";
    addNoteBtn.style.display = "none";
    noteFormScreen.style.display = "block"
    goBack.style.display = "inline"

    goBack.addEventListener("click",() => {
      fetchNotes();
      noteList.style.display = "grid";
      addNoteBtn.style.display = "inline";
      noteFormScreen.style.display = "none"
      goBack.style.display = "none"
    })
}



const noteForm = document.getElementById("noteForm")
const noteTitle = document.getElementById("noteTitle")
const noteContent = document.getElementById("noteContent")
const noteCategory = document.getElementById("noteCategory")
//saving the notes
noteForm.addEventListener('submit',(e) => {
    e.preventDefault();

    fetch('/saveNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: noteTitle.value,category: noteCategory.value, content: noteContent.value}),
      })
      .then(response => {
        if (response.ok) {
          console.log('Data saved successfully.');
        } else {
          console.error('Failed to save data.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

})

function fetchNotes() {
  fetch('/getNotes')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch data.');
      }
    })
    .then(notes => {
        noteRows.innerHTML = '';
        notes.forEach((note,index) => {
          noteRows.innerHTML += `
          <tr>
            <td>${index}</td>
            <td>${note.title}</td>
            <td>${note.category}</td>
            <td>
                <button onclick="editNotes(${index})" style="background-color: #0298cf;">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button style="background-color: #f80000;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
          </tr>
          `;
        })
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function editNotes(index){
  showNoteForm();
  fetch('/getNotes')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch data.');
      }
    })
    .then(notes => {
        noteTitle.value = notes[index].title;
        noteCategory.value = notes[index].category;
        noteContent.value = notes[index].content;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}