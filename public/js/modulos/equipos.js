import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-equipo');

if(btnEliminar){
btnEliminar.addEventListener('click', e =>{
  const urlEquipo = e.target.dataset.equipoUrl;

 // console.log(urlProyecto);

 //return ;
    Swal.fire({
      title: 'Estas seguro Eliminar equipo?',
      text: "Si se elimina, pierde el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        const url =`${location.origin}/equipo/${urlEquipo}`;

        axios.delete(url, {params: {urlEquipo}})
          .then(function(respuesta){
            console.log(respuesta)

                Swal.fire(
                  'Equipo Borrado!',
                  respuesta.data,
                  'success'
                );
                setTimeout(()=>{
                  window.location.href='/menu'
                }, 2000);
          });
          }
      })  
  })
}
export default btnEliminar;

