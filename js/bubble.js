(function () {
    'use strict';

    var canvas, ctx, width, height, bubbles, animateHeader = true;

    function initHeader() {
        canvas = document.getElementById('bubble_canvas');
        if (!canvas) {
            console.error('Canvas with id "bubble_canvas" not found.');
            animateHeader = false;
            return;
        }
        window_resize();
        ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for canvas.');
            animateHeader = false;
            return;
        }

        // 建立泡泡
        bubbles = [];
        var num = Math.floor(width * 0.04); // 气泡数量，减少浮点数计算
        for (var i = 0; i < num; i++) {
            var c = new Bubble(width, height);
            bubbles.push(c);
        }
        animate();
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < bubbles.length; i++) { // 使用for循环而非for-in循环，提高效率
                bubbles[i].draw(ctx);
            }
        }
        requestAnimationFrame(animate);
    }

    function window_resize() {
        // canvas铺满窗口
        width = window.innerWidth;
        height = window.innerHeight;
        //如果需要铺满内容可以换下面这个
        //var panel = document.getElementById('thumbnail_canvas');
        //width=panel.offsetWidth;
        //height=panel.offsetHeight;

        canvas.width = width;
        canvas.height = height;
    }

    window.onresize = function () {
        window_resize();
    };

    function Bubble(width, height) {
        this.pos = {};
        this.init(width, height);
    }

    Bubble.prototype.init = function (width, height) {
        this.pos.x = Math.random() * width;
        this.pos.y = height + Math.random() * 100;
        this.alpha = 0.1 + Math.random() * 0.5; // 气泡透明度
        this.alpha_change = 0.0002 + Math.random() * 0.0001; // 气泡透明度变化速度
        this.scale = 0.2 + Math.random() * 0.5; // 气泡大小
        this.scale_change = Math.random() * 0.002; // 气泡大小变化速度
        this.speed = 0.2 + Math.random() * 1.0; // 气泡上升速度
    };

    Bubble.prototype.draw = function (ctx) {
        if (this.alpha <= 0) {
            this.init(width, height);
        }
        this.pos.y -= this.speed;
        this.alpha -= this.alpha_change;
        this.scale += this.scale_change;

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
        ctx.fill();
    };

    // 确保DOM加载完毕后再初始化
    document.addEventListener('DOMContentLoaded', initHeader);
})();
