// Alimentar al cajero de billetes
var billetes = [];
billetes.push(new Billete(10, 3));
billetes.push(new Billete(50, 4));
billetes.push(new Billete(20, 5));
billetes.push(new Billete(200, 4));
billetes.push(new Billete(100, 5));

var cajero = new Cajero(billetes);
var respuesta = document.getElementById("respuesta");
var btnRetirar = document.getElementById("btnRetirar");
btnRetirar.addEventListener("click", function(e){
    var importe = document.getElementById("txtImporte").value;
    var efectivo = recibirDinero(importe);
    respuesta.innerHTML = efectivo.length == 0 ? "No hay cash suficiente" : "";
    for (var b of efectivo)
    {
        if (b.cantidad > 0)
        {
            imprimirBilletes(b);
        }
    }
})

function recibirDinero(importe)
{
    var efectivo = [];
    var billetesOrdenados = billetes.sort((a, b) => b.denominacion - a.denominacion);
    for (var b of billetesOrdenados)
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
        return efectivo;
    }
    else
    {
        return [];
    }
}

function imprimirBilletes(billete)
{
    for (var i=0; i<billete.cantidad; i++)
    {
        var imagenBillete = new Image();
        imagenBillete.src = "img/" + billete.denominacion + ".jpg";
        respuesta.appendChild(imagenBillete);
    }
    respuesta.appendChild(document.createElement("br"));
}