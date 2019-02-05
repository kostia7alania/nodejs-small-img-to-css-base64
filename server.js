const http = require ('http');
const fs = require('fs');
const fs2 = require('fs');

const dir = 'output//';
const inputFile  = 'DIC_COUNTRY.csv';
const outputFile = dir+'output.css';

const outputImgDir = dir+'gif//';

const server = http.createServer((req,res) => {
    switch  (req.url) { 
        case '/': 
            fs.readFile(inputFile, 'utf8', (err,data) => {
                let arr = "";
                data.split('\n')
                    .forEach(e=>{ 
                        let name = e.split(',')[0];
                        let hex = e.split(',')[1];
                        if( name.length<3 || hex.length<11 )  return ;  // if(name == 'NET') console.log('sex=>',name,hex.length);
                            ///let base64 = Buffer.from( hex.split(' ') .join(''), 'hex' ).toString('base64');                // HEX->GIF
                            //fs.writeFile(`${outputImgDir}${name}.gif`, base64, 'base64', err => console.log('err=>',err) ); // HEX->GIF
                            let base64 = Buffer.from( hex.split(' ') .join(''), 'hex' ).toString('base64');
                            arr += `.flagimage-${name}{ background-image: url("data:image/gif;base64,${Buffer.from(base64).toString('base64')}") !important;};\n`;
                       
                    });
                    fs.writeFileSync(outputFile, arr);
                    console.log('saved!');
            });
 

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
                    <!doctype> <html>
                        <h1>ready!</h1>
                    </html>`);
            break;




        case '/app.css': res.writeHead(200, {'Content-Type': 'text/css'});        res.end(`h1{color:red}`); break;
        case '/app.js':  res.writeHead(200, {'Content-Type': 'text/javascript'}); res.end(`alert('js!')`);  break;
        default:         res.writeHead(404, {'Content-Type': 'text/plain'});      res.end('404 НЕ Нашел,!,');

    }
}) 
.listen(3000, () => console.log('server пашет'));
