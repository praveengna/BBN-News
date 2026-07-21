"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain, Sun, Wind, Cloud } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null)
  
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=23.2599&longitude=77.4126&current_weather=true&hourly=relative_humidity_2m")
        const data = await res.json()
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          windspeed: Math.round(data.current_weather.windspeed),
          humidity: Math.round(data.hourly.relative_humidity_2m[0] || 65),
          isDay: data.current_weather.is_day === 1
        })
      } catch (err) {
        console.error("Failed to fetch weather", err)
      }
    }
    fetchWeather()
  }, [])

  if (!weather) return null

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between opacity-90">
          <span>Bhopal, MP</span>
          <span className="text-xs">Today</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold font-heading">{weather.temp}°C</div>
            <div className="text-sm opacity-90 flex items-center gap-1 mt-1">
              {weather.isDay ? <Sun className="w-4 h-4" /> : <Cloud className="w-4 h-4" />} 
              {weather.isDay ? 'Clear' : 'Cloudy'}
            </div>
          </div>
          {weather.isDay ? <Sun className="w-12 h-12 text-yellow-300 drop-shadow-md" /> : <Cloud className="w-12 h-12 text-gray-300 drop-shadow-md" />}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs opacity-80 border-t border-white/20 pt-3">
          <div className="flex items-center gap-1"><Wind className="w-3 h-3" /> {weather.windspeed} km/h</div>
          <div className="text-right">Humidity: {weather.humidity}%</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PollWidget() {
  return null
}
