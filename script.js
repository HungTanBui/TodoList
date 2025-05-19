console.log("Hello Word!");
document.addEventListener("DOMContentLoaded", getTodos());

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
        console.log(response.data);
        const ul = document.querySelector(".todo-list");

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