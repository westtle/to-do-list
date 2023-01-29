// Filter.
const filterButton = document.querySelector("._filter-icon");
const filterOptions = document.querySelector("._filter-options");

function showFilterOptions() {
	if (filterOptions.style.display == "inline") {
		filterOptions.style.display = "none";
		filterButton.dataset.filterOpened = "false";
	} else {
		filterOptions.style.display = "inline";
		filterButton.dataset.filterOpened = "true";
	};
};

function addSelectedFilterClass(add, removeOne, removeTwo) {
	filterOptions.childNodes[add].dataset.selected = "true";
	filterOptions.childNodes[removeOne].dataset.selected = "false";
	filterOptions.childNodes[removeTwo].dataset.selected = "false";
};

function filter() {
	let filtered;

	if (this.innerText == "none") {
		filterNone();
	} else if (this.innerText == "incomplete") {
		filterIncomplete();
	} else if (this.innerText == "completed") {
		filterComplete();
	};

    checkIfEmpty();
};

function filterNone() {
	addInput.disabled = "";
	addInput.placeholder = "Input text here.";

	addSelectedFilterClass(1, 3, 5);

	listItemContainer.innerHTML = "";

	renderItems(toDoItem);
};

function filterIncomplete() {
	filtered = toDoItem.filter(item => !item.completed);

	addInput.disabled = "disabled";
	addInput.placeholder = "Disabled while in filter.";

	addSelectedFilterClass(3, 1, 5);

	listItemContainer.innerHTML = "";

	renderItems(filtered);
};

function filterComplete() {
	filtered = toDoItem.filter(item => item.completed);

	addInput.disabled = "disabled";
	addInput.placeholder = "Disabled while in filter.";

	addSelectedFilterClass(5, 3, 1);

	listItemContainer.innerHTML = "";

	renderItems(filtered);
};

filterButton.addEventListener("click", showFilterOptions);
filterOptions.childNodes.forEach(filterType => filterType.addEventListener("click", filter));