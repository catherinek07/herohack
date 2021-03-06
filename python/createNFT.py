import deso
from deso import Post
import json

def createNFT(publicKey, seedHex, imageUrl):
    # posting image on DeSo
    post = deso.Post(seedHex, publicKey)
    imageFileList = [
        ('file', ('screenshot.jpg', open(imageUrl, "rb"), 'image/png'))
    ]  # 'imageToUpload.png' is the image we are uploading to images.bitclout.com
    urlResponse = post.uploadImage(imageFileList)
    #print(urlResponse['ImageURL'])
    postResponse = post.send("",imageUrl=[str(urlResponse['ImageURL'])])
    postHashHex = postResponse["postHashHex"]
    status = post.mint(postHashHex, minBidDeSo=0.1, copy=10)
    if status == 200:
        print(f"NFT is live at https://diamondapp.com/nft/{postHashHex}")
    else:
        print(status)
post = deso.Post()
post.mint("bb6c544064a502946004dcffe644c895988a82db2e2ce9a52c7aa9f3973af979", minBidDeso=0, copy=0)