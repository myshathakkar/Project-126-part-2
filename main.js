leftWristx=0
rightWristx=0
leftWristy=0
rightWristy=0
leftScore=0
rightScore=0
ochintuStatus=""
samaStatus=""

ochintu = ""
aisa_sama_na_hota = ""
function preload() {
    ochintu = loadSound("ochintu.mp3")
    aisa_sama_na_hota = loadSound("sama.mp3") 
     }
function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,model_loaded)
    poseNet.on("pose", got_poses)
}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("#ff4500")
    stroke("#00baff")
    ochintuStatus=ochintu.isPlaying()
    samaStatus=aisa_sama_na_hota.isPlaying()
    if(leftScore>0.01){
        circle(leftWristx,leftWristy,20)
aisa_sama_na_hota.stop()
if(ochintuStatus==false){
    ochintu.play()
    document.getElementById("song").innerHTML="Song name- Ane vala pal"
}
    }
    if(rightScore>0.01){
        circle(rightWristx,rightWristy,20)
ochintu.stop()
if(samaStatus==false){
    aisa_sama_na_hota.play()
    document.getElementById("song").innerHTML="Song name- Aisa sama na hota"
}
    }
}
function model_loaded(){
    console.log("loaded")
}

function got_poses(results){
if(results.length>0){
    console.log(results)
    leftWristx=results[0].pose.leftWrist.x
    leftWristy=results[0].pose.leftWrist.y
    rightWristx=results[0].pose.rightWrist.x
    rightWristy=results[0].pose.rightWrist.y
    console.log(" left wrist X= "+leftWristx+" left wrist Y = "+leftWristy)
    console.log(" right wrist X= "+rightWristx+" right wrist Y = "+leftWristy)
leftScore=results[0].pose.keypoints[9].score
rightScore=results[0].pose.keypoints[10].score

}
}

