SET /P _inputname= Numer zapytania:
mongo nbd zapytanie_"%_inputname%".js > wyniki_"%_inputname%".json /Y