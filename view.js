let $ = require('jquery')
let fs = require('fs')
let path = require('path')

const appDatatDirPath = getAppDataPath();
let filename = path.join(appDatatDirPath, 'contacts.json')
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile(filename, name + ',' + email + '\n',(err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  })

   addEntry(name, email)
})

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function getAppDataPath() {
   switch (process.platform) {
     case "darwin": {
       return path.join(process.env.HOME, "Library", "Application Support", "MyElectron");
     }
     case "win32": {
       return path.join(process.env.APPDATA, "MyElectron");
     }
     case "linux": {
       return path.join(process.env.HOME, ".MyElectron");
     }
     default: {
       console.log("Unsupported platform!");
       process.exit(1);
     }
   }
 }

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()