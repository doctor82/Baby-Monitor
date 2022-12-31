song = "";
status = "";
objects=[];
function preload() {
song=loadSound("alarm.mp3");

}
function setup() {
    
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
  
}
function modelLoaded() {
    console.log("Model Is Loaded");
status=true;


}
function gotResult(error,results){
if(error){
console.error(error);
}else{
console.log(results);
objects=results;

}
}
function draw() {
   
    image(video, 0, 0, 380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
    fill(r,g,b);
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
    stroke(r,g,b);
    noFill();
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    
    if(objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="Baby Found";
        console.log("stop");
        song.stop();
    }else{
        document.getElementById("number_of_objects").innerHTML="Baby not found";
        console.log("play");
        song.play();

    }
    }
    if(objects.length==0){
        document.getElementById("number_of_objects").innerHTML="Baby not found";
        console.log("play");
        song.play();
    }
}
}
