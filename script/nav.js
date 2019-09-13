$(document).ready(function(){
        if(localStorage.menuLeft && localStorage.menuTop){
            $("#mydiv").css('top', localStorage.menuTop + 'px');
            $("#mydiv").css('left', localStorage.menuLeft + 'px');
        }
        $("#mydiv").show();
    });
    //Make the DIV element draggagle:
    dragElement(document.getElementById("mydiv"));

    
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var clientX, clientY;
        elmnt.ontouchmove = dragMouseDown;
        
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // set the element's new position:
            var menuTop = clientY - Math.round(elmnt.offsetHeight/2);
            var menuLeft = clientX - Math.round(elmnt.offsetWidth/2);
            elmnt.style.top = menuTop + "px";
            elmnt.style.left = menuLeft + "px";
            localStorage.menuTop = menuTop;
            localStorage.menuLeft = menuLeft;
        }
    
        function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        }
    }


    /* Set the width of the sidebar to 250px (show it) */
function openNav() {
    var navWidth = $("#mySidepanel").css('width');
    console.log(navWidth);
    if(navWidth == '0px' || !navWidth){
        $("#mySidepanel").css('width', '250px');
    }else{
        $("#mySidepanel").css('width', '0px');
    }
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    
  }