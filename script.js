const notesOp = document.getElementById("notesOp");
const noteScreen = document.getElementById("noteScreen");
const close = document.querySelectorAll(".close");

const dialogs = document.querySelectorAll("dialog");

notesOp.addEventListener("click",()=>{
    noteScreen.showModal();
})

close.forEach(btn => {
    btn.addEventListener("click",() => {
        dialogs.forEach(dialog => dialog.close())
    })
});
