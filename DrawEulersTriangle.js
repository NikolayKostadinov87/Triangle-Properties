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

        function eulersTriangle(){
            //------------------------------------------------Intersecting of altitude A and B
            var a_to_pA , a_to_bA;
            //-----------------------here is the algorithm for altitude a:
            a_to_pA = {
                x: pointStartA.x - pointStartC.x,
                y: pointStartA.y - pointStartC.y
            }
            a_to_bA = {
                x: pointDestinationA.x - pointStartC.x,
                y: pointDestinationA.y - pointStartC.y
            }
            var atb2A = a_to_bA.x * a_to_bA.x + a_to_bA.y * a_to_bA.y;
            var atp_dot_atbA = a_to_pA.x * a_to_bA.x + a_to_pA.y * a_to_bA.y;
            var tA = atp_dot_atbA / atb2A;
            var pointResultXa,pointResultYa;
            pointResultXa = pointStartC.x + a_to_bA.x * tA;
            pointResultYa = pointStartC.y + a_to_bA.y * tA;
            //
            //-----------------------here is the algorithm for altitude b:
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
            var pointResultXb,pointResultYb;
            pointResultXb = pointStartA.x + a_to_b.x * t;
            pointResultYb = pointStartA.y + a_to_b.y * t;

            //
            //-----------------------here is the algorithm for altitude c:
            var a_to_pc , a_to_bc;
            a_to_pc = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            a_to_bc = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            var atb2c = a_to_bc.x * a_to_bc.x + a_to_bc.y * a_to_bc.y;
            var atp_dot_atbc = a_to_pc.x * a_to_bc.x + a_to_pc.y * a_to_bc.y;
            var tc = atp_dot_atbc / atb2c;
            var pointResultXc,pointResultYc;
            pointResultXc = pointStartA.x + a_to_bc.x * tc;
            pointResultYc = pointStartA.y + a_to_bc.y * tc;

            //coordinates(X,Y) of intersection of the altitudes

            var A1 = pointResultYa - pointStartA.y;
            var B1 = pointStartA.x - pointResultXa;
            var C1 = A1 * pointStartA.x + B1 * pointStartA.y;
            var A2 = pointResultYb - pointDestinationA.y;
            var B2 = pointDestinationA.x - pointResultXb;
            var C2 = A2 * pointDestinationA.x + B2 * pointDestinationA.y;
            var den = A1 * B2 - A2 * B1;
            var xOrtpoint , yOrtpoint;
            xOrtpoint = (B2 * C1 - B1 * C2) / den;
            yOrtpoint = (A1 * C2 - A2 * C1) / den;

            //-------------------------------------------------------Coordinates of Euler's triangle

            var ahx,ahx1,ahx2,ahy,ahy1,ahy2;
            ahx1 = pointStartA.x;
            ahx2 = xOrtpoint;
            ahy1 = pointStartA.y;
            ahy2 = yOrtpoint;
            ahx = (ahx1 + ahx2)/2;
            ahy = (ahy1 + ahy2)/2;

            var bhx,bhx1,bhx2,bhy,bhy1,bhy2;
            bhx1 = xOrtpoint;
            bhx2 = pointDestinationA.x;
            bhy1 = yOrtpoint;
            bhy2 = pointDestinationA.y;
            bhx = (bhx1 + bhx2)/2;
            bhy = (bhy1 + bhy2)/2;

            var chx,chx1,chx2,chy,chy1,chy2;
            chx1 = pointStartC.x;
            chx2 = xOrtpoint;
            chy1 = pointStartC.y;
            chy2 = yOrtpoint;
            chx = (chx1 + chx2)/2;
            chy = (chy1 + chy2)/2;

            //----------------------------------------------------------drawing the Euler triangle
            
            //this is the point where all the orthocenter of the Euler's triangle
            context.fillStyle = "#C71585";
            context.beginPath();
            context.arc(xOrtpoint, yOrtpoint , 5 , 0 ,Math.PI * 2, false);
            context.fill();
            context.fillStyle = "#C71585";
            context.fillText("EH" ,xOrtpoint+2, yOrtpoint - 10);

            context.beginPath();
            context.arc(ahx, ahy , 5 , 0 ,Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.arc(bhx, bhy , 5 , 0 ,Math.PI * 2, false);
            context.fill();
            
            context.beginPath();
            context.arc(chx, chy , 5 , 0 ,Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.moveTo(ahx , ahy);
            context.lineTo(bhx , bhy);
            context.lineTo(chx , chy);
            context.lineTo(ahx , ahy);
            context.stroke();

            //drawing the points with their relative colors
            context.fillStyle = "#C71585";
            context.fillText("EA" , ahx + 15, ahy-2);
            context.fillText("EB" , bhx + 8, bhy);
            context.fillText("EC" , chx + 8, chy-5);
            //drawing the ratio between the altitudes and the points of the Euler's triangle that is forming
            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(ahx , ahy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXa , pointResultYa);
            context.stroke();
            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(bhx , bhy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXb , pointResultYb);           
            context.stroke();
            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(chx , chy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXc , pointResultYc);           
            context.stroke();

            //Radius of Euler's triangle--------------------------------------------------------------

            var a = {
                x: ahx,
                y: ahy
            }
            var b = {
                x: bhx,
                y: bhy
            }
            var c = {
                x: chx,
                y: chy
            }
          
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

            context.fillStyle = "#C71585"
            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.fillText("ER" , this.x - 10, this.y - 8);
            context.stroke();

            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();
        }
        eulersTriangle();
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