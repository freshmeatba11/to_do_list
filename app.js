let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  // 阻止預設動作
  e.preventDefault();

  // 取得輸入欄位的值
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = Number(form.children[1].value);
  let todoDate = Number(form.children[2].value);
  let completed = false;

  if (todoText === "") {
    alert("請輸入待辦事項");
    return;
  }
  if (todoMonth < 1 || todoMonth > 12) {
    alert("請輸入正確的月份");
    return;
  }
  if (todoDate < 1 || todoDate > 31) {
    alert("請輸入正確的日期");
    return;
  }
  // 製作一個todo
  let todo = document.createElement("div");
  todo.classList.add("todo");

  let contentWrap = document.createElement("div");
  contentWrap.classList.add("contentWrap");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  if (todoMonth < 10 && todoDate < 10) {
    time.innerText = "0" + todoMonth + "/0" + todoDate;
  }
  if (todoMonth < 10 && todoDate >= 10) {
    time.innerText = "0" + todoMonth + "/" + todoDate;
  }
  if (todoMonth >= 10 && todoDate < 10) {
    time.innerText = todoMonth + "/0" + todoDate;
  }
  if (todoMonth >= 10 && todoDate >= 10) {
    time.innerText = todoMonth + "/" + todoDate;
  }

  contentWrap.appendChild(text);
  contentWrap.appendChild(time);

  // 製作打勾與垃圾桶圖示
  // 製作打勾圖示
  let completeSvgWrap = document.createElement("div");
  completeSvgWrap.classList.add("complete_svg_wrap");
  // 製作 circleSvg
  let circleSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  circleSvg.classList.add("circle");
  circleSvg.setAttribute("viewBox", "0 0 18 18");
  circleSvg.setAttribute("fill", "none");
  circleSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // 製作 circle svg path
  let circleSvgPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  circleSvgPath.setAttribute(
    "d",
    "M9 0.75C13.5563 0.749999 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9C0.749999 4.44365 4.44365 0.75 9 0.75Z"
  );
  circleSvgPath.setAttribute("stroke-width", "1.5");
  circleSvgPath.setAttribute("stroke-linecap", "round");
  circleSvgPath.setAttribute("stroke-linejoin", "round");

  circleSvg.append(circleSvgPath);
  // 製作 check svg
  let checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  checkSvg.classList.add("check");
  checkSvg.setAttribute("viewBox", "0 0 14 10");
  checkSvg.setAttribute("fill", "none");
  checkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // 製作 check svg path
  let checkSvgPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  checkSvgPath.setAttribute("d", "M1 3.66667L5.5 8L13 1");
  checkSvgPath.setAttribute("stroke-width", "1.5");
  checkSvgPath.setAttribute("stroke-linecap", "round");
  checkSvgPath.setAttribute("stroke-linejoin", "round");

  checkSvg.append(checkSvgPath);

  completeSvgWrap.append(circleSvg);
  completeSvgWrap.append(checkSvg);

  completeSvgWrap.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    let myList = JSON.parse(localStorage.getItem("list"));
    myList.forEach((item) => {
      if (myTodo.todoText == item.todoText) {
        if (completed == false) {
          //未完成要改已完成
          completed = true; //更新當前項的完成狀態
          item.completed = true; //更新資料庫中對應項的完成狀態
          todoItem.classList.remove("scaleUp");
          todoItem.classList.remove("undone");
          todoItem.classList.add("done"); //設定已完成的動畫
          return;
        }
        if (completed == true) {
          //已完成要改未完成
          completed = false; //更新當前項的完成狀態
          item.completed = false; //更新資料庫中對應項的完成狀態
          todoItem.classList.remove("done");
          todoItem.classList.add("undone"); //設定未完成的動畫
        }
      }
    });
    localStorage.setItem("list", JSON.stringify(myList));
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.addEventListener("animationend", () => {
      // 比對當前的項目與清單，如有相同的則移除
      myList.forEach((i, index) => {
        if (myTodo === i) {
          myList.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myList));
        }
      });

      todoItem.remove();
    });

    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.append(completeSvgWrap);
  todo.append(contentWrap);
  todo.append(trashButton);

  todo.classList.add("scaleUp");
  // 創造一個物件
  let myTodo = {
    todoText,
    todoMonth,
    todoDate,
    completed,
  };

  // store data into an array of objects
  let myList = JSON.parse(localStorage.getItem("list"));
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    myList.unshift(myTodo); //讓新增的todo保持在列表的第一項
    localStorage.setItem("list", JSON.stringify(myList));
  }

  form.children[0].value = ""; //清除輸入欄內容
  let sectionFirstChild = section.firstChild; //抓取目前列表的第一項
  section.insertBefore(todo, sectionFirstChild); //讓新增的todo保持在列表的第一項
});

// 從 localStorage 取出資料並製作出清單
loadData();

