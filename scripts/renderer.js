class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let color = [0, 0, 255, 255];
        let pt1 = {x:200, y:250};
        let pt2 = {x:600, y:400};
        this.drawRectangle(pt1, pt2, color, ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x:350, y:350};
        let radius = 200;
        let color = [255, 0, 0, 255];
        this.drawCircle(center, radius, color, ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let color = [255, 0, 0, 255];
        let pt0 = {x:200, y:250};
        let pt1 = {x:250, y:400};
        let pt2 = {x:500, y:390};
        let pt3 = {x:450, y:250};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx);

    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let color = [155, 10, 50, 255];
        //Z
        this.drawLine({x:100, y:400}, {x:300, y:400}, color, ctx);
        this.drawLine({x:300, y:400}, {x:100, y:200}, color, ctx);
        this.drawLine({x:100, y:200}, {x:300, y:200}, color, ctx);

        //a
        this.drawCircle({x:400, y:260}, 60, color, ctx);
        //Tail of a, could change to bezier curve or to this 'a'
        this.drawLine({x:460, y:260}, {x:465, y:200}, color, ctx);

        //k
        this.drawLine({x:520, y:200}, {x:520, y:400}, color, ctx);
        this.drawLine({x:520, y:300}, {x:620, y:400}, color, ctx);
        this.drawLine({x:520, y:300}, {x:620, y:200}, color, ctx);

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let left_top = {x:left_bottom.x, y: right_top.y};
        let right_bottom={x:right_top.x, y:left_bottom.y};

        if(this.show_points == true) {
            this.drawCirclePoint(left_bottom, 2.5, color, ctx);
            this.drawCirclePoint(left_top, 2.5, color, ctx);
            this.drawCirclePoint(right_bottom, 2.5, color, ctx);
            this.drawCirclePoint(right_top, 2.5, color, ctx);
        }
        
        //top line
        this.drawLine(left_top, right_top, color, ctx);
        //bottom line
        this.drawLine(left_bottom, right_bottom, color, ctx);
        //left line
        this.drawLine(left_bottom, left_top, color, ctx);
        //right line
        this.drawLine(right_bottom, right_top, color, ctx);
        
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let cnum = this.num_curve_sections;
        let degrees = 360/cnum;
        let ptx = center.x + radius;
        let pty = center.y 
        let firstpoint = {x: ptx, y:pty};
        let point = firstpoint;

        for(let i = degrees; i <360; i=i+degrees) {
            if(this.show_points == true) {
                this.drawCirclePoint(point, 2.5, color, ctx);
            }
            ptx = center.x + (radius * Math.cos(Math.PI * 2 * i/360));
            pty = center.y + (radius * Math.sin(Math.PI * 2 * i/360));
            let point2 = {x: ptx, y:pty};
            this.drawLine(point, point2, color, ctx);
            point = point2;
        }

        if(this.show_points == true) {
            this.drawCirclePoint(point, 2.5, color, ctx);
        }
        this.drawLine(point, firstpoint, color,ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let cnum = this.num_curve_sections;
        //Have to find t it seems using x and y points given
        //When t is found, plug into equation 
        let t = 0;
        let ptx = pt0.x;
        let pty = pt0.y;
        let point = pt0;
        let point2 = null;
        for(let i= 0; i < cnum; i++) {
            ptx = (((1-t)**3) * pt0.x) + ((3*(1-t)**2)*pt1.x) + ((3*(1-t)* (t**2))*pt2.x) + (t**3)*pt3.x;
            ptx = ptx - point.x;
            pty = pty - point.y;
            pty = (((1-t)**3) * pt0.y) + ((3*(1-t)**2)*pt1.y) + ((3*(1-t)* (t**2))*pt2.y) + (t**3)*pt3.y;
            point2 = {x:ptx, y:pty};
            t = t + 1/cnum;
            
            this.drawLine(point, point2, color, ctx);
            point = point2;
        }
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx) {
        if(this.show_points == true) {
            this.drawCirclePoint(pt0, 2.5, color, ctx);
            this.drawCirclePoint(pt1, 2.5, color, ctx);

        }
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }

    drawCirclePoint(center, radius, color, ctx) {
        let cnum = 36;
        let degrees = 360/cnum;
        let ptx = center.x + radius;
        let pty = center.y 
        let firstpoint = {x: ptx, y:pty};
        let point = firstpoint;

        for(let i = degrees; i <360; i=i+degrees) {
            ptx = center.x + (radius * Math.cos(Math.PI * 2 * i/360));
            pty = center.y + (radius * Math.sin(Math.PI * 2 * i/360));
            let point2 = {x: ptx, y:pty};
            this.drawLinePoint(point, point2, color, ctx);
            point = point2;
        }
        this.drawLinePoint(point, firstpoint, color,ctx);
    }

    drawLinePoint(pt0, pt1, color, ctx) {
        
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
