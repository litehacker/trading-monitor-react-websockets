import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function WebSocketTest() {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const wsRef = useRef(null);
  const logContainerRef = useRef(null);

  // Function to connect to WebSocket
  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket("ws://localhost:9000"); // Change the WebSocket URL if needed
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      addLog("Connected to WebSocket server.");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      addLog(`Received: ${message}`);
    };

    ws.onclose = () => {
      setConnected(false);
      addLog("Disconnected from WebSocket server.");
    };

    ws.onerror = (error) => {
      addLog(`Error: ${error.message}`);
    };
  };

  // Function to add log messages
  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  // Scroll to bottom whenever new log message is added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Function to send commands to WebSocket
  const sendMessage = (msg) => {
    if (wsRef.current && connected) {
      wsRef.current.send(JSON.stringify(msg));
      addLog(`Sent: ${JSON.stringify(msg)}`);
    } else {
      addLog("WebSocket is not connected.");
    }
  };

  // Function to handle symbol selection
  const handleSymbolChange = (event) => {
    const { value, checked } = event.target;

    setSelectedSymbols((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((s) => s !== value)
    );
  };

  // Function to fetch available symbols from the Symbol API
  const fetchSymbols = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/symbols"); // Symbol API endpoint
      setAvailableSymbols(response.data);
    } catch (error) {
      addLog(`Error fetching symbols: ${error.message}`);
    }
  };

  // Hook to connect on component mount and fetch available symbols
  useEffect(() => {
    connectWebSocket();
    fetchSymbols();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>WebSocket Test App</h1>

      <div style={{ marginBottom: "20px" }}>
        <button className="primary-button" onClick={connectWebSocket}>
          {connected ? "Reconnect" : "Connect to WebSocket"}
        </button>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h3>Select Symbols to Add:</h3>
        {availableSymbols.length > 0 ? (
          <div className="symbols-container">
            {availableSymbols.map((symbol) => (
              <div key={symbol.id} className="symbol-item">
                <label className="symbol-label">
                  <input
                    type="checkbox"
                    value={symbol.id}
                    onChange={handleSymbolChange}
                  />
                  <span className="symbol-name">{symbol.name}</span> (
                  {symbol.id})
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading symbols...</p>
        )}
      </div>

      <div style={{ margin: "20px 0" }}>
        <button
          className="primary-button"
          onClick={() =>
            sendMessage({
              action: "add-provider",
              host: "ws://localhost:9001",
              symbols: selectedSymbols,
            })
          }
          disabled={!connected || selectedSymbols.length === 0}
        >
          Add Provider
        </button>

        <button
          className="secondary-button"
          onClick={() => sendMessage({ action: "clear-providers" })}
          disabled={!connected}
        >
          Clear Providers
        </button>

        <button
          className="secondary-button"
          onClick={() => sendMessage({ action: "clear-prices" })}
          disabled={!connected}
        >
          Clear Prices
        </button>
      </div>

      <div>
        <h3>Logs:</h3>
        <div ref={logContainerRef} className="log-container">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WebSocketTest;
