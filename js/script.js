// Alimentar al cajero de billetes
var billetes = [];
billetes.push(new Billete(10, 3));
billetes.push(new Billete(50, 4));
billetes.push(new Billete(20, 5));
billetes.push(new Billete(200, 4));
billetes.push(new Billete(100, 5));
billetes.push(new Billete(5, 20));
billetes.push(new Billete(1, 15));

var billetes = billetes.sort((a, b) => b.denominacion - a.denominacion);

var cajero = new Cajero(billetes);
var respuesta = document.getElementById("respuesta");
var btnRetirar = document.getElementById("btnRetirar");
mostrarSaldo();

btnRetirar.addEventListener("click", function(e){
    var importe = document.getElementById("txtImporte").value;
    var efectivo = recibirDinero(importe);
    respuesta.innerHTML = efectivo.length == 0 ? "No se puede entregar esa cantidad de dinero" : "";
    for (var b of efectivo)
    {
        if (b.cantidad > 0)
        {
            imprimirBilletes(b);
            mostrarSaldo();
        }
    }
})

function recibirDinero(importe)
{
    var efectivo = [];
    
    for (var b of billetes)
    {
        var numBilletes = parseInt(importe / b.denominacion) ;
        if (numBilletes > b.cantidad)
        {
            numBilletes = b.cantidad;
        }
        importe = importe - (numBilletes * b.denominacion);
        efectivo.push(new Billete(b.denominacion, numBilletes));    
    }
    if (importe == 0)
    {
        debitarCajero(efectivo);
        return efectivo;
    }
    else
    {
        return [];
    }
}

function debitarCajero(efectivo)
{
    for (var b of efectivo)
    {
        var billete = billetes.find((elemento, indice, objeto) => elemento.denominacion == b.denominacion);
        billete.cantidad -= b.cantidad;
    }
}

function imprimirBilletes(billete)
{
    for (var i=0; i<billete.cantidad; i++)
    {
        var imagenBillete = new Image();
        imagenBillete.src = "img/" + billete.denominacion + ".jpg";
        if (billete.denominacion < 10)
        {
            imagenBillete.width = 70;
            imagenBillete.height = 70;
        }
        respuesta.appendChild(imagenBillete);
    }
    respuesta.appendChild(document.createElement("br"));
}

function mostrarSaldo()
{
    var saldo = document.getElementById("saldo");
    var reporteSaldo = "<table><tr><td><strong>Denominacion</strong></td><td><strong>Cantidad</strong></td></tr>";
    for(var b of billetes)
    {
        reporteSaldo += "<tr><td>" + b.denominacion + " Soles</td><td>" + b.cantidad + "</td></tr>";
    }
    reporteSaldo += "</table>";
    saldo.innerHTML = reporteSaldo;
}