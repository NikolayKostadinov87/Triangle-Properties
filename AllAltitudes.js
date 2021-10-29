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
        function altitudeAngleC(){
            angleAInDegrees();
            angleBInDegrees();
            angleCInDegrees();
            context.fillStyle = "#000000";
            //algorithm for finding the altitude from a point(angle(in this case C)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            a_to_b = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartA.x + a_to_b.x * t;
            pointResultY = pointStartA.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointStartC.x,pointStartC.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleA > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartA.x , pointStartA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Ha" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleB > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointDestinationA.x , pointDestinationA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hb" , pointResultX + 20 , pointResultY);
                context.fill();
            }
            if(resultOfAngleA < 90 && resultOfAngleB < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HC" , pointResultX + 5 , pointResultY - 5);
                context.fill();
            }
        }

        function altitudeAngleB(){
            angleAInDegrees();
            angleBInDegrees();
            angleCInDegrees();
            context.fillStyle = "#000000";
            //algorithm for finding the altitude from a point(angle(in this case B)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            a_to_b = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartA.x + a_to_b.x * t;
            pointResultY = pointStartA.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointDestinationA.x,pointDestinationA.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleA > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartA.x , pointStartA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Ha" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleC > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartC.x , pointStartC.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hc" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleA < 90 && resultOfAngleC < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HB" , pointResultX + 10 , pointResultY + 3);
                context.fill();
            }
        }

        function altitudeAngleA(){
            angleAInDegrees();
            angleBInDegrees();
            angleCInDegrees();
            context.fillStyle = "#000000";
            //algorithm for finding the altitude from a point(angle(in this case A)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointStartA.x - pointStartC.x,
                y: pointStartA.y - pointStartC.y
            }
            a_to_b = {
                x: pointDestinationA.x - pointStartC.x,
                y: pointDestinationA.y - pointStartC.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartC.x + a_to_b.x * t;
            pointResultY = pointStartC.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointStartA.x,pointStartA.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleB > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointDestinationA.x , pointDestinationA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hb" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleC > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartC.x , pointStartC.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hc" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleB < 90 && resultOfAngleC < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HA" , pointResultX + 10 , pointResultY + 3);
                context.fill();
            }
        }

        altitudeAngleA();
        altitudeAngleB();
        altitudeAngleC();

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