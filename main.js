
img="";
status="";
objects=[];
find="";
r="";
g="";
b="";
objectDetector="";
message=""

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
   
}



function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    find= document.getElementById("value").value;
}
function modelLoaded(){
    console.log("model loaded by anshika jain");
    status=true;
}

function gotResult(error,result){
    if(error){
        console.log(error); 
    }
    if(result){
        console.log(result);
        objects=result;
  }  }

function draw(){
    image(video,0,0,480,380);

    r= random(255);
  g=random(255);
  b=random(255);
 
  if(status!= ""){
    objectDetector.detect(video,gotResult);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Object Detected";
        fill(r,g,b);
        percent=floor(objects[i].confidence *100);
        text(objects[i].label + " " + percent + "%" ,objects[i].x + 15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        document.getElementById("number_of_objects").innerHTML=objects[i].label +" "+percent+"%" +" , ";

        if(objects[i].label== find){
          video.stop();
          objectDetector.detect(gotResult);
          document.getElementById("status").innerHTML= find + "Found";

          synth =   window.SpeechSynthesis;
          utterThis =new SpeechSynthesisUtterance(find + "found");
         synth.speak(utterThis);
                }
                else{
                    document.getElementById("status").innerHTML= find +"Not found!";
                    synth =   window.SpeechSynthesis;
          utterThis =new SpeechSynthesisUtterance(find + " Not found");
         synth.speak(utterThis);
                }
  }
  }}
