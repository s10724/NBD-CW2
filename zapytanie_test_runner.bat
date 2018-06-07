SET /P _inputname= Numer testu zapytania:
mongo nbd zapytanie_"%_inputname%"_test.js > wyniki_"%_inputname%"_test.json /Y