song1 = "";
song2 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
song.status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("pink");
    stroke("purple");

    song.status = song1.isPlaying();
    console.log(song.status) ;

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song.status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name : Peter Pan Song";
        }
    }
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Model Is Initialized");
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;  
        console.log("scoreLeftWrist = " + scoreLeftWrist);  

        leftWristx = results[0].pose.leftWrist.x;
        leftWristx = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristx + "leftWristy = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + rightWristx + "rightWristy = " + rightWristy);
    }
}