function loadData() {
  let myList = JSON.parse(localStorage.getItem("list"));
  if (myList !== null) {
    myList.forEach((item) => {
      // create a todo
      let todo = document.createElement("div");
      todo.classList.add("todo");
      todo.classList.add("scaleUp");
      if (item.completed == true) {
        todo.classList.remove("scaleUp");
        todo.classList.add("done"); //設定已完成的動畫
      }

      let contentWrap = document.createElement("div");
      contentWrap.classList.add("contentWrap");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      if (item.todoMonth < 10 && item.todoDate < 10) {
        time.innerText = "0" + item.todoMonth + "/0" + item.todoDate;
      }
      if (item.todoMonth < 10 && item.todoDate >= 10) {
        time.innerText = "0" + item.todoMonth + "/" + item.todoDate;
      }
      if (item.todoMonth >= 10 && item.todoDate < 10) {
        time.innerText = item.todoMonth + "/0" + item.todoDate;
      }
      if (item.todoMonth >= 10 && item.todoDate >= 10) {
        time.innerText = item.todoMonth + "/" + item.todoDate;
      }
      let completed = item.completed;

      contentWrap.appendChild(text);
      contentWrap.appendChild(time);

      // 製作打勾與垃圾桶圖示
      // 製作打勾圖示
      let completeSvgWrap = document.createElement("div");
      completeSvgWrap.classList.add("complete_svg_wrap");
      // 製作 circleSvg
      let circleSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      circleSvg.classList.add("circle");
      circleSvg.setAttribute("viewBox", "0 0 18 18");
      circleSvg.setAttribute("fill", "none");
      circleSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // 製作 circle svg path
      let circleSvgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      circleSvgPath.setAttribute(
        "d",
        "M9 0.75C13.5563 0.749999 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9C0.749999 4.44365 4.44365 0.75 9 0.75Z"
      );
      circleSvgPath.setAttribute("stroke-width", "1.5");
      circleSvgPath.setAttribute("stroke-linecap", "round");
      circleSvgPath.setAttribute("stroke-linejoin", "round");

      circleSvg.append(circleSvgPath);
      // 製作 check svg
      let checkSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      checkSvg.classList.add("check");
      checkSvg.setAttribute("viewBox", "0 0 14 10");
      checkSvg.setAttribute("fill", "none");
      checkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // 製作 check svg path
      let checkSvgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      checkSvgPath.setAttribute("d", "M1 3.66667L5.5 8L13 1");
      checkSvgPath.setAttribute("stroke-width", "1.5");
      checkSvgPath.setAttribute("stroke-linecap", "round");
      checkSvgPath.setAttribute("stroke-linejoin", "round");

      checkSvg.append(checkSvgPath);

      completeSvgWrap.append(circleSvg);
      completeSvgWrap.append(checkSvg);

      completeSvgWrap.addEventListener("click", (e) => {
        let myNewList = JSON.parse(localStorage.getItem("list"));
        let todoItem = e.target.parentElement;

        myNewList.forEach((i) => {
          // 比對當前的項目與清單，如有相同的則變更狀態
          if (i.todoText == item.todoText) {
            if (completed == false) {
              //未完成要改已完成
              completed = true; //更新當前項的完成狀態
              i.completed = true; //更新資料庫中對應項的完成狀態
              todoItem.classList.remove("scaleUp");
              todoItem.classList.remove("undone");
              todoItem.classList.add("done"); //設定已完成的動畫
              return;
            }
            if (completed == true) {
              //已完成要改未完成
              completed = false; //更新當前項的完成狀態
              i.completed = false; //更新資料庫中對應項的完成狀態
              todoItem.classList.remove("done");
              todoItem.classList.add("undone"); //設定未完成的動畫
            }
          }
        });
        localStorage.setItem("list", JSON.stringify(myNewList));
      });

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
          // 比對當前的項目與清單，如有相同的則移除
          myList.forEach((i, index) => {
            if (item === i) {
              myList.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myList));
            }
          });

          todoItem.remove();
        });

        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      todo.appendChild(completeSvgWrap);
      todo.appendChild(contentWrap);
      todo.appendChild(trashButton);

      section.appendChild(todo);
    });
  }
}

function mergeTime(arr1, arr2) {
  //用來合併兩個array的物件
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i].todoMonth > arr2[j].todoMonth) {
      result.push(arr2[j]);
      j++;
    } else if (arr1[i].todoMonth < arr2[j].todoMonth) {
      result.push(arr1[i]);
      i++;
    } else if (arr1[i].todoMonth === arr2[j].todoMonth) {
      if (arr1[i].todoDate > arr2[j].todoDate) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  // 如果還有剩下的物件就通通放進去
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(left), mergeSort(right));
  }
}

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
  let len = section.children.length;
  if (len <= 1) {
    //一項以下的話則不需要進行排序
    alert("Ooops! Forgot something? Just add it.");
    return;
  }
  if (len > 1) {
    //排序
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));
    //移除現有清單
    for (let i = 0; i < len; i++) {
      section.children[0].remove();
    }
    //再次建立清單
    loadData();
  }
});

let svgPath = document.querySelectorAll("path");
for (let i = 0; i < svgPath.length; i++) {
  console.log(svgPath[i].getTotalLength());
}
