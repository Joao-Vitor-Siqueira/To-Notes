const notesOp = document.getElementById("notesOp")
const noteScreen = document.getElementById("noteScreen")
const close = document.querySelectorAll(".close")
const noteList = document.getElementById("noteList")
const dialogs = document.querySelectorAll("dialog")
const noteForm = document.getElementById("noteForm")
const goBack = document.getElementById("goBack")



notesOp.addEventListener("click",()=>{
    noteScreen.showModal();
})

close.forEach(btn => {
    btn.addEventListener("click",() => {
        dialogs.forEach(dialog => dialog.close())
    })
});

function showNoteForm(e){
    noteList.style.display = "none";
    e.style.display = "none";
    noteForm.style.display = "block"
    goBack.style.display = "inline"
    
    goBack.addEventListener("click",() => {
        noteList.style.display = "grid";
        e.style.display = "inline";
        noteForm.style.display = "none"
        goBack.style.display = "none"
    })

}
