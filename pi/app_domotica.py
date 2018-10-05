import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat
sense = SenseHat()

r = (255, 0, 0)
g = (0, 255, 0)
y = (255, 255, 0)
b = (0, 0, 255)
k = (0, 0, 0)

y_off = (128, 128, 0)
b_off = (0, 0, 128)

cred = credentials.Certificate('../services/firebase.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://wot-larsfoll.firebaseio.com/'
})

home_ref = db.reference('homes/home')
home_initial = home_ref.get()

sense.set_pixels(home_initial)
