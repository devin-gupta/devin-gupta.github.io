var i = 0;
var txt = 'tech journalist and student'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("description_bio").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}