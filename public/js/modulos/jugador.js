import axios from 'axios';
import Swal from 'sweetalert2';

const jugador = document.querySelector('.listado-pendientes');

if(jugador){
    jugador.addEventListener('click', e=>{
        //console.log(e.target.classList);
        if(e.target.classList.contains('fa-check-circle')){
           //console.log('Actualizando');
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.jugador;
            const url = `${location.origin}/equipos/${idTarea}`;
            //console.log(url)

            axios.patch(url, {idTarea})
            .then(function (respuesta){
                if(respuesta.status===200){
                    icono.classList.toggle('completo');
                }
            })
          
        }
        if(e.target.classList.contains('fa-trash')){
            //console.log('Eliminando...');
            const jugadorHTML= e.target.parentElement.parentElement,
            idTarea=jugadorHTML.dataset.jugador;
            //console.log(jugadorHTML);
            //console.log(idTarea);

            Swal.fire({
                title: 'Estas seguro Eliminar el Jugador?',
                text: "Si se elimina, pierde el registro!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrarlo!',
                cancelButtonText: 'Cancelar!'
            }).then((result) => {
                if (result.value) {
                   // console.log("Eliminando..");
                    const url = `${location.origin}/equipos/${idTarea}`;
                    axios.delete(url, {params: {idTarea}})
                    .then(function(respuesta){
                      console.log(respuesta);
                       if(respuesta.status===200){
                            jugadorHTML.parentElement.removeChild(jugadorHTML);

                            Swal.fire(
                                'Jugador Eliminado',
                                respuesta.data,
                                'success'
                            )
                        }
                    })
                }

            })

        }
    });
}
export default jugador;