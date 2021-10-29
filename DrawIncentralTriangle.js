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

        function incentralTriangle(){
            //angle bisector A
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var xOfBisectingPointA,yOfBisectingPointA;
            xOfBisectingPointA = ((b * pointDestinationA.x) + (c * pointStartC.x)) / (c + b);
            yOfBisectingPointA = ((b * pointDestinationA.y) + (c * pointStartC.y)) / (c + b);

            //angle bisector B
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            var xOfBisectingPointB,yOfBisectingPointB;
            xOfBisectingPointB = ((a * pointStartA.x) + (c * pointStartC.x)) / (c + a);
            yOfBisectingPointB = ((a * pointStartA.y) + (c * pointStartC.y)) / (c + a);

            //angle bisector C
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            var xOfBisectingPoint,yOfBisectingPoint;
            xOfBisectingPoint = ((b * pointDestinationA.x) + (a * pointStartA.x)) / (b + a);
            yOfBisectingPoint = ((b * pointDestinationA.y) + (a * pointStartA.y)) / (b + a);
            
            //declaring the points of the incentral triangle

            var i1,i2,i3;

            i1 = {
                x: xOfBisectingPointA,
                y: yOfBisectingPointA,
                radius: 10
            },

            i2 = {
                x: xOfBisectingPointB,
                y: yOfBisectingPointB,
                radius: 10
            },

            i3 = {
                x: xOfBisectingPoint,
                y: yOfBisectingPoint,
                radius: 10
            },

            a = i1;
            b = i2;
            c = i3;
            //we using here tha algorithm for circumscribed circle to draw the circumscribed circle of the incentral triangle
            var A = b.x - a.x,
                B = b.y - a.y,
                C = c.x - a.x,
                D = c.y - a.y,
                E = A * (a.x + b.x) + B * (a.y + b.y),
                F = C * (a.x + c.x) + D * (a.y + c.y),
                G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
                minx, miny, dx, dy;
          
            if(Math.abs(G) < 0.000001) {
              minx = Math.min(a.x, b.x, c.x);
              miny = Math.min(a.y, b.y, c.y);
              dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
              dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
          
              this.x = minx + dx;
              this.y = miny + dy;
              this.r = dx * dx + dy * dy;
            }
          
            else {
              this.x = (D*E - B*F) / G;
              this.y = (A*F - C*E) / G;
              dx = this.x - a.x;
              dy = this.y - a.y;
              this.r = Math.sqrt(dx * dx + dy * dy);
            }
            
            context.beginPath();
            context.moveTo(xOfBisectingPointA , yOfBisectingPointA);
            context.lineTo(xOfBisectingPointB , yOfBisectingPointB);
            context.lineTo(xOfBisectingPoint , yOfBisectingPoint);
            context.lineTo(xOfBisectingPointA , yOfBisectingPointA);
            context.stroke();

            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.stroke();

            //drawing circles that are playing the role of showing where the points of the sides are at
            //
            //For IA
            context.fillStyle = "#20B2AA";
            context.beginPath();
            context.arc(xOfBisectingPointA , yOfBisectingPointA , 5 , Math.PI * 2 , false);
            context.fill();
            //For IB
            context.beginPath();
            context.arc(xOfBisectingPointB , yOfBisectingPointB , 5 , Math.PI * 2 , false);
            context.fill();
            //For IC
            context.beginPath();
            context.arc(xOfBisectingPoint , yOfBisectingPoint , 5 , Math.PI * 2 , false);
            context.fill();

            //drawing the incentral triangle notations
            context.beginPath();
            context.fillStyle = "#20B2AA";
            context.fillText("IA" , i1.x + 8, i1.y + 3);
            context.fillText("IB" , i2.x - 15, i2.y + 3);
            context.fillText("IC" , i3.x - 5 , i3.y + 13);
            context.fillText("I" , this.x + 8, this.y + 3);
            context.fill();
            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();
        }

        incentralTriangle();

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