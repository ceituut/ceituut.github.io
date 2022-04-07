from flask import Flask, render_template, request
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['MAX_CONTENT_PATH'] = '10240'
app.config['UPLOAD_FOLDER'] = '/codes'

@app.route('/')
def index():
    return "hello"

@app.route('/GetCode' , methods=['POST'])
def get_code():
    f = request.files['file']
    f.save(secure_filename(f.filename))
    lan = request.form['language']
    name = request.form['name']
    challenge_name = request.form['challenge_name']
    return 'file uploaded successfully'

@app.route('/GetCode' , methods=['GET'])
def get_code_html():
    return render_template('upload.html')

if __name__ == '__main__':
    app.run(debug=True)

