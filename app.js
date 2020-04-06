const fs = require('fs')
const axios = require('axios')
const crypto = require('crypto')
var https = require('follow-redirects').https;
  
axios.get ('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=d33ff9445b219ec0d37ad83ce1a73fbc9ba218f9') 
  .then(res => {
   
   let cifrado = res.data.cifrado
    console.log(decode(cifrado));

    res.data.decifrado = decode(cifrado)

    
    
    
    const hash = crypto.createHash('sha1')
    .update('microsoft is not the answer. microsoft is the question. "no" is the answer. unknown')
    .digest('hex');
    console.log(hash);  
    
    res.data.resumo_criptografico = hash
    
    fs.appendFile('answer.json', JSON.stringify(res.data), 'utf-8', error => console.log(error))
    console.log(res.data);
  })

const decode = str => {
  return str.toLowerCase().split('').map(letter => {
    if (/[a-z]/g.test(letter)) {
      
      let decifrarCode = letter.charCodeAt(0) - 12
      
      if (decifrarCode < 97)
      {
        return String.fromCharCode(decifrarCode + 26)
      

    } else {
      return String.fromCharCode(decifrarCode)
    } ;
  }
  return letter 
    
  }).join('')
}
  


var options = {
  'method': 'POST',
  'hostname': 'api.codenation.dev',
  'path': '/v1/challenge/dev-ps/submit-solution?token=d33ff9445b219ec0d37ad83ce1a73fbc9ba218f9',
  'headers': {
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"answer\"; filename=\"answer.json\"\r\nContent-Type: \"{Insert_File_Content_Type}\"\r\n\r\n" + fs.readFileSync('/Users/Thiago/Desktop/desafio-codenation/answer.json') + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

req.write(postData);

req.end();