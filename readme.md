# Django website template (production ready)
Tired of writing Django project from scratch? use this template to speed up your Django development and deliver your project within few hours, instead of weeks or months.

### Local development


Before you start customizing the template follow the below steps:
1. Install python 3.8 or above.
https://www.python.org/downloads/

2. Open the template folder and from the terminal change the
directory to the current working directory.
`cd home/Template`

3. Install dependencies in an environment (creating an
enviornment is optional, but recommended)
```
pip install -r requirements.txt
```

4. Add a `.env` file inside the project folder with the following

```py
DEBUG=1
PYTHON_VERSION=3.10
DOMAIN=""

ALLOWED_HOSTS=".up.railway.app"
ALLOWED_CORS=""

SECRET_KEY=""
PORD_SECRET_KEY=""

DJANGO_SUPERUSER_EMAIL="" # optonal use if you want to create supruser using --noinput
DJANGO_SUPERUSER_PASSWORD="" # optonal use if you want to create supruser using --noinput

EMAIL_HOST="smtpout.server.net"
EMAIL_HOST_USER=""
EMAIL_HOST_PASSWORD=""

POSTGRES_DATABASE=""
POSTGRES_USER=""
POSTGRES_PASSWORD=""
POSTGRES_HOST=""

POSTGRES_URL=""

REDIS_PROD_HOST=""
REDIS_PASSWORD=""

PROJECT_ID="" # firebase project id
BUCKET_NAME=".appspot.com" # firebase storage name
FIREBASE_CRED_PATH="project/firebase-cred.json"

FIREBASE_ENCODED=""
CLOUD_PLATFORM="RAILWAY"

GOOGLE_ANALYTICS="G-"
```

5. Now in your terminal Create databases and Tables using
```
python manage.py migrate
```
Your database is created and ready to use.

6. Now run the website from the terminal using.
```py
python manage.py runserver
```
Your website should be available at: http://localhost:8000/

7. To run Tailwind CSS open a new terminal and run
```py
python manage.py tailwind start
```

**Note:** If you are facing problems starting this program in windows OS, remove logging from project/settings.py

### Admin superuser
To create a admin superuser use the following in terminal
```py
python manage.py createsuperuser
```

### Deployment:

You can make use of Railway to deploy your own instance. 
Link to deploy to [Railway.app](https://railway.app?referralCode=BfMDHP)

once you complete make sure to 
```
python manage.py collectstatic
```
and set
```
DEBUG=0
```

#### Create a firebase credential file

1. We use Google storage for storing files. Go to firebase -> storage -> create (make it public)

2. Now Go to firebase -> project settings -> service account -> Generate new private key.

Rename the private as `firebase-cred.json`

Use this private file as your credential file.

#### Deploying credential file to production
Sometimes your cloud provider may not provide you with storage for secret files. 
So convert the credential file to base64 using
```
base64 firebase-cred.json > encoded.txt
```
Now copy the contents of encoded.txt and paste it in `FIREBASE_ENCODED="wedde"` variable


### Images credits
Images are taken from free to use sites such as 
1. unsplash - https://unsplash.com/
2. Pexels - https://www.pexels.com/