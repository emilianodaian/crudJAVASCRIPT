document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crudForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    // Función para obtener los datos de la API
    function fetchData() {
        fetch('http://localhost:8080/crudJAVA/api.php')
            .then(response => response.json())
            .then(data => {
                dataTable.innerHTML = '';
                data.forEach(item => {
                    let row = dataTable.insertRow();
                    row.insertCell(0).innerText = item.id;
                    row.insertCell(1).innerText = item.name;
                    row.insertCell(2).innerText = item.email;
                    row.insertCell(3).innerHTML = `<button onclick="editData(${item.id})">Editar</button> <button onclick="deleteData(${item.id})">Eliminar</button>`;
                });
            });
    }

    // Función para enviar los datos a la API
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:8080/crudJAVA/api.php?id=${id}` : 'http://localhost:8080/crudJAVA/api.php';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email')
            })
        }).then(response => {
            if (response.ok) {
                form.reset();
                fetchData();
            }
        });
    });

    // Función para cargar datos en el formulario para editar
    window.editData = function(id) {
        fetch(`http://localhost:8080/crudJAVA/api.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('id').value = data.id;
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;
            });
    }

    // Función para eliminar un dato
    window.deleteData = function(id) {
        if (confirm('¿Estás seguro de eliminar este registro?')) {
            fetch(`http://localhost:8080/crudJAVA/api.php?id=${id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    fetchData();
                }
            });
        }
    }

    // Cargar los datos inicialmente
    fetchData();
});
