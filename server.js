const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
require("./db");
// const cors = require('cors');
// app.use(cors({
//     origin: 'https://localhost:3000',
//     allowedHeaders: ["Authorization", "Content-Type"],
//     credentials: true
// }));
const { cors, authorize, cache } = require('./middlewares/middlewares');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/auth", require("./routes/authentication"));
app.use("/user", [authorize, cache(20)], require("./routes/user"));

const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || 'https';
let server;

if (protocol === 'https') {
	const { execSync } = require('child_process');
	const execOptions = { encoding: 'utf-8', windowsHide: true };
	let key = './certs/key.pem';
	let certificate = './certs/certificate.pem';
	
	if ( ! fs.existsSync( key ) || ! fs.existsSync( certificate ) ) {
		try {
			execSync( 'openssl version', execOptions );
			execSync(
				`openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.tmp.pem -out ${ certificate } -days 365 -nodes -subj "/C=IN/ST=MH/L=Pune/O=Global Security/CN=localhost"`,
				execOptions
			);
			execSync( `openssl rsa -in ./certs/key.tmp.pem -out ${ key }`, execOptions );
			execSync( 'rm ./certs/key.tmp.pem', execOptions );
		} catch ( error ) {
			console.error( error );
		}
	}

	const options = {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(certificate),
        passphrase : 'password'
    };
    
	server = require('https').createServer(options, app);
} else {
    server = require('http').createServer(app);
}

server.listen(port, () => {
    console.log(`listening on *: ${port}`);
});