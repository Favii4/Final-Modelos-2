var nombreUsuario;
var puntajeTotal;
function guardarNombreUsuario() {
  var nombre = document.getElementById('nombreUsuario').value
  nombreUsuario = nombre
  //alert(nombre)
}

function insertarPuntaje() {
  if (puntajeTotal == null || puntajeTotal == undefined) {
    puntajeTotal = 0;
  }
  if (nombreUsuario == null || nombreUsuario == "" || nombreUsuario == undefined) {
    alert("Ingresa un nombre de usuario")
  } else {
    var fecha = new Date().getTime();
    var ref2 = firebase.database().ref("mario");
    ref2.child(nombreUsuario).update({
      // puntaje: puntajeTotal,
      [fecha]: puntajeTotal
    })
  }

}
