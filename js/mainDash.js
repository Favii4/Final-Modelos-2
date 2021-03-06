var puntajesBank = [];


function initApp() {

    cargarPuntajesBank()
    cargarPuntajesSpace()
    cargarPuntajesMario()
}

function cargarPuntajesBank() {
    ///User information is obtained
    var infoPuntBank = firebase.database().ref().child("bankHero")
    var infoPuntBankPromise = infoPuntBank.on('value', function (snapshot) {

        var puntajes= []
        var obj = new Object();
        var dataComplete = [];
        var info = (snapshot.val())
        //  var objStudent = new Object();
        //  studentList = [];
        var puntajeAlto = 0;
        var nombrePuntajeAlto = "";

        snapshot.forEach(function (child) {

            
            var nombre = child.key

            obj.nombre = nombre;
            

            child.forEach(function (childMin) {

                obj.fecha = unixToTimeStampOurTimeZone (parseInt(childMin.key));

                var puntajeActual  = childMin.val();
                obj.puntaje = puntajeActual;
    
                if(puntajeActual > puntajeAlto){
                    puntajeAlto = puntajeActual;
                    nombrePuntajeAlto = nombre;
                }
                
    
            });


            puntajes.push(obj)
            obj = {}
        });
        $("#mejorPuntajeBank").empty();
        $("#mejorPuntajeBank").append(nombrePuntajeAlto + " " + puntajeAlto);
        makeTable(puntajes)

        
    });
}

function cargarPuntajesSpace() {
    ///User information is obtained
    var infoPuntSpace = firebase.database().ref().child("monsterSpace")
    var infoPuntSpacePromise = infoPuntSpace.on('value', function (snapshot) {

        var puntajes= []
        var obj = new Object();
        var dataComplete = [];
        var info = (snapshot.val())
        //  var objStudent = new Object();
        //  studentList = [];
        var puntajeAlto = 0;
        var nombrePuntajeAlto = "";

        snapshot.forEach(function (child) {

            
            var nombre = child.key

            obj.nombre = nombre;
            

            child.forEach(function (childMin) {

                obj.fecha = unixToTimeStampOurTimeZone (parseInt(childMin.key));

                var puntajeActual  = childMin.val();
                obj.puntaje = puntajeActual;
    
                if(puntajeActual > puntajeAlto){
                    puntajeAlto = puntajeActual;
                    nombrePuntajeAlto = nombre;
                }
                
    
            });


            puntajes.push(obj)
            obj = {}
        });
        $("#mejorPuntajeSpace").empty();
        $("#mejorPuntajeSpace").append(nombrePuntajeAlto + " " + puntajeAlto);
        makeTableSpace(puntajes)

        
    });
}

function cargarPuntajesSpace() {
    ///User information is obtained
    var infoPuntSpace = firebase.database().ref().child("monsterSpace")
    var infoPuntSpacePromise = infoPuntSpace.on('value', function (snapshot) {

        var puntajes= []
        var obj = new Object();
        var dataComplete = [];
        var info = (snapshot.val())
        //  var objStudent = new Object();
        //  studentList = [];
        var puntajeAlto = 0;
        var nombrePuntajeAlto = "";

        snapshot.forEach(function (child) {

            
            var nombre = child.key

            obj.nombre = nombre;
            

            child.forEach(function (childMin) {

                obj.fecha = unixToTimeStampOurTimeZone (parseInt(childMin.key));

                var puntajeActual  = childMin.val();
                obj.puntaje = puntajeActual;
    
                if(puntajeActual > puntajeAlto){
                    puntajeAlto = puntajeActual;
                    nombrePuntajeAlto = nombre;
                }
                
    
            });


            puntajes.push(obj)
            obj = {}
        });
        $("#mejorPuntajeSpace").empty();
        $("#mejorPuntajeSpace").append(nombrePuntajeAlto + " " + puntajeAlto);
        makeTableSpace(puntajes)

        
    });
}

function cargarPuntajesMario() {
    ///User information is obtained
    var infoPuntMario = firebase.database().ref().child("mario")
    var infoPuntMarioPromise = infoPuntMario.on('value', function (snapshot) {

        var puntajes= []
        var obj = new Object();
        var dataComplete = [];
        var info = (snapshot.val())
        //  var objStudent = new Object();
        //  studentList = [];
        var puntajeAlto = 0;
        var nombrePuntajeAlto = "";

        snapshot.forEach(function (child) {

            
            var nombre = child.key

            obj.nombre = nombre;
            

            child.forEach(function (childMin) {

                obj.fecha = unixToTimeStampOurTimeZone (parseInt(childMin.key));

                var puntajeActual  = childMin.val();
                obj.puntaje = puntajeActual;
    
                if(puntajeActual > puntajeAlto){
                    puntajeAlto = puntajeActual;
                    nombrePuntajeAlto = nombre;
                }
                
    
            });


            puntajes.push(obj)
            obj = {}
        });
        $("#mejorPuntajeMario").empty();
        $("#mejorPuntajeMario").append(nombrePuntajeAlto + " " + puntajeAlto);
        makeTableMario(puntajes)  
    });
}

function makeTable(obj) {

    $("#tableBankHeroData").empty();
    var table = '';

    for (let i = 0; i < obj.length; i++) {
        table = table.concat('<tr>')
        table = table.concat('<td>' + obj[i].nombre + '</td>')
        table = table.concat('<td>' + obj[i].fecha + '</td>')
        table = table.concat('<td>' + obj[i].puntaje + '</td>')
        table = table.concat('</tr>')
    }

    $("#tableBankHeroData").append(table);
}

function makeTableSpace(obj) {

    $("#tableSpaceData").empty();
    var table = '';

    for (let i = 0; i < obj.length; i++) {
        table = table.concat('<tr>')
        table = table.concat('<td>' + obj[i].nombre + '</td>')
        table = table.concat('<td>' + obj[i].fecha + '</td>')
        table = table.concat('<td>' + obj[i].puntaje + '</td>')
        table = table.concat('</tr>')
    }

    $("#tableSpaceData").append(table);
}

function makeTableMario(obj) {

    $("#tableMarioData").empty();
    var table = '';

    for (let i = 0; i < obj.length; i++) {
        table = table.concat('<tr>')
        table = table.concat('<td>' + obj[i].nombre + '</td>')
        table = table.concat('<td>' + obj[i].fecha + '</td>')
        table = table.concat('<td>' + obj[i].puntaje + '</td>')
        table = table.concat('</tr>')
    }

    $("#tableMarioData").append(table);
}


function unixToTimeStampOurTimeZone(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agt', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();

    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
