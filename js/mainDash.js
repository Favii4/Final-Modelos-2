
function initApp() {

    loadRegistros()
    loadRealTime()
}

function loadRegistros() {
    ///Student information is obtained
    var infoTemp = firebase.database().ref().child("RegistroSensorTemp")
    var infoTempPromise = infoTemp.on('value', function (snapshot) {

        var dataComplete = [];
        var info = (snapshot.val())
        //  var objStudent = new Object();
        //  studentList = [];

        var dates = [];
        var dataTem = [];
        var dataHum = [];
        var cont = 0;

        var highTemp = 0;
        var highHum = 0;



        //chart
        var ctxTemp = document.getElementById("chartTemp").getContext("2d")
        var ctxHum = document.getElementById("chartHum").getContext("2d")


        snapshot.forEach(function (child) {


            var objTem = new Object();
            var objHum = new Object();


            var json = decode(child.val())
            var obj = JSON.parse(json);
            dataComplete.push(obj)
            obj.time = unixToTimeStampOurTimeZone(obj.fecha)
            //    var y  = obj.time
            dates.push(obj.time)
            var temp = parseInt(obj.temperatura);
            var hum = parseInt(obj.humedad);

            if (temp > highTemp) {
                highTemp = temp
                $("#highTem").empty();
                $("#highTem").append(highTemp + " °C");

            }

            if (hum > highHum) {
                highHum = hum
                $("#highHum").empty();
                $("#highHum").append(highHum + " RH");

            }

            dataTem.push(temp);

            dataHum.push(hum);

            if (dataTem.length > 10) {
                dataTem = dataTem.slice(1, 10)
            }
            if (dataHum.length > 10) {
                dataHum = dataHum.slice(1, 10)

            }
            if (dates.length > 10) {
                dates = dates.slice(1, 10)

            }


            //      objStudent.gender = child.val()['Genero'];
            //      objStudent.idStudent = child.val()['Id_Estudiante'];
            //      objStudent.lastname = child.val()['Apellidos_Estudiante'];
            //      objStudent.name = child.val()['Nombres_Estudiante'];
            //      objStudent.grade = (child.val()['Curso']);
            //      if (typeRoute == "Rutas_AM") {
            //          objStudent.busStop = (child.val()['N_Paradero_Manana']);
            //          objStudent.lat = (child.val()['Latitud_Estudiante_Manana']);
            //          objStudent.lon = (child.val()['Longitud_Estudiante_Manana']);
            //      } else {
            //          objStudent.busStop = (child.val()['N_Paradero_Tarde']);
            //          objStudent.lat = (child.val()['Latitud_Estudiante_Tarde']);
            //          objStudent.lon = (child.val()['Longitud_Estudiante_Tarde']);
            //      }

            //      studentList.push(objStudent);
            //      objStudent = {};
        });

        makeTable(dataComplete);
        var myChart = new Chart(ctxHum, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Humedad vs tiempo',
                    backgroundColor: "#F3F3F3",
                    borderColor: "#0C8092",
                    data: dataHum,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Humedad'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Fecha'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });

        var myChart = new Chart(ctxTemp, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Temperatura vs tiempo',
                    backgroundColor: "#F3F3F3",
                    borderColor: "#B22006",
                    data: dataTem,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Temperatura'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Fecha'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });

    });
}

function loadRealTime() {
    ///Student information is obtained
    var infoReal = firebase.database().ref().child("RegistroSensorRealTime")
    var infoRealPromise = infoReal.on('value', function (snapshot) {

        var info = (snapshot.val())
        //  var objStudent = new Object();
        var json = decode(snapshot.val())
        var obj = JSON.parse(json);
        obj.time = unixToTimeStampOurTimeZone(obj.fecha)
        console.log(obj)
        //  studentList = [];
        var lastTemp = parseInt(obj.temperatura) + "°C";
        var lastHum = parseInt(obj.humedad) + " RH"

        $("#lastTemp").empty();
        $("#lastTemp").append(lastTemp);

        $("#lastHum").empty();
        $("#lastHum").append(lastHum);

    });
}

function makeTable(obj) {



    $("#tableData").empty();
    var table = '';

    for (let i = 0; i < obj.length; i++) {
        table = table.concat('<tr>')
        table = table.concat('<td>' + obj[i].time + '</td>')
        table = table.concat('<td>' + obj[i].humedad + ' RH</td>')
        table = table.concat('<td>' + obj[i].temperatura + '°C</td>')
        table = table.concat('</tr>')
    }

    $("#tableData").append(table);
}



// Function to encode a string to base64 format
function encode(str) {
    encodedString = btoa(str);
    return encodedString;
}

// Function to decode a string from base64 format
function decode(str) {
    decodedString = atob(str);
    return decodedString
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
