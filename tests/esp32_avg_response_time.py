import requests
import time

ESP32_URL = "http://10.31.7.181/data"

try:

    avg_time = 0

    for i in range(0,10):
        startTime = time.perf_counter()
        response = requests.get(ESP32_URL)
        endTime = time.perf_counter()
        response.raise_for_status() 

        avg_time = avg_time + ((endTime-startTime) - avg_time) / (i+1)
        print("Response Recieved in " + str(endTime-startTime) + " seconds")
        time.sleep(2)
    
    print("Response Time: " + str(avg_time))

except requests.exceptions.ReadTimeout as e:
    print("Connection timed out")

except AssertionError as e:
    print("Response does not contain required key")

except Exception as e:
    print(e)


