var formElement=null;

//Las variables de las respuestas Select
var respuestaSelect=null;
var respuestaSelect1=null;

//Las variables de las respuestas Radio tipo Array[]
var respuestasRadio=[];
var respuestasRadio1=[];

//Las variables de las respuestas texto
var text1 = null;
var text2 = null;

//Las variables de las respuestas Multiple[]
var respuestaMultiple = [];
var respuestaMultiple1 = [];

//Las variables de las respuestas Checkbox
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];

//Variable para saber la puntuacion conseguida en el test
var nota = 0;

////////////////////////////////////////////////////////////////////////////////////////////*
//Carga el onload
window.onload = function(){ 



 //Correccion pulsando el boton
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   
   inicializar();
   //Para corregir Text
   corregirText();
   corregirText1();
   
    //Para corregir checkbox
   corregirCheckbox(); 
   corregirCheckbox1()
   
   //Para corregir select
   corregirSelect();
   corregirSelect1();

   //Para corregir select
   corregirRadio();
   corregirRadio1();
  
  //Para corregir Multiple
   corregirMultiple();
   corregirMultiple1();
  
//Funcion la nota final
  presentarNota();
   return false;
 }
 
 //LEE XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/jordanfast/proyectoFormulario/master/xml/Preguntas_XML.xml", true);
 xhttp.send();
}

////////////////////////////////////////////////////////////////////////////////////////////////////*
 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parseo
 
 //Pregunta TEXT 1
 var tituloSelect=xmlDoc.getElementById("1").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(tituloSelect); 
 text1=xmlDoc.getElementById('1').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
  //Pregunta TEXT 2
 var tituloSelect=xmlDoc.getElementById("2").getElementsByTagName("text")[0].childNodes[0].nodeValue;
ponerDatostextHtml(tituloSelect); 
 text2=xmlDoc.getElementById('2').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 

 //Pregunta Select 1
 var tituloSelect=xmlDoc.getElementsByTagName("text")[2].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("3").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("3").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);  
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);
 
 
 
 
 //Pregunta Select 2
 var tituloSelect=xmlDoc.getElementsByTagName("text")[3].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("4").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("4").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosSelectHtml1() 
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
 
 
 //Pregunta CheckBox 1
 var tituloCheckbox = xmlDoc.getElementsByTagName("text")[8].childNodes[0].nodeValue;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("9").getElementsByTagName('option').length;
 for (var i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);  
 var nres = xmlDoc.getElementById("9").getElementsByTagName('answer').length;
 for (var i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("9").getElementsByTagName("answer")[i].innerHTML;
 }

 //Pregunta CheckBox 2
 var tituloCheckbox = xmlDoc.getElementById("10").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("10").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox,opcionesCheckbox1); 
 var nres = xmlDoc.getElementById("10").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("10").getElementsByTagName("answer")[i].innerHTML;
 }


 

 
 //Pregunta MULTIPLE 1
 var tituloSelect=xmlDoc.getElementById("5").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("5").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("5").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosMultiHtml()
   var nresp = xmlDoc.getElementById("5").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMultiple[i] = parseInt(xmlDoc.getElementById("5").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}

 
//Pregunta MULTIPLE 2
 var tituloSelect=xmlDoc.getElementById("6").getElementsByTagName("text")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("6").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("6").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml1(tituloSelect,opcionesSelect); //llamamos al metodo ponerDatosMultiHtml1()
   var nresp = xmlDoc.getElementById("6").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMultiple1[i] = parseInt(xmlDoc.getElementById("6").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}

 
 //Pregunta Radio 1
  var tituloRadio = xmlDoc.getElementsByTagName("text")[6].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("7").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
   opcionesRadio[i]=xmlDoc.getElementById("7").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio(tituloRadio,opcionesRadio); 
 var nres = xmlDoc.getElementById("7").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById("7").getElementsByTagName("answer")[i].innerHTML;
 }
  
 //Pregunta Radio 2
  var tituloRadio1 = xmlDoc.getElementsByTagName("text")[7].innerHTML;
 var opcionesRadio1 = [];
 var nopt = xmlDoc.getElementById("8").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
   opcionesRadio1[i]=xmlDoc.getElementById("8").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio1(tituloRadio1,opcionesRadio1); 
 var nres = xmlDoc.getElementById("8").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById("8").getElementsByTagName("answer")[i].innerHTML;
 }

}

////////////////////////////////////////////////////////////////////////////////////////////////////*
//Corrección

//Corregir text 1
function corregirText(){
  var s =formElement.elements[0].value;   
  
  if (s.toLowerCase() == text1.toLowerCase()) {
	  darRespuestaHtml("1ª Pregunta Text: BIÉN");
	  nota +=1;
  }
  else {
    darRespuestaHtml("1ª Pregunta Text: MAL");
  }
}


//Corregir text 2
function corregirText1(){
 var s = formElement.elements[1].value;     
  if (s.toLowerCase()==text2.toLowerCase()) {
  darRespuestaHtml("2ª Pregunta Text: BIÉN");
  nota +=1;
  }
    else { darRespuestaHtml("2ª Pregunta Text: MAL");
  }
}



