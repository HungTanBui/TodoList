const API_URL = "https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks";
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

todoInput.addEventListener("keypress", (Event) => {
  if (Event.key == "Enter") {
    addTodo();
  }
});
document.addEventListener("DOMContentLoaded", getTodos());
addButton.addEventListener("click", addTodo);
// function getTodos(){

//     // Lấy dữ liệu từ API thông qua fetch
//     fetch("https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks")
//     // chuyển data vè dạng json
//     .then((Response) => Response.json())
//     // in ra dữ liệu
//     .then((Response) => console.log(Response))
//     // bắt lỗi nếu ko lấy được dữ liệu
//     .catch((Error) => console.log(Error));
// }

// Hàm bất đồng bộ
// GET FUNCTION
async function getTodos() {
  // try{
  //     // bất đồng bộ
  //     const response = axios.get("https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks")
  //     .then((response) => console.log(response.data));
  // }catch (Error){
  //     console.log(Error);
  // }

  try {
    // await đợi đến khi nào xử lí xong rồi mới chạy tiếp
    // await luôn luôn đi với async
    const response = await axios.get(API_URL);
    const ul = document.querySelector(".todo-list");
    // reset thẻ ul
    ul.innerHTML = "";
    // sắp xếp theo ngày mới nhất
    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    // tạo ra thẻ li mới trong ul
    response.data.forEach((element) => {
      const date = new Date(element.createdAt);
      const formatedDate = `${date.toLocaleDateString()}-${date.toLocaleTimeString()} `;
      console.log(formatedDate);

      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
                <div class="todo-content">

                    <input type="checkbox">

                    <div>
                        <span>${element.content}</span>
                        <p>Created: ${formatedDate}</p>
                    </div>
                        
                </div>
                <div class="todo-actions">
                    <button onclick="handleUpdate(${element.id}, '${element.content}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="handleDelete(${element.id})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `;
      ul.appendChild(li);
    });
  } catch (Error) {
    console.log(Error);
  }
}

// POST FUNCTION
async function addTodo() {
  // Input data
  const inputData = todoInput.value.trim();

  // thuộc tính của data trong khung
  const newTodo = {
    createdAt: new Date().toISOString(),
    content: inputData,
    isComplete: false,
  };

  try {
    const response = await axios.post(API_URL, newTodo);
    todoInput.value = "";
    getTodos();
    showNotification("Added successfully!!!");
  } catch (error) {
    console.log("ERROR EXCEPTION" + error);
  }
}

// PUT FUNCTION
function handleUpdate(id, content) {
  Swal.fire({
    title: "Edit your content",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    inputValue: content,
    showCancelButton: true,
    confirmButtonText: "Save",
    showLoaderOnConfirm: true,
    preConfirm: async (dataInput) => {
      await axios.put(`${API_URL}/${id}`, {
        content: dataInput,
      });
      getTodos();
      showNotification("Updated successfully!!!");
    },
  });
}

// DELETED FUNCTION
function handleDelete(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger mr-5",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        showNotification("Deleted successfully!!");
        getTodos();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

function showNotification(message) {
  Swal.fire({
    title: message,
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
    backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
        `,
  });
}
