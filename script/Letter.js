function Letter(width) {
  this.x = Math.floor(Math.random() * width);
  this.y = -100;
  this.velY = 0.006;
  this.code = Math.floor(Math.random() * 26) + 65;
  document.getElementById("letter").style.left = this.x + "px";
  document.getElementById("letter").style.top = "-100px";
  
  this.update = function(height) {
    // It's no matter how big is user's screen. 
    // With each screen user has the same time for click.
    this.y += this.velY * height;
    
    document.getElementById("letter").style.top = this.y + "px";
    return this.y + 70 < height;
  }
  
  this.getLetter = function() {
    return String.fromCharCode(this.code);
  }
  
  this.getCode = function() {
    return this.code;
  }
  
  this.setContent = function() {
    document.getElementById("letter").innerHTML = this.getLetter();
  }
}