//Corregir select 1

  function corregirSelect(){
  var sel = formElement;  
  if (sel.sel.selectedIndex-1==respuestaSelect) { 
   darRespuestaHtml("1ª Pregunta Select: BIÉN");
   nota +=1;
  }
  else darRespuestaHtml("1ª Pregunta Select: MAL");
}


//Corregir select 2
  
  function corregirSelect1(){
  var sel1 = formElement;  
  if (sel1.sel1.selectedIndex-1==respuestaSelect1) { 
   darRespuestaHtml("2ª Pregunta Select: BIÉN");
   nota +=1;
  }
  else darRespuestaHtml("2ª Pregunta Select: MAL");
}

//Corregir Radio 1
function corregirRadio(){

  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio1.length; i++) {  
   if (f.radio1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio[j])
		 escorrecta[i]=true;
    }
    
    if (escorrecta[i]) {
     nota +=1.0;    
     darRespuestaHtml("1ª Pregunta Radio: BIÉN");    
    } else {  
     darRespuestaHtml("1ª Pregunta Radio:  MAL");
    }   
   } 
  }
}
//Corregir Radio 2
function corregirRadio1(){
  
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio2.length; i++) {  
   if (f.radio2[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio1.length; j++) {
     if (i==respuestasRadio1[j])
		 escorrecta[i]=true;
    }
    
    if (escorrecta[i]) {
     nota +=1.0;    
     darRespuestaHtml("2ª Pregunta Radio:  BIÉN");    
    } else {  
     darRespuestaHtml("2ª Pregunta Radio: MAL");
    } 
	
   } 
  }
}
  
 //Corregir Multiple 1
function corregirMultiple(){
  
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.mult.length; i++) {  
   if (f.mult[i].selected) {
    escorrecta[i]=false; 
    for (j = 0; j < respuestaMultiple.length; j++) {
     if (i==respuestaMultiple[j]) escorrecta[i]=true;
    }
    
	if (escorrecta[i]) {
     nota +=1.0/respuestaMultiple.length;     
     darRespuestaHtml("1ª Pregunta Multiple : "+i+" BIÉN");    
    } else {
     nota -=1.0/respuestaMultiple.length;     
     darRespuestaHtml("1ª Pregunta Multiple: "+i+" MAL");
    }   
   } 
  }
}


 //Corregir Multiple 2
function corregirMultiple1(){
  
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.mult1.length; i++) {  
   if (f.mult1[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMultiple1.length; j++) {
     if (i==respuestaMultiple1[j]) escorrecta[i]=true;
    }
    
    if (escorrecta[i]) {
     nota +=1.0/respuestaMultiple1.length;    
     darRespuestaHtml("2ª Pregunta Multiple : "+i+" BIÉN");    
    } else {
     nota -=1.0/respuestaMultiple1.length;     
     darRespuestaHtml("2ª Pregunta Multiple: "+i+" MAL");
    }   
   } 
  }
}
  
  
//Corregir Checkbox 1
function corregirCheckbox(){
  
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;     
     darRespuestaHtml("1ª pregunta  CheckBox: "+i+" BIÉN");    
    } else {
     nota -=1.0/respuestasCheckbox.length;     
     darRespuestaHtml("1ª pregunta  CheckBox: "+i+" MAL");
    }   
   } 
  }
}

//Corregir Checkbox 2
function corregirCheckbox1(){
  
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color1.length; i++) {  
   if (f.color1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;     
     darRespuestaHtml("2ª pregunta  CheckBox:"+i+" BIÉN");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;    
     darRespuestaHtml("2ª pregunta  CheckBox: "+i+" MAL");
    }   
   } 
  }
}




///////////////////////////////////////////////////////////////////////////////////*

// PONER DATOS TEXT 1 en el documento HTML
function ponerDatosInputHtml(t){
 document.getElementById("text").innerHTML = t;
}

// PONER DATOS TEXT 2 en el documento HTML
function ponerDatostextHtml(t){
 document.getElementById("text1").innerHTML = t;
}


//PONER DATOS SELECT 1 en el documento HTML

function ponerDatosSelectHtml(t,opt){
  document.getElementById("select").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//PONER DATOS SELECT 2 en el documento HTML
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("select1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}


//PONER DATOS CHECKBOX 1 en el documento HTML
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkbox1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//PONER DATOS CHECKBOX 2 en el documento HTML
function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkbox2');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color1"+i);
    input.type="checkbox";
    input.name="color1";
    input.id="color_1"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//PONER DATOS RADIO 1 en el documento HTML
function ponerDatosradio(t,opt){
 var radioContainer=document.getElementById('radio');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio1_"+i);
    input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}


//PONER DATOS RADIO 2 en el documento HTML
function ponerDatosradio1(t,opt){
 var radioContainer=document.getElementById('radio1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio2_"+i);
    input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}


//PONER DATOS MULTIPLE 1 en el documento HTML
function ponerDatosMultiHtml(t,opt){
  document.getElementById("multiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//PONER DATOS MULTIPLE 1 en el documento HTML
function ponerDatosMultiHtml1(t,opt){
  document.getElementById("multiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var resDiv=document.getElementById('resultadosDiv');
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 resDiv.appendChild(p);
}



function presentarNota(){
   darRespuestaHtml("TU NOTA ES: "+nota+" PUNTOS SOBRE 10");
}


function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


