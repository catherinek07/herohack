import './Generator.css';
import bg1 from "../img/bg1.jpg";
import bg2 from "../img/bg2.jpg";
import bg3 from "../img/bg3.jpg";
import bg4 from "../img/bg4.jpg";
import bg5 from "../img/bg5.jpg";
import bg6 from "../img/bg6.jpg";
import bg7 from "../img/bg7.jpg";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Deso from 'deso-protocol';
import React, {useEffect, useState} from 'react';
import apiLocation from './APILocation';

//Font, size, color, bg choices
const fontChoices = ["'Alice', serif", "'Barrio', cursive", "'Bungee Shade', cursive", "'Kodchasan', sans-serif", "'Lexend Mega', sans-serif", "'Major Mono Display', monospace", "'Montserrat', sans-serif", "'Notable', sans-serif", "'Red Hat Mono', monospace", "'Rubik Mono One', sans-serif", "'Seaweed Script', cursive"]
const bgChoices = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];
var randFont = Math.floor(Math.random() * fontChoices.length);
var randBg = Math.floor(Math.random() * bgChoices.length);

const deso = new Deso();
var name = "poopman"
var pubkey = "BC1YLjWY8XR9WdCNdTpY79ooRgrKGYkV4r7ECRdABTpJ5EPqRkvR8gm"

function Generator() {
    async function GetInfo(){
        var userV = await fetch(apiLocation + "getuser")
        var userJ = userV.json()
        //name = userJ['username']
        //pubkey = userJ['pubkey']
    }
    useEffect(() => {
        GetInfo();
    }, []);
    function CreateImage(e) {
        var canvas = document.getElementById("canvas")
        var context = canvas.getContext('2d');
        // Draw Image function
        var img = new Image();
        img.crossOrigin = "anonymous"
        img.src = bgChoices[randBg];
        img.onload = function () {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            context.fillStyle = "#FFFFFF";
            context.font = "86px " + fontChoices[randFont];
            context.textAlign = "center";
            var lineHeight = context.measureText("M").width * 1.2;
            //Simulates letter spacing by adding hair spaces
            var newText = quote.split("").join(String.fromCharCode(8202))
            var lines = newText.split("\n");
            var x = canvas.width / 2;
            var y = canvas.height / 2 - lineHeight * lines.length / 2.4;
            var maxLen = 0;
            for (var i = 0; i < lines.length; ++i) {
                context.fillText(lines[i], x, y);
                y += lineHeight;
                maxLen = Math.max(maxLen, context.measureText(lines[i]).width);
            }
            context.fillRect(x - maxLen / 2, y - lineHeight / 1.5, maxLen, 2);
            context.font = "36px " + fontChoices[randFont];
            context.fillText("-" + name, x, canvas.height - 10);
        };
    }
    async function DownloadImage(){
        
        var canvas = document.getElementById("canvas") 
        var upBody = new FormData();
        const JWT = await deso.identity.getJwt()
        const blob = await (await fetch(canvas.toDataURL("image/png"))).blob(); 
        const poster = new File([blob], 'poster.png', {type:"image/png", lastModified:new Date()});
        upBody.append("UserPublicKeyBase58Check", pubkey)
        upBody.append("JWT", JWT)
        upBody.append("file", poster)
        const imgReq = {
            method: "POST",
            body: upBody
        }
        const imgURL = await (await fetch("https://node.deso.org/api/v0/upload-image", imgReq)).json()
        console.log(imgURL["ImageURL"]);
        const postRequest = {
            "UpdaterPublicKeyBase58Check": pubkey,
            "BodyObj": {
              "Body": "Check out my new iNFiniTee!",
              "VideoURLs": [],
              "ImageURLs": [imgURL["ImageURL"]]
            }
          };
        const postResponse = await deso.posts.submitPost(postRequest);
        const nftRequest = {
            "UpdaterPublicKeyBase58Check": pubkey,
            "NFTPostHashHex": postResponse['PostHashHex'],
            "NumCopies": 1,
            "NFTRoyaltyToCreatorBasisPoints": 100,
            "NFTRoyaltyToCoinBasisPoints": 100,
            "HasUnlockable": false,
            "IsForSale": false,
            "MinFeeRateNanosPerKB": 1000
          };
          const nftResponse = await deso.nft.createNft(nftRequest);
          console.log(nftResponse)
    }
    const [quote, setQuote] = useState("")
    //Preload font with first h
    return (
        <div className="hero-side-image-right">
            <h style={{"font-family": fontChoices[randFont]}}>.</h> 
            <TextField id="input" multiline="true" type='text' value={quote} onChange={(e) => setQuote(e.target.value)}/>
            <Button variant="contained" onClick={DownloadImage}>Submit</Button>
            <canvas id="canvas" ref={(e) => CreateImage(e)} width="1400" height="800"/>
        </div>
    );
}

export default Generator;