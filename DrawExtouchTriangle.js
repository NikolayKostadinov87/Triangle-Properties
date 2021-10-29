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

        function extouchTriangle(){
            context.lineWidth=1;
            //----------------------------------------------------------As usual declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //angle c
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //angle b
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            //angle a
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
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
        
            x1 = pointStartA.x;
            y1 = pointStartA.y;
            x2 = pointDestinationA.x;
            y2 = pointDestinationA.y;
            x3 = pointStartC.x;
            y3 = pointStartC.y;
        
            o2x = (resultOfSideA*x1 + resultOfSideC*x3 + (-1*resultOfSideB*x2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            o2y = (resultOfSideA*y1 + resultOfSideC*y3 + (-1*resultOfSideB*y2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            o1x = (resultOfSideB*x2 + resultOfSideC*x3 + (-1*resultOfSideA*x1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            o1y = (resultOfSideB*y2 + resultOfSideC*y3 + (-1*resultOfSideA*y1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            o3x = (resultOfSideA*x1 + resultOfSideB*x2 + (-1*resultOfSideC*x3))/(resultOfSideA + resultOfSideB - resultOfSideC);
            o3y = (resultOfSideA*y1 + resultOfSideB*y2 + (-1*resultOfSideC*y3))/(resultOfSideA + resultOfSideB - resultOfSideC);
        
            //the circle intersecting with AB
        
            context.fillStyle = "#2F4F4F";
            var LABc,Dxc,Dyc,tc,Exc,Eyc;
            LABc = c;
            Dxc = (pointDestinationA.x - pointStartA.x)/LABc;
            Dyc = (pointDestinationA.y - pointStartA.y)/LABc;
            tc = Dxc*(o3x - pointStartA.x) + Dyc*(o3y - pointStartA.y);
            Exc = tc*Dxc+pointStartA.x;
            Eyc = tc*Dyc+pointStartA.y;
            //
            context.beginPath();
            context.arc(Exc , Eyc , 5 , Math.PI * 2 , false);
            context.fill();
        
            //the circle intersecting with AC
        
            var LABb,Dxb,Dyb,tb,Exb,Eyb;
            LABb = b;
            Dxb = (pointStartC.x - pointStartA.x)/b;
            Dyb = (pointStartC.y - pointStartA.y)/b;
            tb = Dxb*(o2x - pointStartA.x) + Dyb*(o2y - pointStartA.y);
            Exb = tb*Dxb+pointStartA.x;
            Eyb = tb*Dyb+pointStartA.y;
            //
            context.beginPath();
            context.arc(Exb , Eyb , 5 , Math.PI * 2 , false);
            context.fill();
        
            //the circle intersecting with BC
        
            var LABa,Dxa,Dya,ta,Exa,Eya;
            LABa = a;
            Dxa = (pointDestinationA.x - pointStartC.x)/LABa;
            Dya = (pointDestinationA.y - pointStartC.y)/LABa;
            ta = Dxa*(o1x - pointDestinationA.x) + Dya*(o1y - pointDestinationA.y);
            Exa = ta*Dxa+pointDestinationA.x;
            Eya = ta*Dya+pointDestinationA.y;
            //
            context.beginPath();
            context.arc(Exa , Eya , 5 , Math.PI * 2 , false);
            context.fill();
        
            //drawing the extouch triangle
        
            context.beginPath();
            context.moveTo(Exa , Eya);
            context.lineTo(Exb , Eyb);
            context.lineTo(Exc , Eyc);
            context.lineTo(Exa , Eya);
            context.stroke();
        
            //notating the extouch triangle's angles
            context.fillStyle = "#2F4F4F";
            context.fillText("TA" , Exa + 10, Eya);
            context.fillText("TB" , Exb - 20, Eyb);
            context.fillText("TC" , Exc-5, Eyc + 20);
        
            //drawing the extouch triangle's circumscribed Circle
        
            a = {
                x: Exa,
                y: Eya
            }
            b = {
                x: Exb,
                y: Eyb
            }
            c = {
                x: Exc,
                y: Eyc
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
        
            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.stroke();
            context.fillText("TR" , this.x + 3, this.y);
            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();
        
            //---------------------------------------------------finding the area of the extouch triangle
        
            var K,areaOfIncircleTr,semka,erka;
            semka = (resultOfSideA + resultOfSideB + resultOfSideC)/2;
            erka = (Math.sqrt(semka*(semka - resultOfSideC)*(semka - resultOfSideB)*(semka - resultOfSideA)))/semka;
            areaOfIncircleTr = semka*erka;
        
            K = (areaOfIncircleTr*2*erka*erka*semka/resultOfSideA*resultOfSideB*resultOfSideC);
            K = K / 100 * 3;
            K = Math.abs(K);
            K = Math.round((K + Number.EPSILON) * 100) / 100;
            
        }

        extouchTriangle();

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