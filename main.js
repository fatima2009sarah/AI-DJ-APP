song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(550 , 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
    
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log(score_rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "and LeftWristY = " + leftWristY);

        rigttWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "and rightWristY = " + rightWristY);
    }
}

function modelLoaded(){
    console.log("Posenet is initialize");
}

function draw(){
    image(video , 0 ,0 , 550 ,400);

    fill("red");
    stroke("red");

    if(score_rightWrist > 0.2){
        circle(rigttWristX , rightWristY , 25);

         if (rightWristY > 0 && rightWristY <= 80 ) {
            song.rate(0.5);

            document.getElementById("speed").innerHTML = "speed = 0.5";
         }

         
         if (rightWristY > 80 && rightWristY <= 160 ) {
            song.rate(1);

            document.getElementById("speed").innerHTML = "speed = 1";
         }

         
         if (rightWristY > 160 && rightWristY <= 240 ) {
            song.rate(1.5);

            document.getElementById("speed").innerHTML = "speed = 1.5";
         }

         
         if (rightWristY > 240 && rightWristY <= 320 ) {
            song.rate(2);

            document.getElementById("speed").innerHTML = "speed = 2";
         }

         
         if (rightWristY > 320 && rightWristY <= 400 ) {
            song.rate(2.5);

            document.getElementById("speed").innerHTML = "speed = 2.5";
         }

    }



    if(score_leftWrist > 0.2){

        circle(leftWristX , leftWristY , 25);
    inNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberLeftWristY);
    console.log(inNumberLeftWristY);
    console.log(remove_decimals);

    volume = remove_decimals/500;
    console.log(volume);

    volume1 = volume.toFixed(1);
    console.log(volume1);

    document.getElementById("volume").innerHTML = "volume = " + volume1;
    song.setVolume(volume1);
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function stop(){
    song.stop();
}