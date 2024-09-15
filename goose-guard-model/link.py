from flask import Flask, jsonify, request
from ModelEval import result

app = Flask(__name__)

@app.route("/", methods=["POST"])
def main():
    data = request.json
    return jsonify({"scam": result(data["transcription"])})

if __name__ == "__main__":
    app.run()