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
        let center = {x:250, y:250};
        let radius = 100;
        let color = [255, 0, 0, 255];
        this.drawCircle(center, radius, color, ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {

    }

    // ctx:          canvas context
    drawSlide3(ctx) {

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let left_top = {x:left_bottom.x, y: right_top.y};
        let right_bottom={x:right_top.x, y:left_bottom.y};
        
        
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
        let point = {x: ptx, y:pty};

        for(let i = degrees; i <=360; i=i+degrees) {
            ptx = center.x + (radius * Math.cos(i));
            pty = center.y + (radius * Math.sin(i));
            let point2 = {x: ptx, y:pty};
            this.drawLine(point, point2, color, ctx);
            point = point2;
        }
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
