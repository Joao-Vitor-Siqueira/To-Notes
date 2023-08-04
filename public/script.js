const notesOp = document.getElementById("notesOp")
const noteScreen = document.getElementById("noteScreen")
const close = document.querySelectorAll(".close")
const noteList = document.getElementById("noteList")
const dialogs = document.querySelectorAll("dialog")
const noteFormScreen = document.getElementById("noteFormScreen")
const goBack = document.getElementById("goBack")




notesOp.addEventListener("click",()=>{
    noteScreen.showModal();
    fetchNotes();
})



close.forEach(btn => {
    btn.addEventListener("click",() => {
        dialogs.forEach(dialog => dialog.close())
    })
});

function showNoteForm(e){
    noteList.style.display = "none";
    e.style.display = "none";
    noteFormScreen.style.display = "block"
    goBack.style.display = "inline"
    
    goBack.addEventListener("click",() => {
        noteList.style.display = "grid";
        e.style.display = "inline";
        noteFormScreen.style.display = "none"
        goBack.style.display = "none"
    })

}

const noteForm = document.getElementById("noteForm")
//saving the notes
noteForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const noteTitle = document.getElementById("noteTitle")
    const noteContent = document.getElementById("noteContent")

    fetch('/saveNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: noteTitle.value, content: noteContent.value}),
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
        notes.forEach((note,index) => {
          noteList.innerHTML = '';
          noteList.innerHTML += `<div class="num">${index}</div> <div class="note">${note.title}</div> `;
        })
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
