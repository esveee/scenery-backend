import requests
import json
import base64
# If you are using a Jupyter notebook, uncomment the following line.
#%matplotlib inline
import matplotlib.pyplot as plt
import PIL
from matplotlib import patches
from io import BytesIO

# Replace <Subscription Key> with your valid subscription key.
subscription_key = "fc6112eed44a49c0aaf8b57c84109281"
assert subscription_key

# You must use the same region in your REST call as you used to get your
# subscription keys. For example, if you got your subscription keys from
# westus, replace "westcentralus" in the URI below with "westus".
#
# Free trial subscription keys are generated in the westcentralus region.
# If you use a free trial subscription key, you shouldn't need to change
# this region.
face_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'

# Set image_url to the URL of an image that you want to analyze.
# image_url = 'https://how-old.net/Images/faces2/main007.jpg'
#image_url = 'https://img.buzzfeed.com/buzzfeed-static/static/2015-01/26/21/enhanced/webdr09/original-1014-1422325554-21.jpg?downsize=715:*&output-format=auto&output-quality=auto'
#image_url = 'https://static1.squarespace.com/static/5784c5bc2994ca687a5cd9f9/59afcd0ff9a61eccbf986af8/59afcd0fa9db09ad7b9dd663/1504693984443/thomas-ruff-portraits.png?format=500w'
# temp = 'abdc'
# image_url = base64.b64decode(temp)

headers = {'Ocp-Apim-Subscription-Key': subscription_key}
params = {
    'returnFaceId': 'false',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
}
data = {'url': image_url}
response = requests.post(face_api_url, params=params, headers=headers, json=data)
faces = response.json()

emotionData = faces[0]["faceAttributes"]["emotion"]

emotions = ["sadness", "neutral", "contempt", "disgust", "anger", "surprise", "fear", "happiness"]

strongestEmotion = ["sadness", 0]  # key, value
for e in emotions:
	if (emotionData[e] > strongestEmotion[1]):
		strongestEmotion = [e, emotionData[e]]

returnValue = json.dumps(strongestEmotion[0])

print(returnValue)