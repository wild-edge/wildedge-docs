---
layout: home
title: Dokumentacja
titleTemplate: Dokumentacja Wild Edge

hero:
  name: WildEdge
  text: Dowiedz się, gdzie Twoje AI zawodzi w prawdziwym świecie.
  tagline: Zobacz, jak zachowanie modelu zmienia się między wydaniami, środowiskami uruchomieniowymi i urządzeniami. Przeglądaj zapisane wejścia, wyjścia i opinie użytkowników, a potem zamieniaj wybrane przykłady w zbiory danych do ewaluacji i trenowania.

features:
  - icon:
      light: /icons/python-light.svg
      dark: /icons/python-dark.svg
    title: Python
    badge:
      type: tip
      text: Beta
    link: https://pypi.org/project/wildedge-sdk/
    linkText: Pobierz z PyPI
  - icon:
      light: /icons/ios-light.svg
      dark: /icons/ios-dark.svg
    title: iOS / macOS
    badge:
      type: tip
      text: Beta
    link: https://cocoapods.org/pods/WildEdge
    linkText: Pobierz z CocoaPods
  - icon:
      light: /icons/android-light.svg
      dark: /icons/android-dark.svg
    title: Android
    link: https://central.sonatype.com/artifact/dev.wildedge/wildedge-android
    linkText: Pobierz z Maven Central
  - icon:
      light: /icons/linux-light.svg
      dark: /icons/linux-dark.svg
    title: Linux / Embedded
    badge:
      type: warning
      text: Wkrótce
---

## Co robi WildEdge

WildEdge instrumentuje wywołania inferencji i zapisuje, co naprawdę wydarzyło się na produkcji: czas odpowiedzi, pewność, dryf, stan sprzętu i temperaturę oraz opinie użytkowników o każdym wyniku. Włącz przechwytywanie, a surowe wejścia i wyjścia trafią obok zdarzenia, które je wygenerowało.

1. **Porównuj** zachowanie modelu między wydaniami aplikacji, wersjami modeli, środowiskami uruchomieniowymi i klasami urządzeń
2. **Przeglądaj** zdarzenia, które poszły źle, wraz z zapisanymi wejściami, wyjściami i opiniami użytkowników
3. **Buduj zbiory danych** z wybranych przykładów i eksportuj je do swoich pipeline'ów ewaluacji i trenowania

Przechwytywanie jest opcjonalne. Gdy jest wyłączone, SDK wysyła wyłącznie telemetrię, nigdy surowych wejść ani wyjść.

## Przewodniki integracji

**Przewodniki integracji w drodze.** Szczegółowe instrukcje konfiguracji, przykłady kodu i poradniki dla poszczególnych platform są w przygotowaniu. W międzyczasie zapraszamy do przeglądania repozytoriów i przykładów integracji na [GitHubie](https://github.com/wild-edge).

## Referencja API

Interaktywna dokumentacja Swagger jest również dostępna pod adresem [app.wildedge.dev/api/docs](https://app.wildedge.dev/api/docs).
