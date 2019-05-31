# RESTful API

RESTful API using NodeJS and deploy it into Heroku

Curl Commands 

    - curl -i -H "Accept: application/json" -H "Content-Type: application/json" https://rest-api-jjf.herokuapp.com/api/contacts
    - curl -d "first_name=Jules&last_name=Marcelo&address=Bulacan&email_address=jmarcelo@gmail.com&contact_number=09876543210" -X POST https://rest-api-jjf.herokuapp.com/api/contacts
    - curl -i -H "Accept: application/json" -H "Content-Type: application/json" https://rest-api-jjf.herokuapp.com/api/contacts/2
    - curl -d "first_name=Justine&last_name=Fernandez&address=Cavite&email_address=jfernandez@stratpoint.com&contact_number=099599631654" -X PUT https://rest-api-jjf.herokuapp.com/api/contacts/2
    - curl -X "DELETE" https://rest-api-jjf.herokuapp.com/api/contacts/2

