var nombreUsuario;
var puntajeTotal;
function guardarNombreUsuario(){
  var nombre = document.getElementById('nombreUsuario').value
  nombreUsuario = nombre
  //alert(nombre)
}

function insertarPuntaje() {
  var fecha = new Date().getTime();
  var ref2 = firebase.database().ref(nombreUsuario);
  ref2.child("bankHero").child(fecha).update({
    puntaje: puntajeTotal
  })
}
