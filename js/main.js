const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const taskText = input.value.trim();

    const taskHTML =
    `<li class="list-group-item d-flex justify-content-between">
        <span contenteditable="true" class="task-title">${taskText}</span>
            <div class="buttons">
                <button type="button" data-action="ready-task" class="btn btn-light align-self-end">Готово</button>
                <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
            </div>
    </li>`;

    tasksList.insertAdjacentHTML("beforeend", taskHTML);
    input.value = "";
    input.focus;
    toggleEmptyListItem();
    showNotification("new");

});

tasksList.addEventListener("click", function(event){
    if(event.target.getAttribute("data-action") == "delete-task"){
        event.target.closest(".list-group-item").remove();
        toggleEmptyListItem();
        showNotification("delete");
    } else if(event.target.getAttribute("data-action") == "ready-task") {
        const parentElement = event.target.closest(".list-group-item");
        parentElement.querySelector(".task-title").classList.add("task-title--done");
        parentElement.querySelector(".task-title").setAttribute("contenteditable", "false");
        tasksList.insertAdjacentElement("afterbegin", parentElement);
        event.target.remove();
        showNotification("done");
    }

    
});

function toggleEmptyListItem(){
    if(tasksList.children.length > 1) {
        document.querySelector("#empty-list-item").style.display = "none";
    } else {
        document.querySelector("#empty-list-item").style.display = "block";
    }
}

function showNotification(type) {
    // const notifyNew = `<div class="alert alert-warning" role="alert">Задач добавлена!</div>`;
    const notifyNew = document.createElement("div");
    switch(type) {
        case "new":
            notifyNew.classList = "alert alert-warning";
            notifyNew.textContent = "Задача добавлена!";
            break;
        case "delete":
            notifyNew.classList = "alert alert-danger";
            notifyNew.textContent = "Задача удалена!";
            break;
        case "done":
            notifyNew.classList = "alert alert-primary";
            notifyNew.textContent = "Задача выполнена!";
            break;
    }
    document.querySelector("#notifyHolder").insertAdjacentElement("afterbegin", notifyNew);
    notifyNew.classList.remove("alertOpacity");
    setTimeout(function(){
        notifyNew.style.opacity="1";
    }, 300);

    setTimeout(function(){
        notifyNew.style.opacity="0";
    }, 2300);

    setTimeout(function(){
        notifyNew.remove();
    }, 2600);
}