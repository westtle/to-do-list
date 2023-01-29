let toDoItem = [];

// HTML.
const listItemContainer = document.querySelector(".__list-items");

const addInput = document.querySelector("._add-input");
const addButton = document.querySelector("._add-button");

function addItem() {
	if (addInput.value == "") return false;

	let newItem = {
		activities: addInput.value,
		completed: false,
		id: +new Date()
	};

	toDoItem.push(newItem);

	let itemTemplate = itemTemplateCreate(newItem);
    listItemContainer.innerHTML += itemTemplate;

    addInput.value = "";

    addEventListenerToBtn();
    checkIfEmpty();
    saveItem();
};

function removeItem() {
	const itemToRemove = this.parentNode.parentNode;

	toDoItem.forEach((item, index) => {
		if (item.id == itemToRemove.id) toDoItem.splice(index, 1);
	});

	itemToRemove.remove();

	checkIfEmpty();
	saveItem()
};

function editItem() {
	const itemToEdit = this.parentNode.parentNode;
	const activityContainer = itemToEdit.childNodes[1];

	toDoItem.forEach((item, index) => {
		if (item.id == itemToEdit.id) {

			// Do first if to open the edit, second if to close and save the edit.
			if (activityContainer.children.length == 0) {
				const originalValue = activityContainer.innerText;
				const editInput = `<input type="text" value="${originalValue}">`;

				activityContainer.innerHTML = editInput;

				// Select input at end of text.
				let strLength = activityContainer.childNodes[0].value.length * 2;
				activityContainer.childNodes[0].focus();
				activityContainer.childNodes[0].setSelectionRange(strLength, strLength);

				// Use enter key to save.
				activityContainer.childNodes[0].addEventListener("keypress", (e) => {
					if (e.key == "Enter") this.click();
				});
			} else {
				const saveValue = activityContainer.childNodes[0].value;

				if (saveValue == "") return false;

				activityContainer.childNodes[0].remove();
				activityContainer.innerText = saveValue;

				toDoItem[index].activities = saveValue;
			};
		};
	});

	saveItem();
};

function changeStatus() {
	const itemToChange = this.parentNode.parentNode;

	toDoItem.forEach((item, index) => {
		if (item.id == itemToChange.id) {
			if (item.completed == false) {
				item.completed = true;
				itemToChange.querySelector(".activities_").dataset.completed = "true";
			} else {
				item.completed = false;
				itemToChange.querySelector(".activities_").dataset.completed = "false";
			}
		};
	});

	saveItem();
};

function checkIfEmpty() {
	if (listItemContainer.childNodes.length == 0) {
		const emptyText = document.createElement("span");
		emptyText.innerText = "Empty.";
		emptyText.classList.add("_empty");

		listItemContainer.appendChild(emptyText);
	} else {
		const emptyText = document.querySelector("._empty");
		if (emptyText !== null) emptyText.remove();
	};
};

function renderItems(itemArray) {
	itemArray.forEach((item, index) => {
		let itemTemplate = itemTemplateCreate(item);
		listItemContainer.innerHTML += itemTemplate;

		addEventListenerToBtn();

	    if (item.completed == true) {
	    	let checkBox = document.querySelectorAll(".status__")[index];
	   		checkBox.setAttribute("checked", true);
	   		checkBox.parentNode.parentNode.querySelector(".activities_").dataset.completed = "true";
	    };
	});
};

function itemTemplateCreate(item) {
	return `<div class="_item" id="${item.id}">
				<div class="activities_">${item.activities}</div>
				<div class="tools_">
					<img class="edit__" src="assets/Images/edit.svg" width="21" height="21" alt="Edit Item">
					<input class="status__" type="checkbox" aria-label="Status Item">
					<img class="remove__" src="assets/Images/x.svg" width="21" height="21" alt="Remove Item">
				</div>
			</div>`;
};

function addEventListenerToBtn() {

	// Remove item.
	let removeButton = document.querySelectorAll(".remove__");
    removeButton.forEach(btn => btn.addEventListener("click", removeItem));

    // Checkbox / Status.  
    let checkBox = document.querySelectorAll(".status__");
    checkBox.forEach(check => check.addEventListener("click", changeStatus));

    // Edit item.
    let editButton = document.querySelectorAll(".edit__");
    editButton.forEach(edit => edit.addEventListener("click", editItem));
};

// Local Storage.
const to_do_item = "To_Do_Item";

function saveItem() {
	localStorage.setItem(to_do_item, JSON.stringify(toDoItem));
};

function loadItem() {
	const toDoFromStorage = JSON.parse(localStorage.getItem(to_do_item)) || [];

	toDoItem = toDoFromStorage;

	renderItems(toDoItem);
};

addButton.addEventListener("click", addItem);
addInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") addButton.click();
});

document.addEventListener("DOMContentLoaded", () => {
	loadItem();
	checkIfEmpty();
});