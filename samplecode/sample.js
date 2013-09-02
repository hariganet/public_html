function b(){
var parent = document.getElementById("saa");
for(var i = 0; i < 10; ++i){
  var child = document.createElement('div');
  child.innerHTML = 'child';
 // Sleep(1);
  parent.appendChild(child);
}
alert('aaa');
}

function a(){
var fragment = document.createDocumentFragment();
for(var i=0; i<10; ++i){
  var child = document.createElement('div');

  child.innerHTML = 'child';
 // Sleep(1);

  fragment.appendChild(child);
}

document.getElementById("saa").appendChild(fragment);


}


function Sleep(T){
  var d1 = new Date().getTime();
  var d2 = new Date().getTime();
  while(d2 < d1 + 1000 * T){
    d2 = new Date().getTime();
  }
  return;
}
