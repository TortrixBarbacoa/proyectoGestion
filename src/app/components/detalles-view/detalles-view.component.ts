import { Component, OnInit } from '@angular/core';
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { UserRegister } from 'src/app/services/user.service';
import { PDFDocument, rgb} from 'pdf-lib';



@Component({
  selector: 'app-detalles-view',
  templateUrl: './detalles-view.component.html',
  styleUrls: ['./detalles-view.component.css']
})
export class DetallesViewComponent implements OnInit {
  editCalcCuotas: any;
  editCalcCantidad:any;
  collecionAllUsers: any[] = [];
  editCalculationData: any = null; // Almacena los datos de edición
  editCalculationIndex: number = -1; // Almacena el índice del préstamo que se está editando (-1 para indicar que no se está editando)
  editCalcId : any;
  editCalcAlias : any;
  editCalcMonthly: any;
  editCalcInteres: any;
  editCalcTotalInteres: any;
  totalInteres: any;
  userCollectionData: any[] = [];
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  currentIndex: number = 0;
  userData: any;
  detalleUser: any;
  prueba: any;
  uid: string ='';
  user$ = this.userInfo.currentUserProfileInfo$;

  constructor(private userRegister: UserRegister,
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,) {}

  ngOnInit(): void {

    
    this.userRegister.getAuthenticateUserCollection().then((data) => {
      this.userCollectionData = data;      
    });
    // Llama al servicio para obtener el userData y asignarlo a la propiedad
    this.userService.getAuthenticatedUserName().then((userData) => {
      this.userData = userData;
      if (this.userData.rol === 'Admin') {
        this.userService.getAllUsersInfo().then((collecionAllUsers) => {

          this.userCollectionData = this.ordenarInfo(collecionAllUsers);
        });
      } else {
        this.userRegister.getAuthenticateUserCollection().then((data) => {
          this.userCollectionData = data;
        });
      }
    });
    this.userService.getAuthenticateUserCollection().then((detalleUser) => {
      this.detalleUser = detalleUser;
    });

    this.userService.getAllUsersInfo().then((collecionAllUsers) => {
      this.collecionAllUsers = collecionAllUsers;
    });
  }

openEditModal(calculo: any) {
  this.editCalcId = calculo.id; 
  this.editCalcMonthly = calculo.monthly;
  this.editCalcCantidad = calculo.cantidad;
  this.editCalcAlias = calculo.alias;
  this.editCalcInteres = calculo.interes;
 this.editCalcCuotas = calculo.cuotas;
this.editCalcTotalInteres = calculo.totalInteres;

  }



editCalculation() {
  // Crear un objeto con los datos actualizados
  const updatedCalculation = {
    alias: this.editCalcAlias,
    cantidad:this.editCalcCantidad ,
    monthly: this.editCalcMonthly,
    interes: this.editCalcInteres,
    totalInteres: this.editCalcTotalInteres,
    // Otros campos si los tienes
  };

  // Llama a la función de tu servicio que actualiza el préstamo en Firestore
  this.userRegister.updateCalculation(this.userData.id, this.editCalcId, updatedCalculation)
    .then(() => {
     
      alert('Préstamo actualizado con éxito');
      // Cierra el modal (puedes utilizar código para cerrarlo si usas Bootstrap)
      // Actualiza la lista de cálculos después de eliminar uno
      this.refreshUserCollectionData();
    })
    .catch((error) => {
      // Error: Maneja el error apropiadamente, muestra un mensaje de error, etc.
      console.error('Error al actualizar el préstamo:', error);
      // Muestra un mensaje de error al usuario si es necesario
      alert('Error al actualizar el préstamo. Por favor, inténtalo de nuevo.');
    });
}

refreshUserCollectionData() {
  // Vuelve a cargar la colección de cálculos para el usuario actual
  this.userRegister.getAuthenticateUserCollection().then((data) => {
    this.userCollectionData = data;
  });
}

// ...

// Agrega este método para eliminar un cálculo por su ID
deleteCalculationById(userId: string, calculationId: string) {
  this.userRegister.deleteCalculationById(userId, calculationId)
    .then(() => {
      alert('Préstamo eliminado con éxito');
      // Actualiza la lista de cálculos después de eliminar uno
      this.refreshUserCollectionData();
    })
    .catch((error) => {
      console.error('Error al eliminar el préstamo:', error);
      alert('Error al eliminar el préstamo. Por favor, inténtalo de nuevo.');
    });
}

ordenarInfo(collecionAllUsers: any) {
  let temp = [];
  for (let i = 0; i < collecionAllUsers.length; i++) {
    for (let j = 0; j < collecionAllUsers[i].arrayCalcDocs.length; j++) {
      let newObject = {
        "name": collecionAllUsers[i].userData.firstName + ' ' + collecionAllUsers[i].userData.lastName,
        "cantidad": collecionAllUsers[i].arrayCalcDocs[j].cantidad,
        "interes": collecionAllUsers[i].arrayCalcDocs[j].interes,
        "cuotas": collecionAllUsers[i].arrayCalcDocs[j].cuotas,
        "alias": collecionAllUsers[i].arrayCalcDocs[j].alias,
        "monthly": collecionAllUsers[i].arrayCalcDocs[j].monthly
      }
      temp.push(newObject);
    }

  }
  return temp;
}


async generarPDF(selectedLoanIndex: number) {
  if (selectedLoanIndex < 0 || selectedLoanIndex >= this.userCollectionData.length) {
    console.error('Índice de préstamo seleccionado fuera de rango.');
    return;
  }
  

  const selectedLoan = this.userCollectionData[selectedLoanIndex];
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const xPosition = 200;
  const yPosition = 650;
  const xPositio = 70;
  const yPositio = 640;
  const columnWidth = 90;
  const rowHeight = 20;
  const fontSize = 12;
  const fontSize1 = 10;
  const fontSized = 10;
  const imageBytes1 = await fetch('../../../assets/img/Login-Side.png').then((response) =>
    response.arrayBuffer()
  );
  const image1 = await pdfDoc.embedPng(imageBytes1);
  const imageWidth1 = 120;
  const imageHeight1 = 75;
  page.drawImage(image1, {
    x: 0,
    y: page.getHeight() - imageHeight1,
    width: imageWidth1,
    height: imageHeight1,
  });

 page.drawImage(image1, {
   x: 0,
   y: page.getHeight() - imageHeight1,
   width: imageWidth1,
   height: imageHeight1,
 });

 // Cargar y embeber la segunda imagen en el documento PDF
 const imageBytes2 = await fetch('../../../assets/img/titulo.png').then((response) =>
   response.arrayBuffer()
 );
 const image2 = await pdfDoc.embedPng(imageBytes2);

 // Dibujar la segunda imagen centrada en la parte superior de la página
 const imageWidth2 = 263;
 const imageHeight2 = 50;
 const centerX2 = page.getWidth() / 2 - imageWidth2 / 1.8;
 const centerY2 = page.getHeight() - imageHeight1 - 1;
 page.drawImage(image2, {
   x: centerX2,
   y: centerY2,
   width: imageWidth2,
   height: imageHeight2,
 });

// Define el texto que deseas agregar
const text = "Guatemala, Guatemala";
const text1 = "4184-7989";
const text2 = "GestordePrestamos@gmail.com";

// Definir el margen superior y derecho para centrar el texto
const marginRight = 130;
const marginTop = page.getHeight() - 30;

// Agregar el texto a la página justificado a la derecha
page.drawText(text, {
x: page.getWidth() - marginRight,
y: marginTop,
size: fontSize,
maxWidth: page.getWidth() - 2 * marginRight, // Ancho máximo para justificar
font: await pdfDoc.embedFont('Times-Roman'),
});

// Cargar la imagen del icono
const iconImageBytes = await fetch('../../../assets/img/Icon-location.png').then((response) =>
response.arrayBuffer()
);

// Superponer el icono junto al texto
const iconImage = await pdfDoc.embedPng(iconImageBytes);
const iconWidth = 20;
const iconHeight = 20;
page.drawImage(iconImage, {
x: page.getWidth() - marginRight - iconWidth - 5,
y: marginTop - (fontSize / 2),
width: iconWidth,
height: iconHeight,
});

// Definir el margen superior y derecho para centrar el texto
const marginRight1 = 72;
const marginTop1 = page.getHeight() - 48;

// Agregar el texto a la página justificado a la derecha
page.drawText(text1, {
x: page.getWidth() - marginRight1,
y: marginTop1,
size: fontSize,
maxWidth: page.getWidth() - 2 * marginRight1,
font: await pdfDoc.embedFont('Times-Roman'),
});

// Cargar la imagen del icono
const iconImageBytes2 = await fetch('../../../assets/img/telephone.png').then((response) =>
response.arrayBuffer()
);

// Superponer el segundo icono junto al segundo texto
const iconImage2 = await pdfDoc.embedPng(iconImageBytes2);
const iconWidth2 = 15;
const iconHeight2 = 15;
page.drawImage(iconImage2, {
x: page.getWidth() - marginRight1 - iconWidth2 - 5,
y: marginTop1 - (fontSize / 2),
width: iconWidth2,
height: iconHeight2,
});

// Definir el margen superior y derecho para centrar el texto
const marginRight3 = 150;
const marginTop3 = page.getHeight() - 64;

// Agregar el texto a la página justificado a la derecha
page.drawText(text2, {
x: page.getWidth() - marginRight3,
y: marginTop3,
size: fontSize1,
maxWidth: page.getWidth() - 2 * marginRight3,
font: await pdfDoc.embedFont('Times-Roman'),
});

// Cargar la imagen del icono
const iconImageBytes3 = await fetch('../../../assets/img/correo.png').then((response) =>
response.arrayBuffer()
);

// Superponer el icono junto al texto
const iconImage3 = await pdfDoc.embedPng(iconImageBytes3);
const iconWidth3 = 15;
const iconHeight3 = 12;
page.drawImage(iconImage3, {
x: page.getWidth() - marginRight3 - iconWidth3 - 5,
y: marginTop3 - (fontSize / 2),
width: iconWidth3,
height: iconHeight3,
});

 // Dibuja una línea de separación después de las imágenes
 const lineY = centerY2 - 10;
 const lineWidth = page.getWidth() - 20;
 const lineThickness = 1.5;
 page.drawLine({
   start: { x: 10, y: lineY },
   end: { x: lineWidth, y: lineY },
   thickness: lineThickness,
 });
  // Agregar título y detalles del préstamo
  page.drawText('DETALLES DE CALCULOS', { x: 200, y: 650, size: 16 });
  page.drawText(`Alias del préstamo: ${selectedLoan.alias}`, { x: 70, y: 640, size: 12 });

// Calcular valores
const cuotas = selectedLoan.cuotas;
const cantidad = selectedLoan.cantidad;
const interes = selectedLoan.interes;
const annualInterestRate = interes / 100;
const monthlyInterestRate = annualInterestRate / 12;
const totalInteres = selectedLoan.totalInteres;


// Calcular la mensualidad
const monthlyPayment = (cantidad / cuotas) + ((cantidad * monthlyInterestRate) / cuotas);

// ...

// Inicializar valores para la tabla
let x = 70;
let y = 580; // Ajusta la posición vertical según tus necesidades

// Agregar encabezados de tabla
page.drawText('Mes', { x, y, size: 13 });
page.drawText('Mensualidad', { x: x + 100, y, size: 13 });
page.drawText('Total por Año', { x: x + 200, y, size: 13 });
page.drawText('Total de Intereses', { x: x + 300, y, size: 13 });
page.drawText('Saldo Restante', { x: x + 425, y, size: 13 });

y -= 20; // Ajusta la posición vertical para los datos de la tabla

let totalYearlyPayment = 0;
let saldoRestante = cantidad+(totalInteres); // Inicializar el saldo restante con la cantidad total

let currentPage = page;

for (let month = 1; month <= cuotas; month++) {
  // Calcular el pago mensual
  const currentMonthlyPayment = cantidad / cuotas + totalInteres / cuotas;
  
  // Verificar si el espacio en la página actual es suficiente para agregar más datos
  if (y <= 50) { // 50 es un valor aproximado, ajústalo según tus necesidades
    // La página actual está llena, crea una nueva página
    currentPage = pdfDoc.addPage([612, 792]); // Tamaño de página estándar

    // Reinicia la posición vertical para la nueva página
    y = 750; // Ajusta la posición vertical según tus necesidades

    // Agregar encabezados de tabla a la nueva página
    currentPage.drawText('Mes', { x, y, size: 13 });
    currentPage.drawText('Mensualidad', { x: x + 100, y, size: 13 });
    currentPage.drawText('Total por Año', { x: x + 200, y, size: 13 });
    currentPage.drawText('Total de Intereses', { x: x + 300, y, size: 13 });
    currentPage.drawText('Saldo Restante', { x: x + 425, y, size: 13 });

    y -= 20; // Ajusta la posición vertical para los datos de la tabla en la nueva página
  }

  // Restar el pago mensual del saldo restante
  saldoRestante -= currentMonthlyPayment;

  // Agregar datos de la tabla a la página actual
  currentPage.drawText(`Mes ${month}`, { x, y, size: 12 });
  currentPage.drawText(`${currentMonthlyPayment.toFixed(2)}`, { x: x + 100, y, size: 12 });
  currentPage.drawText(`${(totalInteres / cuotas).toFixed(2)}`, { x: x + 300, y, size: 12 });
  currentPage.drawText(`${saldoRestante.toFixed(2)}`, { x: x + 420, y, size: 12 });
  
  // Calcular el total por año y el total de intereses
  totalYearlyPayment += currentMonthlyPayment;

  if (month % 12 === 0) {
    // Agregar el total por año y el total de intereses al final de cada año
    currentPage.drawText(`${totalYearlyPayment.toFixed(2)}`, { x: x + 200, y, size: 12 });
    
    totalYearlyPayment = 0; // Reiniciar el total por año
  
    y -= 20; // Ajustar la posición vertical para la siguiente fila
  }

  y -= 20; // Ajusta la posición vertical para la siguiente fila
}




 // Dibujar el título en la página
 page.drawText('DETALLES DE CALCULOS', {
   x: xPosition,
   y: yPosition,
   size: 16,
   font: await pdfDoc.embedFont('Helvetica-Bold'),
 });

  // Definir los encabezados de la tabla
  const headers = ['Detalle', 'Cantidad', 'No.Cuotas', '% Interés', 'Mensualidad', 'Total Intereses'];

  const data = [
    [
      selectedLoan.alias,
      selectedLoan.cantidad,
      selectedLoan.cuotas,
      selectedLoan.interes,
      selectedLoan.monthly,
      selectedLoan.totalInteres,
    ]
  ];

 let currentY = yPositio - 30;

 // Dibuja los encabezados de la tabla
 for (let i = 0; i < headers.length; i++) {
   page.drawText(headers[i], {
     x: xPositio + i * columnWidth,
     y: currentY,
     size: fontSize,
     font: await pdfDoc.embedFont('Helvetica-Bold'),
   });
 }

 // Aumenta la posición Y para empezar a dibujar los datos
 currentY -= rowHeight;

 // Dibuja los datos de la tabla
 for (const row of data) {
   for (let i = 0; i < row.length; i++) {
     page.drawText(row[i], {
       x: xPositio + i * columnWidth,
       y: currentY,
       size: fontSized,
     });
   }
   currentY -= rowHeight; // Desplaza la posición Y para la siguiente fila
 }

 // Dibujar una línea de división antes del pie de página
 const divisionLineY = 50;
 const divisionLineWidth = page.getWidth() - 210;
 const divisionLineThickness = 1.5;
 page.drawLine({
   start: { x: 10, y: divisionLineY },
   end: { x: 190 + divisionLineWidth, y: divisionLineY },
   thickness: divisionLineThickness,
 });

 // Agregar un pie de página en la misma página
 const footerText = 'Para más información o cualquier problema o inquietud, envíenos un correo electronico';
 const footerText1 = 'GestordePrestamos@gmail.com';

 // Dibujar el texto del pie de página
 page.drawText(footerText, {
   x: 98,
   y: 30,
   size: 12,
   font: await pdfDoc.embedFont('Times-Roman'),
 });

 // Dibujar el texto del pie de página
 page.drawText(footerText1, {
   x: 210,
   y: 20,
   size: 12,
   font: await pdfDoc.embedFont('Times-Bold'),
 });



 // Guardar el documento PDF generado
 const pdfBytes = await pdfDoc.save();
 const blob = new Blob([pdfBytes], { type: 'application/pdf' });
 const url = URL.createObjectURL(blob);
 window.open(url);
}



}