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

        function excirclesOfTriangle(){
            //--------------------------------------------------declaring the needed variables
            //side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;

            //side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;

            //side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;

            //--------------declaring the needed variables for every excircle's X and Y 
            var x1,y1,x2,y2,x3,y3,i1x,i1y,i2x,i2y,i3x,i3y,innerRadius;
            x1 = pointStartA.x;
            y1 = pointStartA.y;
            x2 = pointDestinationA.x;
            y2 = pointDestinationA.y;
            x3 = pointStartC.x;
            y3 = pointStartC.y;

            i1x = (resultOfSideB*x2 + resultOfSideC*x3 + (-1*resultOfSideA*x1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            i1y = (resultOfSideB*y2 + resultOfSideC*y3 + (-1*resultOfSideA*y1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            i2x = (resultOfSideA*x1 + resultOfSideC*x3 + (-1*resultOfSideB*x2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            i2y = (resultOfSideA*y1 + resultOfSideC*y3 + (-1*resultOfSideB*y2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            i3x = (resultOfSideA*x1 + resultOfSideB*x2 + (-1*resultOfSideC*x3))/(resultOfSideA + resultOfSideB - resultOfSideC);
            i3y = (resultOfSideA*y1 + resultOfSideB*y2 + (-1*resultOfSideC*y3))/(resultOfSideA + resultOfSideB - resultOfSideC);

            var r1,r2,r3;
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
            //declaring the calculated already area and sum of the sides
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;

            var sumOfSides;
            sumOfSides = resultOfSideA + resultOfSideB + resultOfSideC;
            sumOfSides = Math.round((sumOfSides + Number.EPSILON) * 100) / 100;
            sumOfSides = sumOfSides / 2;
            innerRadius = Area/sumOfSides;

            r1 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideA);
            r2 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideB);
            r3 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideC);
            r1 = r1*100/3;
            r2 = r2*100/3;
            r3 = r3*100/3;
            r1 = Math.abs(r1);
            r2 = Math.abs(r2);
            r3 = Math.abs(r3);

            //drawing the excircles on the canvas

            context.beginPath();
            context.arc(i1x , i1y , r1 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.arc(i2x , i2y , r2 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.arc(i3x , i3y , r3 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.stroke();

            context.fillStyle= "#cc9900";
            context.beginPath();
            context.fillText("JA" , i1x , i1y + 20);
            context.fillText("J B" , i2x - 10 , i2y - 10);
            context.fillText("JC" , i3x , i3y + 15);
            context.fill();

            //-------------------------------here we will create the tangent lines to the excircles

            var C,P,Ja_to_A,directionAngle,T1x,T1y,T2x,T2y,C1,C2,P1,P2;
            //creating the points
            C = {
                x: i1x,
                y: i1y
            }
            P = {
                x: pointStartA.x,
                y: pointStartA.y
            }
            C1 = {
                x: i2x,
                y: i2y
            }
            P1 = {
                x: pointDestinationA.x,
                y: pointDestinationA.y
            }
            C2 = {
                x: i3x,
                y: i3y
            }
            P2 = {
                x: pointStartC.x,
                y: pointStartC.y
            }

            //tangents of Ja(r1)

            Ja_to_A = Math.sqrt(Math.pow((P.x - C.x),2) + Math.pow((P.y - C.y),2));
            cosanostra = Math.acos(r1 / Ja_to_A);
            directionAngle = Math.atan2(P.y - C.y , P.x - C.x);
            dirTo1 = directionAngle + cosanostra;
            dirTo2 = directionAngle - cosanostra;

            T1x = C.x + r1 * Math.cos(dirTo1);
            T1y = C.y + r1 * Math.sin(dirTo1);
            T2x = C.x + r1 * Math.cos(dirTo2);
            T2y = C.y + r1 * Math.sin(dirTo2);

            //tangents of Jb(r2)

            Ja_to_B = Math.sqrt(Math.pow((P1.x - C1.x),2) + Math.pow((P1.y - C1.y),2));
            cosanostrab = Math.acos(r2 / Ja_to_B);
            directionAngleb = Math.atan2(P1.y - C1.y , P1.x - C1.x);
            dirTo1b = directionAngleb + cosanostrab;
            dirTo2b = directionAngleb - cosanostrab;

            T1xb = C1.x + r2 * Math.cos(dirTo1b);
            T1yb = C1.y + r2 * Math.sin(dirTo1b);
            T2xb = C1.x + r2 * Math.cos(dirTo2b);
            T2yb = C1.y + r2 * Math.sin(dirTo2b);

            //tangents of Jc(r3)

            Ja_to_C = Math.sqrt(Math.pow((P2.x - C2.x),2) + Math.pow((P2.y - C2.y),2));
            cosanostrac = Math.acos(r3 / Ja_to_C);
            directionAnglec = Math.atan2(P2.y - C2.y , P2.x - C2.x);
            dirTo1c = directionAnglec + cosanostrac;
            dirTo2c = directionAnglec - cosanostrac;

            T1xc = C2.x + r3 * Math.cos(dirTo1c);
            T1yc = C2.y + r3 * Math.sin(dirTo1c);
            T2xc = C2.x + r3 * Math.cos(dirTo2c);
            T2yc = C2.y + r3 * Math.sin(dirTo2c);

            //------------the triangle formed by the excircle's centers 

            context.beginPath();
            context.moveTo(i1x , i1y);
            context.lineTo(i2x , i2y);
            context.lineTo(i3x , i3y);
            context.lineTo(i1x , i1y);
            context.stroke();

            //drawing the tangents to the excircles on the canvas

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(T1x , T1y);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(T2x , T2y);
            context.stroke();

            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(T1xb , T1yb);
            context.stroke();

            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(T2xb , T2yb);
            context.stroke();
            
            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(T1xc , T1yc);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(T2xc , T2yc);
            context.stroke();

            //drawing the points of the tangents of the excircles
            //A-Excircle
            context.beginPath();
            context.arc(T1x , T1y , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2x , T2y , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            //B-Excircle
            context.arc(T1xb , T1yb , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2xb , T2yb , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            //C-Excircle
            context.arc(T1xc , T1yc , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2xc , T2yc, 3 , 0 , Math.PI * 2 , false);
            context.stroke();

        } 
        
        excirclesOfTriangle();

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