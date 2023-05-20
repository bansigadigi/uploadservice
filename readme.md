This repository is meant for extracting aadhar number using prebuilt model of azure form recognizer cognitive service

To start the server:
   a) create .env file in root directory and copy .env.example content to .env
   b) run the server using command npm start

THe project consists of 2 rest endpoints which have to called sequentially in the specified order to obtain results

The curl request of the api's are provided here
 a)curl --location 'http://localhost:3000/analyze-document' \
--form 'file=@"/home/user/Downloads/images.jpeg"'

  the resultId obtained as a response from this api should be passed as paramId to the next get request

 b)curl --location 'http://localhost:3000/analyze-document/resultId' \
--header 'Ocp-Apim-Subscription-Key: b1aab342a3e449648a7e88c79044112f'

sample curl request for looking the end result

curl --location 'http://localhost:3000/analyze-document/ec58ea58-4481-4b4e-838d-849548865acc' \
--header 'Ocp-Apim-Subscription-Key: b1aab342a3e449648a7e88c79044112f'