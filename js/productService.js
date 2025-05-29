function getProducts(){
    document.getElementById("cardHeader").innerHTML= "<h4>Lista de producto</h4>"
    fetch("https://reqres.in/api/unknown",{
        method: "GET", 
        headers:{
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        },
    })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status, body:data
                }
            }
        )
    })
    .then((response)=>{
        if(response.status === 200){
            let listProducts=`
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">year</th>
                                <th scope="col">color</th>
                                <th scope="col">pantone_value</th>
                            </tr>
                        </thead>
                        <tbody>
            `
            response.body.data.forEach(user => {
                listProducts= listProducts.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.year}</td>
                        <td style="background-color:${user.color}"></td>
                        <td>${user.pantone_value}</td>
                        <td><button type="button" class="btn btn-outline-success"onclick="showInfoProduct('${user.id}')">View</button></td>
                    </tr>
                    `)
                
            });
            listProducts= listProducts.concat(`
                    </body>
                </table>
                `)
                document.getElementById("info").innerHTML= listProducts
        }
        else{
            document.getElementById("info").innerHTML="<h3>No se encontraron Productos</h3>"
        }
    })
}
function showModalProduct(user){
    const modalProduct= `
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" modal-sm>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <td style="background-color:${user.color}"></td>
                            <div class="card-body">
                                <h5 class="card-title">User info</h5>
                                <p class="card-text">Id:${user.id} </p>
                                <p class="card-text">Name:${user.name} </p>
                                <p class="card-text">Año:${user.year} </p>
                                <p class="card-text">Patone_value:${user.pantone_value} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `
    document.getElementById('showModal').innerHTML= modal
    const modal= new bootstrap.Modal(
        document.getElementById('modalProduct')
    )
    modal.show()
}