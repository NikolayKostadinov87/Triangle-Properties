//    <img src="giphy.gif" alt="e tva e" style="position: relative; display: block;" width="1250" height="600">
/*
This is a software representing the fundamental part of the properties of triangle.Given all this information we can easily find the position(s) of 2d line segments or circles for example. Respectively it's going to be similar like in 3d.

img{
    height: 550px;
    width: 500px;
    margin: 0 auto;
    position: absolute;
    top: 25%;
    left: 25%;
    margin-top: -25px;
    margin-left: -25px;
    font-size: 1.5rem;
    background-color: rgba(0,0,0,.6);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    padding-top: 7px;
    viewport-fit: 1280px;
}
*/
/*
<!DOCTYPE html>
<html>
    <head>
        <style>
        </style>
    </head>
    
    <body>
        
    <a href="TriangleAngles.html">Manage all the functions on your own</a>
    <br>
    <a href="Medians.html">All the Medians</a>
    <br>
    <a href="Altitudes.html">All the Altitudes</a>
    <br>
    <a href="AngleBisectors.html">All the Angle Bisectors</a>
    <br>
    <a href="ExcirclesOfTriangle.html">Excircles of triangle</a>
    <br>
    <a href="ExtouchTriangle.html">Extouch triangle</a>
    <br>
    <a href="EulerTriangle.html">Euler's Triangle</a>
    <br>
    <a href="InnerCircle.html">Inner Circle</a>
    <br>
    <a href="CircumCircle.html">Circum Circle</a>
    <br>
    <a href="IncentralTriangle.html">Incentral Triangle</a>
    <br>
    <a href="Allfunctions.html">Show all avaible functions of algorithms at once</a>
    <br>
    <video width="1200" controls>
        <source src="mainpage_Trim.mp4" type="video/mp4">
        Your browser does not support the video tag.  
    </video>
    </body>
</html>


<!-- Sidebar on small screens when clicking the menu icon -->
<nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style="display:none" id="mySidebar">
  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  <a href="#about" onclick="w3_close()" class="w3-bar-item w3-button">ABOUT</a>
  <a href="#team" onclick="w3_close()" class="w3-bar-item w3-button">TEAM</a>
  <a href="#work" onclick="w3_close()" class="w3-bar-item w3-button">WORK</a>
  <a href="#pricing" onclick="w3_close()" class="w3-bar-item w3-button">PRICING</a>
  <a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button">CONTACT</a>
</nav>


*/

//<div class="w3-container w3-center w3-dark-grey" style="padding:128px 16px" id="pricing">

window.onload = function(){
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    height1 = 100 * (Math.sqrt(3)/2),
    pointStartA = {
        x: canvas.width / 2 - 50,
        y: canvas.height / 2 + height1,
        radius: 10
    },
    pointDestinationA = {
        x: canvas.width / 2 + 50 ,
        y: canvas.height / 2 + height1,
        radius: 10
    },
    pointStartC = {
        x: canvas.width / 2 ,
        y: canvas.height / 2 ,
        radius: 10
    },
    handles = [pointStartA, pointDestinationA, pointStartC],
    offset = {},
    isDragging = false,
    dragHandle;

    drawAndUpointDestinationAteFunction();

    function drawAndUpointDestinationAteFunction(){
        context.lineWidth=1;
        context.clearRect(0, 0, width, height);
        function TriangleDrawer(){
        context.beginPath();
        context.moveTo(pointStartA.x, pointStartA.y);
		context.lineTo(pointDestinationA.x , pointDestinationA.y);
		context.lineTo(pointStartC.x , pointStartC.y);
        context.lineTo(pointStartA.x , pointStartA.y);
        context.stroke();
        }
        TriangleDrawer();
        context.fillStyle = "#008CBA";
        for(var i = 0; i < 3; i += 1) {
            var handle = handles[i];
            if(handles[i].x >=  width - handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].x <= handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].y <= handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].y >= height - handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(isDragging && handle === dragHandle) {
                context.shadowColor = "red";
                context.shadowOffsetX = 4;
                context.shadowOffsetY = 4;
                context.shadowBlur = 10;
            }
            function drawCircles(){
            context.beginPath();    
            context.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
            context.fill();
            if(i === 0){
                context.beginPath();
                context.fillText("A" , handle.x - 30 , handle.y);
                context.fill();
            }
            else if(i === 1){
                context.beginPath();
                context.fillText("B" , handle.x + 30 , handle.y);
                context.fill();
            }
            else if(i === 2){
                context.beginPath();
                context.fillText("C" , handle.x , handle.y - 30);
                context.fill();
            }
            context.shadowColor = null;
            context.shadowOffsetX = null;
            context.shadowOffsetY = null;
            context.shadowBlur = null;
            }
            drawCircles();
        }

        

    }

        //function to find the distance between two points on the canvas
        function distanceXY(x0, y0, x1, y1) {
            var dx = x1 - x0,
                dy = y1 - y0;
            return Math.sqrt(dx * dx + dy * dy);
        }
    
        //function checking if a point is intersecting (colliding) with a circle
        function circlePointCollision(x, y, circle) {
            return distanceXY(x, y, circle.x, circle.y) < circle.radius;
        }
    
        //here we using mouse events for the circles and checking if they are clicked or not (part 1)
        document.body.addEventListener("mousedown", function(event) {
            for(var i = 0; i < 3; i += 1) {
                var handle = handles[i];
                if(circlePointCollision(event.clientX, event.clientY, handle)) {
                    isDragging = true;
                    document.body.addEventListener("mousemove", onMouseMove);
                    document.body.addEventListener("mouseup", onMouseUp);
                    dragHandle = handle;
                    offset.x = event.clientX - handle.x;
                    offset.y = event.clientY - handle.y;
                    drawAndUpointDestinationAteFunction();
                }
            }
        });
    
        //here we using mouse events for the circles and checking if they are clicked or not (part 2)
        function onMouseMove(event) {
            dragHandle.x = event.clientX - offset.x;
            dragHandle.y = event.clientY - offset.y;
            drawAndUpointDestinationAteFunction();
        }
        
        //here we using mouse events for the circles and checking if they are clicked or not (part 3)
        function onMouseUp(event) {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);	
            isDragging = false;
            drawAndUpointDestinationAteFunction();
        }

        function angleAInDegrees(){
            //declaring the point of the triangle
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //using cosine theorem to calculate the wanted angle
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
            return resultOfAngleA;
        }
    
        function angleBInDegrees(){
            //declaring the point of the triangle
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //using cosine theorem to calculate the wanted angle
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            return resultOfAngleB;
        }
    
        function angleCInDegrees(){
            //declaring the point of the triangle
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //using cosine theorem to calculate the wanted angle
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b)) * 180 / Math.PI;
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            return resultOfAngleC;
        }

}