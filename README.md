# google-sheets-node-js

##### Project requires a .env file containing spreadsheetId to match the target spreadsheet (check the URL)

https://docs.google.com/spreadsheets/d/THIS_VALUE_RIGHT_HERE/edit?gid=793339523#gid=793339523

##### .env file should look like:

spreadsheetId=THIS_VALUE_RIGHT_HERE

##### Project also requires a googleKeyFile.json, which you get as credentials from your [cloud.google.console](https://console.cloud.google.com/) account. It would look like this:

{
"type": "service_account",
"project_id": "BLAHBLAHBLAHBLAHBLAH",
"private_key_id": "BLAHBLAHBLAHBLAHBLAH",
"private_key": "-----BEGIN PRIVATE KEY-----\nBLAHBLAHBLAHBLAHBLAH\n-----END PRIVATE KEY-----\n",
"client_email": "BLAHBLAHBLAHBLAHBLAH",
"client_id": "BLAHBLAHBLAHBLAHBLAH",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/BLAHBLAHBLAHBLAHBLAH",
"universe_domain": "googleapis.com"
}
