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

        function angleBisectorC(){
            //--------------------------------------------------declaring the needed variables
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));

            var xOfBisectingPoint,yOfBisectingPoint;
            //xOfBisectingPoint and yOfBisectingPoint are the coorinates where the angle bisector of angle C is intersecting with the opposite side
            xOfBisectingPoint = ((b * pointDestinationA.x) + (a * pointStartA.x)) / (b + a);
            yOfBisectingPoint = ((b * pointDestinationA.y) + (a * pointStartA.y)) / (b + a);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointStartC.x,pointStartC.y);
            context.lineTo(xOfBisectingPoint,yOfBisectingPoint);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPoint , yOfBisectingPoint , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LC" , xOfBisectingPoint - 8, yOfBisectingPoint + 20);
            context.fill();
        }

        function angleBisectorB(){
            //--------------------------------------------------declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));

            var xOfBisectingPointB,yOfBisectingPointB;
            //xOfBisectingPointB and yOfBisectingPointB are the coorinates where the angle bisector of angle B is intersecting with the opposite side
            xOfBisectingPointB = ((a * pointStartA.x) + (c * pointStartC.x)) / (c + a);
            yOfBisectingPointB = ((a * pointStartA.y) + (c * pointStartC.y)) / (c + a);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointDestinationA.x,pointDestinationA.y);
            context.lineTo(xOfBisectingPointB,yOfBisectingPointB);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPointB , yOfBisectingPointB , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LB" , xOfBisectingPointB - 20, yOfBisectingPointB - 5);
            context.fill();
        }

        function angleBisectorA(){
            //--------------------------------------------------declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));

            var xOfBisectingPointA,yOfBisectingPointA;
            //xOfBisectingPointA and yOfBisectingPointA are the coorinates where the angle bisector of angle A is intersecting with the opposite side
            xOfBisectingPointA = ((b * pointDestinationA.x) + (c * pointStartC.x)) / (c + b);
            yOfBisectingPointA = ((b * pointDestinationA.y) + (c * pointStartC.y)) / (c + b);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointStartA.x,pointStartA.y);
            context.lineTo(xOfBisectingPointA,yOfBisectingPointA);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPointA , yOfBisectingPointA , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LA" , xOfBisectingPointA + 8, yOfBisectingPointA - 5);
            context.fill();
        }

        angleBisectorA();
        angleBisectorB();
        angleBisectorC();
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