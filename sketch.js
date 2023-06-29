
let pinceladas = [];
let cantidad = 13;
let mic;
let amp;
let amp_min= 0.05;
let puntas;

let analyzer;
let images = [];
let threshold = 0.01;

let currentImage = null;
let imageList = [];
let imageSize=100;

function preload(){
  puntas = loadImage( "data/puntas.png" );
  for( let i=0 ; i<cantidad ; i++){
    let nombre = "data/trazo"+nf( i , 2 )+".png";
    pinceladas[i] = loadImage( nombre );
  }
  for (let j=0; j< 5; j++){
    //let nombreb = "data/ROJO"+nf(j,2)+".png";
    images[j]= loadImage('data/ROJO'+j+'.png');
  }
}
function setup() {
  createCanvas( windowWidth, windowHeight );
  background(255);
  mic= new p5.AudioIn();
  mic.start();

  analyzer = new p5.Amplitude();
  analyzer.setInput(mic);

  userStartAudio();
}
function draw() {
  let volume = analyzer.getLevel();
  amp=mic.getLevel();
  if (volume > threshold) {
    if (currentImage === null) {
      let x = random(width);
      let y = random(height);
      imagenSize= random(20,100);
      let imageIndex = floor(random(images.length));
      currentImage = images[imageIndex];
      currentImage.resize(imageSize, imageSize); // Ajustar tamaño de la imagen

  
      let imageObj = {
        image: currentImage,
        x: x,
        y: y
      };
  
      imageList.push(imageObj);
    }
  } else {
    currentImage = null;
  }
  
  for (let i = 0; i < imageList.length; i++) {
    let imageObj = imageList[i];
    push();
    translate(imageObj.x + imageSize / 2, imageObj.y + imageSize / 2); // Centrar la imagen en su posición
    
    image(imageObj.image, -imageSize / 2, -imageSize / 2); // Dibujar la imagen centrada
    pop();
  }
  
  

  if (amp>amp_min){
    for( let i=0 ; i<100 ; i++){

    let x = random( width );
    let y = random( height );

    let xPuntas = int( map( x , 0 , width , 0 , puntas.width ) );
    let yPuntas = int( map( y , 0 , height , 0 , puntas.height ) );

    let colorDeEstePixel = puntas.get( xPuntas , yPuntas );

    if( red( colorDeEstePixel ) < 100  ){
      let cual = int( random(cantidad));
      let tamanio = random( 0.03, 0.4 );
  
      let angulo = radians( map( x , 0 , width , -30 , 100 ) + random(-5,5) );
      let angulo2 = radians( map( y , 0 , height , 0 , 150 ) + random(-5,5) );
  
      tint( 200 ),tint( 250 ),tint( 150  );
  
      push();
      translate( x, y );
      rotate( angulo+angulo2 );
      scale( tamanio );
      image( pinceladas[cual] , 0 , 0 );  
      pop();
  
   }
}
}

}
