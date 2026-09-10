---
layout: home

hero:
  text: Dowiedz się, gdzie Twoje AI zawodzi w prawdziwym świecie.

features:
  - icon:
      light: /icons/python-light.svg
      dark: /icons/python-dark.svg
    title: Python
    badge:
      type: tip
      text: Beta
    link: https://github.com/wild-edge/wildedge-python#install
    linkText: Skonfiguruj Pythona
  - icon:
      light: /icons/ios-light.svg
      dark: /icons/ios-dark.svg
    title: iOS / macOS
    badge:
      type: tip
      text: Beta
    link: https://github.com/wild-edge/wildedge-swift#getting-started
    linkText: Skonfiguruj iOS / macOS
  - icon:
      light: /icons/android-light.svg
      dark: /icons/android-dark.svg
    title: Android
    link: https://github.com/wild-edge/wildedge-android#quick-start
    linkText: Skonfiguruj Androida
  - icon:
      light: /icons/linux-light.svg
      dark: /icons/linux-dark.svg
    title: Linux / Embedded
    badge:
      type: warning
      text: Wkrótce
---

## Co robi WildEdge

Zobacz, jak zachowanie modelu zmienia się między wydaniami, środowiskami uruchomieniowymi i urządzeniami. Przeglądaj zapisane wejścia, wyjścia i opinie użytkowników, a potem zamieniaj wybrane przykłady w zbiory danych do ewaluacji i trenowania.

WildEdge instrumentuje wywołania inferencji i zapisuje, co naprawdę wydarzyło się na produkcji: czas odpowiedzi, pewność, dryf, stan sprzętu i temperaturę oraz opinie użytkowników o każdym wyniku. Włącz przechwytywanie, a surowe wejścia i wyjścia trafią obok zdarzenia, które je wygenerowało.

1. **Porównuj** zachowanie modelu między wydaniami aplikacji, wersjami modeli, środowiskami uruchomieniowymi i klasami urządzeń
2. **Przeglądaj** zdarzenia, które poszły źle, wraz z zapisanymi wejściami, wyjściami i opiniami użytkowników
3. **Buduj zbiory danych** z wybranych przykładów i eksportuj je do swoich pipeline'ów ewaluacji i trenowania

Przechwytywanie jest opcjonalne. Gdy jest wyłączone, SDK wysyła wyłącznie telemetrię, nigdy surowych wejść ani wyjść.

## Zbadaj problem z agentem AI

Podłącz Claude Code, Codex, Gemini CLI lub ChatGPT do swojego konta przez zdalny serwer [MCP](https://modelcontextprotocol.io/). Poproś agenta, żeby przejrzał ostatnie zdarzenia inferencji, prześledził trace albo zbadał awarię, bez przenoszenia danych między przeglądarką a terminalem.

- [Podłącz agenta w terminalu](/mcp) za pomocą osobistego tokenu dostępu
- [Podłącz agenta webowego](/mcp_web) takiego jak ChatGPT lub Claude przez OAuth

Przewodniki MCP są na razie dostępne tylko po angielsku.

## Przykłady

Każde SDK zawiera gotowe do uruchomienia przykłady: [Python](https://github.com/wild-edge/wildedge-python/tree/main/examples), [Swift](https://github.com/wild-edge/wildedge-swift/tree/main/Examples), [Android](https://github.com/wild-edge/wildedge-android/tree/main/samples).

[Aplikacja demo](https://github.com/wild-edge/python-demo-app) uruchamia modele lokalne i zdalne w jednym pipelinie, więc możesz zobaczyć całą pętlę w działaniu, zanim podłączysz własną.

## Referencja API

Interaktywna dokumentacja Swagger jest również dostępna pod adresem [app.wildedge.dev/api/docs](https://app.wildedge.dev/api/docs).
