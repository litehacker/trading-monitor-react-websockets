# WebSocket Test App

## Purpose

The WebSocket Test App is a simple React-based application that allows users to connect to a WebSocket server and test various commands for managing trading data. This includes adding trading data providers, clearing data providers, and clearing the prices stored for connected consumers. The application also provides a log view that displays real-time interactions between the client and the WebSocket server.

The primary purpose of the application is to act as a testing and debugging interface for interacting with a backend Trading Broadcaster (TB) that manages multiple data providers. The app facilitates the sending and receiving of WebSocket messages, including adding and managing symbol subscriptions.

## Features

- Connect to a WebSocket server (Trading Broadcaster running on port 9000 by default).
- Select trading symbols to add from the available list provided by a Symbol API.
- Issue commands like "add-provider", "clear-providers", and "clear-prices" via WebSocket.
- View real-time logs of messages sent and received.

## Working Requirements

To properly use this application, you need to have a backend WebSocket server and a Symbol API server running locally.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Services Consumed

1. **Trading Broadcaster WebSocket Server**: The WebSocket Test App connects to a backend WebSocket server, known as the Trading Broadcaster (TB). The TB must be running on `ws://localhost:9000`. This server accepts and processes messages to add providers, clear providers, and clear prices.

2. **Symbol API Server**: The application retrieves available trading symbols from a Symbol API running at `http://localhost:3000/api/symbols`. The Symbol API must be running to fetch the list of symbols that the app users can subscribe to.

### Installation & Setup

Follow these steps to install and run the WebSocket Test App locally:

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd websocket-test-app
   ```

2. **Install Dependencies** Install the required dependencies for the application:

   ```bash
   npm install
   ```

3. **Run the React App** Start the React development server on port 3001:

   ```bash
   PORT=3001 npm start
   ```

   The application will be accessible at [http://localhost:3001](http://localhost:3001).

### Usage Instructions

1. **Connect to WebSocket**

   - Click the "Connect to WebSocket" button to establish a connection with the Trading Broadcaster server (`ws://localhost:9000`).

2. **Select Symbols to Add**

   - The available symbols are fetched from the Symbol API and listed as checkboxes.
   - Select the symbols you wish to add, and click the "Add Provider" button.

3. **Send Commands**

   - Use the buttons to send commands like "Add Provider", "Clear Providers", or "Clear Prices".

4. **View Logs**

   - Logs are displayed in the scrollable log box, showing all sent and received WebSocket messages.

### Troubleshooting

- **Network Error when Fetching Symbols**: Ensure that the Symbol API server is running at `http://localhost:3000`. Also, make sure CORS is enabled on the Symbol API.
- **WebSocket Not Connected**: The WebSocket server (`ws://localhost:9000`) must be running before connecting. Make sure the Trading Broadcaster server is active.

### Example Backend Setup

- **Trading Broadcaster**: A WebSocket server should be running to accept commands and manage multiple data providers.
- **Symbol API**: The Symbol API is expected to serve available symbols from `http://localhost:3000/api/symbols`.

Ensure both backend services are running before interacting with the app to avoid errors.

### Dependencies

- React
- Axios (for making HTTP requests to the Symbol API)

### License

This project is licensed under the MIT License.
