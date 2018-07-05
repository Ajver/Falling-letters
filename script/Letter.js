function Letter(width) {
  this.x = Math.floor(Math.random() * width);
  this.y = -100;
  this.velY = 5;
  this.code = Math.floor(Math.random() * 26) + 65;
  document.getElementById("letter").style.left = this.x + "px";
  document.getElementById("letter").style.top = "-100px";
  
  this.update = function(height) {
    this.y += this.velY;
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