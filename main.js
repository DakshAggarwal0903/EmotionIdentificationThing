
prediction1="";
prediction2="";
camera=document.getElementById("camera");
Webcam.attach('#camera');
Webcam.set({
width:350,
height:350,
image_format:'jpg',
jpg_quality:100
});
function takeimg(){
    Webcam.snap(
    function(snapshot){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+snapshot+'"/>';
    }
    );
}
console.log("ML5 loaded",ml5.version);
x=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1ojKiNHKO/model.json',modelloaded);
function modelloaded(){
    console.log("Model is loaded");
}
function takeres(){
    capImg=document.getElementById("captured_image");
    x.classify(capImg,getRes);
}
function getRes(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("emo").innerHTML=result[0].label;
        document.getElementById("result_emotion_name").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(result[0].label=="Crying"){
            document.getElementById("emoj").innerHTML= "&#128546";
        }
        if(result[0].label=="Angry"){
            document.getElementById("emoj").innerHTML= "&#128545";
        }
        if(result[0].label=="Happy"){
            document.getElementById("emoj").innerHTML="&#128512";
        }
        if(result[0].label=="Sad"){
            document.getElementById("emoj").innerHTML= "&#128532"
        }
        if(result[1].label=="Crying"){
            document.getElementById("result_emotion_name2").innerHTML= "&#128546";
        }
        if(result[1].label=="Angry"){
            document.getElementById("result_emotion_name2").innerHTML= "&#128545";
        }
        if(result[1].label=="Happy"){
            document.getElementById("result_emotion_name2").innerHTML="&#128512";
        }
        if(result[1].label=="Sad"){
            document.getElementById("result_emotion_name2").innerHTML= "&#128532"
        }
}
}
function speak(){
     synth = window.speechSynthesis;
    a="The first prediction is"+prediction1;
    b="The second prediction is"+prediction2;
     utterThis = new SpeechSynthesisUtterance(a+b);
    synth.speak(utterThis);
}