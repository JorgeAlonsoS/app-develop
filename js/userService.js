function getUsers(page) {
    document.getElementById("cardHeader").innerHTML = '<h4 ><i class="fa-solid fa-users"></i>Listado de usuario</h4>'
    fetch("https://reqres.in/api/users?page=" + page, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status, body: data
                    }
                }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listUsers = `
            <td><button type="button" class="btn btn-outline-success"onclick="addUser()"><i class="fa-solid fa-user-plus"></i>Agregar Usuarios</button></td>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
            `
                response.body.data.forEach(user => {
                    listUsers = listUsers.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="Avatar de usuario"></td>
                        <td><button type="button" class="btn btn-outline-success"onclick="showInfoUser('${user.id}')"><i class="fa-solid fa-eye"></i></button></td>
                    </tr>
                    `)

                });
                listUsers = listUsers.concat(`
                    </body>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" onclick="getUsers('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#" onclick="getUsers('2')">2</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                `)
                document.getElementById("info").innerHTML = listUsers
            }
            else {
                document.getElementById("info").innerHTML = "<h3>No se encontraron usuarios</h3>"
            }
        })
}

function showInfoUser(userId) {
    fetch("https://reqres.in/api/users/" + userId, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status, body: data
                    }
                }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                showModalUser(response.body.data)

            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontro en el usuario</h3>'
            }
        })
}

function showModalUser(user) {
    const modalUser = `
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" modal-sm>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user"></i>Show User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img src="${user.avatar}" class="card-img-top" alt="Avatar User">
                            <div class="card-body">
                                <h5 class="card-title">User info</h5>
                                <p class="card-text">First Name:${user.first_name} </p>
                                <p class="card-text">Last Name:${user.last_name} </p>
                                <p class="card-text">Email:${user.email} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()
}
function addUser() {
    const modalUser = `
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" modal-sm>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i>Add User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <form id="formAddUser"> 
                                    <div class="mb-3">
                                        <label for="Name" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="name" placeholder="Example input placeholder" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="last name" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="last_name" placeholder="text input placeholder" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" placeholder="email input placeholder" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Avatar" class="form-label">Avatar</label>
                                        <input type="url" class="form-control" id="avatar" placeholder="Avatar input placeholder " required>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <button class="btn btn-success" type="button" onclick="saveUser()"><i class="fa-solid fa-floppy-disk"></i>  Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()
}
function saveUser(){
    const form=document.getElementById('formAddUser')
    if(form.checkValidity()){
        const name=document.getElementById('name').value
        const last_name=document.getElementById('last_name').value
        const email=document.getElementById('email').value
        const avatar=document.getElementById('avatar').value

        const userData={name, last_name,email,avatar}

        fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify(userData)
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status, body: data
                    }
                }
            )
        })
        .then((response) =>{
            if(response.status===201){
                document.getElementById('info').innerHTML = '<h3>Se guardo el usuario</h3>'
            }else{
                document.getElementById('info').innerHTML = '<h3>Error</h3>'
            }
            const modalId=document.getElementById('modalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    } else {
        form.reportValidity()
    }
}