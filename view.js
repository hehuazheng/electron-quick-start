const { remote } = require('electron')

let $ = require('jquery')
let fs = require('fs')

const mainProcess = remote.require('./main.js')

imgContainer = $('#imgContainer')

$('#selectImg').on('click', () => {
   imgPath = mainProcess.loadImgFile()
   $('#imgPath').val("path: " + imgPath)
   // $('#imgContainer').attr("src", imgPath)
   // var c=document.getElementById("myCanvas");
   // var ctx=c.getContext("2d");
   var img = document.getElementById('imgContainer')
   img.src = imgPath
   // c.height = img.height
   // c.width = img.width
   // important!!! load image takes time
   // img.onload = function() {
   //    ctx.drawImage(img,10,10);
   // }
})

$('#imgContainer').on('mousemove', (e) => {
   // relative x , y
   rx = imgContainer.offset().left
   ry = imgContainer.offset().top
   x = e.pageX - rx
   y = e.pageY - ry
   $('#pos').val(x + "," + y)
}).on('mouseout', (e)=>{
   $('#pos').val("")
})
// function getAppDataPath() {
//    switch (process.platform) {
//      case "darwin": {
//        return path.join(process.env.HOME, "Library", "Application Support", "MyElectron");
//      }
//      case "win32": {
//        return path.join(process.env.APPDATA, "MyElectron");
//      }
//      case "linux": {
//        return path.join(process.env.HOME, ".MyElectron");
//      }
//      default: {
//        console.log("Unsupported platform!");
//        process.exit(1);
//      }
//    }
//  }