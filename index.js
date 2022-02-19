var type = [
   {
      id: 0,
      name: "Processing",
      lineColor: "--bg-yellow",
      typeColor: "processing",
   },
   { id: 1, name: "Complete", lineColor: "--bg-green", typeColor: "complete" },
   { id: 2, name: "Delete", lineColor: "--bg-red", typeColor: "delete" },
];

const dateS = new Date();

var listTodo = [
   {
      content: "ăn cơm nè",
      type: 0, //0 : processing , 1 : complete , 2: delete
      dateSubmitted: dateS,
   },
   {
      content: "ăn cơm nè",
      type: 1, //0 : processing , 1 : complete , 2: delete
      dateSubmitted: dateS,
   },
   {
      content: "ăn cơm nè",
      type: 2, //0 : processing , 1 : complete , 2: delete
      dateSubmitted: dateS,
   },
];

var listTodoRender = [...listTodo];

const onChangeTime = (date) => {
   console.log(date);

   const [month, day, year] = [
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
      date.getFullYear(),
   ];
   const [hour, minutes, seconds] = [
      ("0" + date.getHours()).slice(-2),
      ("0" + date.getMinutes()).slice(-2),
      date.getSeconds(),
   ];

   return `${day}/${month}/${year} ${hour}:${minutes}`;
};

const onAddTodo = (event) => {
   event.preventDefault();
   const todo = {
      content: document.getElementById("add-todo").value,
      type: 0,
      dateSubmitted: new Date(),
   };

   document.getElementById("add-todo").value = "";
   listTodo.push(todo);
   onChangeFilter();
};

const renderTodoList = () => {
   document.getElementsByClassName("list-todo__container")[0].innerHTML = "";
   var index = 0;

   for (var todo of listTodoRender) {
      document.getElementsByClassName(
         "list-todo__container"
      )[0].innerHTML += `<div class="list-todo__item">
          <div class="line-type ${type[todo.type].lineColor}"></div>
          <div class="list-todo__item-container">
              <div class="type-time-todo">
                  <div class="time">
                      <i class="fa-solid fa-clock"></i>
                      <p>${onChangeTime(todo.dateSubmitted)}</p>
                  </div>
                  
                  <div class="type__container">
                      <div class="type ${type[todo.type].lineColor}
         ">
      
                      </div>
                      <p>${type[todo.type].name}</p>
                  </div>
              </div>
              <div class="info-todo">
                  <p>${todo.content}</p>
              </div>
      
              <div class="action">
                  
              </div>
          </div>
              
      </div>`;
      todo.type === 0
         ? (document.getElementsByClassName("action")[
              index
           ].innerHTML = `<div class="accept-complete" onClick = {onRenderComplete(${index})}>
      <i class="fa-solid fa-circle-check"></i>
      <p>Complete</p>
  </div>
  <div class="delete-task" onClick = {onRenderDelete(${index})}>
      <i class="fa-solid fa-circle-check"></i>
      <p>Delete</p>
  </div>`)
         : (document.getElementsByClassName("action")[index].innerHTML = ``);

      index++;
   }
};

const onRenderDelete = (index) => {
   onRenderPopUp("Do you want delete this task ? ", 1, index);
};

const onRenderComplete = (index) => {
   onRenderPopUp("Do you want complete this task ? ", 0, index);
};

const onDeleteTask = (index) => {
   console.log(index);
   listTodo.splice(index, 1);
   onCancelPopUp();
   onChangeFilter();
};

const onCompleteTask = (index) => {
   console.log(index);
   listTodo[index].type = 1;
   onCancelPopUp();
   onChangeFilter();
};

const onRenderPopUp = (content, type, index) => {
   //0 : complete , 1 : delete
   document.getElementsByClassName("popup__container")[0].style.display =
      "flex";
   document.getElementsByClassName(
      "popup__container"
   )[0].innerHTML = `<div class="popup">
    <i class="fa-solid fa-circle-xmark" onClick="onCancelPopUp()"></i>
    <div class="popup__content">
        <p>${content}</p>
        <div class="popup__action">
            <button class="btn--cancel" onClick="onCancelPopUp()">Cancel</button>
            
        </div>
    </div>
</div>`;

   if (type === 0) {
      document.getElementsByClassName(
         "popup__action"
      )[0].innerHTML += `<button class="btn--accept" onClick = {onCompleteTask(${index})}>Accept</button>`;
   } else {
      document.getElementsByClassName(
         "popup__action"
      )[0].innerHTML += `<button class="btn--accept" onClick = {onDeleteTask(${index})}>Accept</button>`;
   }
};

const onCancelPopUp = () => {
   document.getElementsByClassName("popup__container")[0].style.display =
      "none";
};

const onChangeFilter = () => {
   const filter = document.getElementById("type-todo").value;
   if (filter !== "-1") {
      listTodoRender = listTodo.filter(
         (todo) => todo.type.toString() === filter
      );
   } else {
      listTodoRender = [...listTodo];
   }
   renderTodoList();
};
