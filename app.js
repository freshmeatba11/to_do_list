let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  // 阻止預設動作
  e.preventDefault();

  // 取得輸入欄位的值
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = Number(form.children[2].value);

  if (todoText === "") {
    alert("請輸入待辦事項");
    return;
  }
  if (todoMonth <= 0 || todoMonth > 13) {
    alert("請輸入正確的月份");
    return;
  }
  if (todoDate <= 0 || todoDate > 32) {
    alert("請輸入正確的日期");
    return;
  }
  // 製作一個todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  if (todoDate < 10) {
    todoDate = "0" + todoDate;
  }
  time.innerText = todoMonth + " / " + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  // 製作打勾與垃圾桶圖示
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.addEventListener("animationend", () => {
      todoItem.remove();
    });

    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.3s forwards";

  // 創造一個物件
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  // store data into an array of objects
  let myList = JSON.parse(localStorage.getItem("list"));
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    myList.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myList));
  }
  console.log(typeof myList, myList);

  form.children[0].value = ""; //清除輸入欄內容
  section.appendChild(todo);
});

// 從 localStorage 取出資料
let myList = JSON.parse(localStorage.getItem("list"));
if (myList !== null) {
  myList.forEach((item) => {
    // create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMonth + " / " + item.todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    // 製作打勾與垃圾桶圖示
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done");
    });

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;

      todoItem.addEventListener("animationend", () => {
        todoItem.remove();
      });

      todoItem.style.animation = "scaleDown 0.3s forwards";
    });

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";
    section.appendChild(todo);
  });
}
