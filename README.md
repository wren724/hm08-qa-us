Sprint 8 Project tests for the functionality of the Urban.Routes application.

#Installation
1. **Clone the repository:**

git clone git@github.com:wren724/hm08-qa-us.git

2. **Navigate to the project directory:**
cd hm08-qa-us

3. **Install the dependencies:**

WebdriverIO
    npx wdio config 

### Configuration
1. **Set the test URL**
    - Open wdio.conf.js.
    - Set the baseUrl to your test URL.

    exports.config = {
         apiUrl: 'https://cnt-33c69452-e29a-4d23-9c4b-7e5919686f1e.containerhub.tripleten-services.com', 
         // other configurations 
         }

Running the Test Suite
Run the following command to run the test suite:
npm run wdio


Contact: For any queries, contact me at wrenli145@gmail.com.
License
This project is licensed under the MIT License.