

p1 ="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quailty:90 
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src='" + data_uri +"'>";
    })
}

console.log("ml5.version :" + ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Eflkqpe4q/model.json" , modelLoaded);

function  modelLoaded(){
    console.log("model_loaded")
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1= "The prediction is " + p1;
    utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, results){
    if(error){
        console.error("error");
    }

    else{
        console.log(results);

        p1= results[0].label;

        speak();

        if(p1=="Good"){
            document.getElementById("gesture_name1").innerHTML="&#128077;";
            document.getElementById("gesture_info1").innerHTML="Good";
        }

        else if(p1=="Bad"){
            document.getElementById("gesture_name1").innerHTML="&#128078;";
            document.getElementById("gesture_info1").innerHTML="Bad";

        }
        
        else if(p1=="Peace"){
            document.getElementById("gesture_name1").innerHTML="&#9996;";
            document.getElementById("gesture_info1").innerHTML="Peace";

        }
        else {
            document.getElementById("gesture_name1").innerHTML="&#128076;";
            document.getElementById("gesture_info1").innerHTML="Nice";

        }
    }
}

