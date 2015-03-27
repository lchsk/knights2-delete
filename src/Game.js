K.Game = function(fps)
{
  // this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  // Last time when the frame was updated
  this.lastTime = Date.now();

  // Time since last frame was rendered [ms]
  this.timeSinceLastFrame = 0;

  // Current FPS that limits the rendering
  this.requestedFrameRate = 1000 / fps;

  this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);

  window.addEventListener('orientationchange', this.resize.bind(this), false);
  window.addEventListener('resize', this.resize.bind(this), false);

  this.isWebGL = (this.renderer instanceof PIXI.WebGLRenderer) ? true : false;

  document.body.appendChild(this.renderer.view);
  document.body.style.margin = 0;

  this.stage = new PIXI.Stage(0xFF0000);



  this.map = new K.MapLoader(this, './test.json');
  // map is loaded asynchronously!!!

  this.camera = new K.Camera(this.width, this.height, this);

};

K.Game.prototype.constructor = K.Game;

// At this point, the map is loaded
K.Game.prototype.create = function()
{
  // this.camera.set(500, 0);
  // this.camera.animateTo(1000, 200, 3);

  //
  // var graphics = new PIXI.Graphics();
  //
  // graphics.beginFill(0x000000);
  // graphics.fillAlpha = 0.5;
  //
  // // set the line style to have a width of 5 and set the color to red
  // // graphics.lineStyle(5, 0xFF00FF);
  //
  // // draw a rectangle
  // graphics.drawRect(0, 0, 300, 200);
  //
  // this.stage.addChild(graphics);

  //

  this.draw();
};

K.Game.prototype.resize = function()
{
  this.camera.width = this.width = window.innerWidth;
  this.camera.height = this.height = window.innerHeight;
  this.renderer.resize(this.width, this.height);
}

K.Game.prototype.frameRate = function()
{
  var now = Date.now();
  this.timeSinceLastFrame = now - this.lastTime;
  this.lastTime = now;
};

K.Game.prototype.update = function()
{
  this.camera.update();
};

K.Game.prototype.draw = function()
{
  this.update();

  if (K.Key.isDown(K.Key.LEFT))
  {
    this.camera.set(5000, 0);
  }
  //
  // // if (K.Key.isDown(K.Key.RIGHT))
  // {
  //   this.camera.animateTo(5000, 0);
  // }

  this.map.world.position.x = - this.camera._x;
  this.map.world.position.y = - this.camera._y;

  if ((Date.now() - this.lastTime) >= this.requestedFrameRate)
  {
    this.frameRate();
    this.renderer.render(this.stage);
  }

  requestAnimationFrame(this.draw.bind(this));
};
