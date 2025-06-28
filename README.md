# With Ease - A Mobile Application for Stress Relief and Self-Care

## Description

**With Ease** is a cross-platform mobile application designed to help users manage stress and improve emotional well-being through guided mindfulness, mood tracking, journaling, and motivational challenges. This project was developed as part of the Bachelor's thesis at the Politehnica University of Timișoara by Dalia-Maria Opîrlesc, under the coordination of Prof. Dr. Habil. Eng. Marius Marcu.

The repository contains the full source code of the mobile application, excluding compiled binaries.

GitHub repository: [https://github.com/daliaopirlesc/withease](https://github.com/daliaopirlesc/withease)

---

## Deliverables

- **Frontend**: Contains the code for the client application, built with React Native using Expo
- **Backend**: Includes the server implemented in Java using Spring Boot
- **Database**: PostgreSQL


---

## Application Build Steps

### Backend

1. Clone the repository and navigate to the backend directory.
2. Make sure Java 17+ and Maven are installed.
3. Configure application properties (`application.properties`) for PostgreSQL connection and JWT.
4. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

---

### Frontend

1. Navigate to the React Native project directory.
2. Make sure `Node.js`, `npm` and `Expo CLI` are installed.
3. Install dependencies:

```bash
npm install
```

4. Start the Expo development server:

```bash
npx expo start
```

---

## Installation and Launch Steps

1. **Install Expo Go** on your Android/iOS device from the app store.
2. **Connect your device to the same network** as your development machine.
3. **Scan the QR code** from the terminal/Expo interface using the Expo Go app.
4. The application will launch on your device.

---

## Notes

- The application uses secure HTTPS communication and JWT-based authentication.
- Expo is used for mobile testing and development.
- PostgreSQL database setup is required. You can use tools like pgAdmin for management.

---

