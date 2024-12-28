from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  



@app.route('/getValue', methods=['POST'])
def get_value():
    image_id = request.json.get('imageId')
    if image_id == 'img1':
        value = 'Value for Image 1'
    elif image_id == 'img2':
        value = 'Value for Image 2'
    else:
        value = 'Unknown Image'

    return jsonify({'value': value})

if __name__ == '__main__':
    app.run(debug=True)