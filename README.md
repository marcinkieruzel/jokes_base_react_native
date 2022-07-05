# Jokes Api

1. Pod adresem `http://auth-starter.noinputsignal.com/api/` znajduje się api z listą żartów. 
2. Stwórz aplikację, która w głównym widoku pokaże listę żartów. Użyj FlatList z tytułami żarów. 
3. Po kliknięciu w tytuł – powinniśmy przejść do widoku z treścią żartu
4. Chcemy również aby użytkownik mógł przejść proces rejestracji i sam dodawać żarty. W tym celu w nowym widoku stwórz formularz rejestracji. A w kolejnym widoku formularz logowania. 
5. Po zalogowaniu otrzymasz dwa tokeny `jwt_token` i `refreshtoken`. Będą Ci one potrzebne do autoryzacji w serwisie. Przetestuj je najpierw w narzędziu Postman.
6. Stwórz formularz dodawania żartu a także możliwość jego usuwania.
7. Aby przetrzymać tokeny po stronie aplikacji użyj `AsyncStorage`
8. Użytkownik musi mieć możliwość skutecznego wylogowania się. Upewnij się, że wylogowując użytkownika usuwasz jego tokeny.

['Bären', 'küssen', 'Käfer', 'Ähnlich', 'Äpfel'].sort(function (a, b) {
    return a.localeCompare(b);
});

// This sorts as:
// ["Ähnlich", "Äpfel", "Bären", "Käfer", "küssen"]