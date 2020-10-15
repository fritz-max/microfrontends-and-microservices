docker run -v $PWD:/app --link=crossbar -e CBURL="ws://crossbar:8080/ws" -e CBREALM="realm1" --rm -it crossbario/autobahn-python:cpy3 python /app/1.hello-world/client_component_publish.py
