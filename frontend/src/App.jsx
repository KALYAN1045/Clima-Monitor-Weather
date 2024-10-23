import React, { useState } from "react";
import "./App.css";
import Home_page from "./pages/Home/Home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock } from "lucide-react";



function App() {
  const [userPreferences, setUserPreferences] = useState(null);
  const [name, setName] = useState("");
  const [tempUnit, setTempUnit] = useState("celsius");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserPreferences({
      name: name,
      temperatureUnit: tempUnit
    });
  };

  if (userPreferences) {
    return <Home_page userPreferences={userPreferences} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 p-4">
      <Alert className="max-w-md w-full bg-blue-50 border-blue-200">
        <Clock className="h-4 w-4" />
        <AlertDescription className="flex items-center gap-2">
          <span className="font-semibold">Pro Tip:</span> Don't forget to check out the DarkMode (Spend 4hrs on it alone)
        </AlertDescription>
      </Alert>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome! Please set your preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tempUnit" className="block text-sm font-medium">
                Preferred Temperature Unit
              </label>
              <select
                id="tempUnit"
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Home
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;