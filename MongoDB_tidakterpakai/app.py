from flask import Flask, request, jsonify
from models import User, Transaction
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import jwt
import datetime

SECRET_KEY = "apew"

app = Flask(__name__)
CORS(app)

def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


@app.route('/')
def index():
    return "Welcome to Personal Finance App (MongoDB + Flask)"

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if User.objects(username=username).first():
        return jsonify({"error": "Username sudah ada"}), 400
    hashed = generate_password_hash(password)
    user = User(username=username, password=hashed).save()
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.objects(username=data.get("username")).first()
    if user and check_password_hash(user.password, data.get("password")):
        token = generate_token(str(user.id))
        return jsonify({"message": "Login berhasil", "username": str(user.username), "token": str(token)})
    return jsonify({"error": "Login gagal"}), 401

@app.route('/add', methods=['POST'])
def add_transaction():
    data = request.json
    user = User.objects(id=data["user_id"]).first()
    if not user:
        return jsonify({"error": "User tidak ditemukan"}), 404
    trx = Transaction(
        user=user,
        type=data["type"],
        amount=data["amount"],
        category=data.get("category", ""),
        description=data.get("description", "")
    ).save()
    return jsonify({"message": "Transaksi disimpan", "id": str(trx.id)})

@app.route('/list/<user_id>', methods=['GET'])
def list_transactions(user_id):
    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({"error": "User tidak ditemukan"}), 404
    trxs = Transaction.objects(user=user)
    return jsonify([{
        "type": t.type,
        "amount": t.amount,
        "category": t.category,
        "description": t.description,
        "date": str(t.date)
    } for t in trxs])

if __name__ == '__main__':
    app.run(debug=True)
