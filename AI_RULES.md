# AI Development Rules

This document outlines the technology stack and specific library usage guidelines for this Next.js application. Adhering to these rules will help maintain consistency, improve collaboration, and ensure the AI assistant can effectively understand and modify the codebase.

## Tech Stack Overview

The application is built using the following core technologies:

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **UI Components**: Shadcn/UI - A collection of re-usable UI components built with Radix UI and Tailwind CSS.
*   **Styling**: Tailwind CSS - A utility-first CSS framework for rapid UI development.
*   **Icons**: Lucide React - A comprehensive library of simply beautiful SVG icons.
*   **Forms**: React Hook Form for managing form state and validation, typically with Zod for schema validation.
*   **State Management**: Primarily React Context API and built-in React hooks (`useState`, `useReducer`).
*   **Notifications/Toasts**: Sonner for displaying non-intrusive notifications.
*   **Charts**: Recharts for data visualization.
*   **Animation**: `tailwindcss-animate` and animation capabilities built into Radix UI components.

## Library Usage Guidelines

To ensure consistency and leverage the chosen stack effectively, please follow these rules:

1.  **UI Components**:
    *   **Primary Choice**: Always prioritize using components from the `src/components/ui/` directory (Shadcn/UI components).
    *   **Custom Components**: If a required component is not available in Shadcn/UI, create a new component in `src/components/` following Shadcn/UI's composition patterns (i.e., building on Radix UI primitives and styled with Tailwind CSS).
    *   **Avoid**: Introducing new, third-party UI component libraries without discussion.

2.  **Styling**:
    *   **Primary Choice**: Exclusively use Tailwind CSS utility classes for all styling.
    *   **Global Styles**: Reserve `src/app/globals.css` for base Tailwind directives, global CSS variable definitions, and minimal base styling. Avoid adding component-specific styles here.
    *   **CSS-in-JS**: Do not use CSS-in-JS libraries (e.g., Styled Components, Emotion).

3.  **Icons**:
    *   **Primary Choice**: Use icons from the `lucide-react` library.

4.  **Forms**:
    *   **Management**: Use `react-hook-form` for all form logic (state, validation, submission).
    *   **Validation**: Use `zod` for schema-based validation with `react-hook-form` via `@hookform/resolvers`.

5.  **State Management**:
    *   **Local State**: Use React's `useState` and `useReducer` hooks for component-level state.
    *   **Shared/Global State**: For state shared between multiple components, prefer React Context API.
    *   **Complex Global State**: If application state becomes significantly complex, discuss the potential introduction of a dedicated state management library (e.g., Zustand, Jotai) before implementing.

6.  **Routing**:
    *   Utilize the Next.js App Router (file-system based routing in the `src/app/` directory).

7.  **API Calls & Data Fetching**:
    *   **Client-Side**: Use the native `fetch` API or a simple wrapper around it.
    *   **Server-Side (Next.js)**: Leverage Next.js Route Handlers (in `src/app/api/`) or Server Actions for server-side logic and data fetching.

8.  **Animations**:
    *   Use `tailwindcss-animate` plugin and the animation utilities provided by Radix UI components.

9.  **Notifications/Toasts**:
    *   Use the `Sonner` component (from `src/components/ui/sonner.tsx`) for all toast notifications.

10. **Charts & Data Visualization**:
    *   Use `recharts` and its associated components (e.g., `src/components/ui/chart.tsx`) for displaying charts.

11. **Utility Functions**:
    *   General-purpose helper functions should be placed in `src/lib/utils.ts`.
    *   Ensure functions are well-typed and serve a clear, reusable purpose.

12. **Custom Hooks**:
    *   Custom React hooks should be placed in the `src/hooks/` directory (e.g., `src/hooks/use-mobile.tsx`).

13. **TypeScript**:
    *   Write all new code in TypeScript.
    *   Strive for strong typing and leverage TypeScript's features to improve code quality and maintainability. Avoid using `any` where possible.    

## Website

We maken een website voor theoriecentra.nl. Zij bieden dagtheoriecursussen aan op locatie.

Het idee is simpel. Website moet aantrekkelijk, eenvoudig, duidelijk, doorslaggevend, snel, modern en reactief zijn. De leerlingen moeten overtuigd zijn dat wij de beste dagcursus aanbieden. Leerlingen moeten zich kunnen aanmelden via een inschrijfformulier. De leerlingen moeten een overzicht krijgen met de cursus data per categorie en locatie.

Voor de leerling moet het heel snel duidelijk zijn dat zij zich aanmelden voor een cursus datum, welke tijden zij cursus krijgen, welke categorie en wat de prijs bedraagt. Heel veel concurrenten adverteren met vanaf prijzen zonder examenkosten. De kosten zullen 99 euro zijn exclusief examen kosten van 48,75 euro. Daarnaast zijn de concurrenten niet duidelijk met welke cursus data een leerling daadwerkelijk cursus heeft. Bij ons moet dit vooraf duidelijk zijn dat zij kunnen kiezen. Dus er moet een overzicht komen met alle cursus data, locatie en categorie. Deze moeten in de backend toegevoegd worden.

Kijk op https://www.123geslaagd.nl/, https://www.123-theorie.nl/, https://www.turbotheorie.nl/ en https://www.nutheorie.nl/ voor inspiratie.

Op deze website kun je zien hoe de inschrijfformulieren uitzien. De koppeling van Mollie moet ook gemaakt worden omdat de cursisten via de website meteen moeten afrekenen. Zij moeten 2 opties krijgen voor volledige betaling van 99euro cursus kosten + 48,75 euro examen kosten of Aanbetaling van 67,75 euro en resterende betaling van 80 euro bij de lesdag contant.

Na de aanmelding krijgt de leerling diverse mails qua instructies. Eerste mail met de ontvangstbevestiging (samenvatting van de inschrijving met korte instructies). 2e mail krijgen zij met informatie dat de leerlingen ons dienen te machtigen voor het theorie-examen met instructies. De machtigingsmail is geen standaard mail die zij krijgen omdat de opleidernummer per categorie en locatie kan veranderen. Dus een aanmelding in Venlo, Eindhoven of Maastricht/Roermond krijgen ieder een aparte mail met een ander opleidernummer. Dit moet dan geautomatiseerd worden. Deze mails moeten zo ingesteld zijn dat dit zeker aankomt in de Postvak IN en niet in de spam of iets dergelijks.


By following these guidelines, we can build a more robust, maintainable, and consistent application.
