let tableBody = document.querySelector(".table-data");
let headers = document.getElementsByTagName("th");
let newUser = document.querySelector("#new-user");
let saveUser = document.querySelector("#save-user");
let formContent = document.querySelector(".container-form");
let container = document.querySelector("#container");

//headers[0].innerHTML
function seeInput(element) {
  document.querySelector(element).classList.toggle("toggle-content");
}

newUser.addEventListener("click", function (event) {
  event.preventDefault();
  formContent.classList.toggle("container-form");
  container.classList.remove("container");
  container.classList.add("container--two-colums");
});

saveUser.addEventListener("click", function (event) {
  event.preventDefault();
  formContent.classList.add("container-form");
  container.classList.remove("container--two-colums");
  container.classList.add("container");
});

const hideUser = document.querySelector("#hide-user");

hideUser.addEventListener("change", function (event) {
  event.preventDefault();
  let rows = tableBody.getElementsByTagName("tr");

  if (hideUser.checked == true) {
    filterTable();
  } else {
    for (let row of rows) {
      row.classList.remove("toggle-content");
    }
  }
});

function filterTable() {
  let filter = "false";
  let rows = tableBody.getElementsByTagName("tr");
  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("td");
    for (let cell of cells) {
      if (cell.textContent === filter) {
        flag = true;
        break;
      }
    }

    if (flag) {
      console.log(row.textContent);
      row.classList.add("toggle-content");
    } else {
      row.style.display = " ";
    }

    flag = false;
  }
}

const searchOnTable = (txtContent) => {
  let txtValue, filter;
  let input = txtContent;
  filter = input.value.toUpperCase();
  for (tr of tableBody.getElementsByTagName("tr"))
    for (td of tr.getElementsByTagName("td"))
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
          break;
        } else tr.style.display = "none";
      }
};

let idInput = document.getElementById("id-input");
idInput.addEventListener("keyup", function (event) {
  searchOnTable(idInput);
});

let nameInput = document.getElementById("id-input");
idInput.addEventListener("keyup", function (event) {
  searchOnTable(nameInput);
});

let emailInput = document.getElementById("email-input");
emailInput.addEventListener("keyup", function (event) {
  searchOnTable(emailInput);
});

let enabledInput = document.getElementById("enabled-input");
enabledInput.addEventListener("keyup", function (event) {
  searchOnTable(enabledInput);
});

function sortTablebyColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 + dirModifier : -1 * dirModifier;
  });
  console.log(sortedRows);

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);

  table.querySelectorAll("th").forEach((th) => {
    th.classList.remove("th-sort-asc", "th-sort-dec");
  });
  table
    .querySelector(`th:nth-child(${column + 1}`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1}`)
    .classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  order = document.querySelector("#order");
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    sortTablebyColumn(tableElement, headerIndex, !currentIsAscending);
  });
});
