from mongoengine import connect, Document, StringField, FloatField, DateField, ReferenceField
import datetime
import config

# Connect ke MongoDB
connect(
    db=config.MONGODB_DB,
    host=config.MONGODB_HOST,
    port=config.MONGODB_PORT
)

# Model User
class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)

# Model Transaksi
class Transaction(Document):
    user = ReferenceField(User)
    type = StringField(required=True, choices=["income", "expense"])
    amount = FloatField(required=True)
    category = StringField()
    description = StringField()
    date = DateField(default=datetime.date.today)
