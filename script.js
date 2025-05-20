const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

document.addEventListener("DOMContentLoaded", getTodos());
addButton.addEventListener("click",addTodo);
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
async function getTodos(){
    // try{
    //     // bất đồng bộ
    //     const response = axios.get("https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks")
    //     .then((response) => console.log(response.data));
    // }catch (Error){
    //     console.log(Error);
    // }
    

    try{
        // await đợi đến khi nào xử lí xong rồi mới chạy tiếp
        // await luôn luôn đi với async
        const response = await axios.get("https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks");
        const ul = document.querySelector(".todo-list");
        // ul.innerHTML = "";
        response.data.forEach((element) => {

            const date = new Date(element.createdAt);
            const formatedDate = `${date.toLocaleDateString()}-${date.toLocaleTimeString()} `;
            console.log(formatedDate);


            const li = document.createElement("li");
            li.className = "todo-item"
            li.innerHTML = `
                <div class="todo-content">

                    <input type="checkbox">

                    <div>
                        <span>${element.content}</span>
                        <p>Created: ${formatedDate}</p>
                    </div>
                        
                </div>
                <div class="todo-actions">
                    <button><i class="fa-solid fa-pen-to-square"></i></button>
                    <button><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `,
            ul.appendChild(li)

        });
        
        
        
    }catch (Error){
        console.log(Error);
    }
    

    
}



// POST FUNCTION
async function addTodo(){
    const inputData = todoInput.value.trim();

    const newTodo = {
        createdAt: new Date().toISOString(),
        content: inputData,
        isComplete: false,
    };

    try {
        const response = await axios.post("https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks", newTodo);
        todoInput.value = "";
        getTodos();
        Swal.fire({
            title: "Adding successfully!!",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
            backdrop: 
            `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
            `
        });
    } catch (error) {
        console.log("ERROR EXCEPTION" + error);
    }
    
}

// PUT FUNCTION
function handleUpdate(id, content){
    Swal.fire({
        title: "Edit your content",
        input: "text",
        inputAttributes: {
        autocapitalize: "off"
        },
        inputValue: content,
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: async (dataInput) => {
            await axios.put(`https://68287be46b7628c529137a9e.mockapi.io/tasks/tasks/${id}`,{
                content: dataInput,
            });
        },
    });

}